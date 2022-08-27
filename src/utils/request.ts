import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

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

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 响应拦截器
let isRefresh = false // 控制 token 状态
let requests: any[] = [] // 存储刷新 token 期间过来的 404 请求

request.interceptors.response.use(function (response) {
  // 状态码为 2xx 都会进入这里
  // 如果是自定义错误状态码，错误处理就写到这里
  return response
}, async function (error) {
  // 超出 2xx 状态码都会执行这里
  // 如果是使用的HTTP状态码 错误处理就写到这里

  if (error.response) { // 请求收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效 （没有提供token、token是无效的、token已经过期了）
      /**
       * 如果有 refresh_token 则尝试使用 refresh_token 获取新的access_token
       *    成功了 -> 把本次失败的请求重新发出去
       *    失败了 -> 跳转登录页面重新登录获取新的token
       * 如果没有 则直接跳转到登录页
       */
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }

      // 正在尝试刷新状态下
      if (!isRefresh) {
        isRefresh = true // 开启刷新状态
        // 尝试刷新获取新的 token
        // 不使用 request去请求 防止失败后继续走拦截器了
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          } else {
            store.commit('setUser', res.data.content)
            // 把 requests 队列中的请求重新发出去
            requests.forEach(cb => cb())
            // 重置 requests 数组
            requests = []
            // 成功了 -> 把本地失败的请求重新发出去
            return request(error.config)
          }
        }).catch(error => {
          // 把当前登陆用户状态清除
          store.commit('setUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefresh = false // 重置刷新状态
        })
      }

      // 刷新状态下 把请求挂起到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去了没有响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情 触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }
  // 将请求失败的错误对象继续抛出
  return Promise.reject(error)
})

export default request
