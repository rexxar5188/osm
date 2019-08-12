// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import './plugins/element.js';
import JsonViewer from 'vue-json-viewer';
// import store from './store';
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(JsonViewer)

// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  // store,
  router,
  components: { App },
  template: '<App/>',
});
