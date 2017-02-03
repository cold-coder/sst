import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isModalShow: false,
    isAlertShow: false,
    isConfirmShow: false
  },
  mutations: {
    TOGGLE_MODAL (state, isShow) {
      state.isModalShow = isShow
    },
    TOGGLE_ALERT (state, isShow) {
      state.isAlertShow = isShow
    },
    TOGGLE_CONFIRM (state, isShow) {
      state.isConfirmShow = isShow
    }
  },
  actions: {
    showModal ({ commit }) {
      commit('TOGGLE_MODAL', true)
    },
    hideModal ({ commit }) {
      commit('TOGGLE_MODAL', false)
    },
    showAlert ({ commit }) {
      commit('TOGGLE_ALERT', true)
    },
    hideAlert ({ commit }) {
      commit('TOGGLE_ALERT', false)
    },
    showConfirm ({ commit }) {
      commit('TOGGLE_CONFIRM', true)
    },
    hideConfirm ({ commit }) {
      commit('TOGGLE_CONFIRM', false)
    }
  },
  getters: {
    isModalShow (state) {
      return state.isModalShow
    },
    isAlertShow (state) {
      return state.isAlertShow
    },
    isConfirmShow (state) {
      return state.isConfirmShow
    },
    shopId () {
      const userInfo = JSON.parse(window.sessionStorage.getItem('sst-userInfo'))
      return userInfo.shop_id
    }
  }
})

export default store
