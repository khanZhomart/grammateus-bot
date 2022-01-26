import { Scenes } from "telegraf"
import { privateMenuKeyboard } from "../services/keyboard.service.js"

class PrivateChatSceneGenerator {

    static mainMenuScene() {
        const menu = new Scenes.BaseScene('PRIVATE_MENU_SCENE')

        menu.enter((ctx) => {
            return ctx.reply('menu_', {
                reply_markup: privateMenuKeyboard
            })
        })

        menu.action('dicktant', (ctx) => {
            return ctx.reply('poop')
        })

        return menu
    }

    static defineDicktant() {
        
    }
}

export default PrivateChatSceneGenerator