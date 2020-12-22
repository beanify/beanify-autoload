const beanifyPlugin = require('beanify-plugin')

module.exports = beanifyPlugin(
  function (beanify, opts, done) {
    beanify.route({
      url: 'new',
      handler () {}
    })
    done()
  },
  {
    name: 'new',
    prefix: 'newPrifx'
  }
)
