<template>
  <div class="course-create">
    <course-update is-edit :course-id="courseId"></course-update>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CourseUpdate from './components/course-update.vue'
export default Vue.extend({
  name: 'CourseEdit',
  components: {
    CourseUpdate
  },
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
