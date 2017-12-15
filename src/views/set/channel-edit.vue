<template>
  <div>
    <el-form label-position="right" label-width="200px" :model="formData">
      <el-form-item label="名称">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>

      <el-form-item label="渠道logo">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="formData.logoImg" :src="formData.logoImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="渠道描述">
        <el-input type="textarea" v-model="formData.channelDesc"></el-input>
      </el-form-item>

      <el-form-item label="发件区域">
        <el-input v-model="formData.fromAreaId"></el-input>
      </el-form-item>

      <el-form-item label="收件区域">
        <el-input v-model="formData.reachAreaId"></el-input>
      </el-form-item>

      <el-form-item label="物流价格阶梯">
        <div v-for="(item, index) in formData.feeLadderList" :key="index" >
          <el-col :span="5">
            <el-input v-model="item.weightFrom" placeholder="重量区间(kg)"></el-input>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="5">
            <el-input v-model="item.weightTo" placeholder="重量区间(kg)"></el-input>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">:</el-col>
          <el-col :span="5">
            <el-input v-model="item.amount" placeholder="金额"></el-input>
          </el-col>
          <el-col class="line" :span="1" style="color:#fff">.</el-col>
          <el-col :span="4">
            <el-button @click="onDelFee(index)" v-if="index !== 0">删除</el-button>
            <el-button @click="onAddFee" v-if="(index + 1) === formData.feeLadderList.length">添加</el-button>
          </el-col>
        </div>
      </el-form-item>

      <el-form-item label="派送时间区间">
        <el-date-picker v-model="time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSumbit"> 确定 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    createChannel
  } from '@/api/index'
  export default {
    name: 'channel',
    data() {
      return {
        time: null,
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
          fromAreaId: null, // 发件区域id number
          logoImg: null, // 渠道logo string
          name: null, // 渠道名称 string
          reachAreaId: null
        }
      }
    },
    watch: {
      time(val) {
        this.formData.costTimeFrom = val[0]
        this.formData.costTimeTo = val[1]
      }
    },
    mounted() {
    },
    methods: {
      load() {
        createChannel().then(res => {
          console.log(12344, res)
          this.tableData = res.data
        })
      },
      onSumbit() {
        createChannel(this.formData).then(res => {
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
        this.formData.logoImg = URL.createObjectURL(file.raw)
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




