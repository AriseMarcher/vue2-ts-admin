export interface GetRoleParams {
  current: number
  name: string
  size: number
}

export interface RoleItem {
  code: string
  createdBy: string
  createdTime: string
  description: null | string
  id: number | string
  name: string
  operatorId: null | string
  updatedBy: string
  updatedTime: string
}

export interface RoleAddOrEditParams {
  code: string
  description: string
  id?: number | string
  name: string
}

export const roleAddOrEditParams: RoleAddOrEditParams = {
  code: '',
  description: '',
  name: ''
}
