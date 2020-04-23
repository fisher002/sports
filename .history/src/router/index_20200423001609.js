import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import defaultIndex from '@/views/index'
import mobileIndex from '@/views/mobile-index/mobileIndex'
import index from '@/views/mobile-index/index'
import detailcompate from '@/views/mobile-index/detailcompate'
import login from '@/views/mobile-index/login'
import listmine from '@/views/mobile-mine/listmine'
import detailmine from '@/views/mobile-mine/detailmine'
import listitem from '@/views/mobile-item/listitem'
import listcomment from '@/views/mobile-comment/listcomment'
import listtournament from '@/views/mobile-tournament/listtournament'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mobileIndex',
      component: mobileIndex,
      redirect: '/user/index',
      children: [
        {
          path: '/user/index',
          name: 'index',
          component: index
        },
        {
          path: '/user/detailcompate',
          name: 'detailcompate',
          component: detailcompate
        },
        {
          path: '/user/listmine',
          name: 'listmine',
          component: listmine
        },
        {
          path: '/user/detailmine',
          name: 'detailmine',
          component: detailmine
        },
        {
          path: '/user/listitem',
          name: 'listitem',
          component: listitem
        },
        {
          path: '/user/listcomment',
          name: 'listcomment',
          component: listcomment
        },
        {
          path: '/user/listtournament',
          name: 'listtournament',
          component: listtournament
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
