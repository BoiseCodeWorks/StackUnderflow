import { Test, Suite, TestReport } from "../Test.js"
import { api } from "../utils.js"

const PATH = "categories"
let testData = {
  name: "MY__COOL__THINGS",
}

export class CategoriesSuite extends Suite {
  constructor() {
    super("CategoriesController", "", PATH)
    this.addTests(
      new Test(
        'Can Create a category',
        PATH,
        async () => {
          this.category = await this.create(testData)

          if (this.category.name !== testData.name || !this.category.id) {
            throw new Error("Whoops something failed, unable to create category successfully")
          }
          return new TestReport(true, "Successfully created category " + JSON.stringify(this.category))
        },
        'POST request. This should create a new category in your database.',
        'Category',
        'category object {id: string, name: string}',
      ),
      new Test(
        'Can Edit category by category Id',
        PATH + '/:id',
        async () => {
          this.category.name = "EDITED"
          let res = await this.update(this.category)

          if (res.name != this.category.name) {
            throw new Error("Unable to edit category correctly")
          }

          return new TestReport(true, "Woot able to edit category successfully " + JSON.stringify(this.category))
        },
        'PUT request. This should update one category by its id.',
        'Category',
        "{id: string, name: string}"
      ),
      new Test(
        "Add Category to Question",
        "Questions/:id/categories",
        async () => {

          let qres = await api.post('questions', { title: "a new question", description: "some question goes here" })

          this.question = qres.data

          let res = await api.put("questions/" + this.question.id + "/categories", { categoryId: this.category.id, action: "add" })

          if (res.data) {
            return new TestReport(true, JSON.stringify(this.category))
          }
          return new TestReport(false, JSON.stringify(this.category))
        },
        "PUT Request: should add a category to a question",
        "bool",
        "{ categoryId: string, action: add | remove }"
      ),
      new Test(
        "Can't Edit category once added to a question",
        PATH + '/:id',
        async () => {
          this.category.name = "THIS SHOULD HAVE FAILED"
          try {
            let res = await this.update(this.category)
          } catch (e) {
            if (!e.response) { throw e }
            return new TestReport(true, "Categories can't be edited after added to a question")
          }
          throw new Error("category edited after attached to question")
        },
        'PUT request. This update should fail.',
        'Error'
      ),
      new Test(
        "Can't Delete category once added to a question",
        PATH + '/:id',
        async () => {
          this.category.name = "THIS SHOULD HAVE FAILED"
          try {
            let res = await this.delete(this.category)
          } catch (e) {
            if (!e.response) { throw e }
            return new TestReport(true, "Categories can't be deleted after added to a question")
          }
          throw new Error("category edited after attached to question")
        },
        'PUT request. This update should fail.',
        'Error'
      )
    )
  }
}
