<template>
  <div id="editor" ><div v-html="description"></div> </div>
</template>

<script>
  import wangeditor from 'wangeditor'
  import { setImgUrl } from '@/utils'
  import { API, ROOT_IMG } from '../../config'
  export default {
    name: 'editor',
    props: {
      value: String
    },
    data () {
      return {
        i: 0,
        editor: null,
        description: this.value
      }
    },
    watch: {
      value (val) {
        if (this.i === 0) { 
          this.description = val
          this.i = 1
        }
      }
    },
    mounted () {
       this.initEdit()
       setInterval(() => {
         const str = this.editor.txt.html()
         this.$emit('input', str)
       }, 1000)
    },
    methods: {
      initEdit() {
        this.editor = new wangeditor('#editor')
        this.editor.customConfig.uploadImgServer = API.upload
        this.editor.customConfig.uploadFileName = 'file'
        this.editor.customConfig.uploadImgHooks = {
          before: function(xhr, editor, files) {
            console.log('before', xhr, editor, files)
          },
          success: function(xhr, editor, result) {
            console.log(123, xhr, result)
          },
          customInsert: function(insertImg, result, editor) {
            var url = setImgUrl(result.data)
            insertImg(url)
          }
        }
        this.editor.create()
      }
    }
  }
</script>