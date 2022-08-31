<template>
  <div class="role-alloc-menu">
    <el-card>
      <div slot="header">
        <span>分配权限</span>
      </div>
      <el-tree
        ref="menuTree"
        show-checkbox
        :data="menus"
        :props="defaultProps"
        :default-checked-keys="checkedKeys"
        node-key="id"
        default-expand-all
      >
      </el-tree>
      <div>
        <el-button size="mini" @click="resetChecked">清空</el-button>
        <el-button size="mini" @click="onSave">保持</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getMenuNodeList,
  getRoleMenus,
  allocateRoleMenus
} from '@/services/menu'
import { Tree } from 'element-ui'
import { MenuCheapItem } from '@/interfaces/menu'

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      menus: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name'
      },
      checkedKeys: []
    }
  },
  created () {
    this.loadMenu()
    this.loadRoleMenus()
  },
  methods: {
    async loadMenu () {
      const { data } = await getMenuNodeList()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    async loadRoleMenus () {
      const { data } = await getRoleMenus(this.roleId as string)
      if (data.code === '000000') {
        this.menus = data.data
        this.getCheckedKeys(data.data)
      }
    },
    getCheckedKeys (menus: Array<MenuCheapItem>) {
      menus.forEach(menu => {
        if (menu.selected) {
          if (menu.level !== 0) {
            this.checkedKeys = [...this.checkedKeys as never, menu.id as never]
          }
        }
        if (menu.subMenuList) {
          this.getCheckedKeys(menu.subMenuList)
        }
      })
    },
    async onSave () {
      const menuIdList = (this.$refs.menuTree as Tree).getCheckedKeys()
      // 拿到选中节点的数据 id 列表
      await allocateRoleMenus({
        roleId: this.roleId,
        menuIdList
      })
      this.$message.success('操作成功')
      this.$router.back()
    },
    resetChecked () {
      (this.$refs.menuTree as Tree).setCheckedKeys([])
    }
  }
})
</script>
