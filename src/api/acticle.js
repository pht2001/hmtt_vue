// 引入请求模块
import request from '../utils/request'

// 频道新闻推荐
export const getActicles = params => request({
  url: '/v1_1/articles',
  method: 'GET',
  params
})
