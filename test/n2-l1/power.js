const beanifyPlugin = require('beanify-plugin')

module.exports = beanifyPlugin(function (beanify, opts, done) {
  beanify.route({
    url: 'power',
    handler () {}
  })
  done()
})
