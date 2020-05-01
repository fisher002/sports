import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 用户路由
import defaultIndex from '@/views/index'
import mobileIndex from '@/views/mobile-index/mobileIndex'
import index from '@/views/mobile-index/index'
import detailcompate from '@/views/mobile-index/detailcompate'
import login from '@/views/mobile-index/login'
import listmine from '@/views/mobile-mine/listmine'
import detailmine from '@/views/mobile-mine/detailmine'
import listscore from '@/views/mobile-mine/listscore'
import listmessage from '@/views/mobile-mine/listmessage'
import refereemanage from '@/views/mobile-mine/refereeManage'
import listcontestant from '@/views/mobile-mine/listcontestant'
import signupmine from '@/views/mobile-mine/signupmine'
import listitem from '@/views/mobile-item/listitem'
import detailitem from '@/views/mobile-item/detailitem'
import listcomment from '@/views/mobile-comment/listcomment'
import commentusers from '@/views/mobile-comment/commentusers'
import listtournament from '@/views/mobile-tournament/listtournament'
import alltournaments from '@/views/mobile-tournament/alltournaments'
import chatusers from '@/views/mobile-tournament/chatusers'

// 管理员路由
import adminIndex from '@/views/mobile-admin/adminIndex'
import adminlogin from '@/views/mobile-admin/admin-login/adminLogin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: defaultIndex,
    },
    {
      path: '/user',
      name: 'mobileIndex',
      component: mobileIndex,
      redirect: '/user/index',
      children: [
        {
          path: '/user/index',
          name: 'index',
          meta: {
            label: "首页"
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
          path: '/user/refereemanage',
          name: 'refereemanage',
          meta: {
            label: "我的赛事管理"
          },
          component: refereemanage
        },
        {
          path: '/user/listcontestant',
          name: 'listcontestant',
          meta: {
            label: "运动员管理"
          },
          component: listcontestant
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
          path: '/user/listscore',
          name: 'listscore',
          meta: {
            label: "我的成绩"
          },
          component: listscore
        },
        {
          path: '/user/listmessage',
          name: 'listmessage',
          meta: {
            label: "我的消息"
          },
          component: listmessage
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
          path: '/user/detailitem',
          name: 'detailitem',
          meta: {
            label: "项目列表"
          },
          component: detailitem
        },
        {
          path: '/user/listcomment',
          name: 'listcomment',
          meta: {
            label: "评论"
          },
          component: listcomment
        },
        {
          path: '/user/commentusers',
          name: 'commentusers',
          meta: {
            label: "赛事评论"
          },
          component: commentusers
        },
        {
          path: '/user/listtournament',
          name: 'listtournament',
          meta: {
            label: "赛事"
          },
          component: listtournament
        },
        {
          path: '/user/alltournaments',
          name: 'alltournaments',
          meta: {
            label: "全部赛事时间"
          },
          component: alltournaments
        },
        {
          path: '/user/chatusers',
          name: 'chatusers',
          meta: {
            label: "赛事实时信息"
          },
          component: chatusers
        },
      ]
    },
    {
      path: '/admin',
      name: 'adminIndex',
      component: adminIndex,
      redirect: '/admin/preindex',
      children: [
        {
          path: '/admin/preindex',
          name: 'preindex',
          meta: {
            label: "赛前"
          },
          component: preindex
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        label: "用户登录"
      },
      component: login
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      meta: {
        label: "管理员登录"
      },
      component: adminlogin
    },
  ]
})
