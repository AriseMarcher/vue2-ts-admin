<template>
  <div class="text-editor">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden;"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onChange="onChange"
      @onCreated="onCreated"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import E from 'wangeditor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { uploadCourseImage } from '@/services/course'
import { IEditorConfig } from '@wangeditor/editor'
import { values } from 'lodash'
type InsertFnType = (url: string, alt: string, href: string) => void

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String
    }
  },
  components: {
    Editor,
    Toolbar
  },
  data () {
    return {
      editor: null,
      html: '',
      toolbarConfig: { },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {} as any
        }
      },
      mode: 'default' // or 'simple'
    }
  },
  watch: {
    value (val) {
      this.html = val
    }
  },
  created () {
    this.editorConfig.MENU_CONF.uploadImage = {
      server: '/boss//course/upload',
      async customUpload (file: File, insertFn: InsertFnType) {
        const fd = new FormData()
        fd.append('file', file)
        const { data } = await uploadCourseImage(fd)
        if (data.code === '000000') {
          const url = data.data.name
          const alt = ''
          const href = ''
          insertFn(url, alt, href)
        }
      }
    }
  },
  methods: {
    onCreated (editor: any) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange (editor: any) {
      const value = this.editor.getHtml()
      this.$emit('input', value)
    }
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
})
</script>

<style lang="scss" scoped>

</style>
