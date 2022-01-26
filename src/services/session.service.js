export function initQuizSession(ctx) {
    return ctx.session.data = {
        quiz: {
            categ_id: Number,
            time_limit: Number
        }
    }
}

export function setQuizCategory(ctx) {
    return ctx.session.data.quiz.categ_id = ctx.callbackQuery.data
}

export function setQuizTimelimit(ctx) {
    return ctx.session.data.quiz.time_limit = ctx.callbackQuery.data
}