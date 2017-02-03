import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
require('./misc/ajax.js')
require('./misc/toast.js')

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
// .$mount('#app')
