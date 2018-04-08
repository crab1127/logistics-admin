<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="realname"
        label="真实名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="onEdit(scope.row)">编辑</el-button>
          <!-- <el-button @click="onDel(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form label-width="100px" :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="真实名称">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  const customerObj = {
   	email: null, //	邮箱	string	
    phone: null, //	手机号	string	
    realname: null, //	真实名称	string	
    password: null, //	enabled/ disabled	string	
    username: null
  }
  import Sticky from '@/components/Sticky'
  import * as API from '@/api'
  export default {
    name: 'customer-view',
    computed: {
      dialogTitle() {
        let title = 'tianjia'
        return title
      }
    },
    data() {
      return {
        dialogVisible: false,
        action: 'add',
        form: { ...customerObj},
        tableData: [],
        countryList: []
      }
    },
    watch: {
      activeName(val) {
        this.load()
      }
    },
    mounted() {
      this.load()
    },
    methods: {
      onSubmit() {
        if (this.action === 'add') {
          this.create()
        } else {
          this.update()
        }
      },
      onAdd() {
        this.action = 'add'
        this.form = { ...customerObj }
        this.dialogVisible = true
      },
      onEdit(data) {
        this.action = 'edit'
        this.form = { ...data }
        this.dialogVisible = true
      },
      onDel(data) {
        const id = data.id
        this.$confirm('确定删除ma').then(() => this.del(id))
      },
      load() {
        API.fetchCustomerList().then(res => {
          this.tableData = res.page.items
        })
      },
      update() {
        const id = this.form.id
        const form = { ...this.form }
        API.updateCustomer(id, form).then(res => {
          // 重新请求数据
          this.load()
          this.dialogVisible = false
        })
      },
      del(id) {
        API.detailCustomer(id).then(res => {
          // 重新请求数据
          this.load()
        })
      }
    },
    components: {
      Sticky
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




