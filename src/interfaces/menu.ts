export interface MenuCreateOrEdit {
  parentId: number // -1 表示没有上级菜单
  name: string // 菜单名称
  href: string // 菜单路径
  icon: string // 菜单图标
  orderName: number // 菜单排序
  description: string // 菜单描述
  shown: boolean // 菜单是否显示
}

export interface MenuItem {
  createdBy: string
  createdTime: string
  description: string
  href: string
  icon: string
  id: number
  level: number
  name: string
  operatorId: null | string
  orderNum: number
  parentId: number
  shown: boolean
  updatedBy: string
  updatedTime: string
}

export interface MenuCheapItem {
  id: string
  level: number
  selected: boolean
  subMenuList: Array<MenuCheapItem>
}
