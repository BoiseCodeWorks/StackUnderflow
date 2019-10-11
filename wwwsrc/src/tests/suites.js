import store from '../store'
import { ValuesSuite } from './values'
import { QuestionsSuite } from "./questions"
import { ResponsesSuite } from "./responses"
import { CategoriesSuite } from "./categories"
import { AuthChecksSuite } from "./authChecks"

export function loadSuites() {
  store.commit("reloadSuites")
  new QuestionsSuite()
  new ResponsesSuite()
  new CategoriesSuite()
  new AuthChecksSuite()
}


