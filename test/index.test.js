const Beanify = require('beanify')

const tap = require('tap')
const path = require('path')

const beanifyOpts = {
  nats: {

  }
}

tap.test('beanify-autoload test', (t) => {
  t.plan(4)

  const b = new Beanify(beanifyOpts)
  b.register(require('../index'), {
    dir: path.join(__dirname, 'plugin')
  }).ready((err) => {
    // console.log(b.$plugins)
    t.error(err)
    t.strictSame(b.test, {
      value: 30,
      str: 'this is string'
    }, 'check beanify.test')

    b.inject({
      url: 'math.add',
      body: {
        a: 1,
        b: 3
      }
    }, (err, res) => {
      t.error(err)
      t.equal(res, 4, 'check res')
      b.close()
    })
  })
})
