<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String
    }
  },
  mounted () {
    const editor = new E(this.$refs.editor as any)
    editor.config.onchange = (value: string) => {
      this.$emit('input', value)
    }
    editor.create()

    editor.txt.html(this.value)
  }
})
</script>

<style lang="scss" scoped>

</style>
