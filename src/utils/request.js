// 封装请求模块
import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net/',
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return JSONbig.parse(data)
    // return data;
  }]
})

export default request
