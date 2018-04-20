<template>
  <div>
    <ul class="user-list">
      <li>登录名： {{ info.username }}</li>
      <li>姓名： {{ info.realname }}</li>
      <li>身份： {{ info.roleName }}</li>
      <li>邮箱： {{ info.email }}</li>
      <li>电话： {{ info.phone }}</li>
      <li>地址： {{ info.address }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'user',
    computed: {
      ...mapState({
        info: state => state.user.info
      })
    }
}
</script>

<style>
  .user-list{
    list-style: none;
    line-height: 30px;
  }
</style>


