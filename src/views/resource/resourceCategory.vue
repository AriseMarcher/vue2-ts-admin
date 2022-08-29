<template>
  <div class="resource-category">
    <el-card>
      <div class="resource-operate">
        <el-button size="mini" @click="addResource">添加</el-button>
      </div>

      <el-table
        :data="resourceCategories"
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
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          width="180"
          label="排序">
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
    </el-card>

    <save-order-update
      :isShowResourceDialog="isShowResourceDialog"
      :handlingForm="handlingForm"
      :isAddOrEdit='isAddOrEdit'
      @handleCloseDialog="handleCloseDialog"
    >
    </save-order-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourceCategories } from '@/services/resource-category'
import SaveOrderUpdate from './components/save-order-update.vue'
import { ResourceItem } from '@/interfaces/resource-categories'
import { deleteResourceCategory } from '@/services/resource'

import * as _ from 'lodash/fp'

export default Vue.extend({
  name: 'ResourceCategory',
  data () {
    return {
      resourceCategories: [],
      isLoading: false,
      handlingForm: {},
      isShowResourceDialog: false,
      isAddOrEdit: false // true 添加 false 编辑
    }
  },
  components: {
    SaveOrderUpdate
  },
  created () {
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      this.isLoading = true
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
      this.isLoading = false
    },
    addResource () {
      this.handlingForm = {
        name: '',
        sort: 0
      }
      this.isShowResourceDialog = true
      this.isAddOrEdit = true
    },
    async handleDelete (item: ResourceItem) {
      this.$confirm(`是否要删除${item.name}`, '提示')
        .then(async () => {
          const { data } = await deleteResourceCategory(item.id as string)
          if (data.code === '000000') {
            this.$message.success(data.mesg)
            this.loadResourceCategories()
          } else {
            this.$message.error(data.mesg)
          }
        })
        .catch(() => {
          // eslint-disable-next-line no-trailing-spaces
        })
    },
    handleEdit (item: ResourceItem) {
      this.handlingForm = _.cloneDeep(item)
      this.isShowResourceDialog = true
      this.isAddOrEdit = false
    },
    handleCloseDialog (isRefresh: boolean) {
      !!isRefresh && this.loadResourceCategories()
      this.isShowResourceDialog = false
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
