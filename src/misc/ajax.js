import Vue from 'vue'
import axios from 'axios'
import api from 'api'
import errCodeMap from './error'
import router from '../router'
import showToast from './toast'

/**
 * 缓存token于sessionStorage
 * @param  {Object} 接口返回的token
 * @return {[type]}       [description]
 */
const cacheToken = (token) => {
  const ttl = token.expire
  const expiresAt = new Date().valueOf() + ttl * 1000
  const t = {
    token: token.token,
    expiresAt
  }
  window.sessionStorage.setItem('sst-token', JSON.stringify(t))
}

/**
 * 判断token是否过期
 * @return {Boolean} [description]
 */
const isTokenExpired = () => {
  const token = JSON.parse(window.sessionStorage.getItem('sst-token'))
  if (!token) {
    return true
  }
  const now = new Date().valueOf()
  if (now > token.expiresAt) {
    return true
  }
  return false
}

/**
 * 获取token
 * @return {[type]} [description]
 */
const fetchToken = () => {
  return axios.post(api.AUTHENTICATE, {
    'app_id': window.settings.oauth2.appid,
    'app_secret': window.settings.oauth2.appsecret
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  })
  .then(({ data }) => {
    cacheToken(data)
  }).catch(err => {
    console.error(err)
  }
)
}

const ajax = axios.create()

/**
 * 1. 请求头加authorization token
 * 2. 请求体加session_id
 * @type {[type]}
 */
ajax.interceptors.request.use(function (req) {
  if (req.url !== api.LOGIN) {
    // req.data['session_id'] = window.sessionStorage.getItem('sst-sessionId')
    Object.assign(req.data, { 'session_id': window.sessionStorage.getItem('sst-sessionId') })
  }
  if (isTokenExpired()) {
    return fetchToken().then(() => {
      const t = JSON.parse(window.sessionStorage.getItem('sst-token')).token
      // req.headers['authorization'] = `token ${t}`
      Object.assign(req.headers, { 'authorization': `token ${t}` })
      return req
    })
  }
  const t = JSON.parse(window.sessionStorage.getItem('sst-token')).token
  // req.headers['authorization'] = `token ${t}`
  Object.assign(req.headers, { 'authorization': `token ${t}` })
  return req
}, function (error) {
  console.error(error)
    // Do something with request error
  return Promise.reject(error)
})

/**
 * 1. 拦截错误代码(errcode)并作统一处理
 * 2. Session过期跳转登录页
 * @type {[type]}
 */
ajax.interceptors.response.use(function (res) {
  // Do something with response data
  if (res.status === 200) {
    if (res.data.errcode) {
      if (res.data.errcode === 13) { // user session expired
        window.sessionStorage.removeItem('sst-sessionId')
        router.push('/login')
      }
      console.error(errCodeMap[res.data.errcode])
      showToast(errCodeMap[res.data.errcode], 'error')
      return Promise.reject()
    }
    // 无errcode的返回res.data
    return res.data
  }
  return Promise.reject()
}, function (error) {
  // status code !== 200, e.g. 401 - will happen when api token expires
  showToast('通信错误', 'error')
  window.sessionStorage.removeItem('sst-token')
  router.push('/login')

  return Promise.reject(error)
})

Vue.prototype.$http = ajax

export default ajax
