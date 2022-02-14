export const privateMenuKeyboard = {
    inline_keyboard: [
        [{ text: 'Диктант', callback_data: 'dicktant' }]
    ]
}

export const groupMenuKeyboard = {
    inline_keyboard: [
        [{ text: 'Викторина', callback_data: 'do-fucking-quiz' }]
    ]
}

export const quizTimelimitKeyboard = {
    inline_keyboard: [
        [{ text: '15 секунд', callback_data: 15 }],
        [{ text: '30 секунд', callback_data: 30 }],
        [{ text: '45 секунд', callback_data: 45 }],
        [{ text: '60 секунд', callback_data: 60 }],
        [{ text: 'Назад ⬅️', callback_data: 'back' }]
    ]
}

export const quizConfirmationKeyboard = {
    inline_keyboard: [
        [{ text: 'Подтверждаю ✅', callback_data: 'ready' }],
        [{ text: 'Назад ⬅️', callback_data: 'back' }]
    ]
}