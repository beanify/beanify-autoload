module.exports = function (beanify, opts, done) {
  beanify.route({
    url: 'sin',
    handler () {}
  })
  done()
}
