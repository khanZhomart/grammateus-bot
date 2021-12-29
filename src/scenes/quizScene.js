import { Scenes } from "telegraf"
import { displaySessionContent, isAlreadyParticipating, isInitiator, joinParticipant, setQuizCategory, setQuizDuration } from "../services/context.service.js"
import { categoriesKeyboard, durationsKeyboard } from "../services/keyboard.service.js"

class QuizSceneGenerator {
    
    static defineQuizCategoryScene() {
        const quiz = new Scenes.BaseScene('DEFINE_QUIZ_CATEGORY_SCENE')
    
        quiz.enter((ctx) => {
            return ctx.reply('Категория вопросов?', {
                reply_markup: categoriesKeyboard()
            })
        })

        quiz.on('callback_query', (ctx) => {
            setQuizCategory(ctx, ctx.callbackQuery.data)
            
            return ctx.scene.enter('DEFINE_QUIZ_DURATION_SCENE')
        })

        return quiz
    }

    static defineQuizDurationScene() {
        const quiz = new Scenes.BaseScene('DEFINE_QUIZ_DURATION_SCENE')

        quiz.enter((ctx) => {
            return ctx.editMessageText('Сколько времени даётся на выбор ответа?', {
                reply_markup: durationsKeyboard
            })
        })

        quiz.on('callback_query', (ctx) => {
            setQuizDuration(ctx, ctx.callbackQuery.data)
        })

        return quiz
    }
}

export default QuizSceneGenerator