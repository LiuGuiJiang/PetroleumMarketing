import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter) 

import Layout from '@/views/Layout/index'
import Home from '@/views/Layout/Home.vue'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/containers/redirect')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/Error/404'),
    hidden: true
  },
  {
    path: '/gis/scada',
    name: 'scada',
    component: () => import('@/containers/scada/index.vue'),
    hidden: true
  },
  {
    path: '/',
    component: Home,
    name: 'home',
    redirect: '/index',
    meta: { title: 'GIS', icon: 'el-icon-s-home', noCache: true, affix: true },
    children: [
      {
        path: '/index',
        component: () => import('@/containers/gis/index'),
        name: 'GIS',
        meta: { title: 'GIS', icon: 'el-icon-s-home', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/statement',
    name: 'statement',
    redirect: 'noRedirect',
    component: Layout,
    meta: { title: '信息列表', icon: 'el-icon-s-home', noCache: true, affix: true },
    children: [{
      path: '/statement/caltex',
      name: 'caltex',
      component: () => import('@/containers/statement/caltex/index'),
      meta: { title: '加油站列表', icon: 'el-icon-s-home', noCache: true, affix: true },
    }, {
      path: '/statement/tankFarm',
      name: 'tankFarm',
      component: () => import('@/containers/statement/tankFarm/index'),
      meta: { title: '油库列表', icon: 'el-icon-s-home', noCache: true, affix: true },
    }, {
      path: '/statement/workLog',
      name: 'workLog',
      component: () => import('@/containers/statement/workLog/index'),
      meta: { title: '工作日志', icon: 'el-icon-s-home', noCache: true, affix: true },
    }, {
      path: '/statement/market',
      name: 'market',
      component: () => import('@/containers/statement/market/index'),
      meta: { title: '销售日报', icon: 'el-icon-s-home', noCache: true, affix: true },
    }]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: 'noRedirect',
    meta: { title: '系统管理', icon: 'el-icon-s-home', noCache: true, affix: true },
    children: [{
      path: '/system/information',
      name: 'information',
      component: () => import('@/containers/system/information/index'),
      meta: { title: '大屏显示设置', icon: 'el-icon-s-home', noCache: true, affix: true },
    }, {
      path: '/system/user',
      name: 'user',
      component: () => import('@/containers/system/user/index'),
      meta: { title: '用户管理', icon: 'el-icon-s-home', noCache: true, affix: true },
    }, {
      path: '/system/role',
      name: 'role',
      component: () => import('@/containers/system/role/index'),
      meta: { title: '角色管理', icon: 'el-icon-s-home', noCache: true, affix: true },
    }, {
      path: '/system/handle',
      name: 'handle',
      component: () => import('@/containers/system/handle/index'),
      meta: { title: '系统设置', icon: 'el-icon-s-home', noCache: true, affix: true },
    }]
  }
]

export default new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
