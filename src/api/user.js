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

// 获取用户信息
export const getUserInfo = () => request({
  url: '/v1_0/user',
  method: 'GET'
})

// 获取用户频道列表
export const getUserChannels = () => request({
  url: '/v1_0/user/channels',
  method: 'GET'
})

// 获取所有频道列表
export const getUserAllChannels = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})

// 添加用户频道列表
export const addUserChannel = clannel => request({
  url: '/v1_0/user/channels',
  method: 'PATCH',
  data: {
    channels: [clannel]
  }
})

// 删除用户频道列表
export const deleteUserChannel = target => request({
  url: `/v1_0/user/channels/${target}`,
  method: 'DELETE'
})
