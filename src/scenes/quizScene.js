import { Scenes } from "telegraf"
import nav from "../composers/navComposer.js"
import { groupMenuKeyboard, quizTimelimitKeyboard } from "../services/keyboard.service.js"
import { getMockCategoryKeyboard } from "../services/mock.service.js"
import { getCurrentQuestion, incrementQuestionIndex, initQuizSession, isQuizEnded, sendLogs, setQuizCategory, setQuizTimelimit } from "../services/session.service.js"

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
            ctx.deleteMessage()

            return ctx.scene.enter('DO_QUIZ_SCENE')
        })

        return quiz
    }

    static doQuiz() {
        const quiz = new Scenes.BaseScene('DO_QUIZ_SCENE')
        const members = []

        quiz.enter(async (ctx) => {
            if (isQuizEnded(ctx)) {
                ctx.reply('битти зайбалсындар')
                return ctx.scene.leave()
            }

            const question = getCurrentQuestion(ctx)

            ctx.replyWithPoll(
                `[${1 + ctx.session.data.quiz.current.current_question}/${ctx.session.data.quiz.current.questions.questions.length}]\n\n` + question.content.text,
                question.content.options,
                {
                    id: ctx.session.data.quiz.current.current_question,
                    open_period: ctx.session.data.quiz.time_limit,
                    is_anonymous: false,
                    type: 'quiz',
                    correct_option_id: question.content.answer
                }
                )

                setTimeout(() => {
                    incrementQuestionIndex(ctx);
                    ctx.scene.reenter();
                }, (ctx.session.data.quiz.time_limit * 1000));
        })

        quiz.command('next', (ctx) => {
            incrementQuestionIndex(ctx)
            ctx.scene.reenter()
        })

        // quiz.action('next-question', (ctx) => {
        //     incrementQuestionIndex(ctx);
        //     ctx.scene.reenter();
        // })

        return quiz
    }
}

export default QuizSceneGenerator