// 封装请求模块
import axios from 'axios'

const request = axios.create({
  url: 'http://toutiao-app.itheima.net/'
})

export default request
