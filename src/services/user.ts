/**
 * 用户相关请求接口
 */
import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import qs from 'qs'
import { UserLogin } from '@/interfaces/user'

export const login = (data: UserLogin): AxiosPromise => {
  return request({
    method: 'post',
    url: '/front/user/login',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // 如果 data 是普通对象，则 Content-Type 是 application/json
    // 如果 data 是 qs.stringify(data) 转换之后的数据：key=value&key-value
    //    则 Content-Type 会被设置为 application/x-www-form-urlencoded
    // 如果 data 是 FormData 对象，则 Content-Type 是 multipart/form-data
    data: qs.stringify(data) // axios 默认发送的是 application/json
  })
}

export const getUserInfo = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

export const getUserPages = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}

export const forbidUser = (userId: string | number) => {
  return request({
    method: 'POST',
    url: '/boss/user/forbidUser',
    params: {
      userId
    }
  })
}
