// 封装请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'
import store from '../store/index'
import router from '../router/index'

import { Dialog } from 'vant'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      return JSONbig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const user = store.state.user
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  const status = error.response.status
  const user = store.state.user
  if (status === 401) {
    if (!user || !user.refresh_token) {
      dialogAlert()
      return Promise.reject(error)
    }
    try {
      const { data } = await axios({
        url: 'http://toutiao-app.itheima.net/v1_0/authorizations',
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      store.commit('setUser', {
        token: data.data.token,
        refresh_token: user.refresh_token
      })
      return request(error.config)
    } catch (err) {
      dialogAlert()
    }
  }
  return Promise.reject(error)
})

function dialogAlert () {
  Dialog.alert({
    message: '账号过期了，请重新登录'
  }).then(() => {
    router.push({ name: 'login' })
  })
}

export default request
