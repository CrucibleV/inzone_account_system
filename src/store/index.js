import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//vuex通过store选项，提供了一种机制将状态从根组件注入到每一个子组件中（需要调用Vue.use(Vuex)）
const store = new Vuex.Store({

  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    UserName: 'admin',
    PermissionList: ['添加'],                // 具有的权限列表
    UrlIP: 'http://192.168.1.103:8201/admin',     // 登录地址前缀
    urlIPs:'http://192.168.1.103:8201/authority',   //权限地址前缀
    isShowShopAdd: true,
  },

  mutations: {//类似于事件，
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {  //这里的state对应上面状态state，回调函数
      if(user.Authorization) {
        state.Authorization = user.Authorization;
        // 放在缓存中是为了防止页面刷新vuex中的值消失
        localStorage.setItem('Authorization', user.Authorization);
      }
      if(user.PermissionList) {
        state.PermissionList = user.PermissionList;
        localStorage.setItem('PermissionList', user.PermissionList);
      }

    }
  }
});

export default store
