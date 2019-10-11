import Vue from 'vue'
import Vuex from 'vuex'
import auth from "./stores/auth"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    suites: []
  },
  modules: {
    auth
  },
  mutations: {
    reloadSuites(state) {
      state.suites = []
    },
    addSuite(state, suite) {
      state.suites.push(suite)
    }

  },
  actions: {
  }
})
