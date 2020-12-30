const Beanify = require('beanify')
const Autoload = require('./index')

const path = require('path')

const beanify = Beanify({})

beanify
  .register(Autoload, {
    dir: path.join(__dirname, 'routes'),
    dirAsScope: true
  })
  .ready(e => {
    console.log(e && e.message)
    beanify.print()
  })
