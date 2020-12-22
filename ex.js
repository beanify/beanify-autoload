const Beanify = require('beanify')
const path = require('path')
const Autoload = require('./index')
const beanify = Beanify({})

beanify
  .register(Autoload, {
    dir: path.join(__dirname, 'test')
    // dirAsScope: false
    // name: 'aaa'
    // prefix: 'bbb'
  })
  .ready(e => {
    console.log(e && e.message)
    beanify.print()
  })
