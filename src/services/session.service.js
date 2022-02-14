import { getMockCategoryTitleById, getMockQuestions, getMockSubCategoryTitleById } from "./mock.service.js"

export function initQuizSession(ctx) {
    return ctx.session.data = {
        quiz: {
            category: {
                id: -1,
                title: ''
            },
            subcategory: {
                id: -1,
                title: ''
            },
            time_limit: -1,
            current: {
                questions: [],
                current_question: 0
            },
            timer: {
                timer_start: 10,
                timer_id: -1,
                interval_id: -1,
                timeout_id: -1
            }
        }
    }
}

export function setQuizCategory(ctx) {
    ctx.session.data.quiz.category.title = getMockCategoryTitleById(ctx.callbackQuery.data)
    return ctx.session.data.quiz.category.id = ctx.callbackQuery.data
}

export function setQuizSubCategory(ctx) {
    ctx.session.data.quiz.current.questions = getMockQuestions(ctx.session.data.quiz.category.id, ctx.callbackQuery.data)
    ctx.session.data.quiz.subcategory.title = getMockSubCategoryTitleById(ctx.callbackQuery.data)
    return ctx.session.data.quiz.subcategory.id = ctx.callbackQuery.data
}

export function setQuizTimelimit(ctx) {
    return ctx.session.data.quiz.time_limit = ctx.callbackQuery.data
}

export function incrementQuestionIndex(ctx) {
    return ++ctx.session.data.quiz.current.current_question
}

export function setAutoTransition(ctx, id) {
    return ctx.session.data.quiz.timer.timer_id = id 
}

export function stopAutoTransition(ctx) {
    return clearTimeout(ctx.session.data.quiz.timer.timer_id)
}

export function isQuizEnded(ctx) {
    return ctx.session.data.quiz.current.current_question === 
    ctx.session.data.quiz.current.questions.length
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
        .questions[ctx.session.data.quiz.current.current_question]
}

export function buildAndSendQuiz(ctx) {
    const question = getCurrentQuestion(ctx)

    return ctx.replyWithPoll(
        `[${1 + ctx.session.data.quiz.current.current_question}/${ctx.session.data.quiz.current.questions.length}]\n\n` + question.content.text,
        question.content.options,
        {
            id: ctx.session.data.quiz.current.current_question,
            open_period: ctx.session.data.quiz.time_limit,
            is_anonymous: false,
            type: 'quiz',
            correct_option_id: question.content.answer
        }
        )
}