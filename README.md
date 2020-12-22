# beanify-autoload

Convenience plugin for Beanify that loads all plugins found in a directory

## Install

```bash
npm i beanify-autoload --save
```

with yarn

```bash
yarn add beanify-autoload
```

## Usage

```javascript
const Beanify = require('beanify')
const Autoload = require('beanify-autoload')

const path = require('path')

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
```

## Options

- `dir`: (required) - Base directory containing plugins to be loaded
- `dirAsScope`: Make each directory a new scope.default true
- `ignorePattern`: Regex matching any file that should not be loaded
- `indexPattern`: Regex to override the `index.js` naming convention
- `maxDepth`: Limits the depth at which nested plugins are loaded
