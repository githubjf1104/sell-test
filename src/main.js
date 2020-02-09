// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import './common/css/reset.css';
import './common/css/iconfont.css';
import './common/stylus/index.styl';
import FastClick from 'fastclick';
// 解决移动端300毫秒点击延迟问题
FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
