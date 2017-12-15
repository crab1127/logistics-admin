import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },

  // 订单管理
  {
    path: '/order',
    component: Layout,
    redirect: '/order',
    name: 'order',
    meta: { title: 'order' },
    children: [{
      path: '',
      name: 'order-list',
      meta: { title: 'orderList' },
      component: _import('order/index')
    }]
  },

  // 设置
  {
    path: '/set',
    component: Layout,
    redirect: '/set/mail',
    name: 'set',
    meta: { title: 'set' },
    children: [{
      path: 'channel',
      name: 'channel',
      meta: { title: 'channel' },
      component: _import('set/channel')
    },
    {
      path: 'channel/create',
      name: 'channel-create',
      meta: { title: 'channelCreate' },
      component: _import('set/channel-edit'),
      hidden: true
    },
    {
      path: 'mail',
      name: 'set-mail',
      meta: { title: 'mail' },
      component: _import('set/mail')
    },
    {
      path: 'address',
      name: 'set-address',
      meta: { title: 'address' },
      component: _import('set/address')
    },
    {
      path: 'member',
      name: 'set-member',
      meta: { title: 'member' },
      component: _import('set/member')
    }
    ]
  },

  // 账号
  {
    path: '/user',
    meta: { title: 'user' },
    component: Layout,
    children: [{
      path: 'index',
      name: 'user',
      meta: { title: 'userInfo' },
      component: _import('user/index')
    },
    {
      path: 'money',
      name: 'money',
      meta: { title: 'money' },
      component: _import('user/money')
    }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
