// 引入请求模块
import request from '../utils/request'

// 获取联想建议（自动补全）
export const getSearchSuggestion = q => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q
  }
})

// 获取搜索结果
export const getSearchSuccess = params => request({
  url: '/v1_0/search',
  method: 'GET',
  params
})
