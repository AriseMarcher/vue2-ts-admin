export interface RequestAddResource {
  categoryId: number | null
  description: string
  id: string | null
  name: string
  url: string
}

export interface ResourceItem extends RequestAddResource {
  createdBy: string
  createdTime: string
  operatorId: null
  selected: boolean
  updatedBy: string
  updatedTime: string
}

// 基于interface的数据表达
export const requestAddResource = {
  categoryId: null,
  description: '',
  id: null,
  name: '',
  url: ''
}

export const resourceItem = {
  categoryId: null,
  createdBy: '',
  createdTime: '',
  description: '',
  id: null,
  name: '',
  operatorId: null,
  selected: false,
  updatedBy: '',
  updatedTime: '',
  url: ''
}
