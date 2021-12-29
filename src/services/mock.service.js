const questions = [
    {
        category_id: '1',
        questions: [
            {
                question_id: '1',
                content: {
                    text: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old?',
                    answer: 'Yes',
                    options: [
                        'Bruh',
                        'Gachi',
                        'Hz'
                    ]
                }
            },
            {
                question_id: '2',
                content: {
                    text: 'It has roots in a piece of classical years old?',
                    answer: 'Somehow',
                    options: [
                        '1221',
                        'asbdas',
                        'dsadsa'
                    ]
                }
            },
        ] 
    }
]

const categories = [
    {
        name: 'Основы грамматики',
        id: '1'
    },
    {
        name: 'Литература 20-го века',
        id: '2'
    },
]

export function getMockQuestions(category_id) {
    return questions.find((q) => q.category_id === category_id)
}

export function getMockCategories() {
    return categories
}