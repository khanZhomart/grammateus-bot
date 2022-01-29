
const questions = [
    {
        category_id: 0,
        questions: [
            {
                question_id: 0,
                content: {
                    text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old?',
                    answer: 2,
                    options: [
                        'Bruh',
                        'Gachi',
                        'Yes',
                        'Hz'
                    ]
                }
            },
            {
                question_id: 1,
                content: {
                    text: 'It has roots in a piece of classical years old?',
                    answer: 3,
                    options: [
                        '1221',
                        'asbdas',
                        'dsadsa',
                        'Somehow'
                    ]
                }
            },
            {
                question_id: 2,
                content: {
                    text: 'Билли... ?',
                    answer: 1,
                    options: [
                        'Хуйнктон',
                        'Херрингтон',
                        'Хайзенберг',
                        'Амиргалиев'
                    ]
                }
            },
        ] 
    }
]

const categories = [
    {
        name: 'Основы грамматики',
        id: 0
    },
    {
        name: 'Литература 20-го века',
        id: 1
    },
    {
        name: 'Восхождение великой культуры Гачи',
        id: 2
    }
]

export function getMockQuestions(category_id) {
    for (var q of questions)
        if (q.category_id === Number(category_id)) 
            return q
}

export function getMockCategories() {
    return categories
}

export const getMockCategoryKeyboard = () => {
    var buttons = []

    categories.forEach((c) => buttons.push([{ text: c.name, callback_data: c.id }]))

    return {
        inline_keyboard: buttons
    }
}

export const getCategoryById = (categ_id) => {
    return categories.find((c) => c.id === categ_id)
}