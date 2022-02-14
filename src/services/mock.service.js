const questions = [
  {
    category_id: 0,
    title: "Основы грамматики",
    sub_categories: [
      {
        subcategory_id: 0,
        title: "Бессоюзные предложения [1 вопрос]",
        questions: [
          {
            question_id: 0,
            content: {
              text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old?",
              answer: 2,
              options: ["Bruh", "Gachi", "Yes", "Hz"],
            },
          }
        ],
      }
    ]
  },
  {
    category_id: 1,
    title: 'Русская литература 20-го века',
    sub_categories: [
      {
        subcategory_id: 0,
        title: 'Футуризм [7 вопросов]',
        questions: [
          {
            question_id: 0,
            content: {
              text: "Как называется период, в котором представители интеллегенции подверглись массовой репрессии? ",
              answer: 3,
              options: ["Большая депрессия", "Великий кризис", "Великий переполох", "Великий перелом"],
            },
          },
          {
            question_id: 1,
            content: {
              text: "В какие годы наметился Великий перелом?",
              answer: 1,
              options: ["В 20-ые", "В 30-ые", "В 40-ые", "В 50-ые"],
            },
          },
    
          {
            question_id: 2,
            content: {
              text: "Кто не вхводит в список писателей Серебряного века?",
              answer: 2,
              options: ["К.Д.Бальмонт", "А.А.Ахматова", "А.С.Пушкин", "М.И.Цветаева"],
            },
          },
    
          {
            question_id: 3,
            content: {
              text: "Какое течение в русской литературе противостояло символизму?",
              answer: 2,
              options: ["Полиморфизм", "Имажинизм", "Акмеизм", "Футуризм"],
            },
          },
    
          {
            question_id: 4,
            content: {
              text: "Кто из писателей не является представителем Футуризма?",
              answer: 0,
              options: ["Сергей Есенин", "Владимир Маяковский", "Велимир Хлебников", "Игорь Северянин"],
            },
          },
    
          {
            question_id: 5,
            content: {
              text: "Представителем какого направления является Анатолий Мариенгоф?",
              answer: 1,
              options: ["Футуризм", "Имажинизм", "Акмеизм", "Символизм"],
            },
          },
    
          {
            question_id: 6,
            content: {
              text: "Где родился Футуризм?",
              answer: 0,
              options: ["В Италии", "Во Франции", "В Испании", "В Мексике"],
            },
          },
        ],
      }
    ]
  },
  {
    category_id: 2,
    title: "tba",
    sub_categories: [
      {
        subcategory_id: 0,
        title: "tba.tba [1 вопрос]",
        questions: [
          {
            question_id: 0,
            content: {
              text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old?",
              answer: 2,
              options: ["Bruh", "Gachi", "Yes", "Hz"],
            },
          }
        ],
      }
    ]
  },
];


export function getMockQuestions(category_id, subcategory_id) {
    var res = []

    for (var q of questions) {
      if (q.category_id === Number(category_id)) {
        for (var s of q.sub_categories) {
          if (s.subcategory_id === Number(subcategory_id))
            res = s.questions
        }
      }
    }

    return res
}

export function getMockCategories() {
    return categories
}

export const getMockCategoryKeyboard = () => {
    var buttons = []

    questions.forEach((q) => buttons.push([ { text: q.title, callback_data: q.category_id } ]))

    buttons.push([{ text: 'Отменить ❌', callback_data: 'back' }])

    return {
        inline_keyboard: buttons
    }
}

export const getMockSubCategoryKeyboard = (category_id) => {
    var buttons = []

    questions.forEach((q) => {
      if (q.category_id === Number(category_id))
        q.sub_categories.forEach((s) => buttons.push([{ text: s.title, callback_data: s.subcategory_id }]))
    })

    buttons.push([{ text: 'Назад ⬅️', callback_data: 'back' }])

    return {
      inline_keyboard: buttons
    }
}

export const getMockCategoryTitleById = (id) => {
    return questions.filter((q) => q.category_id === Number(id))[0].title
}

export const getMockSubCategoryTitleById = (id) => {
  return questions.filter((q) => {
    return q.sub_categories.filter((s) => s.subcategory_id === Number(id))
  })[0].sub_categories[0].title
}

export const getCategoryById = (categ_id) => {
    return categories.find((c) => c.id === categ_id)
}