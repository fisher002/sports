import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import defaultIndex from '@/views/index'
import mobileIndex from '@/views/mobile-index/mobileIndex'
import index from '@/views/mobile-index/index'
import login from '@/views/mobile-index/login'
import listmine from '@/views/mobile-mine/listmine'
import detailmine from '@/views/mobile-mine/detailmine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobileIndex',
      component: mobileIndex,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: index
        },
        {
          path: '/listmine',
          name: 'listmine',
          component: listmine
        },
        {
          path: '/detailmine',
          name: 'detailmine',
          component: detailmine
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
