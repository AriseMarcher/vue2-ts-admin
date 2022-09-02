<template>
  <div class="alloc-resource">
    <el-card>
      <div
        v-for="item of categoriesList"
        :key="item.id"
      >
        <el-row class="table-layout main-title">
          <el-checkbox
            v-model="item.mainSelected"
            :indeterminate="item.isIndeterminate"
            @change="handleCheckAllChange(item)"
          >{{ item.name }}</el-checkbox>
        </el-row>
          <el-row class="table-layout">
            <el-checkbox-group v-model="item.subCheckedCategories" @change="handleCheckedCitiesChange(item)">
              <el-col :span="8" v-for="sub in item.subCategories" :key="sub.id" style="padding: 4px 0;">
                <el-checkbox :label="sub">
                {{ sub.name }}
                </el-checkbox>
              </el-col>
            </el-checkbox-group>
        </el-row>
      </div>

      <el-row>
        <el-button size="mini" @click="save">
          保存
        </el-button>
        <el-button size="mini" @click="reset">
          清空
        </el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getResourceCategories,
  getResourceCategoriesAll,
  getRoleResources,
  saveAllocateRoleResources
} from '@/services/resource-category'
import {
  categoriesItem,
  categoriesAllItem
} from '@/interfaces/resource-categories'

export default Vue.extend({
  name: 'AllocResource',
  data () {
    return {
      roleId: '',
      categoriesList: [] as Array<categoriesItem>,
      checkedCities: false,
      checkAll: true
    }
  },
  created () {
    this.roleId = this.$route.query.roleId as string
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      const categoriesPromise = [
        // getResourceCategories(), // 这两个其实根本不需要调用
        // getResourceCategoriesAll(), // 这两个其实根本不需要调用
        getRoleResources(this.roleId)
      ]
      Promise.all(categoriesPromise).then(res => {
        // const [categories, categoriesAll, roleResource] = res
        const [roleResource] = res
        this.setCheckedCategories(
          // categories.data.data,
          // categoriesAll.data.data,
          roleResource.data.data
        )
      })
    },
    setCheckedCategories (
      // categories: Array<categoriesItem>,
      // categoriesAll: Array<categoriesAllItem>,
      roleResource: Array<categoriesItem>
    ) {
      // this.categoriesList = categories
      const cacheData = roleResource.map(category => {
        const subCategories = category.resourceList && category.resourceList.filter(item => item.selected)
        category.subCategories = category.resourceList
        category.subCheckedCategories = subCategories || []
        category.mainSelected = category.selected
        // category.resourceList = category.resourceList
        category.isIndeterminate = category.selected

        return category
      })
      this.categoriesList = cacheData.sort((a, b) => a.id - b.id)
    },
    // 处理每项的全勾选
    handleCheckAllChange (item: categoriesItem) {
      item.isIndeterminate = false
      item.subCheckedCategories = item.mainSelected ? item.subCategories : []
    },
    handleCheckedCitiesChange (item: categoriesItem) {
      const checkedCount = item.subCheckedCategories?.length || 0
      item.mainSelected = checkedCount === item.subCategories.length
      item.isIndeterminate = checkedCount > 0 && checkedCount < item.subCategories.length
    },
    save () {
      this.$confirm('是否要更新配置资源', '提升')
        .then(async () => {
          await this.update()
        })
        .catch(() => {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
        })
    },
    reset () {
      this.categoriesList.forEach(item => {
        item.subCheckedCategories = []
        item.isIndeterminate = false
        item.mainSelected = false
      })
    },
    async update () {
      const resourceIdList = this.categoriesList.reduce((prev, cur) => {
        const checkedIds = cur.subCheckedCategories && cur.subCheckedCategories.map(item => {
          return item.id
        })
        prev.push(...checkedIds)
        return prev
      }, [] as Array<number>)
      const params = {
        resourceIdList,
        roleId: this.roleId
      }
      const { data } = await saveAllocateRoleResources(params)
      if (data.code === '000000') {
        this.$message.success('分配成功')
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.alloc-resource {
  .main-title {
    height: 60px;
    background-color: rgb(231, 239, 239);
  }
  .table-layout {
    box-sizing: border-box;
    padding: 20px;
  }
}
</style>
