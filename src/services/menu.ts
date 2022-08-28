import request from '@/utils/request'
import { AxiosPromise } from 'axios'

interface MenuCreate {
  parentId: number // -1 表示没有上级菜单
  name: string // 菜单名称
  href: string // 菜单路径
  icon: string // 菜单图标
  orderName: number // 菜单排序
  description: string // 菜单描述
  shown: boolean // 菜单是否显示
}

export const createOrUpdateMenu = (data: MenuCreate): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

export const getEditMenuInfo = (id = -1): AxiosPromise => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}
