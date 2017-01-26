import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './pages/Login.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/login', component: Login
}]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
// .$mount('#app')
