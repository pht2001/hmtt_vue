// 引入请求模块
import request from '../utils/request'

// 频道新闻推荐
export const getActicles = params => request({
  url: '/v1_1/articles',
  method: 'GET',
  params
})

// 获取新闻文章详情
export const getActiclesDetails = id => request({
  url: `/v1_0/articles/${id}`,
  method: 'GET'
})
