import Vue from 'vue'
import App from './app.vue'
import router from './router.js'

// mui
import  './lib/mui/css/mui.min.css'
import  './lib/mui/css/icons-extra.css'

import './css/app.less'
// 导入mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.min.css'
Vue.use(MintUI)

// 导入 axios
import axios from 'axios'
// 设置公共的路径
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/'
Vue.prototype.$axios = axios;

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 全局配置

import moment from 'moment';
Vue.filter('dataFormat',function(data,pramas){
    return moment(data).format(pramas);
})

new Vue({
  el:'#app',
  data:{},
  render:createEle => createEle(App),
  // 将路由挂载到实例上,一样可省略
  router
})