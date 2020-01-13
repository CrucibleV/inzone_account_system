<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#0E528A"
             text-color="#FFFFFF" active-text-color="#20a0ff" unique-opened router >
      <el-menu-item :index="items[0].index">功能菜单
        <span style="float: right">
          <i  class="el-icon-d-arrow-left" style="font-size: 12px;text-align: right"></i>
        </span>
      </el-menu-item>
      <template v-for="item in items">
        <!--如果item对象的subs不为空，则执行v-if指令，否则执行v-else指令-->
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
                                index:'manage',
                                title:'商位管理'
                            },{
                                index:'supplier',
                                title:'供应商管理'
                            },{
                                index: 'moneyJuan',
                                title: '劵扣管理'
                            },{
                                index: 'dataScope',
                                title: '数据范围'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '2',
                        title: '返款管理',
                        subs:[
                            {
                                index:'billDetail',
                                title:'交易扣款明细'
                            },
                            {
                                index:'billSummary',
                                title:'商位交易扣款汇总'
                            },{
                                index:'billSupplierSummary',
                                title:'供应商交易扣款汇总'
                            },{
                                index:'billSummaryExamine',
                                title:'交易扣款审核'
                            },{
                                index:'examineHistory',
                                title:'交易扣款审核历史'
                            },{
                                index:'koudianSearch',
                                title:'赠品扣点查询'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-news',
                        index: 'wechat',
                        title: '微信推送',
                        subs: [
                            {
                                index: 'wechat-manage',
                                title: '推送任务'
                            },{
                                index: 'wechat-history',
                                title: '推送历史'
                            }
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
                                title: '角色权限分配'
                            },{
                                index: 'login-control',
                                title: '登录历史'
                            },{
                                index: 'admin-setting',
                                title: '管理员设置'
                             },{
                                index: 'ope-log',
                                title: '操作日志'
                             }
                        ]
                    }
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
    display: block;
    position: absolute;
    left: 0;
    top: 60px;
    bottom:0;
    overflow-y: scroll;
  }
  .sidebar::-webkit-scrollbar{
    width: 0;
  }
  .sidebar-el-menu {
    text-align: left;
    font-weight: bold;
  }
  .sidebar-el-menu:not(.el-menu--collapse){
    width: 180px;
  }
  .sidebar > ul {
    height:100%;
  }
  .el-submenu__title i {
    color: white;
  }

</style>
