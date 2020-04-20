import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import defaultIndex from '@/views/index'
import mobileIndex from '@/views/mobile-index/mobileIndex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: defaultIndex,
      redirect: '/mobileIndex'
    },
    {
      path: '/mobileIndex',
      name: 'mobileIndex',
      component: mobileIndex
    },
  ]
})
