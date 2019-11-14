const beanifyPlugin = require("beanify-plugin")

module.exports = beanifyPlugin((beanify, opts, done) => {


    beanify.route({
        url: 'math.sub'
    }, ({ body }, res) => {
        res(null, body.a - body.b)
    })

    done()
})