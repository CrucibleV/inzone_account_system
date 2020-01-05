<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#0E528A"
             text-color="#FFFFFF" active-text-color="#20a0ff" unique-opened router >
      <el-menu-item>功能菜单<span style="float: right">
        <i  class="el-icon-d-arrow-left" style="font-size: 12px;text-align: right"></i>
      </span></el-menu-item>
      <template v-for="item in items">
        <!--              如果item对象的subs不为空，则执行v-if指令，否则执行v-else指令-->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                show:true,
                collapse: false,
                items: [
                    {
                        icon: 'el-icon-news',
                        index: 'home',
                        title: '首页',
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: '1',
                        title: '公共信息',
                        subs:[
                            {
                                index: 'shop',
                                title: '门店管理'
                            },{
                                index:'floor',
                                title:'楼层货区'
                             },
                            //{
                            //     index:'classification',
                            //     title:'商位分类'
                            // },
                            {
                                index:'manage',
                                title:'商位管理'
                            },{
                                index:'supplier',
                                title:'供应商信息管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '2',
                        title: '返款管理',
                        subs:[
                            {
                                index:'money',
                                title:'返款生成'
                            },{
                                index:'moneySear',
                                title:'返款审核'
                            },{
                                index:'moneyJuan',
                                title:'劵扣管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-news',
                        index: 'wechat',
                        title: '微信管理',
                        subs: [
                            {
                                index: 'wechat-index',
                                title: '微信成员'
                            },
                            {
                                index: 'wechat-depatment',
                                title: '微信部门'
                            },
                            {
                                index: 'wechat-lable',
                                title: '微信标签'
                            },
                            {
                                index: 'wechat-manage',
                                title: '推送任务'
                            },
                            {
                                index: 'wechat-history',
                                title: '推送历史'
                            },

                        ]
                    },


                    // {
                    //     icon: 'el-icon-phone',
                    //     index: 'location',
                    //     title: '广告位管理',
                    //     subs:[
                    //         {
                    //             index:'location1',
                    //             title:'信息管理'
                    //         }
                    //     ]
                    // },
                    {
                        icon: 'el-icon-picture',
                        index: 'cost',
                        title: '费用中心',
                        subs:[
                            {
                                index:'cost1',
                                title:'定额费用'
                            },
                            {
                                index:'cost2',
                                title:'礼品费用'
                            },
                            {
                                index:'cost3',
                                title:'劵扣费用'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-view',
                        index: 'statistic',
                        title: '报表中心',
                        subs: [
                            {
                                index: 'statistic1',
                                title: '信息管理'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-setting',
                        index: '8',
                        title: '系统设置',
                        subs: [
                            {
                                index: 'role',
                                title: '角色管理'
                            },{
                                index: 'permission',
                                title: '权限管理'
                            },{
                                index: 'login-control',
                                title: '登录管理'
                            },{
                                index: 'admin-setting',
                                title: '管理员设置'
                             },
                            //{
                            //     index: 'log',
                            //     title: '日志管理'
                            // },{
                            //     index: 'ip-control',
                            //     title: '访问IP控制'
                            // },{
                            //     index: 'help',
                            //     title: '使用帮助'
                            // }
                        ]
                    },

                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            // bus.$on('collapse', msg => {
            //     this.collapse = msg;
            // })
        }
    }
</script>

<style scoped>
  .sidebar{
    /*margin-top: 0px;*/
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom:0;
    overflow-y: scroll;
    background: #0E528A;
    width: 9%;
  }
  .sidebar::-webkit-scrollbar{
    width: 0;
  }
  .sidebar-el-menu {
    text-align: left;
    font-weight: bold;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
    width: 100%;
    height: 563px;
  }
  .sidebar > ul {
    height:50%;
  }

  .el-submenu__title i {
    color: white;
  }
  [class*=" el-icon-"], [class^=el-icon-] {
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
  }
</style>
