<template>
  <div>
    <sticky>
      <el-button type="primary" icon="plus" @click="onAdd">{{ $t('common.add') }}</el-button>
    </sticky>

    <el-row>
      <el-col :span="8" v-for="(item, index) in tableData" :key="index" :offset="index > 0 ? 2 : 0">
        <el-card >
          <h3>国家：{{ item.countryId }}</h3>
          <div >
            <span>取件价格阶梯</span>
            <div v-for="(a, index) in item.pickUpLadderlList" :key="index">
              范围：{{ a.weightFrom }} ~ {{ a.weightTo }}, 价格： {{ a.amount }}
            </div>
          </div>
          <div >
            <span>派送价格阶梯	</span>
            <div v-for="(a, index) in item.deliveryLadderList" :key="index">
              范围：{{ a.weightFrom }} ~ {{ a.weightTo }}, 价格： {{ a.amount }}
            </div>
          </div>
          <div class="bottom clearfix">
            <el-button type="primary" class="button" @click="onEdit(item)">{{ $t('common.edit') }} </el-button>
            <el-button class="button" @click="onDel(item)">{{ $t('common.del') }}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form label-width="100px">

        <el-form-item :label="$t('address.name')">
          <el-select v-model="value" placeholder="请选择">
            <el-option label="中国" value="1"></el-option>
            <el-option label="英国" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="取件价格阶梯">
          <div v-for="(item, index) in form.pickUpLadderlList" :key="index" >
            <el-col :span="5">
              <el-input v-model="item.weightFrom" placeholder="重量区间(kg)"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="5">
              <el-input v-model="item.weightTo" placeholder="重量区间(kg)"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">:</el-col>
            <el-col :span="5">
              <el-input v-model="item.amount" placeholder="金额"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="color:#fff">.</el-col>
            <el-col :span="4">
              <el-button @click="onDelPick(index)" v-if="index !== 0">删除</el-button>
              <el-button @click="onAddPick" v-if="(index + 1) === formData.feeLadderList.length">添加</el-button>
            </el-col>
          </div>
        </el-form-item>

        <el-form-item label="派送价格阶梯">
          <div v-for="(item, index) in form.deliveryLadderList" :key="index" >
            <el-col :span="5">
              <el-input v-model="item.weightFrom" placeholder="重量区间(kg)"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">-</el-col>
            <el-col :span="5">
              <el-input v-model="item.weightTo" placeholder="重量区间(kg)"></el-input>
            </el-col>
            <el-col class="line" :span="2" style="text-align: center">:</el-col>
            <el-col :span="5">
              <el-input v-model="item.amount" placeholder="金额"></el-input>
            </el-col>
            <el-col class="line" :span="1" style="color:#fff">.</el-col>
            <el-col :span="4">
              <el-button @click="onDelDelivery(index)" v-if="index !== 0">删除</el-button>
              <el-button @click="onAddDelivery" v-if="(index + 1) === formData.feeLadderList.length">添加</el-button>
            </el-col>
          </div>
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
  const addressObj = {
    address: '', // *详细地址 string
    city: '', // * string
    countryId: '', // *国家ID number
    email: '', // *邮箱 string
    englishName: '', // *名称 strig
    mobile: '', // *手机号 string
    postcode: '', // *地区邮编 string
    provice: '', // string
    street: '', // *街道 string
    town: '' //
  }
  import Sticky from '@/components/Sticky'
  import * as API from '@/api/address'
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
        form: {
          countryId: null,
          deliveryLadderList: [{
            amount: null,
            weightFrom: null,
            weightTo: null
          }],
          pickUpLadderlList: [{
            amount: null,
            weightFrom: null,
            weightTo: null
          }]
        },
        tableData: []
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
        this.form = { ...addressObj }
        this.dialogVisible = true
      },
      onEdit(data) {
        this.action = 'edit'
        this.form = { ...data }
        this.dialogVisible = true
      },
      onDel(data) {
        const id = this.activeName === 'from' ? data.fromAddrId : data.reachAddrId
        this.$confirm(this.$t('address.delTip')).then(() => this.del(id))
      },
      load() {
        const addressServe = this.activeName === 'from' ? API.addressFromList() : API.addressReachList()
        addressServe.then(res => {
          console.log(12344, res)
          this.tableData = res.data
        })
      },
      update() {
        const id = this.form.id
        const form = { ...this.form }
        const addressUpdateServe = this.activeName === 'from' ? API.addressFromUpdate(id, form) : API.addressReachUpdate(id, form)
        addressUpdateServe.then(res => {
          // 重新请求数据
          this.load()
          this.dialogVisible = false
        })
      },
      create() {
        const form = { ...this.form }
        const addressCreateServe = this.activeName === 'from' ? API.addressFromCreate(form) : API.addressReachCreate(form)
        addressCreateServe.then(res => {
          // 重新请求数据
          this.load()
          this.dialogVisible = false
        })
      },
      del(id) {
        const addressUpdateServe = this.activeName === 'from' ? API.addressFromDelete(id) : API.addressFromDelete(id)
        addressUpdateServe.then(res => {
          // 重新请求数据
          this.load()
        })
      },
      onAddPick() {
        this.form.pickUpLadderlList.push({
          amount: null, // 金额 string
          weightFrom: null, // 重量区间(kg) string
          weightTo: null // 重量区间 string
        })
      },
      onDelPick(index) {
        this.form.pickUpLadderlList.splice(index, 1)
      },
      onAddDelivery() {
        this.form.deliveryLadderList.push({
          amount: null, // 金额 string
          weightFrom: null, // 重量区间(kg) string
          weightTo: null // 重量区间 string
        })
      },
      onDelDelivery(index) {
        this.form.deliveryLadderList.splice(index, 1)
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
</style>




