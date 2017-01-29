import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login.vue'
import Campaign from '../pages/Campaign.vue'
import Trade from '../pages/Trade.vue'
import Verification from '../pages/Verification.vue'
import Queue from '../pages/Queue.vue'
import Booking from '../pages/Booking.vue'
import Review from '../pages/Review.vue'
import dashboard from '../pages/dashboard.vue'
import Shop from '../pages/Shop.vue'
import Demo from '../pages/Demo.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/login', component: Login
  }, {
    path: '/business/campaign', component: Campaign
  }, {
    path: '/business/trade', component: Trade
  }, {
    path: '/business/verification', component: Verification
  }, {
    path: '/business/queue', component: Queue
  }, {
    path: '/business/booking', component: Booking
  }, {
    path: '/business/review', component: Review
  }, {
    path: '/dashboard', component: dashboard
  }, {
    path: '/shop', component: Shop
  }, {
    path: '/demo', component: Demo
  }]
})
