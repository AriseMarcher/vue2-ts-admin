import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import {
  ResourceItem,
  RequestAddResource
} from '@/interfaces/resource-categories'

export const getResourceCategories = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const saveOrUpdate = (data: ResourceItem | RequestAddResource): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}
