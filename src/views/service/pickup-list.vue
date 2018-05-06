<template>
  <div class="order-container">
    <router-link :to="{name: 'servicePickupCreate'}">
      <el-button icon="el-icon-plus" type="primary" style="margin-bottom:20px;"> 添加取件服务合作商</el-button>
    </router-link>
    <div class="el-table">
      <table class="el-table__body">
        <thead class="el-table__header">
          <tr>
            <th>网点名称</th>
            <th>logo</th>
            <th>合作商</th>
            <th>服务商</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tr v-if="tableData && tableData.length" v-for="item in tableData" :key="item.id">
          <td> {{ item.name }} </td>
          <td> <img :src="item.logoService" alt="" width="150" height="150" >  </td>

          <td> {{ item.partnerName }} </td>
          <td> {{ item.serviceId }} </td>
          <td>
            <el-popover
              placement="bottom"
              width="400"
              trigger="hover">
              <div slot="reference">{{ item.status | getStateName(stateOptions) }}</div>
              <el-radio-group v-model="item.status" @change="onUpdateState(item.id, item.status)" :data-id="item.id">
                <el-radio v-for="item1 in stateOptions" :key="item1.value" :label="item1.value">{{ item1.label }}</el-radio>
              </el-radio-group>
            </el-popover>
          </td>
          <td> 
            <router-link :to="{name: 'servicePickupUpdate', params: {id: item.id}}">
              <el-button >编辑</el-button>
            </router-link>
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
  import { 
    fetchServicePickupList,
    updateServicePickupStatus,
    deleteServicePickup } from '@/api'
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
        fetchServicePickupList(params).then(res => {
          this.tableData = res.page.items
          this.pageing.total = res.page.total
        })
      },
      onCurrentChange(val) {
        this.pageing.page = val
        this.load()
      },
      onUpdateState(id, status) {
        updateServicePickupStatus(id, status)
      },
      onDel(id) {
        this.$confirm('确定删除取件服务合作商', '提示', {
          type: 'warning'
        }).then(() => {
          deleteServicePickup(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.load()
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


