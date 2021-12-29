export function initQuiz(ctx) {
    ctx.session.data = {
        quiz: {
            initiator: ctx.message.from.id,
            settings: {
                category: 0,
                duration: 0
            }
        },
        participants: []
    }
}

export function setQuizCategory(ctx, id) {
    ctx.session.data.quiz.settings.category = id
}

export function setQuizDuration(ctx, duration) {
    ctx.session.data.quiz.settings.duration = duration
}

export function resetParticipantsAnswers(ctx) {
    const list = ctx.session.data.participants
    
    ctx.session.data.participants = list.map(e => {
        e.answered = false
        return e
    })  
}

export function isAlreadyParticipating(ctx) {
    return ctx.session.data.participants.find((p) => p.user_id === ctx.message.from.id)
}

export function joinParticipant(ctx) {
    return ctx.session.data.participants.push({
        user_id: ctx.message.from.id,
        answered: false
    })
}

export function displaySessionContent(ctx) {
    return console.log(ctx.session.data)
}

export function getSession(ctx) {
    return ctx.session.data
}

export function isInitiator(ctx) {
    return ctx.session.data.quiz.initiator === ctx.callbackQuery.from.id
}