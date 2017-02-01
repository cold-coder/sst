import Vue from 'vue'
import axios from 'axios'
import api from 'api'

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
  const token = window.sessionStorage.getItem('sst-token')
  if (!token) {
    return true
  } else {
    const now = new Date().valueOf()
    if (now > token.expiresAt) {
      return true
    }
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
ajax.interceptors.request.use(function (config) {
  if (config.url !== api.LOGIN) {
    config.data['session_id'] = window.sessionStorage.getItem('sst-sessionId')
  }
  if (isTokenExpired()) {
    return fetchToken().then(() => {
      const t = JSON.parse(window.sessionStorage.getItem('sst-token')).token
      config.headers['authorization'] = `token ${t}`
      return config
    })
  } else {
    const t = JSON.parse(window.sessionStorage.getItem('sst-token')).token
    config.headers['authorization'] = `token ${t}`
  }
  return config
}, function (error) {
  console.error(error)
    // Do something with request error
  return Promise.reject(error)
})

Vue.prototype.$http = ajax

export default ajax
