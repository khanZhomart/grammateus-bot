import { Scenes } from "telegraf"
import nav from "../composers/navComposer.js"
import { removeChat } from "../database/db.js"
import { groupMenuKeyboard, quizConfirmationKeyboard, quizTimelimitKeyboard } from "../services/keyboard.service.js"
import { getMockCategoryKeyboard, getMockSubCategoryKeyboard } from "../services/mock.service.js"
import { buildAndSendQuiz, incrementQuestionIndex, initQuizSession, isQuizEnded, setAutoTransition, setQuizCategory, setQuizSubCategory, setQuizTimelimit, stopAutoTransition } from "../services/session.service.js"

class QuizSceneGenerator {

    static mainMenuScene() {
        const menu = new Scenes.BaseScene('GROUP_MENU_SCENE')

        menu.enter((ctx) => {
            initQuizSession(ctx)

            return ctx.reply('Выберите действие', {
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

        quiz.action('back', async (ctx) => {
            ctx.deleteMessage()
            removeChat(ctx.chat.id)
            return ctx.scene.enter('GROUP_MENU_SCENE')
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
            return ctx.editMessageText(
                `*${ctx.session.data.quiz.category.title} /*\n\nУкажите подкатегорию`,
                {
                    reply_markup: getMockSubCategoryKeyboard(ctx.session.data.quiz.category.id),
                    parse_mode: 'Markdown'
                }
            )
        })
        
        quiz.action('back', (ctx) => {
            return ctx.scene.enter('DEFINE_QUIZ_CATEGORY_SCENE')
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
            return ctx.editMessageText(
                `*${ctx.session.data.quiz.category.title} /\n${ctx.session.data.quiz.subcategory.title} /*\n\nВыберите время, которое будет выдаватся для ответа на вопрос`, 
                {
                    reply_markup: quizTimelimitKeyboard,
                    parse_mode: 'Markdown'
                }
            )
        })

        quiz.action('back', (ctx) => {
            return ctx.scene.enter('DEFINE_QUIZ_SUBCATEGORY_SCENE')
        })

        quiz.on('callback_query', (ctx) => {
            setQuizTimelimit(ctx)
            return ctx.scene.enter('CONFIRMATION_QUIZ_SCENE')
        })

        return quiz
    }

    static confirmQuiz() {
        const quiz = new Scenes.BaseScene('CONFIRMATION_QUIZ_SCENE')

        quiz.enter((ctx) => {
            return ctx.editMessageText(
                `*${ctx.session.data.quiz.category.title}* /\n*${ctx.session.data.quiz.subcategory.title}* /\n${ctx.session.data.quiz.time_limit} секунд на ответ\n\nНачинаем?`,
                {
                    reply_markup: quizConfirmationKeyboard,
                    parse_mode: 'Markdown'
                }
            )
        })

        quiz.action('cancel', (ctx) => {
            clearInterval(ctx.session.data.quiz.timer.interval_id)
            clearTimeout(ctx.session.data.quiz.timer.timeout_id)
            ctx.session.data.quiz.timer.timer_start = 10
            return ctx.scene.reenter()
        })

        quiz.action('ready', async (ctx) => {
            ctx.session.data.quiz.timer.interval_id = setInterval(() => {
                console.log('###')
                if (ctx.session.data.quiz.timer.timer_start !== 0) {
                    ctx.editMessageText(`Принято, начнём через: *${ctx.session.data.quiz.timer.timer_start}* ⏱️`,
                        {   
                            reply_markup: {
                                inline_keyboard: [
                                    [{ text: 'Отменить ❌', callback_data: 'cancel' }]
                                ]
                            },
                            parse_mode: 'Markdown'
                        }
                    )
                    --ctx.session.data.quiz.timer.timer_start
                }
            }, 1900)

            ctx.session.data.quiz.timer.timeout_id = setTimeout(() => {
                clearInterval(ctx.session.data.quiz.timer.interval_id)
                ctx.deleteMessage()
                ctx.scene.enter('DO_QUIZ_SCENE')
            }, 21000)
        })

        quiz.action('back', (ctx) => {
            return ctx.scene.enter('DEFINE_QUIZ_TIMELIMIT_SCENE')
        })

        return quiz
    }

    static doQuiz() {
        const quiz = new Scenes.BaseScene('DO_QUIZ_SCENE')
        const members = []

        quiz.enter(async (ctx) => {
            if (isQuizEnded(ctx)) {
                ctx.reply('Квиз окончен!')
                removeChat(ctx.message.chat.id)
                console.log('db cleared')
                return ctx.scene.leave()
            }

            const res = await buildAndSendQuiz(ctx)

            const timer_id = setTimeout(() => {
                incrementQuestionIndex(ctx);
                ctx.scene.reenter();
            }, (ctx.session.data.quiz.time_limit * 1000));

            return setAutoTransition(ctx, timer_id)
        })

        quiz.command('quit', (ctx) => {
            ctx.reply('Викторина приостановлена. ❌')
            removeChat(ctx.message.from)
            return ctx.scene.leave()
        })

        quiz.command('next', (ctx) => {
            incrementQuestionIndex(ctx)
            stopAutoTransition(ctx)
            ctx.scene.reenter()
        })

        return quiz
    }
}

export default QuizSceneGenerator