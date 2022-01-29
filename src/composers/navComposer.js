import { Composer } from "telegraf";

const nav = new Composer()

nav.command('menu', (ctx) => {
    
})

nav.on('yes', (ctx) => {
    ctx.deleteMessage()
    return ctx.scene.leave()
})

nav.on('no', (ctx) => {
    return ctx.scene.reenter()
})

export default nav