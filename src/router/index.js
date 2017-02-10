import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/Login.vue'
import Campaign from '../pages/Campaign.vue'
import CampaignDetail from '../pages/CampaignDetail.vue'
import Trade from '../pages/Trade.vue'
import Verification from '../pages/Verification.vue'
import Queue from '../pages/Queue.vue'
import Booking from '../pages/Booking.vue'
import Review from '../pages/Review.vue'
import Praise from '../pages/Praise.vue'
import Dashboard from '../pages/dashboard.vue'
import Shop from '../pages/Shop.vue'
import Demo from '../pages/Demo.vue'
import Scan from '../pages/Scan.vue'

// const Login = r => require.ensure([], () => r(require('../pages/Login.vue')))
// const Campaign = r => require.ensure([], () => r(require('../pages/Campaign.vue'), 'business'))
// const Trade = r => require.ensure([], () => r(require('../pages/Trade.vue'), 'business'))
// const Verification = r => require.ensure([], () => r(require('../pages/Verification.vue'), 'business'))
// const Queue = r => require.ensure([], () => r(require('../pages/Queue.vue'), 'business'))
// const Booking = r => require.ensure([], () => r(require('../pages/Booking.vue'), 'business'))
// const Review = r => require.ensure([], () => r(require('../pages/Review.vue'), 'business'))

// const Dashboard = r => require.ensure([], () => r(require('../pages/Dashboard.vue')))
// const Shop = r => require.ensure([], () => r(require('../pages/Shop.vue')))
// const Demo = r => require.ensure([], () => r(require('../pages/Demo.vue')))
//
// const Login = resolve => require(['../pages/Login.vue'], resolve)
// const Campaign = resolve => require(['../pages/Campaign.vue'], resolve)
// const Trade = resolve => require(['../pages/Trade.vue'], resolve)
// const Verification = resolve => require(['../pages/Verification.vue'], resolve)
// const Queue = resolve => require(['../pages/Queue.vue'], resolve)
// const Booking = resolve => require(['../pages/Booking.vue'], resolve)
// const Review = resolve => require(['../pages/Review.vue'], resolve)

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    path: '/login', component: Login
  }, {
    path: '/business/campaign', component: Campaign
  }, {
    path: '/business/campaign-detail/:id', component: CampaignDetail
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
    path: '/business/praise', component: Praise
  }, {
    path: '/dashboard', component: Dashboard
  }, {
    path: '/shop', component: Shop
  }, {
    path: '/demo', component: Demo
  }, {
    path: '/scan', component: Scan
  }]
})

/**
 * 判断用户是否登录
 */
router.beforeEach((to, from, next) => {
  // console.log(`to -> ${to.path} | from -> ${from.path}`)
  if (to.path !== '/login' && !window.sessionStorage.getItem('sst-sessionId')) {
    console.log('Not logined')
    next('/login')
    return
  }
  next()
})

export default router
