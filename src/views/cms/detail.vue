<template>
  <div>
    <el-form label-position="right" label-width="200px" :model="formData">
      <el-form-item label="标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>

      <el-form-item label="封面">
        <el-upload class="avatar-uploader" :action="uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="文章内容">
        <div id="editor" > <div v-html='formData.description'></div> </div>
      </el-form-item>

      <el-form-item label="文章状态">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">未发布</el-radio>
          <el-radio :label="1">发布</el-radio>
          <el-radio :label="2">暂停</el-radio>
        </el-radio-group>
      </el-form-item>
      
      
      <el-form-item>
        <el-button type="primary" @click="onSumbit"> 确定 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import wangeditor from 'wangeditor'
  import * as API1 from '@/api'
  import { API, ROOT_IMG } from '../../config'
  export default {
    name: 'channel',
    data() {
      return {
        uploadImg: API.upload, 
        time: null,
        countryList: [],
        formData: {
          title: null,
          description: null, 
          imgUrl: 'https://vuefe.cn/images/logo.png', 
          status: 1
        }
      }
    },
    mounted() {
      this.initEdit()
      if (this.$route.name === 'cmsUpdate') {
        API1.fetchCmsDetail(this.$route.params.id).then(res => {
          // console.log(res)
          this.formData.title = res.data.title
          this.formData.description = res.data.description
          this.formData.imgUrl = res.data.imgUrl
          this.formData.status = res.data.status
          this.formData.id = res.data.id
        })
      }
    },
    methods: {
      initEdit() {
        this.editor = new wangeditor('#editor')
        this.editor.customConfig.uploadImgServer = API.upload
        this.editor.customConfig.uploadFileName = 'file'
        this.editor.customConfig.uploadImgHooks = {
					before: function (xhr, editor, files) {
						console.log('before',xhr,editor,files);
					},
				 	success: function (xhr, editor, result) {
             console.log(123, xhr, result)
					},
					customInsert: function (insertImg, result, editor) {
						var url = ROOT_IMG + result.data;
						insertImg(url)
					}
			 	}
				this.editor.create();
      },
      onSumbit() {
        let request
        this.formData.description = this.editor.txt.text()
        if(this.$route.name === 'cmsCreate') {
          request = API1.createCms(this.formData)
        } else {
          request = API1.updateCms(this.formData)
        }
        request.then(res => {
          this.$message('添加成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
      },
      handleAvatarSuccess(res, file) {
        this.formData.imgUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>




