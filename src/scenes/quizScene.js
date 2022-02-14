import { Scenes } from "telegraf"
import nav from "../composers/navComposer.js"
import { groupMenuKeyboard, quizTimelimitKeyboard } from "../services/keyboard.service.js"
import { getMockCategoryKeyboard, getMockSubCategoryKeyboard } from "../services/mock.service.js"
import { buildAndSendQuiz, incrementQuestionIndex, initQuizSession, isQuizEnded, setQuizCategory, setQuizSubCategory, setQuizTimelimit } from "../services/session.service.js"

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
            return ctx.editMessageText('Выберите категорию', {
                reply_markup: getMockCategoryKeyboard()
            })
        })

        quiz.on('callback_query', (ctx) => {
            setQuizCategory(ctx)

            return ctx.scene.enter('DEFINE_QUIZ_SUBCATEGORY_SCENE')
        })

        return quiz
    }

    static defineQuizSubCategory() {
        const quiz = new Scenes.BaseScene('DEFINE_QUIZ_SUBCATEGORY_SCENE')

        quiz.enter((ctx) => {
            return ctx.editMessageText(`*${ctx.session.data.quiz.category.title} /*\n\nУкажите подкатегорию`,
                {
                    reply_markup: getMockSubCategoryKeyboard(ctx.session.data.quiz.category.id),
                    parse_mode: 'Markdown'
                }
            )
        })

        quiz.on('callback_query', (ctx) => {
            setQuizSubCategory(ctx)

            return ctx.scene.enter('DEFINE_QUIZ_TIMELIMIT_SCENE')
        })

        return quiz
    }

    static defineTimelimit() {
        const quiz = new Scenes.BaseScene('DEFINE_QUIZ_TIMELIMIT_SCENE')

        quiz.enter((ctx) => {
            console.log(ctx.session.data.quiz.subcategory.title)
            return ctx.editMessageText(`*${ctx.session.data.quiz.category.title} /\n${ctx.session.data.quiz.subcategory.title} /*\n\nВыберите время, которое будет выдаватся для ответа на вопрос`, {
                reply_markup: quizTimelimitKeyboard,
                parse_mode: 'Markdown'
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

        quiz.enter(async (ctx) => {
            if (isQuizEnded(ctx)) {
                ctx.reply('Квиз окончен!')
                return ctx.scene.leave()
            }

            const res = await buildAndSendQuiz(ctx)

            setTimeout(() => {
                incrementQuestionIndex(ctx);
                ctx.scene.reenter();
            }, (ctx.session.data.quiz.time_limit * 1000));
        })

        quiz.command('next', (ctx) => {
            incrementQuestionIndex(ctx)
            ctx.scene.reenter()
        })

        return quiz
    }
}

export default QuizSceneGenerator