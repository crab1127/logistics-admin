<template>
  <div class="order-container">
    <router-link :to="{name: 'cmsCreate'}">
      <el-button icon="el-icon-plus" type="primary" style="margin-bottom:20px;"> 添加文章</el-button>
    </router-link>
    <div class="filter-container">
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="row-text">
          标题: 
          </div>
        </el-col>
        <el-col :span="6">
          <el-input v-model="params.title" placeholder="请输入内容"></el-input>
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
      <table class="el-table__header">
        <tr>
          <th>标题</th>
          <th>封面</th>
          <!-- <th>物流单号</th> -->
          <th>描述</th>
          <th>作者</th>
          <th>创建时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </table>
      <table class="el-table__body">
        <tr v-if="tableData && tableData.length" v-for="item in tableData" :key="item.id">
          <td> {{ item.title }} </td>
          <td> {{ item.imgUrl }} </td>
          <!-- <td> {{ item.serviceNo }} </td> -->
          <td> {{ item.description }} </td>
          <td> {{ item.createUserName }} </td>
          <td> {{ item.createTime | parseTime }} </td>
          <td>
            <el-switch
              v-model="item.status"
              @change="onUpdateStatus"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </td>
          <td> 
            <el-button @click="onEdit(item.id)">编辑</el-button>
            <el-button @click="onDel(item.id)">删除</el-button>
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
  import { fetchCmsList, deleteCms, updateCmsStatus } from '@/api'
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
        fetchCmsList(params).then(res => {
          this.tableData = res.page.items
          this.pageing.total = res.page.total
        })
      },
      onCurrentChange(val) {
        this.pageing.page = val
        this.load()
      },
      onUpdateState(id, status) {
        updateCmsStatus(id, {status})
      },
      onDel(id) {
        this.$confirm('确定删除文件', '提示', {
          type: 'warning'
        }).then(() => {
          deleteCms(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
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


