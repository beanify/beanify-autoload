module.exports = function (beanify, opts, done) {
  beanify.route({
    url: 'sub',
    handler () {}
  })
  done()
}
