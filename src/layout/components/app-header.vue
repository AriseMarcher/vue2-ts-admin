<template>
  <div class="header">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar
        shape="square"
        :size="50"
        :src="userInfo.portrait || defaultAvatar"
      ></el-avatar>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
      <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'AppHeader',
  data () {
    return {
      userInfo: {},
      defaultAvatar: require('@/assets/default_avatar.png')
    }
  },
  created () {
    this.loadUserInfo()
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清除用户登录状态
        this.$store.commit('setUser', null)
        // 跳转到登录页面
        this.$router.push({
          name: 'login'
        })
        this.$message.success('退出成功')
      }).catch(() => {
        this.$message.info('已取消退出操作')
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
