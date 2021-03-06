const { readdir } = require('fs').promises
const path = require('path')

const kAutoloadRoute = Symbol('beanify.autoload.route')

const defaults = {
  scriptPattern: /((^.?|\.[^d]|[^.]d|[^.][^d])\.ts|\.js|\.cjs|\.mjs)$/i,
  indexPattern: /^index(\.ts|\.js|\.cjs|\.mjs)$/i,
  dirAsScope: true,
  urlPrefix: '',
  pathSplit: '.'
}

async function loadDirents (beanify, dir, depth, opts) {
  const {
    indexPattern,
    ignorePattern,
    scriptPattern,
    maxDepth,
    dirAsScope,
    urlPrefix
  } = opts

  const list = await readdir(dir, { withFileTypes: true })

  const idxDirent = list.find(dirent => indexPattern.test(dirent.name))
  if (idxDirent) {
    const file = path.join(dir, idxDirent.name)
    beanify.register(require(file))
    return
  }

  for (const dirent of list) {
    if (ignorePattern && dirent.name.match(ignorePattern)) {
      continue
    }

    const isMaxDepth = Number.isFinite(maxDepth) && maxDepth <= depth
    const file = path.join(dir, dirent.name)
    if (dirent.isDirectory() && !isMaxDepth) {
      if (dirAsScope === true) {
        // new scope
        beanify.register(
          async ins => {
            // recursion
            await loadDirents(ins, file, depth + 1, opts)
          },
          {
            name: dirent.name,
            prefix: `${urlPrefix}${dirent.name}`
          }
        )
      } else {
        // recursion
        await loadDirents(beanify, file, depth + 1, opts)
      }
    } else if (idxDirent) {
      continue
    }

    if (dirent.isFile() && scriptPattern.test(dirent.name)) {
      const mod = require(file)
      if (mod[kAutoloadRoute] === true) {
        const ex = path.extname(dirent.name)
        mod.url = `${urlPrefix}${dirent.name.replace(ex, '')}`
        mod.$IsAutoload = true
        beanify.route(mod)
      } else {
        beanify.register(mod)
      }
    }
  }
}

module.exports = async function (beanify, options) {
  const opts = { ...defaults, ...options }

  beanify.addHook('onRoute', function (route) {
    const { url, $IsAutoload = false } = route
    const { pathSplit } = opts

    if ($IsAutoload) {
      const urlMatch = `${pathSplit}_`
      const urlReplace = `${pathSplit}:`
      while (route.url.indexOf(urlMatch) >= 0) {
        route.url = url.replace(urlMatch, urlReplace)
      }
    }
  })

  await loadDirents(beanify, opts.dir, 0, opts)
}

module.exports.route = function (route) {
  route[kAutoloadRoute] = true
  return route
}
