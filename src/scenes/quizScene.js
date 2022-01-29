import { Scenes } from "telegraf"
import nav from "../composers/navComposer.js"
import { groupMenuKeyboard, quizTimelimitKeyboard } from "../services/keyboard.service.js"
import { getMockCategoryKeyboard } from "../services/mock.service.js"
import { getCurrentQuestion, incrementQuestionIndex, initQuizSession, sendLogs, setQuizCategory, setQuizTimelimit } from "../services/session.service.js"

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

        quiz.use(nav)

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

        quiz.use(nav)

        quiz.on('callback_query', (ctx) => {
            setQuizTimelimit(ctx)
            ctx.deleteMessage()
            return ctx.scene.enter('DO_QUIZ_SCENE')
        })

        return quiz
    }

    static doQuiz() {
        const quiz = new Scenes.BaseScene('DO_QUIZ_SCENE')

        quiz.enter(async (ctx) => {
            const question = getCurrentQuestion(ctx)

            return ctx.replyWithPoll(
                question.content.text,
                question.content.options,
                {
                    id: ctx.session.data.quiz.current.current_question,
                    open_period: ctx.session.data.quiz.time_limit,
                    is_anonymous: false,
                    type: 'quiz',
                    correct_option_id: question.content.answer
                }
                )
        })

        quiz.use(nav)

        quiz.command('next', (ctx) => {
            incrementQuestionIndex(ctx)
            ctx.scene.reenter()
        })

        return quiz
    }
}

export default QuizSceneGenerator