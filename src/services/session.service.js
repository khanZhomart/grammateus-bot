import { getMockQuestions } from "./mock.service.js"

export function initQuizSession(ctx) {
    return ctx.session.data = {
        quiz: {
            categ_id: -1,
            time_limit: -1,
            current: {
                questions: [],
                current_question: 0
            }
        }
    }
}

export function setQuizCategory(ctx) {
    ctx.session.data.quiz.current.questions = getMockQuestions(ctx.callbackQuery.data)
    return ctx.session.data.quiz.categ_id = ctx.callbackQuery.data
}

export function setQuizTimelimit(ctx) {
    return ctx.session.data.quiz.time_limit = ctx.callbackQuery.data
}

export function incrementQuestionIndex(ctx) {
    return ++ctx.session.data.quiz.current.current_question
}

export function isQuizEnded(ctx) {
    return ctx.session.data.quiz.current.current_question === 
    ctx.session.data.quiz.current.questions.questions.length
}

export function sendLogs(ctx) {
    return ctx.reply(`<pre>${JSON.stringify(ctx.session.data, null, 2)}</pre>`, {
        parse_mode: 'HTML'
    })
}

export function getCurrentQuestion(ctx) {

    return ctx.session.data
        .quiz
        .current
        .questions
        .questions[ctx.session.data.quiz.current.current_question]
}