<template>
  <div class="course-create">
    <course-update></course-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseUpdate from './components/course-update.vue'
export default Vue.extend({
  name: 'CourseCreate',
  components: {
    CourseUpdate
  }
})
</script>

<style lang="scss" scoped>

</style>
