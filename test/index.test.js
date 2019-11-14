const Beanify = require("beanify")

const tap = require("tap")
const path = require("path")


const beanifyOpts = {
    nats: {

    }
}

tap.test('beanify-autoload test', (t) => {

    t.plan(2)

    const b = new Beanify(beanifyOpts)
    b.register(require("../index"), {
        dir: path.join(__dirname, "plugin")
    }).ready((err) => {
        t.error(err)
        t.strictSame(b.test, {
            value: 30,
            str: 'this is string'
        }, 'check beanify.test')
        console.log(b.$plugins)
        b.close()
    })

})
