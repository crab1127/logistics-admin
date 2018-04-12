<template>
  <div class="order-container">
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="row-text">
          订单号: 
          </div>
        </el-col>
        <el-col :span="6">
          <el-input v-model="params.orderId" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <div class="row-text">
          物流单号: 
          </div>
        </el-col>
        <el-col :span="6">
          <el-input v-model="params.serviceNo" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <div class="row-text">
          状态:
          </div>
        </el-col>
        <el-col :span="6">
          <el-select v-model="params.state">
            <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="2">
          <div class="row-text">
          时间：
          </div>
        </el-col>
        <el-col :span="16">
          <el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button @click="onSearch">搜索</el-button>
        </el-col>
      </el-row>

    </div>
    <div class="el-table">
      <table class="el-table__header">
        <tr>
          <th>订单编号</th>
          <th>服务商</th>
          <!-- <th>物流单号</th> -->
          <th>订单重量（kg）</th>
          <th>发件人名称</th>
          <th>收件人名称</th>
          <th>订单金额</th>
          <th>创建时间</th>
          <th>支付时间</th>
          <th>状态</th>
        </tr>
      </table>
      <table class="el-table__body">
        <tr v-if="tableData && tableData.length" v-for="item in tableData" :key="item.id">
          <td> {{ item.orderNo }} </td>
          <td> {{ item.channelName }} </td>
          <!-- <td> {{ item.serviceNo }} </td> -->
          <td> {{ item.weight }} </td>
          <td> {{ item.fromName }} </td>
          <td> {{ item.toName }} </td>
          <td> {{ item.amount }} </td>
          <td> {{ item.updateTime | parseTime }} </td>
          <td> {{ item.paytime | parseTime }} </td>
          <td> {{ item.state | getStateName(stateOptions) }} </td>
        </tr>
      </table>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="onCurrentChange"
        :total="pageing.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Sticky from '@/components/Sticky'
  import { parseTime } from '@/utils/index'
  import { fetchOrderList } from '@/api'
  export default {
    name: 'order',
    data() {
      return {
        loading: false,
        activeName: 'first',
        tableData: [],
        params: {
          serviceNo: null,
          orderId: null,
          state: null,
          startTime: null,
          endTime: null
        },
        stateOptions: [
          { label: '代付款', value: 0 },
          { label: '已付款', value: 1 },
          { label: '付款失败', value: 2 },
          { label: '申请退款', value: 3 },
          { label: '已退款', value: 4 }
        ],
        time: null,
        pageing: {
          pageSize: 20,
          page: 1,
          total: 0
        }
      }
    },
    watch: {
      time(val) {
        console.log(val)
        if (val.length === 2) {
          this.params.startTime = val[0]
          this.params.endTime = val[1]
        }
      }
    },
    mounted() {
      this.load()
    },
    methods: {
      onSearch() {
        this.pageing.page = 1
        this.load()
      },
      load() {
        const params = Object.assign({}, this.params, this.pageing)
        fetchOrderList(params).then(res => {
          this.tableData = res.page.items
          this.pageing.total = res.page.total
        })
      },
      onCurrentChange(val) {
        this.pageing.page = val
        this.load()
      },
      submitForm() {},
      handleClick() {}
    },
    filters: {
      parseTime,
      getStateName(index, options) {
        const item = options.find(item => index === item.value)
        const str = item ? item.label : ''
        return str
      }
    },
    components: {
      Sticky
    }
  }
</script>

<style>
  .el-table > table {
    width: 100%;
  }
  .order-container {
    /* padding: 0 20px; */
  }
  .order-container .el-tabs__header {
    margin-bottom: 0
  }
  .sub-navbar {
    height: 50px;
    line-height: 50px;
    position: relative;
    width: 100%;
    /* text-align: right; */
    padding-right: 20px;
    padding-left: 20px;
    transition: position .6s ease;
    background: linear-gradient(90deg, #eee, #f8f8f8, #f4f4f4 100%, #2178f1 0);
  }
  .table-fixed {
    table-layout: fixed;
  }
  .filter-container {
    border-bottom: 1px solid #ddd;
  }
  .filter-container .el-row {
    margin-bottom: 20px;
  }
  .row-text {
    padding-top: 10px;
  }
</style>


