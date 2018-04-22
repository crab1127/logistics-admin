<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单</span>
          </div>
          <div class="text item"> 今日订单数： 323 </div>
          <div class="text item"> 本周订单数： 3232 </div>
          <div class="text item"> 本月订单数： 23323 </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户</span>
          </div>
          <div class="text item"> 今日注册用户： 82 </div>
          <div class="text item"> 本周用户数： 523 </div>
          <div class="text item"> 本月用户数： 1223 </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>资金</span>
          </div>
          <div class="text item"> 今日充值资金： 6532 元 </div>
          <div class="text item"> 本周充值资金： 23523 元 </div>
          <div class="text item"> 本月充值资金： 95423 元 </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
