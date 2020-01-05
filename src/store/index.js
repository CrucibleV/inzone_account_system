import Vue from 'vue';
import Vuex from 'vuex';//在store文件下创建一个文件index.js，用来创建vuex实例，然后在这个文件中引入vue和vuex
Vue.use(Vuex);

//创建vuex.store实例保存到变量store中，最后使用export default导出变量store
const store = new Vuex.Store({

  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    UserName:'admin',
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {  //这里的state对应上面状态state
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  }
});

export default store
