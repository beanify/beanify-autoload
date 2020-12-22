// const other = require('./other')

module.exports = function (beanify, opts, done) {
  beanify.route({
    url: 'math.root',
    handler () {}
  })
  // beanify.register(other)
  done()
}
