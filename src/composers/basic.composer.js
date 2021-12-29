import { Composer } from "telegraf";
import { getSession, displaySessionContent, initQuiz, joinParticipant, isAlreadyParticipating } from "../services/context.service.js";

const basicAction = new Composer()

basicAction.command('start', (ctx) => {
    if (ctx.message.chat.type === 'group')
        return

    return ctx.scene.enter('PRIVATE_MENU_SCENE')
})

basicAction.command('init', (ctx) => {
    if (ctx.message.chat.type === 'private')
        return

    initQuiz(ctx)
    
    return ctx.scene.enter('DEFINE_QUIZ_CATEGORY_SCENE')
})

basicAction.command('/cmd', (ctx) => {
    displaySessionContent(ctx)

    if (getSession(ctx))
        return ctx.replyWithHTML(`<pre>${JSON.stringify(getSession(ctx)).replace(/,/g, ', \n')}</pre>`)
    else
        return ctx.reply('{}')
})

export default basicAction