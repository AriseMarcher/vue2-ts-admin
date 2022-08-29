<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form ref="form" size="mini" :model="form" inline label-width="80px">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="资源路径" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="资源分类" prop="categoryId">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择资源分类"
              clearable=""
            >
              <el-option
                v-for="item in resourceCategories"
                :label="item.name"
                :value="item.id"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" @click="onSubmit">查询搜索</el-button>
            <el-button :disabled="isLoading" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="resource-operate">
        <el-button size="mini" @click="addResource">添加</el-button>
        <el-button size="mini" @click="gotoCategory">资源分类</el-button>
      </div>
      <el-table
        :data="resources"
        style="width: 100%"
        v-loading="isLoading"
      >
        <el-table-column
          type="index"
          label="编号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径">
        </el-table-column>
        <el-table-column
          prop="description"
          width="180"
          label="描述">
        </el-table-column>
        <el-table-column
          width="180"
          prop="createdTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :disabled="isLoading"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
    <!-- 添加 OR 编辑 分类弹框 -->
    <add-or-edit-resource
      :isShowResourceDialog="isShowResourceDialog"
      :resourceCategories="resourceCategories"
      :handlingForm="handlingForm"
      :isAddOrEdit="isAddOrEdit"
      @handleCloseDialog="handleCloseDialog"
    ></add-or-edit-resource>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages, deleteCategories } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import {
  ResourceItem,
  resourceItem,
  requestAddResource,
  RequestAddResource
} from '@/interfaces/resource-categories'
import { Form } from 'element-ui'
import AddOrEditResource from './AddOrEditResource.vue'
import * as _ from 'lodash/fp'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [], // 资源列表
      form: {
        name: '',
        url: '',
        categoryId: null,
        current: 1, // 默认查询第一页数据
        size: 10 // 每页大小
      },
      totalCount: 0,
      resourceCategories: [],
      isLoading: true,
      isShowResourceDialog: false,
      handlingForm: resourceItem,
      isAddOrEdit: false // true 添加 false 编辑
    }
  },
  components: {
    AddOrEditResource
  },
  created () {
    this.loadResource()
    this.loadResourceCategories()
  },
  methods: {
    async loadResource () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.totalCount = data.data.total
      }
      this.isLoading = false
    },
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
    },
    handleEdit (item: ResourceItem) {
      (this.handlingForm as ResourceItem) = _.cloneDeep(item)
      this.isAddOrEdit = false
      this.isShowResourceDialog = true
    },
    async handleDelete (item: ResourceItem) {
      const { data } = await deleteCategories(item.id as string)
      if (data.code === '000000') {
        this.$message.success(data.mesg)
        this.loadResource()
      } else {
        this.$message.error(data.mesg)
      }
    },
    onSubmit () {
      this.form.current = 1
      this.loadResource()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResource()
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResource()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResource()
    },
    addResource () {
      (this.handlingForm as RequestAddResource) = _.cloneDeep(requestAddResource)
      this.isAddOrEdit = true
      this.isShowResourceDialog = true
    },
    gotoCategory () {
      this.$router.push({
        name: 'resourceCategory'
      })
    },
    handleCloseDialog (isRefresh: boolean) {
      !!isRefresh && this.loadResource()
      this.isShowResourceDialog = false
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
