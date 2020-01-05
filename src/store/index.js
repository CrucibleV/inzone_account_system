import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store({

  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    UserName: 'admin',
    UrlIP: 'http://211.87.227.226:8089',     // 接口地址前缀
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
