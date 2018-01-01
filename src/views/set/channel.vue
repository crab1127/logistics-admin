<template>
  <div>
    <router-link :to="{name: 'channel-create'}">
      <el-button type="primary" icon="plus" >{{ $t('channel.add') }}</el-button>
    </router-link>
     
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
  </div>
</template>

<script>
  import { fetchChannel } from '@/api/index'
  export default {
    name: 'channel',
    data() {
      return {
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
      load() {
        fetchChannel().then(res => {
          console.log(12344, res)
          this.tableData = res.page.items
        })
      }
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




