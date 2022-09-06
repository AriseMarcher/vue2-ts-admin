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

export const saveOrUpdateCourse = (data: any): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss//course/saveOrUpdateCourse',
    data
  })
}

export const uploadCourseImage = (
  data: any,
  onUploadProgress?: (progressEvent: any) => void
): AxiosPromise => {
  return request({
    method: 'POST',
    url: '/boss//course/upload',
    data,
    // HTML5新增的上传响应事件 原生的为：progress
    // e.loaded 已上传的数据大小
    // e.total 上传文件的总大小
    onUploadProgress
  })
}
