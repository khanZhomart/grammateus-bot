import axios from "axios"

class QuizApi {

    async loadAllCategories() {
        await axios.get(``)
    }
}

export default new QuizApi()