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
  },
  {
    path: '/allocResource',
    name: 'alloc-resource',
    component: () => import(/* webpackChunkName: 'role' */ '@/views/role/alloc-resource.vue'),
    props: route => ({ query: route.query.roleId })
  }
]

export default RoleRoutes
