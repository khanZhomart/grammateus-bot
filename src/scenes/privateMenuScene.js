import { Scenes } from "telegraf"
import { privateChatMenuKeyboard } from "../services/keyboard.service.js"

class PrivateChatSceneGenerator {

    static mainMenuScene() {
        const menu = new Scenes.BaseScene('PRIVATE_MENU_SCENE')

        menu.enter((ctx) => {
            return ctx.reply('Выберите действие', {
                reply_markup: privateChatMenuKeyboard
            })
        })

        menu.action('dic', (ctx) => {
            return ctx.reply(ctx.callbackQuery.data)
        })

        menu.action('quiz-group', (ctx) => {
            return 
        })

        return menu
    }
}

export default PrivateChatSceneGenerator