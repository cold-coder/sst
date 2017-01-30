import Vue from 'vue'
import Vuex from 'vuex'
import api from 'api'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isModalShow: false,
    token: null
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
    },
    fetchToken ({ commit }) {
      return axios.post(api.AUTHENTICATE, {
        'app_id': window.settings.oauth2.appid,
        'app_secret': window.settings.oauth2.appsecret
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        }
      }).then(({ data }) => {
        commit('SET_TOKEN', data.token)
      })
    }
  },
  getters: {
    isModalShow (state) {
      return state.isModalShow
    }
  }
})

export default store
