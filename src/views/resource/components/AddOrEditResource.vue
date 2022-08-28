<template>
  <div class="resource-dialog">
    <el-dialog
      :title="currentTitle"
      :visible="isShowResourceDialog"
      width="30%"
      @close="handleClose"
    >
      <el-form ref="form" :model="handlingForm" label-width="80px">
        <el-form-item label="资源名称">
          <el-input v-model="handlingForm.name"></el-input>
        </el-form-item>
        <el-form-item label="资源路径">
          <el-input v-model="handlingForm.url"></el-input>
        </el-form-item>
        <el-form-item label="资源分类">
          <el-select
            v-model="handlingForm.categoryId"
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
        <el-form-item label="描述">
          <el-input type="textarea" :rows="2" v-model="handlingForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose" size="mini">取 消</el-button>
        <el-button type="primary" @click="confirmDialog" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { saveOrUpdate } from '@/services/resource-category'

export default Vue.extend({
  name: 'AddOrEditResource',
  props: {
    isShowResourceDialog: {
      type: Boolean,
      default: false
    },
    isAddOrEdit: {
      type: Boolean,
      default: false
    },
    resourceCategories: {
      type: Array,
      required: true
    },
    handlingForm: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentTitle (): string {
      return this.isAddOrEdit ? '添加分类' : '编辑分类'
    }
  },
  methods: {
    handleClose (isRefresh = false) {
      this.$emit('handleCloseDialog', isRefresh)
    },
    async confirmDialog () {
      const { data } = await saveOrUpdate(this.handlingForm)
      if (data.code === '000000') {
        this.handleClose(true)
      } else {
        this.$message.error(data.mesg)
      }
    }
  }
})
</script>
