import { Scenes, session, Telegraf } from "telegraf"
import dotenv from 'dotenv'
import scenes from "./src/scenes/scenes.js"

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Scenes.Stage(scenes)

bot.catch((e) => console.log('Something gone wrong...', e))
bot.use(session())
bot.use(stage.middleware())

bot.command('start', (ctx) => {
    if (ctx.message.chat.type !== 'private')
        return

    return ctx.scene.enter('PRIVATE_MENU_SCENE')
})

bot.command('menu', (ctx) => {
    if (ctx.message.chat.type === 'private')
        return

    return ctx.scene.enter('GROUP_MENU_SCENE')
})

bot.on('poll_answer', (ctx) => {
    return console.log(ctx.pollAnswer)
})

bot.launch({ dropPendingUpdates: true })

export default bot