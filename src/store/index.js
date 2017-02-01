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
    },
    SET_TOKEN (state, token) {
      state.token = token
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
    },
    shopId () {
      const userInfo = JSON.parse(window.sessionStorage.getItem('sst-userInfo'))
      return userInfo.shop_id
    }
  }
})

export default store
