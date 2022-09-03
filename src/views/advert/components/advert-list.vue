<template>
  <div class="advert-list">
    <el-card>
      <div slot="header">
        <el-button size="mini">添加广告</el-button>
      </div>
      <el-table
        :data="advertList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          min-width="50"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          min-width="100"
          label="广告名称">
        </el-table-column>
        <el-table-column
          prop="icon"
          min-width="150"
          label="广告位置">
        </el-table-column>
        <el-table-column
          min-width="100"
          label="广告图片"
        >
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.img" style="width: 150px"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          min-width="150"
          label="时间"
        >
          <template slot-scope="scope">
            <p>开始时间：{{ scope.row.startTime }}</p>
            <p>结束时间：{{ scope.row.endTime }}</p>
          </template>
        </el-table-column>
        <el-table-column
          min-width="100"
          label="广告图片"
        >
          <template slot-scope="scope">
            <el-image lazy :src="scope.row.img" style="width: 150px"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template >
            <!-- slot-scope="scope" @click="handleEdit(scope.row)" -->
            <el-button
              size="mini"
              >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getAdList
} from '@/services/advertise'

export default Vue.extend({
  name: 'AdvertList',
  data () {
    return {
      advertList: []
    }
  },
  created () {
    this.loadAdvertList()
  },
  methods: {
    async loadAdvertList () {
      // 参数无效 并不能分页
      const { data } = await getAdList({
        pageNum: 1,
        pageSize: 5
      })
      this.advertList = data.content
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
