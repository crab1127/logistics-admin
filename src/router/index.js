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
      path: 'channel/:id',
      name: 'channel-update',
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
      path: 'member',
      name: 'set-member',
      meta: { title: 'member' },
      component: _import('set/member')
    },
    {
      path: 'customer',
      name: 'set-customer',
      meta: { title: 'customer' },
      component: _import('set/customer')
    },
    {
      path: 'member-level',
      name: 'member-level',
      meta: { title: 'memberLevel' },
      component: _import('set/member-level')
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

  // 账号
  {
    path: '/cms',
    meta: { title: 'cms' },
    component: Layout,
    children: [
      {
        path: '',
        name: 'cms',
        meta: { title: 'cmslist' },
        component: _import('cms/list')
      },
      {
        path: 'create',
        name: 'cmsCreate',
        meta: { title: 'cmsDetail' },
        component: _import('cms/detail'),
        hidden: true
      },
      {
        path: 'list/:id',
        name: 'cmsUpdate',
        meta: { title: 'cmsDetail' },
        component: _import('cms/detail'),
        hidden: true
      }
    ]
  },

  // 产品模板
  {
    path: '/product',
    meta: { title: 'product' },
    component: Layout,
    children: [
      {
        path: '',
        name: 'product',
        meta: { title: 'productlist' },
        component: _import('product1/list')
      },
      {
        path: 'create',
        name: 'productCreate',
        meta: { title: 'productDetail' },
        component: _import('product1/detail'),
        hidden: true
      },
      {
        path: 'list/:id',
        name: 'productUpdate',
        meta: { title: 'productDetail' },
        component: _import('product1/detail'),
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  base: '/app/zmail-admin',
  routes: constantRouterMap
})
