
import { Test, Suite, TestReport } from "../Test.js"
import { api } from "../utils.js"

const PATH = "responses"
let testData = {
  body: "THAT WAS A NEAT QUESTION"
}

export class ResponsesSuite extends Suite {
  constructor() {
    super("ResponsesController", "", PATH)
    this.addTests(
      new Test(
        'Can Create a response',
        PATH,
        async () => {
          let res = await api.post('questions', {
            body: "TEST__QUESTION__RESPONSE",
          })
          this.question = res.data

          testData.productId = res.data.id

          this.response = await this.create(testData)

          if (this.response.name !== testData.name || !this.response.id) {
            throw new Error("Whoops something failed, unable to create response successfully")
          }
          return new TestReport(true, "Successfully created response " + JSON.stringify(this.response))
        },
        'POST request. This should create a new response in your database.',
        'Response',
        'response object { id, body, questionId }',
      ),
      new Test(
        'Can Edit response by response Id',
        PATH + '/:id',
        async () => {
          this.response.name = "EDITED"
          let res = await this.update(this.response)

          if (res.name != this.response.name) {
            throw new Error("Unable to edit response")
          }

          return new TestReport(true, "Woot able to edit response successfully " + JSON.stringify(this.response))
        },
        'PUT request. This should update one response by its id.',
        'Response',
      ),
      new Test(
        "Get Responses for Question",
        "questions/:id/responses",
        async () => {
          let res = await api.get("questions/" + this.question.id + "/responses")
          let responses = res.data
          if (!Array.isArray(responses)) {
            throw new Error("Unable to get question responses")
          }
          return new TestReport(responses.length > 0, JSON.stringify(responses))
        },
        "Take note of the path this is calling to the QuestionsController",
        "response[]"
      )
    )
  }
}