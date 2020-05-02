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
import preindex from '@/views/mobile-admin/admin-pregame/preindex'
import releasegames from '@/views/mobile-admin/admin-pregame/releasegames'
import listgames from '@/views/mobile-admin/admin-pregame/listgames'
import editcompate from '@/views/mobile-admin/admin-pregame/editcompate'
import registermanagement from '@/views/mobile-admin/admin-pregame/registercompate/registermanagement'
import registerpeople from '@/views/mobile-admin/admin-pregame/registercompate/registerpeople'
import listcompateplay from '@/views/mobile-admin/admin-pregame/playermanage/listcompateplay'
import playermanagement from '@/views/mobile-admin/admin-pregame/playermanage/playermanagement'
import listcompatereferee from '@/views/mobile-admin/admin-pregame/refereemanage/listcompatereferee'
import refereemanagement from '@/views/mobile-admin/admin-pregame/refereemanage/refereemanagement'
import listequipment from '@/views/mobile-admin/admin-pregame/equipmentmanage/listequipment'
import middleindex from '@/views/mobile-admin/admin-middle/middleindex'
import listcompates from '@/views/mobile-admin/admin-middle/compatescore/listcompates'
import listcompatescore from '@/views/mobile-admin/admin-middle/compatescore/listcompatescore'
import afterindex from '@/views/mobile-admin/admin-after/afterindex'
import listbackmsg from '@/views/mobile-admin/admin-after/feedbackmsg/listbackmsg'
import listcompatewonderful from '@/views/mobile-admin/admin-after/compatewonderful/listcompatewonderful'
import detailwonderful from '@/views/mobile-admin/admin-after/compatewonderful/detailwonderful'
import listcompatenews from '@/views/mobile-admin/admin-after/comaptenews/listcompatenews'
import detailcomnews from '@/views/mobile-admin/admin-after/comaptenews/detailcomnews'

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
        },
        {
          path: '/admin/releasegames',
          name: 'releasegames',
          meta: {
            label: "赛事发布"
          },
          component: releasegames
        },
        {
          path: '/admin/listgames',
          name: 'listgames',
          meta: {
            label: "赛事修改列表"
          },
          component: listgames
        },
        {
          path: '/admin/editcompate',
          name: 'editcompate',
          meta: {
            label: "赛事修改"
          },
          component: editcompate
        },
        {
          path: '/admin/registermanagement',
          name: 'registermanagement',
          meta: {
            label: "赛事报名管理"
          },
          component: registermanagement
        },
        {
          path: '/admin/registerpeople',
          name: 'registerpeople',
          meta: {
            label: "报名学生"
          },
          component: registerpeople
        },
        {
          path: '/admin/listcompateplay',
          name: 'listcompateplay',
          meta: {
            label: "运动员管理"
          },
          component: listcompateplay
        },
        {
          path: '/admin/playermanagement',
          name: 'playermanagement',
          meta: {
            label: "运动员列表"
          },
          component: playermanagement
        },
        {
          path: '/admin/listcompatereferee',
          name: 'listcompatereferee',
          meta: {
            label: "裁判管理"
          },
          component: listcompatereferee
        },
        {
          path: '/admin/refereemanagement',
          name: 'refereemanagement',
          meta: {
            label: "裁判列表"
          },
          component: refereemanagement
        },
        {
          path: '/admin/listequipment',
          name: 'listequipment',
          meta: {
            label: "设备添加"
          },
          component: listequipment
        },
        {
          path: '/admin/middleindex',
          name: 'middleindex',
          meta: {
            label: "赛中"
          },
          component: middleindex
        },
        {
          path: '/admin/listcompates',
          name: 'listcompates',
          meta: {
            label: "赛事列表"
          },
          component: listcompates
        },
        {
          path: '/admin/listcompatescore',
          name: 'listcompatescore',
          meta: {
            label: "赛事成绩"
          },
          component: listcompatescore
        },
        {
          path: '/admin/afterindex',
          name: 'afterindex',
          meta: {
            label: "赛后"
          },
          component: afterindex
        },
        {
          path: '/admin/listbackmsg',
          name: 'listbackmsg',
          meta: {
            label: "反馈信息列表"
          },
          component: listbackmsg
        },
        {
          path: '/admin/listcompatewonderful',
          name: 'listcompatewonderful',
          meta: {
            label: "赛事资源"
          },
          component: listcompatewonderful
        },
        {
          path: '/admin/detailwonderful',
          name: 'detailwonderful',
          meta: {
            label: "赛事资源发布"
          },
          component: detailwonderful
        },
        {
          path: '/admin/listcompatenews',
          name: 'listcompatenews',
          meta: {
            label: "赛事新闻"
          },
          component: listcompatenews
        },
        {
          path: '/admin/detailcomnews',
          name: 'detailcomnews',
          meta: {
            label: "赛事新闻发布"
          },
          component: detailcomnews
        },
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
