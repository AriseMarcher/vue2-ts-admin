<template>
  <div class="menu-edit">
    <create-or-update-menu :isEdit="true"></create-or-update-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import createOrUpdateMenu from './components/CreateOrEditMenu.vue'

export default Vue.extend({
  name: 'MenuCreateOrEdit',
  data () {
    return {
      form: {
        parentId: -1, // -1 表示没有上级菜单
        name: '111',
        href: '222',
        icon: '333',
        orderName: 0,
        description: '444',
        shown: true
      },
      parentMenuList: []
    }
  },
  components: {
    createOrUpdateMenu
  }
})
</script>
