<template>
  <div class="order-container">
    <router-link :to="{name: 'serviceCreate'}">
      <el-button icon="el-icon-plus" type="primary" style="margin-bottom:20px;"> 添加服务</el-button>
    </router-link>
    <div class="filter-container" style="display: none">
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="row-text">
          标题: 
          </div>
        </el-col>
        <el-col :span="6">
          <el-input v-model="params.productTitle" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="2">
          <div class="row-text">
          时间：
          </div>
        </el-col>
        <el-col :span="12">
          <el-date-picker v-model="time" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
          </el-date-picker>
        </el-col>
        <el-col :span="2">
          <el-button @click="onSearch" type="primary">搜索</el-button>
        </el-col>
      </el-row>

    </div>
    <div class="el-table">
      <table class="el-table__body">
        <thead class="el-table__header">
          <tr>
            <th>服务名称</th>
            <th>服务logo</th>
            <th>服务类型</th>
            <!-- <th>创建时间</th> -->
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tr v-if="tableData && tableData.length" v-for="item in tableData" :key="item.serviceId">
          <td> {{ item.serviceName }} </td>
          <td> <img :src="item.logoService" alt="" width="150" height="150" >  </td>
          <td> {{ item.feeType | getfeeType }} </td>
          <!-- <td> {{ item.productDesc }} </td> -->
          <!-- <td> {{ item.createTime | parseTime }} </td> -->
          <td>
            <el-popover
              placement="bottom"
              width="400"
              trigger="hover">
              <div slot="reference">{{ item.status | getStateName(stateOptions) }}</div>
              <el-radio-group v-model="item.status" @change="onUpdateState(item.serviceId, item.status)" :data-id="item.serviceId">
                <el-radio v-for="item1 in stateOptions" :key="item1.value" :label="item1.value">{{ item1.label }}</el-radio>
              </el-radio-group>
            </el-popover>
          </td>
          <td> 
            <router-link :to="{name: 'serviceUpdate', params: {id: item.serviceId}}">
              <el-button >编辑</el-button>
            </router-link>
            <el-button @click="onDel(item.serviceId)">删除</el-button>
           </td>
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
  import { parseTime } from '@/utils/index'
  import { 
    fetchServiceList, 
    deleteService,
    updateServiceStatus 
  } from '@/api'
  export default {
    name: 'order',
    data() {
      return {
        loading: false,
        tableData: [],
        params: {
          serviceNo: null,
          orderId: null,
          state: null,
          startTime: null,
          endTime: null
        },
        time: null,
        pageing: {
          pageSize: 20,
          page: 1,
          total: 0
        },
        stateOptions: [
          { label: '未发布', value: 0 },
          { label: '已发布', value: 1 }
        ]
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
        fetchServiceList(params).then(res => {
          this.tableData = res.data
          this.pageing.total = res.page.total
        })
      },
      onCurrentChange(val) {
        this.pageing.page = val
        this.load()
      },
      onUpdateState(id, status) {
        console.log(id,status )
        updateServiceStatus(id, status)
      },
      onDel(id) {
        this.$confirm('确定删除文件', '提示', {
          type: 'warning'
        }).then(() => {
          deleteService(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
      }
    },
    filters: {
      parseTime,
      getStateName(index, options) {
        const item = options.find(item => index === item.value)
        const str = item ? item.label : ''
        return str
      },
      getfeeType (type) {
        const feeTypeOptions = [
          {label: '上门取货费', value: 'feePickup'},
          {label: '自己送到网点', value: 'selfDelivery'}
        ]
        const item = feeTypeOptions.find(item => item.value === type)
        return item ? item.label : ''
      }
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
  .row-text {
    padding-top: 10px;
  }
</style>


