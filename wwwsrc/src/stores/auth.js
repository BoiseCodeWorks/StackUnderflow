import { auth } from '../utils'

export default {
  state: {
    user: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    }
  },
  actions: {
    register({ commit, dispatch }, payload) {
      auth.post('register', payload)
        .then(res => {
          commit('setUser', payload)
          dispatch('logout')
        })
        .catch(err => { console.error(err) })
    },
    logout({ commit, dispatch }) {
      auth.delete('logout')
        .then(res => {
          dispatch('login', null)
        })
        .catch(err => { console.error(err) })
    },
    removeUser({ commit }) {
      commit('setUser', {})
    },

    login({ commit, dispatch, state }, user) {
      if (!user) {
        user = state.user
      }
      auth.post('login', user)
        .then(res => {
          commit('setAuthState', 'canLogin')
          commit("setUser", res.data)
          user = res.data
          dispatch('authenticate')
        })
        .catch(err => { console.error(err) })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
        })
        .catch(err => { console.error(err) })
    }
  }
}