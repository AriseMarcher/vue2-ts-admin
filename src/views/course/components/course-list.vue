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
            <el-button size="mini">新建课程</el-button>
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
            <el-button size="mini" :type="scope.row.status === 0 ? 'success' : 'danger'">下架</el-button>
            <el-button size="mini">编辑</el-button>
            <el-button size="mini">内容管理</el-button>
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
import { getQueryCourses } from '@/services/course'

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
      isLoading: false
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
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
