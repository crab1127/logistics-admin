<template>
  <div>
    <sticky>
      <div class="tool-bar">
        <el-tabs v-model="activeName">
          <el-tab-pane :label="$t('address.sjdz')" name="from"></el-tab-pane>
          <el-tab-pane :label="$t('address.fjdz')" name="reach"></el-tab-pane>
        </el-tabs>
        <el-button type="text" icon="plus" class="menu-add" @click="onAdd">{{ $t('common.add') }}</el-button>
      </div>
    </sticky>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="englishName" :label="$t('address.name')">
      </el-table-column>
      <el-table-column prop="mobile" :label="$t('address.tel')">
      </el-table-column>
      <el-table-column prop="email" :label="$t('address.mail')">
      </el-table-column>
      <el-table-column prop="postcode" :label="$t('address.zipcode')">
      </el-table-column>
      <el-table-column prop="countryId" :label="$t('address.country')">
      </el-table-column>
      <el-table-column prop="address" :label="$t('address.address')">
      </el-table-column>
      <el-table-column width="200" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="onEdit(scope.row)">{{ $t('common.edit') }}</el-button>
          <el-button @click="onDel(scope.row)">{{ $t('common.del') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form label-width="100px" :model="form">
        <el-form-item :label="$t('address.name')">
          <el-input v-model="form.englishName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.tel')">
          <el-input v-model="form.moblie"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.mail')">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.zipcode')">
          <el-input v-model="form.postcode"></el-input>
        </el-form-item>
        <el-form-item :label="$t('address.country')">
          <el-select v-model="form.countryId">
            <el-option label="中国" value="1" />
            <el-option label="英国" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('address.address')">
          <div class="flex">
            <el-input v-model="form.provice" :placeholder="$t('address.provice')"></el-input>
            <el-input v-model="form.city" :placeholder="$t('address.city')"></el-input>
            <el-input v-model="form.town" :placeholder="$t('address.town')"></el-input>
           </div>
           <!-- <el-input v-model="form.street"></el-input> -->
           <el-input v-model="form.address" :placeholder="$t('address.address_more')"></el-input>
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
        form: { ...addressObj },
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




