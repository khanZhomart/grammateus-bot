import PrivateChatSceneGenerator from "./privateMenuScene.js";
import QuizSceneGenerator from "./quizScene.js";

export default [
    PrivateChatSceneGenerator.mainMenuScene(),

    QuizSceneGenerator.mainMenuScene(),
    QuizSceneGenerator.defineQuizCategory(),
    QuizSceneGenerator.defineQuizSubCategory(),
    QuizSceneGenerator.defineTimelimit(),
    QuizSceneGenerator.confirmQuiz(),
    QuizSceneGenerator.doQuiz()
]