import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import {
  GetRoleParams,
  RoleAddOrEditParams
} from '@/interfaces/role'

export const getRolePages = (data: GetRoleParams): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}

export const deleteRole = (id: string | number): AxiosPromise => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}

export const getRoleById = (id: string | number): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/boss/role/${id}`
  })
}

export const saveOrUpdateRole = (data: RoleAddOrEditParams): AxiosPromise => {
  return request({
    method: 'POST',
    url: 'boss/role/saveOrUpdate',
    data
  })
}
