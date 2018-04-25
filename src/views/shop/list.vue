<template>
  <div class="order-container">
    <el-button @click="onCreate" icon="el-icon-plus" type="primary" style="margin-bottom:20px;"> 添加商品</el-button>

    <div class="el-table">
      <table class="el-table__body">
        <thead class="el-table__header">
          <tr>
            <th>商品</th>
            <!-- <th>封面</th>
            <th>产品地址</th> -->
            <!-- <th>描述</th> -->
            <th>创建时间</th>
            <!-- <th>状态</th> -->
            <th>操作</th>
          </tr>
        </thead>
        <tr v-if="tableData && tableData.length" v-for="item in tableData" :key="item.id">
          <td> {{ item.productNameCn }} </td>
          <!-- <td> <img :src="item.imgUrl" alt="" width="150" height="150" >  </td>
          <td> <a :href="item.linkUrl" target="_blank"> 外链</a> </td> -->
          <!-- <td> {{ item.productDesc }} </td> -->
          <td> {{ item.createDate | parseTime }} </td>
          <!-- <td>
            <el-popover
              placement="bottom"
              width="400"
              trigger="hover">
              <div slot="reference">{{ item.status | getStateName(stateOptions) }}</div>
              <el-radio-group v-model="item.status" @change="onUpdateState(item.id, item.status)" :data-id="item.id">
                <el-radio v-for="item1 in stateOptions" :key="item1.value" :label="item1.value">{{ item1.label }}</el-radio>
              </el-radio-group>
            </el-popover>
          </td> -->
          <td> 
            <el-button @click="onEdit(item)">编辑</el-button>
            <el-button @click="onDel(item.productId)">删除</el-button>
           </td>
        </tr>
      </table>
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        @current-change="onCurrentChange"
        :total="pageing.total">
      </el-pagination> -->
    </div>
     <el-dialog
      :visible.sync="dialogVisible"
      width="800px">

      <el-form label-width="100px">
        <el-form-item label="中文">
          <el-input v-model="formData.productNameCn"></el-input>
        </el-form-item>

        <el-form-item label="英文">
          <el-input v-model="formData.productNameEn"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="onSumbit"> 确定 </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { parseTime } from '@/utils/index'
  import { fetchCustomerProductList, deleteCustomerProduct, createCustomerProduct, updateCustomerProduct } from '@/api'
  export default {
    name: 'order',
    data() {
      return {
        dialogVisible: false,
        tableData: [],
        formData: {
          productNameCn: null,
          productNameEn: null
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
        fetchCustomerProductList(params).then(res => {
          this.tableData = res.data
          // this.pageing.total = res.page.total
        })
      },
      onEdit(item) {
        Object.assign(this.formData, item)
        this.dialogVisible = true
      },
      onCreate() {
        this.formData = {
          productNameCn: null,
          productNameEn: null
        }
        this.dialogVisible = true
      },
      onDel(id) {
        this.$confirm('确定删除文件', '提示', {
          type: 'warning'
        }).then(() => {
          deleteCustomerProduct(id).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
      },
      onSumbit() {
        let request
        if (this.$route.name === 'shopCreate') {
          request = createCustomerProduct(this.formData)
        } else {
          request = updateCustomerProduct(this.formData)
        }
        request.then(res => {
          this.$message('添加成功')
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


