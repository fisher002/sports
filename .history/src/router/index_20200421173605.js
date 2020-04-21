import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import defaultIndex from '@/views/index'
import mobileIndex from '@/views/mobile-index/mobileIndex'
import login from '@/views/mobile-index/login'
import listmine from '@/views/mobile-mine/listmine'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobileIndex',
      component: mobileIndex,
      children: [
        {
          path: '/listmine',
          name: 'listmine',
          component: listmine
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
