const Beanify = require('beanify')
const Autoload = require('./index')

const path = require('path')

const beanify = Beanify({
  pino: {
    level: 'info',
    prettyPrint: true
  }
})

beanify
  .register(Autoload, {
    dir: path.join(__dirname, 'routes'),
    dirAsScope: true
  })
  .ready(e => {
    console.log(e && e.message)
    beanify.inject({
      url: 'guest.ttttt',
      handler (err, res) {
        console.log({ err, res })
      }
    })
    beanify.print()
  })
