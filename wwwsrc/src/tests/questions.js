
import { Test, Suite, TestReport } from "../Test.js"
import store from "../store"

const PATH = "questions"
let testData = {
  title: "TEST__Question",
  body: "WHAT__EVEN__IS__A__JAVASCRIPT"
}

export class QuestionsSuite extends Suite {
  constructor() {
    super("QuestionsController", "", PATH)
    this.addTests(
      new Test(
        "Can Get questions",
        PATH,
        async () => {
          this.questions = await this.get()

          if (!Array.isArray(this.questions)) {
            throw new Error("Invalid data recieved when requesting " + PATH)
          }
          return new TestReport(true, "Able to get questions: " + this.questions.length)
        },
        'GET request. This should get a list of questions.',
        "Question[]"
      ),
      new Test(
        'Can Create a question',
        PATH,
        async () => {
          if (!store.state.auth.user) {
            throw new Error("You are not logged in");
          }
          this.question = await this.create(testData)

          if (this.question.name !== testData.name || !this.question.id) {
            throw new Error("Whoops something failed, unable to create question successfully")
          }
          return new TestReport(true, "Successfully created question " + JSON.stringify(this.question))
        },
        'POST request. This should create a new question in your database.',
        'Question',
        'question object { id, title, body }',
      ),
      new Test(
        'Can Get question by question Id',
        PATH + '/:id',
        async () => {
          let res = await this.getById(this.question.id)
          if (res.id !== this.question.id) {
            throw new Error("Failed to get the correct question when requesting by id")
          }
          return new TestReport(true, "Successfully retrieved question " + JSON.stringify(this.question))
        },
        'GET request. This should get one question by its id.',
        'Question'
      ),
      new Test(
        'Can Edit question by question Id',
        PATH + '/:id',
        async () => {
          this.question.name = "EDITED"
          let res = await this.update(this.question)

          if (res.name != this.question.name) {
            throw new Error("Unable to edit question")
          }

          return new TestReport(true, "Woot able to edit question successfully " + JSON.stringify(this.question))
        },
        'PUT request. This should update one question by its id.',
        'Question'
      ),
      new Test(
        'Can delete question by question Id',
        PATH + '/:id',
        async () => {
          let res = await this.delete(this.question)
          try {
            let getQuestion = await this.getById(this.question.id)
          } catch (e) {
            console.warn("THIS MIGHT OF BEEN EXPECTED", e)
          }
          return new TestReport(true, "Woot able to delete question successfully")
        },
        'DELETE request. This should delete one question by its id.',
        'string'
      )
    )
  }
}