<template>
  <div>
    <el-form label-position="right" label-width="200px" :model="formData">
      <el-form-item label="标题">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="封面">
        <el-upload class="avatar-uploader" :action="uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.logoService" :src="formData.logoService" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="地址">
        <el-input v-model="formData.address"></el-input>
      </el-form-item>

      <el-form-item label="合作商">
        <el-select v-model="formData.partnerId" placeholder="请选择">
          <el-option 
            v-for="item in shopList" 
            :key="item.productId"
            :label="item.productNameCn" 
            :value="item.productId" />
        </el-select>
      </el-form-item>

      <el-form-item label="关联区域服">
        <el-select v-model="formData.serviceId" placeholder="请选择">
          <el-option 
            v-for="item in sericeList" 
            :key="item.serviceId"
            :label="item.serviceName" 
            :value="item.serviceId" />
        </el-select>
      </el-form-item>

       <el-form-item label="取件服务价格阶梯">
        <div v-for="(item, index) in formData.ladderList" :key="index" >
          <el-col :span="6">
            <el-form-item prop="weightFrom">
              <el-input required type="number" v-model="item.weightFrom">
                <template slot="prepend">重量(kg)</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1" style="text-align: center">-</el-col>
          <el-col :span="6">
            <el-input type="number" v-model="item.weightTo">
              <template slot="prepend">重量(kg)</template>
            </el-input>
          </el-col>
          <el-col class="line" :span="1" style="text-align: center">:</el-col>
          <el-col :span="6">
            <el-input type="number" v-model="item.amount">
              <template slot="prepend">区间金额</template>
            </el-input>
          </el-col>
          <el-col class="line" :span="1" style="color:#fff">.</el-col>
          <el-col :span="3">
            <el-button @click="onDelFee(index)" v-if="index !== 0">删除</el-button>
          </el-col>
        </div>
      </el-form-item>

      <div style="text-align: center; margin-bottom:20px;">
        <el-button @click="onAddFee">添加</el-button>
      </div>

      <el-form-item label="描述">
        <editor v-model="formData.desc"></editor>
      </el-form-item>
      
      <el-form-item label="状态">
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
        sericeList: [],
        shopList: [],
        formData: {
          address: '',
          areaId: '102',
          name: null,
          desc: null,
          logoService: '',
          partnerId: '',
          serviceId: '',
          status: 1,
          ladderList: [
            { amount: null, feeType: 'feePickup', weightFrom: null, weightTo: null }
          ]
        }
      }
    },
    mounted() {
      if (this.$route.name === 'serviceSelfDeliveryUpdate') {
        API1.fetchServiceSelfDeliveryDetail(this.$route.params.id).then(res => {
          this.formData.name = res.data.name
          this.formData.desc = res.data.desc
          this.formData.logoService = res.data.logoService
          this.formData.status = res.data.status
          this.formData.partnerId = res.data.partnerId
          this.formData.serviceId = res.data.serviceId
          this.formData.id = res.data.id
          this.formData.address = res.data.address
          this.formData.ladderList = res.data.ladderList
        })
      }
      this.loadSerice()
      this.loadShop()
    },
    methods: {
      onSumbit() {
        let request
        if (this.$route.name !== 'serviceSelfDeliveryUpdate') {
          request = API1.createServiceSelfDelivery(this.formData)
        } else {
          request = API1.updateServiceSelfDelivery(this.formData)
        }
        request.then(res => {
          this.$message('添加成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
      },
      loadSerice () {
        API1.fetchServiceList().then(res => {
          this.sericeList = res.data
        })
      },
      loadShop () {
        API1.fetchCustomerProductList().then(res => {
          this.shopList = res.data
        })
      },
      onAddFee() {
        this.formData.ladderList.push({ amount: '', feeType: '1', weightFrom: '', weightTo: '' })
      },
      onDelFee(index) {
        this.formData.ladderList.splice(index, 1)
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




