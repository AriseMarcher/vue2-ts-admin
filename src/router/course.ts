import { RouteConfig } from 'vue-router'

export const RoleRoutes: Array<RouteConfig> = [
  {
    path: '/course',
    name: 'course',
    component: () => import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
  },
  {
    path: '/course/create',
    name: 'course-create',
    component: () => import(/* webpackChunkName: 'course' */ '@/views/course/course-create.vue')
  },
  {
    path: '/course/:courseId/edit',
    name: 'course-edit',
    component: () => import(/* webpackChunkName: 'course' */ '@/views/course/course-edit.vue'),
    props: true
  },
  {
    path: '/course/:courseId/section',
    name: 'course-section',
    component: () => import(/* webpackChunkName: 'course-section' */ '@/views/course/course-section.vue'),
    props: true
  }
]

export default RoleRoutes
