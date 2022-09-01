import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import {
  ResourceItem,
  RequestAddResource
} from '@/interfaces/resource-categories'

// 获取资源列表
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

export const SaveOrderUpdate = (
  data: {
    name: string
    sort: number
  } | RequestAddResource
): AxiosPromise => {
  return request({
    method: 'POST',
    url: 'boss/resource/category/saveOrderUpdate',
    data
  })
}

// 获取资源列表下的所有子资源
export const getResourceCategoriesAll = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/resource/getAll'
  })
}

// 获取特定roleId选中的子资源

export const getRoleResources = (roleId: string): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/boss/resource/getRoleResources?roleId=${roleId}`
  })
}
