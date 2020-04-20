import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import defaultIndex from '@/views/index'
import mobileIndex from '@/views/mobile-index/mobileIndex'
import login from '@/views/mobile-index/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobileIndex',
      component: mobileIndex
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
