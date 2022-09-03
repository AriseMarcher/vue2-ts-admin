import request from '@/utils/request'
import { AxiosPromise } from 'axios'

export const getQueryCourses = (data: {
  courseName?: string
  status?: string
  currentPage: number
  pageSize: number
}): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}

export const changeState = (data: {
  courseId: number
  status: number
}): AxiosPromise => {
  return request({
    method: 'GET',
    url: `/boss//course/changeState?courseId=${data.courseId}&status=${data.status}`
  })
}
