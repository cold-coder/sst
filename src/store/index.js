import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isModalShow: false
  },
  mutations: {
    TOGGLE_MODAL (state, isShow) {
      state.isModalShow = isShow
    }
  },
  actions: {
    showModal ({ commit }) {
      commit('TOGGLE_MODAL', true)
    },
    hideModal ({ commit }) {
      commit('TOGGLE_MODAL', false)
    }
  },
  getters: {
    isModalShow (state) {
      return state.isModalShow
    }
  }
})

export default store
