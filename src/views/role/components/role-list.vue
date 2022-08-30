<template>
  <div class="role-list">
    <el-card>
      <div slot="header" class="clearfix">
        <h1>筛选搜索</h1>
        <el-form ref="roleForm" size="mini" :model="roleParams" inline label-width="120px">
          <el-form-item label="输入搜索：" prop="name">
            <el-input v-model="roleParams.name" placeholder="请输入角色名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" @click="onStartSearch">查询搜索</el-button>
            <el-button :disabled="isLoading" @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="resource-operate">
        <el-button size="mini" @click="addRole">添加</el-button>
      </div>
      <el-table :data="roleList" style="width: 100%" v-loading="isLoading">
        <el-table-column
          type="index"
          label="编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          width="180">
        </el-table-column>
        <el-table-column
          width="360"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini">
              分配菜单
            </el-button>
            <el-button size="mini">
              分配菜单
            </el-button>
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
        :current-page.sync="roleParams.current"
        :disabled="isLoading"
        :page-sizes="[5, 10, 20]"
        :page-size="roleParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>

    <role-update-dialog
      :isShowRoleDialog="isShowRoleDialog"
      :isRoleAddOrEdit="isRoleAddOrEdit"
      :updatingRoleForm="updatingRoleForm"
      @confirmRoleDialog="confirmRoleDialog"
      @cancelRoleDialog="cancelRoleDialog"
    ></role-update-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  RoleItem,
  roleAddOrEditParams
} from '@/interfaces/role'
import {
  getRolePages,
  deleteRole
} from '@/services/role'
import RoleUpdateDialog from './role-update-dialog.vue'
import * as _ from 'lodash/fp'

export default Vue.extend({
  name: 'RoleList',
  data () {
    return {
      roleParams: {
        current: 1,
        name: '',
        size: 5
      },
      totalCount: 0,
      isLoading: false,
      roleList: [],
      isShowRoleDialog: false,
      isRoleAddOrEdit: false,
      updatingRoleForm: roleAddOrEditParams
    }
  },
  components: {
    RoleUpdateDialog
  },
  created () {
    this.loadRoleList()
  },
  methods: {
    async loadRoleList () {
      this.isLoading = true
      const { data } = await getRolePages(this.roleParams)
      if (data.code === '000000') {
        this.roleList = data.data.records
        this.totalCount = data.data.total
      }
      this.isLoading = false
    },
    handleSizeChange (val: number) {
      this.roleParams.size = val
      this.roleParams.current = 1
      this.loadRoleList()
    },
    handleCurrentChange (val: number) {
      this.roleParams.current = val
      this.loadRoleList()
    },
    onStartSearch () {
      this.roleParams.current = 1
      this.loadRoleList()
    },
    onReset () {
      this.roleParams.name = ''
      this.roleParams.current = 1
      this.roleParams.size = 5
    },
    async handleDelete (item: RoleItem) {
      this.$confirm(`确定要删除角色 ${item.name} 吗？`, '提示')
        .then(async () => {
          const { data } = await deleteRole(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            if (this.roleList.length === 1) {
              this.roleParams.current = 1
            }
            this.loadRoleList()
          }
        })
        .catch(() => {
          // eslint-disable-next-line no-trailing-spaces
        })
    },
    handleEdit (item: RoleItem) {
      this.isRoleAddOrEdit = false
      this.isShowRoleDialog = true

      const params = _.cloneDeep(roleAddOrEditParams)
      params.code = item.code
      params.description = item.description as string
      params.id = item.id
      params.name = item.name

      this.updatingRoleForm = params
    },
    addRole () {
      this.isRoleAddOrEdit = true
      this.isShowRoleDialog = true
      this.updatingRoleForm = _.cloneDeep(roleAddOrEditParams)
    },
    confirmRoleDialog () {
      this.loadRoleList()
      this.isRoleAddOrEdit && (this.roleParams.current = 1)
      this.isShowRoleDialog = false
    },
    cancelRoleDialog () {
      this.isShowRoleDialog = false
    }
  }
})
</script>
