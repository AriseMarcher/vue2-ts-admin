import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { MenuCreateOrEdit } from '@/interfaces/menu'

export const createOrUpdateMenu = (data: MenuCreateOrEdit): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenus = (): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
