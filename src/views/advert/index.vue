<template>
  <div class="advert">
    <advert-list></advert-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdvertList from './components/advert-list.vue'

export default Vue.extend({
  name: 'AdvertIndex',
  components: {
    AdvertList
  }
})
</script>

<style lang="scss" scoped>

</style>
