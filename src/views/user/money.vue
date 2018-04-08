<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="accountNumber"
        label="账户编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="accountName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="充值金额"
        width="180">
      </el-table-column>
      <el-table-column
        prop="bankName"
        label="银行名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="checkTime"
        label="审核时间">
      </el-table-column>
      <el-table-column
        prop="checkUserName"
        label="审核人">
      </el-table-column>
      <el-table-column
        prop="contactMobile"
        label="	联系人">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="onAudit(scope.row)">审核通过</el-button>
          <!-- <el-button @click="onDel(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  import * as API from '@/api'
  export default {
    name: 'admin-view',
    data() {
      return {
        tableData: null,
        params: {
          status: 0
        }
      }
    },
    mounted() {
      this.load()
    },
    methods: {

      onEdit(data) {
        this.action = 'edit'
        this.form = { ...data }
        this.dialogVisible = true
      },

      load() {
        API.fetchFundAudit(this.params).then(res => {
          this.tableData = res.page.items
        })
      },
      onAudit(data) {
        API.updateFundAudit({
          custId: data.custId, 
          fundDetailId: data.fundDetailId,
          status: 2
        }).then(res => {
          // 重新请求数据
          this.load()
          this.dialogVisible = false
        })
      }
    }
  }
</script>

<style scoped>
  
  .menu-add{
    position:absolute;
    right: 0;
    top: 0;
  }
</style>




