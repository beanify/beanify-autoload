# beanify-autoload

## install

```
npm i beanify-autoload
```

## options

* ```dir```:
* ```options```:If you want to pass some custom options to the registered plugins via fastify-autoload, use the ```options``` key
* ```ignorePattern```:If you have some files in the folder that you'd like autoload to skip you can set ```ignorePattern``` option to a regex. If that matches a file it will not load it.
* ```includeTypeScript```:If you are using TypeScript and something like ts-node to load the .ts files directly you can set ```includeTypeScript``` option to true. This will load plugins from .ts files as well as .js files.

## usage 

```
const Beanify=require("beanify")
const beanifyPlugin=require("beanify-plugin")
const path=require("path")

const b=new Beanify({})

b
    .register(require("beanify-autoload"),{
        dir:path.join(__dirname, 'foo')
    })
    .ready((err)=>{

        b.close()
    })


```