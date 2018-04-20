<template>
  <div>
    <el-form label-position="right" label-width="200px" :model="formData">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="渠道logo">
        <el-upload class="avatar-uploader" :action="uploadImg" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.logoImg" :src="formData.logoImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="渠道描述">
        <el-input type="textarea" v-model="formData.channelDesc"></el-input>
      </el-form-item>

      <el-form-item label="发件区域">
        <el-input value="英国" readonly></el-input>
        <!-- <el-select v-model="formData.fromAreaId" placeholder="请选择">
          <el-option 
            v-for="item in countryList" 
            :key="item.countryId"
            :label="item.countryEn" 
            :value="item.countryId" />
        </el-select> -->
      </el-form-item>

      <el-form-item label="收件区域">
        <el-input value="中国大陆" readonly></el-input>
        <!-- <el-select v-model="formData.reachAreaId" placeholder="请选择">
          <el-option 
            v-for="item in countryList" 
            :key="item.countryId"
            :label="item.countryEn" 
            :value="item.countryId" />
        </el-select> -->
      </el-form-item>
      
      <el-form-item label="上浮利率">
        <el-input v-model="formData.floatRate"></el-input>
      </el-form-item>

      <el-form-item label="物流价格阶梯">
        <div v-for="(item, index) in formData.feeLadderList" :key="index" >
          <el-col :span="6">
            <el-input v-model="item.weightFrom">
              <template slot="prepend">重量(kg)</template>
            </el-input>
          </el-col>
          <el-col class="line" :span="1" style="text-align: center">-</el-col>
          <el-col :span="6">
            <el-input v-model="item.weightTo">
              <template slot="prepend">重量(kg)</template>
            </el-input>
          </el-col>
          <el-col class="line" :span="1" style="text-align: center">:</el-col>
          <el-col :span="6">
            <el-input v-model="item.amount">
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

      <el-form-item label="派送时间区间">
        <el-input v-model="formData.costTimeFrom"></el-input> ~
        <el-input v-model="formData.costTimeTo"></el-input>
        <!-- <el-date-picker v-model="time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" >
        </el-date-picker> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSumbit"> 确定 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
        formData: {
          channelDesc: null, // 渠道描述 string
          costTimeFrom: null, // 派送时间区间从(工作日天) number
          costTimeTo: null, // 派送时间区间到(工作日天) number
          feeLadderList: [ // 物流价格阶梯 array<object>
            {
              amount: null, // 金额 string
              weightFrom: null, // 重量区间(kg) string
              weightTo: null // 重量区间 string
            }
          ],
          floatRate: null,
          fromAreaId: 102, // 发件区域id number
          logoImg: 'https://vuefe.cn/images/logo.png', // 渠道logo string
          name: null, // 渠道名称 string
          reachAreaId: 23
        }
      }
    },
    watch: {
      time(val) {
        this.formData.costTimeFrom = +val[0]
        this.formData.costTimeTo = +val[1]
      }
    },
    mounted() {

      if (this.$route.name === 'channel-update') {
        API1.fetchChannelDetail(this.$route.params.id).then(res => {
          // console.log(res)
          this.formData.channelDesc = res.data.channelDesc
          this.formData.costTimeFrom = res.data.costTimeFrom
          this.formData.costTimeTo = res.data.costTimeTo
          this.formData.feeLadderList = res.data.feeLadderList
          // this.formData.feeLadderList = res.data.feeLadderList.map(item => {
          //   return {
          //     id: item.id,
          //     channelId: item.channelId,
          //     feeType: item.feeType,
          //     amount: item.amount, 
          //     weightFrom: item.weightFrom,
          //     weightTo: item.weightTo
          //   }
          // })
          this.formData.floatRate = res.data.floatRate
          this.formData.fromAreaId = res.data.fromAreaId
          this.formData.logoImg = res.data.logoImg
          this.formData.name = res.data.name
          this.formData.reachAreaId = res.data.reachAreaId
          this.formData.id = res.data.id
        })
      }

      API1.fetchAreaCountry({type: 1}).then(res => {
        this.countryList = res.data
      })
    },
    methods: {
      load() {
        createChannel().then(res => {
          console.log(12344, res)
          this.tableData = res.data
        })
      },
      onSumbit() {
        let request
        if(this.$route.name === 'channel-update') {
          request = API1.updateChannel(this.formData)
        } else {
          request = API1.createChannel(this.formData)
        }
        request.then(res => {
          this.$message('添加成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 2000)
        })
      },
      onAddFee() {
        this.formData.feeLadderList.push({
          amount: null, // 金额 string
          weightFrom: null, // 重量区间(kg) string
          weightTo: null // 重量区间 string
        })
      },
      onDelFee(index) {
        this.formData.feeLadderList.splice(index, 1)
      },
      handleAvatarSuccess(res, file) {
        // this.formData.logoImg = URL.createObjectURL(file.raw)
        this.formData.logoImg = setImgUrl(res.data)
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




