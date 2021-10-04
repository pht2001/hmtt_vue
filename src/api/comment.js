// 引入请求模块
import request from '../utils/request'

// 获取文章评论
export const getActicleComments = params => request({
  url: '/v1_0/comments',
  method: 'GET',
  params
})

// 对评论或评论回复点赞
export const addCommentLike = target => request({
  url: '/v1_0/comment/likings',
  method: 'POST',
  data: {
    target
  }
})

// 取消对评论或评论回复点赞
export const deleteCommentLike = target => request({
  url: `/v1_0/comment/likings/${target}`,
  method: 'DELETE'
})

// 添加评论或评论回复
export const addCommentPost = data => request({
  url: '/v1_0/comments',
  method: 'POST',
  data
})
