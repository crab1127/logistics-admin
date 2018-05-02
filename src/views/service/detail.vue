<template>
  <div>
    <el-form label-position="right" label-width="200px" :model="formData">
      <el-form-item label="标题">
        <el-input v-model="formData.serviceName"></el-input>
      </el-form-item>
      <el-form-item label="服务类型">
        <el-select v-model="formData.feeType" placeholder="请选择">
          <el-option 
            v-for="item in feeTypeOptions" 
            :key="item.value"
            :label="item.label" 
            :value="item.value" />
        </el-select>
      </el-form-item>
      
      <el-form-item label="封面">
        <el-upload class="avatar-uploader" :action="uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.logoService" :src="formData.logoService" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="产品描述">
        <editor v-model="formData.serviceDesc"></editor>
      </el-form-item>
      <el-form-item label="产品状态">
        <el-radio-group v-model="formData.status">
          <el-radio :label="0">未发布</el-radio>
          <el-radio :label="1">发布</el-radio>
        </el-radio-group>
      </el-form-item>
      
      
      <el-form-item>
        <el-button type="primary" @click="onSumbit"> 确定 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import editor from '@/components/editor'
  import * as API1 from '@/api'
  import { setImgUrl } from '@/utils'
  import { API } from '../../config'
  export default {
    name: 'channel',
    data() {
      return {
        uploadImg: API.upload,
        time: null,
        countryList: [],
        shops: [],
        formData: {
          areaId: 102,
          feeType: '',
          serviceName: null,
          serviceDesc: null,
          logoService: '',
          status: 1
        },
        feeTypeOptions: [
          {label: '上门取货费', value: 'feePickup'},
          {label: '自己送到网点', value: 'selfDelivery'}
        ]
      }
    },
    mounted() {
      if (this.$route.name === 'serviceUpdate') {
        this.formData.serviceId = this.$route.params.id
        API1.fetchServiceDetail(this.$route.params.id).then(res => {
          this.formData.feeType = res.data.feeType
          this.formData.logoService = res.data.logoService
          this.formData.serviceDesc = res.data.serviceDesc
          this.formData.status = res.data.status
          this.formData.serviceName = res.data.serviceName
        })
      }
    },
    methods: {
      getShop() {
        API1.fetchCustomerProductList(params).then(res => {
          this.shops = res.data
          // this.pageing.total = res.page.total
        })
      },
      onSumbit() {
        let request
        if (this.$route.name === 'serviceCreate') {
          request = API1.createService(this.formData)
        } else {
          request = API1.updateService(this.formData)
        }
        request.then(res => {
          this.$message('添加成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
      },
      handleAvatarSuccess(res, file) {
        this.formData.logoService = setImgUrl(res.data)
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
    },
    components: {
      editor
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




