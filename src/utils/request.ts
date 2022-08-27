import axios from 'axios'
import store from '@/store'

const request = axios.create({
  // 配置选项
  // baseURL
  // timeout
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 通过改写 config 配置信息来实现业务功能的统一处理
  // return config
  const { user } = store.state
  if (user && user.access_token) {
    config.headers = {}
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器

export default request
