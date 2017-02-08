import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as filters from './misc/filter.js'
require('./misc/toast.js')
require('./misc/ajax.js')
// require('./misc/sst.js')
const infiniteScroll = require('vue-infinite-scroll')
Vue.use(infiniteScroll)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
// .$mount('#app')
