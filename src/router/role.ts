import { RouteConfig } from 'vue-router'

export const RoleRoutes: Array<RouteConfig> = [
  {
    path: '/role',
    name: 'role',
    component: () => import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
  },
  {
    path: '/role/:roleId/alloc-menu',
    name: 'alloc-menu',
    component: () => import(/* webpackChunkName: 'role' */ '@/views/role/alloc-menu.vue'),
    props: true
  }
]

export default RoleRoutes
