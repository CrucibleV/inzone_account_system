import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({  
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [ 
    {
      path: '/',   
      redirect:'/home',
    },
    {
      path: '/',
      component: resolve => require(['../components/common/home.vue'], resolve),
      children:[
        {
          path: 'home',
          component: resolve=>require(['../components/views/index/index.vue'],resolve),
          meta:{
            title: '首页',
            //requiresAuth: true//这个路由引发的页面需要登录之后才可以进入,把权限设置在meta上，为了更方便的从router.beforeEch中进行权限判断
          },
        },
        {
          path:'shop',
          component: resolve=>require(['../components/views/base-info/shop/shop.vue'],resolve),
          meta:{
            title: '门店管理',
            // requiresAuth: true
          },
        },
        {
          path:'supplier',
          component: resolve=>require(['../components/views/base-info/supplier/supplier.vue'],resolve),
          meta:{
            title:'销售商管理',
            // requiresAuth:true
          }
        },
        {
          path:'manage',
          component: resolve=>require(['../components/views/base-info/manage/manage.vue'],resolve),
          meta:{
            title:'商位管理',
            // requiresAuth:true
          }
        },
        {
          path:'dataScope',
          component: resolve=>require(['../components/views/base-info/dataScope/dataScope.vue'],resolve),
          meta:{
            title:'数据范围',
            // requiresAuth:true
          }
        },
        {
          path:'shopInfo',
          component: resolve=>require(['../components/views/base-info/shop/shopInfo.vue'],resolve),
          meta:{
            title: '店铺详细信息',
            // requiresAuth: true
          },
        },
        {
          path:'floorInfo',
          component: resolve=>require(['../components/views/base-info/floor/floorInfo.vue'],resolve),
          meta:{
            title: '楼层货区详细信息',
            // requiresAuth: true
          },
        },
        {
          path:'manageInfo',
          component: resolve=>require(['../components/views/base-info/manage/manageInfo.vue'],resolve),
          meta:{
            title: '楼层货区详细信息',
            // requiresAuth: true
          },
        },
        {
          path: 'billSummary',
          component: resolve=>require(['../components/views/bill/billSummary.vue'], resolve),
          meta:{
            title:'扣款汇总',
            // requiresAuth: true
          }
        },
        {
          path: 'billDetail',
          component: resolve=>require(['../components/views/bill/billDetail.vue'], resolve),
          meta:{
            title:'扣款明细',
            // requiresAuth: true
          }
        },{
          path: 'billSummaryExamine',
          component: resolve=>require(['../components/views/bill/billSummaryExamine.vue'], resolve),
          meta:{
            title:'扣款审核',
            // requiresAuth: true
          }
        },{
          path: 'examineHistory',
          component: resolve=>require(['../components/views/bill/examineHistory.vue'], resolve),
          meta:{
            title:'审核历史',
            // requiresAuth: true
          }
        },,{
          path: 'koudianSearch',
          component: resolve=>require(['../components/views/bill/koudianSearch.vue'], resolve),
          meta:{
            title:'增品扣点',
            // requiresAuth: true
          }
        },
        {
          path: 'moneyJuan',
          component: resolve=>require(['../components/views/base-info/quankou/moneyJuan.vue'], resolve),
          meta:{
            title:'劵扣管理',
            // requiresAuth: true
          }
        },
        {
          path: '/role',
          component: resolve=>require(['../components/views/system/role.vue'], resolve),
          meta:{
            title:'角色管理',
            // requiresAuth: true
          }
        },{
          path: '/permission',
          component: resolve=>require(['../components/views/system/permission.vue'], resolve),
          meta:{
            title:'权限管理',
            // requiresAuth: true
          }
        },
        {
          path: '/login-control',
          component: resolve=>require(['../components/views/system/login-control.vue'], resolve),
          meta:{
            title:'后台登录管理',
            // requiresAuth: true
          }
        },{
          path: '/admin-setting',
          component: resolve=>require(['../components/views/system/admin-setting.vue'], resolve),
          meta:{
            title:'管理员设置',
            // requiresAuth: true
          }
        },
        {
          path: '/wechat-manage',
          component: resolve=>require(['../components/views/wechat/wechat-manage.vue'], resolve),
          meta:{
            title:'推送任务',
            // requiresAuth: true
          }
        },
        {
          path: '/wechat-history',
          component: resolve=>require(['../components/views/wechat/wechat-history.vue'], resolve),
          meta:{
            title:'推送历史',
            // requiresAuth: true
          }
        },
      ]
    },
    {
      path:'/login',
      component: resolve=>require(['../components/views/account/login.vue'], resolve)
    }
  ]
})

router.beforeEach((to, from, next)=>{
  let token = window.localStorage.getItem('Authorization')
  //requireAuth为路由中定义的 meta:{requireAuth:true}
  if(to.matched.some(record=>record.meta.requiresAuth) && (!token || token===null)){
    next({
      path:'/login',  //未登录定向到登录页面
      query:{redirect:to.fullPath}  //将跳转的路由path作为参数，登录成功后跳转到该路由
    })
  }
  else{
    next()  //直接放行
  }

})

export default router
