import PrivateChatSceneGenerator from "./privateMenuScene.js";
import QuizSceneGenerator from "./quizScene.js";

export default [
    PrivateChatSceneGenerator.mainMenuScene(),

    QuizSceneGenerator.defineQuizCategoryScene(),
    QuizSceneGenerator.defineQuizDurationScene()
]