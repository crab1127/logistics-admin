<template>
  <div>
    <router-link :to="{name: 'channel-create'}">
      <el-button type="primary" icon="plus" >{{ $t('channel.add') }}</el-button>
    </router-link>
     
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column  width="300" :label="$t('address.name')">
        <template slot-scope="scope">
          <div class="media">
            <img class="media-left" :src="scope.row.logoImg" width="100px" height="100px">
            <div class="media-body">
              <h4 class="media-heading">
                {{ scope.row.name }}
              </h4>
              <p> {{ scope.row.channelDesc }} </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="fromAreaId" label="发件区域">
      </el-table-column>
      <el-table-column prop="reachAreaId" label="收件区域">
      </el-table-column>
      <el-table-column prop="floatRate" label="上浮利率">
      </el-table-column>
      <el-table-column label="派送时间区间">
        <template slot-scope="scope">
          <div> {{ scope.row.costTimeFrom }} ~ {{ scope.row.costTimeTo }} </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link :to="{name: 'channel-update', params: { id:scope.row.id }}">
            <el-button type="primary">{{ $t('common.edit') }}</el-button>
          </router-link>
          <el-button @click="onDel(scope.row)">删除</el-button>
          <el-button v-if="scope.row.status != 2" @click="onUpdate(scope.row, 2)">下架</el-button>
          <el-button v-if="scope.row.status != 1" @click="onUpdate(scope.row, 1)">发布</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { fetchChannel, updateChannelStatus, delChannel } from '@/api/index'
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
      },
      onDel (data) {
        delChannel(data.id).then(res => {
          this.load()
        })
      },
      onUpdate(data, status) {
        updateChannelStatus(data.id, { status}).then(res => {
          this.load()
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




