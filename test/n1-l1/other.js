module.exports = function (beanify, opts, done) {
  beanify.route({
    url: 'math.other',
    handler () {}
  })
  done()
}
