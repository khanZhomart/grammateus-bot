import { Scenes, session, Telegraf } from "telegraf"
import dotenv from 'dotenv'
import scenes from "./src/scenes/scenes.js"
import basicAction from "./src/composers/basic.composer.js"

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)
const stage = new Scenes.Stage(scenes)

bot.catch((e) => console.log('Something gone wrong...', e))
bot.use(session())
bot.use(stage.middleware())

bot.use(basicAction)

bot.launch({ dropPendingUpdates: true })