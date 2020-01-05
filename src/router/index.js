import Vue from 'vue'
import Router from 'vue-router'

//使用路由，这个页面主要就是分发路由
Vue.use(Router)

const router = new Router({   //创建router实例，然后传递配置参数，将这个对象传入vue实例中
  mode: 'hash',//使用hash模式，在URL路径中会有一个#号，只是在当前页面中跳转
  base: process.env.BASE_URL,
  routes: [   //routers是路由匹配规则，在每一个匹配规则中，都必须有两个参数，一个是path，用来监听哪个路由监听规则，另一个是component，表示如果路由是前面匹配到的path，就展示对应的组件
    {
      path: '/',   //监听哪个路由连接
      redirect:'/home',//重定向的位置，一登录就进入该页面，当在URL中输入/时，就进入home组件中
    },
    {
      path: '/',
      component: resolve => require(['../components/common/home.vue'], resolve),
      // meta: { title: '无人机管理', requiresAuth:true },//在需要的权限的路由添加meta信息，表明该路由需要登录才能访问
      children:[//是子路由，所有的页面都含有导航部分，即'../components/common/home.vue',嵌套路由
        {
          path: 'home',
          component: resolve=>require(['../components/views/index/index.vue'],resolve),//懒加载，将你的component分别打包成不同的js,加载的时候按需加载,访问此路由的时候，才会加载这个js文件
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
          path:'floor',
          component: resolve=>require(['../components/views/base-info/floor/floor.vue'],resolve),
          meta:{
            title:'楼层货区',
            // requiresAuth:true
          }
        },
        // {
        //   path:'classification',
        //   component: resolve=>require(['../components/views/base-info/classification/classification.vue'],resolve),
        //   meta:{
        //     title:'商位分类',
        //     // requiresAuth:true
        //   }
        // },
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
          path: 'store',
          component: resolve=>require(['../components/views/store/store.vue'], resolve),
          meta:{
            title:'商铺信息管理',
            // requiresAuth: true
          }
        },
        {
          path: 'money',
          component: resolve=>require(['../components/views/money/moneyCreo/money.vue'], resolve),
          meta:{
            title:'返款生成管理',
            // requiresAuth: true
          }
        },
        {
          path: 'moneyInfo',
          component: resolve=>require(['../components/views/money/moneyCreo/moneyInfo.vue'], resolve),
          meta:{
            title:'新增返款管理',
            // requiresAuth: true
          }
        },{
          path: 'moneySear',
          component: resolve=>require(['../components/views/money/moneySear/moneySear.vue'], resolve),
          meta:{
            title:'返款审核管理',
            // requiresAuth: true
          }
        },{
          path: 'moneyJuan',
          component: resolve=>require(['../components/views/money/moneyJuan/moneyJuan.vue'], resolve),
          meta:{
            title:'劵扣管理',
            // requiresAuth: true
          }
        },
        {
          path: 'juanInfo',
          component: resolve=>require(['../components/views/money/moneyJuan/juanInfo.vue'], resolve),
          meta:{
            title:'新增劵扣管理',
            // requiresAuth: true
          }
        },
        {
          path: 'location1',
          component: resolve=>require(['../components/views/location/messageLocation.vue'], resolve),
          meta:{
            title:'信息管理',
            // requiresAuth: true
          }
        },

        // {
        //   path: '/cost',
        //   component: resolve=>require(['../components/views/costCenter/solidMoney/cost.vue'], resolve),
        //   meta:{
        //     title:'费用中心',
        //     // requiresAuth: true
        //   }
        // },
        {
          path: '/cost1',
          component: resolve=>require(['../components/views/costCenter/solidMoney/cost.vue'], resolve),
          meta:{
            title:'定额费用查询',
            // requiresAuth: true
          }
        },
        {
          path: '/cost2',
          component: resolve=>require(['../components/views/costCenter/giftMoney/giftMoney.vue'], resolve),
          meta:{
            title:'礼品费查询',
            // requiresAuth: true
          }
        },
        {
          path: '/cost3',
          component: resolve=>require(['../components/views/costCenter/juanMoney/juanMoney.vue'], resolve),
          meta:{
            title:'电子券扣点查询',
            // requiresAuth: true
          }
        },

        {
          path: '/statistic',
          component: resolve=>require(['../components/views/statistic/statistic.vue'], resolve),
          meta:{
            title:'报表中心',
            // requiresAuth: true
          }
        },
        {
          path: '/statistic1',
          component: resolve=>require(['../components/views/statistic/statisticMessage.vue'], resolve),
          meta:{
            title:'报表中心',
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
        },{
          path: '/wechat-index',
          component: resolve=>require(['../components/views/wechat/wechat-index.vue'], resolve),
          meta:{
            title:'微信主页',
            // requiresAuth: true
          }
        },{
          path: '/wechat-depatment',
          component: resolve=>require(['../components/views/wechat/wechat-param.vue'], resolve),
          meta:{
            title:'微信部门',
            // requiresAuth: true
          }
        },{
          path: '/wechat-lable',
          component: resolve=>require(['../components/views/wechat/wechatAble.vue'], resolve),
          meta:{
            title:'微信标签',
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
        {
          path: '/wechatInfo',
          component: resolve=>require(['../components/views/wechat/wechatInfo.vue'], resolve),
          meta:{
            title:'微信成员详情',
            // requiresAuth: true
          }
        }

      ]
    },
    {
      path:'/login',
      component: resolve=>require(['../components/views/account/login.vue'], resolve)
    }
  ]
})


//使用router.beforeEach注册一个全局前置守卫，判断用户是否登录
//前置路由守卫判断目标路由是否携带相关meta信息以及token是否存在
//to,即将要进入的目标路由对象
//from当前导航正要离开的路由
//next一定要调用该方法来resolve这个钩子，
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
