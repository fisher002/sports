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
import signupmine from '@/views/mobile-mine/signupmine'
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
          meta: {
            label: "用户首页"
          },
          component: index
        },
        {
          path: '/user/detailcompate',
          name: 'detailcompate',
          meta: {
            label: "赛事详情"
          },
          component: detailcompate
        },
        {
          path: '/user/listmine',
          name: 'listmine',
          meta: {
            label: "我的"
          },
          component: listmine
        },
        {
          path: '/user/detailmine',
          name: 'detailmine',
          meta: {
            label: "我的信息"
          },
          component: detailmine
        },
        {
          path: '/user/signupmine',
          name: 'signupmine',
          meta: {
            label: "我的报名"
          },
          component: signupmine
        },
        {
          path: '/user/listitem',
          name: 'listitem',
          meta: {
            label: "项目"
          },
          component: listitem
        },
        {
          path: '/user/listcomment',
          name: 'listcomment',
          meta: {
            label: "消息"
          },
          component: listcomment
        },
        {
          path: '/user/listtournament',
          name: 'listtournament',
          meta: {
            label: "赛事"
          },
          component: listtournament
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        label: "登录"
      },
      component: login
    },
  ]
})
