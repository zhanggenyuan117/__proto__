/**
 * author: yanggaiting
 * date: 2020-08-06
 * description: 路由实例化，使用history需要后端配合，并注意项目打包路径publicPath不能是相对路径
 */

import Vue from 'vue';
import Router from 'vue-router';
import config from './config';

Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    routes: config
});