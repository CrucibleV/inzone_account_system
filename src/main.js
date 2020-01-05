// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Vuex from "vuex"
import Mock from './mock/mock'     //引入mock
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import x2js from 'x2js'

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.config.productionTip = false
import './assets/icon/iconfont.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,    //相当于router：router，将路由规则对象，注册到vue实例上，用来监听URL的变化，根据相应的URL展示相应的组件，挂载到DOM上
  store,
  components: { App },//定义了一个组件
  template: '<App/>'
})
