<template>
  <div class="course-list">
    <el-card>
      <div slot="header">
        <el-form
          ref="courseForm"
          inline
          size="mini"
          :model="searchParams"
        >
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="searchParams.courseName"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchParams.status">
              <el-option label="全部" value=""></el-option>
              <el-option label="上架" value="0"></el-option>
              <el-option label="下架" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" @click="startSearch">查询</el-button>
            <el-button
              size="mini"
              type="success"
              @click="$router.push({
                name: 'course-create'
              })"
            >新建课程</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table :data="courseList" style="width: 100%">
        <el-table-column
          prop="id"
          min-width="58"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="courseName"
          min-width="150"
          label="课程名称">
        </el-table-column>
        <el-table-column
          min-width="150"
          label="价格"
        >
          <template slot-scope="scope">
            ￥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column
          prop="sortNum"
          min-width="150"
          label="排序">
        </el-table-column>
        <el-table-column
          min-width="150"
          label="状态"
        >
          <template slot-scope="scope">
            <i :class="['status', scope.row.status === 0 ? 'status-danger' : 'status-success']"></i>
          </template>
        </el-table-column>
        <el-table-column
          min-width="180"
          label="价格"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              :loading="scope.row.isStatusLoading"
              :type="scope.row.status === 0 ? 'success' : 'danger'"
              @click="handleChangeStatus(scope.row)"
            >{{ scope.row.status === 0 ? '上架' : '下架' }}</el-button>
            <el-button size="mini" @click="$router.push({
                name: 'course-edit',
                params: {
                  courseId: scope.row.id
                }
              })">编辑</el-button>
            <el-button
              size="mini"
              @click="$router.push({
                name: 'course-section',
                params: {
                  courseId: scope.row.id
                }
              })"
            >内容管理</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchParams.currentPage"
        :disabled="isLoading"
        :page-sizes="[20, 50, 100]"
        :page-size="searchParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getQueryCourses,
  changeState
} from '@/services/course'

export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      searchParams: {
        courseName: '',
        status: '',
        currentPage: 1,
        pageSize: 20
      },
      totalCount: 0,
      courseList: [],
      isLoading: false,
      isStatusLoading: false
    }
  },
  created () {
    this.loadQueryCourses()
  },
  methods: {
    async loadQueryCourses () {
      this.isLoading = true
      const { data } = await getQueryCourses(this.searchParams)
      if (data.code === '000000') {
        data.data.records.map((el: { isStatusLoading: boolean }) => { el.isStatusLoading = false })
        this.courseList = data.data.records
        this.totalCount = data.data.total
      }
      this.isLoading = false
    },
    startSearch () {
      this.searchParams.currentPage = 1
      this.loadQueryCourses()
    },
    handleSizeChange (val: number) {
      this.searchParams.pageSize = val
      this.searchParams.currentPage = 1
      this.loadQueryCourses()
    },
    handleCurrentChange (val: number) {
      this.searchParams.currentPage = val
      this.loadQueryCourses()
    },
    async handleChangeStatus (item: any) {
      if (item.isStatusLoading) return
      item.isStatusLoading = true
      const params = {
        courseId: item.id,
        status: item.status === 0 ? 1 : 0
      }
      const { data } = await changeState(params)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.loadQueryCourses()
      } else {
        this.$message.error(data.mesg)
      }
      item.isStatusLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
