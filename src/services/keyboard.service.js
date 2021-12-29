import { getMockCategories } from "./mock.service.js"

export const privateChatMenuKeyboard = {
    inline_keyboard: [
        [{ text: 'Диктант', callback_data: 'dic' }],
        [{ text: 'Викторина с группой', callback_data: 'quiz-group' }]
    ]
}

export const categoriesKeyboard = () => {
    var buttons = []

    getMockCategories().forEach(c => buttons.push([{ text: c.name, callback_data: c.id }]))

    return {
        inline_keyboard: buttons
    }
}

export const durationsKeyboard = {
    inline_keyboard: [
        [{ text: '5 секунд', callback_data: 5 }],
        [{ text: '15 секунд', callback_data: 15 }],
        [{ text: '30 секунд', callback_data: 30 }],
        [{ text: '45 секунд', callback_data: 45 }],
    ]
}