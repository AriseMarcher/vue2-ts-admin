export interface RequestAddResource {
  categoryId: number | null
  description?: string
  id: string | null
  name: string
  url?: string
}

export interface ResourceItem extends RequestAddResource {
  createdBy: string
  createdTime: string
  operatorId: null
  selected: boolean
  updatedBy: string
  updatedTime: string
}

// allocResource

export interface categoriesAllItem {
  categoryId: number
  createdBy: string
  createdTime: string
  description: string
  id: number
  name: string
  operatorId: null
  selected: boolean
  updatedBy: string
  updatedTime: string
  url: string
}

export interface categoriesItem {
  createdBy: string
  createdTime: string
  id: number
  name: string
  operatorId: null | string
  selected: boolean
  sort: number
  updatedBy: string
  updatedTime: string
  subCategories: Array<categoriesAllItem>
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
