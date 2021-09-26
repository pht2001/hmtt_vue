// 引入请求模块
import request from '../utils/request'

// 发送验证码请求
export const sendCode = mobile => request({
  url: `/v1_0/sms/codes/${mobile}`,
  method: 'GET'
})

// 用户登录请求
export const login = data => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data
})
