/**
 * 自定义全局方法
 */
import Vue from 'Vue'

const sst = {}
sst.install = function (Vue2, options) {
  Vue2.prototype.$getShopId = () => {
    var userInfo = JSON.parse(window.sessionStorage.getItem('sst-userInfo'))
    console.log(userInfo)
    return userInfo.shop_id
  }
}

// if (typeof exports == "object") {
//   module.exports = sst
// } else if (typeof define == "function" && define.amd) {
//   define([], function () {
//     return sst
//   })
// } else if (window.Vue) {
//   window.sst = sst
//   window.Vue.use(sst)
// }

Vue.use(sst)
