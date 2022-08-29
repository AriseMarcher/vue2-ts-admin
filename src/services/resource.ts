import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { ReqResourceParams } from '@/interfaces/resource'

export const getResourcePages = (data: ReqResourceParams): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const deleteCategories = (id: string): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/${id}`
  })
}

export const deleteResourceCategory = (id: string): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
