<template>
  <div class="alloc-resource">
    角色资源管理
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  getResourceCategories,
  getResourceCategoriesAll,
  getRoleResources
} from '@/services/resource-category'
import {
  categoriesItem,
  categoriesAllItem
} from '@/interfaces/resource-categories'

export default Vue.extend({
  name: 'AllocResource',
  data () {
    return {
      roleId: ''
      // categoriesList: []
    }
  },
  created () {
    this.roleId = this.$route.query.roleId as string
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      // const categories = await getResourceCategories()
      // const categoriesAll = await getResourceCategoriesAll()
      const categoriesPromise = [
        getResourceCategories(),
        getResourceCategoriesAll(),
        getRoleResources(this.roleId)
      ]
      Promise.all(categoriesPromise).then(res => {
        const [categories, categoriesAll, roleResource] = res
        this.setCheckedCategories(
          categories.data.data,
          categoriesAll.data.data,
          roleResource.data.data
        )
        console.log(categories)
        console.log(categoriesAll)
        console.log(roleResource)
      })
    },
    setCheckedCategories (
      categories: Array<categoriesItem>,
      categoriesAll: Array<categoriesAllItem>,
      roleResource: Array<categoriesItem>
    ) {
      const a = categories.map(category => {
        const curId = category.id
        const subCategories = categoriesAll.filter(item => item.categoryId === curId)
        category.subCategories = [...subCategories]
      })
    }
  }
})
</script>

function loadResourceCategories() {
  throw new Error('Function not implemented.')
}
