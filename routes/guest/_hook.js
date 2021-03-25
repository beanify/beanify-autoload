module.exports = async function (beanify, opts) {
  beanify.addHook('onBeforeHandler', function (req, rep) {
    console.log('onBeforeHandler')
  })
}
