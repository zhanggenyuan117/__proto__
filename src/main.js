/*
 * @Author: zhanggenyuan
 * @Date: 2020-08-06 15:01:56
 * @LastEditTime: 2020-08-24 14:32:17
 * @Description: vue入口文件
 */
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './plugins/element.js';
import './utils/format';

import eventhub from 'vue-plugin-eventhub';
import axios from '@utils/axios';
import 'normalize.css';
import '@assets/css/global.less';
//引入阿里巴巴图标库
import '@assets/icons/iconfont.css'
import '@assets/icons/iconfont.js'
Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
  console.log(`Error: ${err.toString()}
Info: ${info}`);
};
console.log(eventhub)
Vue.use(eventhub);
Vue.use(axios);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');