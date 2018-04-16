import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/purchase/index',
      name: 'purchaseList',
      component: (resolve) => require(['@/views/purchase/index'], resolve)
    },
    {
      path: '/purchase/edit',
      name: 'purchaseEdit',
      meta: {
        title: '请购单编辑'
      },
      component: (resolve) => require(['@/views/purchase/edit'], resolve)
    },
    {
      path: '/purchase/add',
      name: 'purchaseAdd',
      meta: {
        title: '请购单新增'
      },
      component: (resolve) => require(['@/views/purchase/edit'], resolve)
    },
    {
      path: '/purchase/detail',
      name: 'purchaseDetail',
      meta: {
        title: '请购单详情'
      },
      component: (resolve) => require(['@/views/purchase/edit'], resolve)
    }
  ]
})
