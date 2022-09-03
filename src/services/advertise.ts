import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import {
  AdvertiseItem
} from '@/interfaces/advertise'

export const getAdList = (params: {
  pageNum: number
  pageSize: number
}): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/front/ad/getAdList?pageNum=${params.pageNum}&pageSize=${params.pageSize}`
  })
}

// 更新广告位状态
export const updateStatus = (params: {
  id: number
  status: number
}): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/front/ad/updateStatus?id=${params.id}&status=${params.status}`
  })
}
