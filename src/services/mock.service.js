const questions = [
  {
    category_id: 0,
    questions: [
      {
        question_id: 0,
        content: {
          text: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old?",
          answer: 2,
          options: ["Bruh", "Gachi", "Yes", "Hz"],
        },
      },
      {
        question_id: 1,
        content: {
          text: "It has roots in a piece of classical years old?",
          answer: 3,
          options: ["1221", "asbdas", "dsadsa", "Somehow"],
        },
      },
      {
        question_id: 2,
        content: {
          text: "Билли... ?",
          answer: 1,
          options: ["Хуйнктон", "Херрингтон", "Хайзенберг", "Амиргалиев"],
        },
      },
    ],
  },
  {
    category_id: 1,
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
  },
  {
    category_id: 2,
    questions: [
      {
        question_id: 0,
        content: {
          text: "Когда гачимучи стал популярным в рунете?",
          answer: 1,
          options: ["2010", "2016", "2012", "2003"],
        },
      },
      {
        question_id: 1,
        content: {
          text: "Заполните строчку гачи песни: ... неуклюже, Dungeone master по лужам",
          answer: 2,
          options: [
            "♂Fisting ass♂",
            "♂Fat cock♂",
            "♂Jabroni♂",
            "♂FUCKING SLAVES♂",
          ],
        },
      },
      {
        question_id: 2,
        content: {
          text: "Натуралы ли гачисты?",
          answer: 2,
          options: ["♂Gays♂", "Of course no", "GAAACHI", "♂FUCK YOU♂"],
        },
      },
      {
        question_id: 3,
        content: {
          text: "CUM?",
          answer: 2,
          options: [
            "♂SWALLOW CUM♂",
            "♂THREE HUNDRED BUCKS♂",
            "*♂SLAP SOUNDS♂*",
            "♂SO FUCKING DEEP♂",
          ],
        },
      },
    ],
  },
];

const categories = [
  {
    name: "Основы грамматики",
    id: 0,
  },
  {
    name: "Литература 20-го века",
    id: 1,
  },
  {
    name: "Восхождение великой культуры Гачи",
    id: 2,
  },
];


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