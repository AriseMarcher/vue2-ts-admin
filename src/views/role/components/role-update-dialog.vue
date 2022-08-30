<template>
  <div class="role-update-list">
    <el-dialog
      :title="currentTitle"
      :visible="isShowRoleDialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      width="30%"
      @close="onCancel"
    >
    <el-form size="mini" label-position="right" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="updatingRoleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="角色编码">
        <el-input v-model="updatingRoleForm.code"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input type="textarea" rows="4" v-model="updatingRoleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  saveOrUpdateRole
} from '@/services/role'

export default Vue.extend({
  name: 'RoleUpdateDialog',
  props: {
    isShowRoleDialog: [Boolean],
    isRoleAddOrEdit: {
      type: Boolean,
      default: false
    },
    updatingRoleForm: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentTitle (): string {
      return this.isRoleAddOrEdit ? '添加角色' : '编辑角色'
    }
  },
  methods: {
    onCancel () {
      this.$emit('cancelRoleDialog')
    },
    async onSubmit () {
      const { data } = await saveOrUpdateRole(this.updatingRoleForm)
      if (data.code === '000000') {
        this.$emit('confirmRoleDialog')
      }
    }
  }
})
</script>
