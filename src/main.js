import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Login from './pages/Login.vue'
import Campaign from './pages/Campaign.vue'
import Trade from './pages/Trade.vue'
import Verification from './pages/Verification.vue'
import Queue from './pages/Queue.vue'
import Booking from './pages/Booking.vue'
import Review from './pages/Review.vue'
import dashboard from './pages/dashboard.vue'
import Shop from './pages/Shop.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/login', component: Login
},{
  path: '/business/campaign', component: Campaign
},{
  path: '/business/trade', component: Trade
},{
  path: '/business/verification', component: Verification
},{
  path: '/business/queue', component: Queue
},{
  path: '/business/booking', component: Booking
},{
  path: '/business/review', component: Review
},{
  path: '/dashboard', component: dashboard
},{
  path: '/shop', component: Shop
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
