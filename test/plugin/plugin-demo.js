const beanifyPlugin=require("beanify-plugin")
const config=require("./config")

module.exports=beanifyPlugin((beanify,opts,done)=>{
    

    beanify.decorate('test',config)

    console.log("111111111->beanifyPlugin")

    done()
})