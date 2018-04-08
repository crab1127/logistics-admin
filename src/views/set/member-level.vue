<template>
  <div>
    <sticky>
      <el-button type="primary" icon="plus" @click="onAdd">{{ $t('common.add') }}</el-button>
    </sticky>

    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="会员名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="moblie"
        label="渠道"
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
          <el-button type="primary" @click="onEdit(scope.row)">编辑</el-button>
          <el-button @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form label-width="100px">

        <el-form-item label="会员等级名">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>

        <div v-for="(item, index) in form.channelFeeRebateList" :key="index" class="channel-wrap">
          <el-form-item label="渠道">
            <el-select v-model="item.channelId">
               <el-option 
                v-for="item in channelList" 
                :key="item.id"
                :label="item.name" 
                :value="item.id" />
            </el-select>
          </el-form-item>

          <el-form-item label="费用类型">
            <el-select v-model="item.feeId">
              <el-option label="feePickup" value="feePickup"></el-option>
              <el-option label="feeDelivery" value="feeDelivery"></el-option>
              <el-option label="feeLogistics" value="feeLogistics"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="费用折扣">
            <el-input type="number" v-model="item.rebate"></el-input>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button @click="onAddChannel">
            添加
          </el-button> 
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="onSubmit">{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  const mailCostObj = {
    name: '',
    channelFeeRebateList: [{
      channelId: null,
      feeId: null,
      rebate: null
    }]
  }
  import Sticky from '@/components/Sticky'
  import * as API from '@/api/mail'
  import { fetchChannel } from '@/api'
  export default {
    name: 'address',
    computed: {
      dialogTitle() {
        let title
        if (this.action === 'add') {
          if (this.activeName === 'from') {
            title = this.$t('address.tjsjrxx')
          } else {
            title = this.$t('address.tjfjrxx')
          }
        } else {
          if (this.activeName === 'from') {
            title = this.$t('address.xgsjrxx')
          } else {
            title = this.$t('address.xgfjrxx')
          }
        }
        return title
      }
    },
    data() {
      return {
        dialogVisible: false,
        activeName: 'from',
        action: 'add',
        form: {},
        tableData: [],
        channelList: []
      }
    },
    watch: {
      activeName(val) {
        this.load()
      }
    },
    mounted() {
      this.load()
      this.loadChannel()
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
        this.form = { ...mailCostObj }
        this.dialogVisible = true
      },
      onEdit(data) {
        this.action = 'edit'
        this.form = { ...data }
        this.dialogVisible = true
      },
      onDel(data) {
        const id = data.id
        this.$confirm(this.$t('address.delTip')).then(() => this.del(id))
      },
      load() {
        API.discountList().then(res => {
          this.tableData = res.page.items
        })
      },
      update() {
        const id = this.form.id
        const form = { ...this.form }
        const addressUpdateServe = API.discountUpdate(form)
        addressUpdateServe.then(res => {
          // 重新请求数据
          this.load()
          this.dialogVisible = false
        })
      },
      create() {
        const form = { ...this.form }
        const addressCreateServe = API.discountCreate(form)
        addressCreateServe.then(res => {
          // 重新请求数据
          this.load()
          this.dialogVisible = false
        })
      },
      del(id) {
        const addressUpdateServe = API.discountDelete(id)
        addressUpdateServe.then(res => {
          // 重新请求数据
          this.load()
        })
      },
      onAddChannel() {
        this.form.channelFeeRebateList.push({
          channelId: null,
          feeId: null,
          rebate: null
        })
      },
      onDelPick(index) {
        this.form.pickUpLadderlList.splice(index, 1)
      },
      loadChannel() {
        fetchChannel().then(res => {
          this.channelList = res.page.items
        })
      }
    },
    components: {
      Sticky
    }
  }
</script>

<style scoped>
  .menu-add {
    position: absolute;
    right: 0;
    top: 0;
  }
  .channel-wrap {
    border: 1px dotted #fdd;
    padding: 10px 10px 0;
    margin-bottom: 10px;
  }
</style>




