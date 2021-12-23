import { Telegraf } from "telegraf"
import dotenv from 'dotenv'

dotenv.config()

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.catch((e) => console.log('Something gone wrong...', e))

bot.start((ctx) => {
    
})

bot.launch({ dropPendingUpdates: true })