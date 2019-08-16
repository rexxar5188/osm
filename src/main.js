// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import './plugins/element.js';
import JsonViewer from 'vue-json-viewer';
import api from './request/url'
// import store from './store';
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$api = api;
Vue.use(JsonViewer);
Vue.use(VueCookies);
// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json';
/* eslint-disable no-new */
const vue = new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>',
});
export default vue;
