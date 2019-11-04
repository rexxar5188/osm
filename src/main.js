// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import './plugins/element.js';
import JsonViewer from 'vue-json-viewer';
import api from './request/url';
// import store from './store';


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.prototype.$sleep = (d) => {
  return new Promise((resolve) => setTimeout(resolve, d));
};
Vue.filter('timeFormatFilter', (row) => {
  const date = new Date(row['_admin']['created'] * 1000);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() + ' ';
  const h = date.getHours() + ':';
  const m = date.getMinutes() + ':';
  const s = date.getSeconds();
  return Y + M + D + h + m + s;
});

Vue.use(JsonViewer);
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requirejwt)) { // 判断该路由是否需要登录权限
    if (localStorage.token) {
      next();
    } else {
      next({
        path: '/403',
      })
    }
  } else {
    next();
  }
});
new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>',
});
export default Vue;
