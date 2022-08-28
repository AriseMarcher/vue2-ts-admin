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
