<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>订单</span>
          </div>
          <div class="text item"> 今日订单数： {{ chart2.todayOrderAmt }} </div>
          <div class="text item"> 本周订单数： {{ chart2.beforeSevOrderAmt }} </div>
          <div class="text item"> 本月订单数： {{ chart2.beforeThiOrderAmt }} </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户</span>
          </div>
          <div class="text item"> 今日注册用户： {{ chart1.todayUserAmt }} </div>
          <div class="text item"> 本周用户数： {{ chart1.beforeSevUserAmt }} </div>
          <div class="text item"> 本月用户数： {{ chart1.beforeThiUserAmt }} </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>资金</span>
          </div>
          <div class="text item"> 今日充值资金： {{ chart3.todayFundAmt }} 元 </div>
          <div class="text item"> 本周充值资金： {{ chart3.beforeSevFundAmt }} 元 </div>
          <div class="text item"> 本月充值资金： {{ chart3.beforeThiFundAmt }} 元 </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  import {
    mapGetters
  } from 'vuex'
  import * as API from '@/api'
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    data () {
      return {
        chart1: {},  
        chart2: {},  
        chart3: {}  
      }
    },
    mounted () {
      API.fetchChart1().then(res => {
        this.chart1 = res.data
      })
      API.fetchChart2().then(res => {
        this.chart2 = res.data
      })
      API.fetchChart3().then(res => {
        this.chart3 = res.data
      })
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
