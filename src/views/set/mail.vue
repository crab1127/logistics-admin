<template>
  <div>
    <sticky>
      <el-button type="primary" icon="plus" @click="onAdd">{{ $t('common.add') }}</el-button>
    </sticky>
    <el-row>
      <el-col :span="6" v-for="(item, index) in tableData" :key="index">
        <el-card >
          <h3>国家：{{ item.countryCn }}</h3>
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
      width="800px">
      <el-form label-width="100px">

        <el-form-item :label="$t('common.country')">
          <el-select v-model="form.countryId" placeholder="请选择">
            <el-option 
              v-for="item in countryList" 
              :key="item.value"
              :label="item.label" 
              :value="item.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="取件价格阶梯">
          <div v-for="(item, index) in form.pickUpLadderlList" :key="index" >
            <el-col :span="6">
              <el-input v-model="item.weightFrom" type="number"> 
                <template slot="prepend">重量(kg)</template>
              </el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="6">
              <el-input v-model="item.weightTo" type="number">
                <template slot="prepend">重量(kg)</template>
              </el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">:</el-col>
            <el-col :span="6">
              <el-input v-model="item.amount" type="number">
                <template slot="prepend">区间金额</template>
              </el-input>
            </el-col>
            <el-col class="line" :span="1" style="color:#fff">.</el-col>
            <el-col :span="3">
              <el-button @click="onDelPick(index)" v-if="index !== 0">删除</el-button>
            </el-col>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="row-center">
            <el-button type="primary" @click="onAddPick" >添加</el-button>
          </div>
        </el-form-item>

        <el-form-item label="派送价格阶梯">
          <div v-for="(item, index) in form.deliveryLadderList" :key="index" >
            <el-col :span="6">
              <el-input v-model="item.weightFrom" type="number">
                <template slot="prepend">重量(kg)</template>
              </el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">-</el-col>
            <el-col :span="6">
              <el-input v-model="item.weightTo" type="number">
                <template slot="prepend">重量(kg)</template>
              </el-input>
            </el-col>
            <el-col class="line" :span="1" style="text-align: center">:</el-col>
            <el-col :span="6">
              <el-input v-model="item.amount" type="number">
                <template slot="prepend">区间金额</template>
              </el-input>
            </el-col>
            <el-col class="line" :span="1" style="color:#fff">.</el-col>
            <el-col :span="3">
              <el-button @click="onDelDelivery(index)" v-if="index !== 0">删除</el-button>
              </el-col>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="row-center">
            <el-button @click="onAddDelivery" type="primary">添加</el-button>
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
  const mailCostObj = {
    countryId: '', // *详细地址 string
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
  }
  import Sticky from '@/components/Sticky'
  import * as API from '@/api/mail'
  import { fetchAreaCountry } from '@/api'
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
        tableData: [],
        countryList: [
          { label: '中国', value: '23' },
          { label: '英国', value: '102' }
        ]
      }
    },
    watch: {
      activeName(val) {
        this.load()
      }
    },
    mounted() {
      this.load()
      // fetchAreaCountry({type: 1}).then(res => {
      //   this.countryList = res.data
      // })
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
        const id = this.activeName === 'from' ? data.fromAddrId : data.reachAddrId
        this.$confirm(this.$t('address.delTip')).then(() => this.del(id))
      },
      load() {
        API.fetchMailCostList().then(res => {
          this.tableData = res.data
        })
      },
      update() {
        const id = this.form.id
        const form = { ...this.form }
        const addressUpdateServe = API.mailCostUpdate(id, form)
        addressUpdateServe.then(res => {
          // 重新请求数据
          this.load()
          this.dialogVisible = false
        })
      },
      create() {
        const form = { ...this.form }
        const addressCreateServe = API.mailCostCreate(form)
        addressCreateServe.then(res => {
          // 重新请求数据
          this.load()
          this.dialogVisible = false
        })
      },
      del(id) {
        const addressUpdateServe =  API.mailCostDelete(id)
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




