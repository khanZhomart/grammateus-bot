import { Scenes } from "telegraf"
import { groupMenuKeyboard, quizTimelimitKeyboard } from "../services/keyboard.service.js"
import { getCategoryById, getMockCategoryKeyboard } from "../services/mock.service.js"
import { initQuizSession, setQuizCategory, setQuizTimelimit } from "../services/session.service.js"

class QuizSceneGenerator {

    static mainMenuScene() {
        const menu = new Scenes.BaseScene('GROUP_MENU_SCENE')

        menu.enter((ctx) => {
            initQuizSession(ctx)

            return ctx.reply('menu_group', {
                reply_markup: groupMenuKeyboard
            })
        })

        menu.action('do-fucking-quiz', (ctx) => {
            return ctx.scene.enter('DEFINE_QUIZ_CATEGORY_SCENE')
        })

        return menu
    }

    static defineQuizCategory() {
        const quiz = new Scenes.BaseScene('DEFINE_QUIZ_CATEGORY_SCENE')

        quiz.enter((ctx) => {
            return ctx.editMessageText('categ_quiz', {
                reply_markup: getMockCategoryKeyboard()
            })
        })

        quiz.on('callback_query', (ctx) => {
            setQuizCategory(ctx)

            return ctx.scene.enter('DEFINE_QUIZ_TIMELIMIT_SCENE')
        })

        return quiz
    }

    static defineTimelimit() {
        const quiz = new Scenes.BaseScene('DEFINE_QUIZ_TIMELIMIT_SCENE')

        quiz.enter((ctx) => {
            return ctx.editMessageText('time_limit', {
                reply_markup: quizTimelimitKeyboard
            })
        })

        quiz.on('callback_query', (ctx) => {
            setQuizTimelimit(ctx)
            
            return ctx.editMessageText(`<pre>${JSON.stringify(ctx.session.data, null, 2)}</pre>`, {
                parse_mode: 'HTML'
            })
        })

        return quiz
    }
}

export default QuizSceneGenerator