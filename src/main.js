import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

console.log(store.dispatch('fetchToken'))

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
// .$mount('#app')
