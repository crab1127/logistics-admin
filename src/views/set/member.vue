<template>
  <div>
    <sticky>
      <div class="tool-bar">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="用户成员" name="first"></el-tab-pane>
          <el-tab-pane label="后台管理员" name="second"></el-tab-pane>
        </el-tabs>
        <el-button type="text" icon="plus" class="menu-add" @click="dialogVisible = true">添加用户</el-button>
      </div>
    </sticky>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="moblie"
        label="电话"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary">编辑</el-button>
          <el-button>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form label-width="100px" :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.region"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Sticky from '@/components/Sticky'
  export default {
    name: 'address',
    data () {
      return {
        dialogVisible: false,
        activeName: 'first',
        form: {},
        tableData: [
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
          {name: '某某', moblie: '1867964412', address: '中国广州天河荷光路'},
        ]
      }
    },
    methods: {
      
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




