import Vue from 'vue'
import Router from 'vue-router'
import AuthRoutes from "./Auth/AuthRouter"
import Home from './views/Home.vue'
import Question from './views/Question.vue'
import Tests from './views/Tests.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    AuthRoutes,
    {
      path: '/question/:id',
      name: 'question',
      component: Question
    },
    {
      path: '/tests',
      name: 'tests',
      component: Tests
    },
    {
      redirect: "*",
      path: "/"
    }
  ]
})
