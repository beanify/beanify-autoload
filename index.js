const beanifyPlugin = require("beanify-plugin")
const fs = require("fs")
const path = require("path")
const steed = require("steed")

module.exports = beanifyPlugin((beanify, opts, done) => {

    const {
        dir,
        ignorePattern,
        includeTypeScript,
        options: defaultPluginOptions
    } = opts

    const scriptPattern = includeTypeScript
        ? /\.(ts|js)$/im
        : /\.js$/im

    const packagePattern = /^package\.json$/im
    const indexPattern = includeTypeScript
        ? /^index\.(ts|js)$/im
        : /^index\.js$/im

    fs.readdir(dir, function (err, list) {
        if (err) {
            done(err)
            return
        }

        steed.map(list, (file, next) => {
            if (ignorePattern && file.match(ignorePattern)) {
                next(null, { skip: true })
                return;
            }

            const toLoad = path.join(dir, file)

            fs.stat(toLoad, (err, stat) => {
                if (err) {
                    next(err)
                    return
                }

                if (stat.isDirectory()) {

                    fs.readdir(toLoad, (err, files) => {
                        if (err) {
                            next(err)
                            return
                        }

                        const fileList = files.join('\n')

                        if (!packagePattern.test(fileList) &&
                            !indexPattern.test(fileList) &&
                            scriptPattern.test(fileList)) {

                            const loaded = []

                            for (let idx = 0; idx < files.length; idx++) {
                                const file = files[idx]

                                loaded.push({
                                    skip: !scriptPattern.test(file),
                                    opts: {
                                        prefix: toLoad.split(path.sep).pop()
                                    },
                                    file: path.join(toLoad, file)
                                })
                            }

                            next(null, loaded)
                        } else {
                            next(null, {
                                skip: files.every(name => !scriptPattern.test(name)),
                                file: toLoad
                            })
                        }
                    })


                } else {
                    next(null, {
                        skip: !(stat.isFile() && scriptPattern.test(file)),
                        file: toLoad
                    })
                }
            })

        }, (err, files) => {
            if (err) {
                done(err)
                return
            }

            const stats = [].concat(...files)

            const plugins = {}

            for (let idx = 0; idx < stats.length; idx++) {
                const { skip, file, opts } = stats[idx]

                if (skip) {
                    continue
                }

                try {
                    const plugin = require(file)
                    const pluginOptions = Object.assign({}, defaultPluginOptions)
                    const pluginMeta = plugin[beanifyPlugin.pluginMeta]
                    
                    if (pluginMeta) {
                        const pluginName = pluginMeta.name || file;

                        const prefix = pluginOptions.prefix || ''
                        plugin[beanifyPlugin.pluginPrefix] = prefix

                        if (plugins[pluginName]) {
                            throw new Error(`Duplicate plugin: ${pluginName}`)
                        }

                        plugins[pluginName] = {
                            plugin,
                            name: pluginName,
                            dependencies: pluginMeta.dependencies,
                            // decorators:pluginMeta.decorators,
                            options: pluginOptions
                        }
                    }

                } catch (e) {
                    done(e)
                }
            }

            const loadedPlugins = {}

            function registerPlugin(name, plugin, options) {
                if (loadedPlugins[name]) return

                beanify.register(plugin, options)
                console.log('0000->registerPlugin:',name)
                loadedPlugins[name] = true
            }

            let cyclicDependencyCheck = {}

            function loadPlugin({ plugin, name, dependencies = [], options }) {
                if(cyclicDependencyCheck[name])throw new Error('Cyclic dependency')

                if(dependencies.length){
                    cyclicDependencyCheck[name]==true
                    dependencies.forEach((name)=>plugins[name]&&loadPlugin(plugins[name]))
                }

                registerPlugin(name,plugin,options)
            }

            const keys=Object.keys(plugins)

            console.log({
                plugins
            })

            for(let idx=0;idx<keys.length;idx++){
                cyclicDependencyCheck={}

                try{
                    loadPlugin(plugins[keys[idx]])
                }catch(e){
                    done(e)
                    return
                }
            }

            done()
        })
    })
}, {
    name: 'beanify-autoload'
})