/*
 * @Author: zhanggenyuan
 * @Date: 2020-08-06 15:01:58
 * @LastEditTime: 2020-09-08 14:16:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dezhonggangyue:\VUE原型开发\productionControlSystem\src\store\index.js
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: modules,
  plugins: [createPersistedState()]
});