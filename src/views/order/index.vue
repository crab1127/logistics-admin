<template>
  <div class="order-container">
    <sticky>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的快递" name="first"></el-tab-pane>
        <el-tab-pane label="等待付款" name="second"></el-tab-pane>
      </el-tabs>
      <div class="sub-navbar">
        <label for="">时间:</label>
        <el-date-picker v-model="from.time" type="datetimerange" :picker-options="pickerOptions2" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
        </el-date-picker>
      </div>
    </sticky>
    <div class="el-table">
      <table class="el-table__header">
        <colgroup>
          <col width="30"/>
          <col width="10"/>
          <col width="10"/>
          <col width="20"/>
          <col width="10"/>
          <col width="20"/>
        </colgroup>
        <tr>
          <th>服务商</th>
          <th>订单数量</th>
          <th>订单重量（kg）</th>
          <th>订单状态</th>
          <th>订单金额</th>
          <th>操作</th>
        </tr>
      </table>
      <table class="el-table__body">
        <colgroup>
          <col width="30"/>
          <col width="10"/>
          <col width="10"/>
          <col width="20"/>
          <col width="10"/>
          <col width="20"/>
        </colgroup>
        <tr>
          <td colspan="6"> 顶啊点</td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/404_images/404.png" width="200" alt="">
          </td>
          <td>
            1213
          </td>
          <td>23KG</td>
          <td>出货</td>
          <td> <span class="red"> $28</span> </td>
          <td> <el-button>删除</el-button> </td>
        </tr>
        <tr>
          <td>
            <img src="../../assets/404_images/404.png" width="200" alt="">
          </td>
          <td>
            1213
          </td>
          <td>23KG</td>
          <td>出货</td>
          <td> <span class="red"> $28</span> </td>
          <td> <el-button>删除</el-button> </td>
        </tr>
      </table>

    </div>
  </div>
</template>

<script>
  import Sticky from '@/components/Sticky'
  import { fetchOrderList, updateOrder, deleteOrder } from '@/api'
  export default {
    name: 'order',
    data() {
      return {
        loading: false,
        activeName: 'first', 
        tableData: [],
        from: {
          time: null
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    mounted () {
      this.load()
    },
    methods: {
      load() {
        fetchOrderList().then(res => {
          this.tableData = res.page.items
        })
      },
      onDel (data) {
        delChannel(data.id).then(res => {
          this.load()
        })
      },
      submitForm() {},
      handleClick() {}
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
</style>


