
import { Test, Suite, TestReport } from "../Test.js"
import { api, auth } from "../utils.js"

let newUserData = {
  username: "JIMMY___TESTER",
  email: "JIMMY@TESTER.COM",
  password: "1_RANDOMSTRINGOFCHARACTERs"
}

export class AuthChecksSuite extends Suite {
  constructor() {
    super("AuthCheck", "", "")
    this.addTests(
      new Test(
        "Only the author of a question can edit/delete the question",
        "questions/:id",
        async () => {
          let res = await api.post('questions', {
            title: "An uneditable Question",
            body: "TEST__QUESTION__AUTHOR"
          })
          this.question = res.data

          try {
            let r = await auth.post("register", newUserData)
            this.newUser = r.data
          } catch (e) {
            let r = await auth.post("login", newUserData)
            this.newUser = r.data
          } finally {
            try {
              this.response = await this.update(this.question)
            } catch (e) {
              return new TestReport(true, "Unable to edit question with bad user")
            }
          }
        },
        'This request should fail',
        'Error'
      )
    )
  }
}