import Vue from 'vue'
import Vuex from 'vuex'
import { authService, SETUSER } from "./Auth/AuthService"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    suites: []
  },
  mutations: {
    reloadSuites(state) {
      state.suites = []
    },
    addSuite(state, suite) {
      state.suites.push(suite)
    },
    SETUSER(state, user) {
      state.user = user
    }
  },
  actions: {
    init({ commit, dispatch }) {
      authService.subscribe(SETUSER, () => {
        commit(SETUSER, authService.user)
      })
      authService.authenticate()
    }
  }
})
