import axios from 'axios';
import store from '@/store';
import api from './url';
import {MessageBox} from 'element-ui';

const service = axios.create({
  baseURL: 'http://172.18.234.111:8000/api/v1/',
  timeout: 20000,
  withCredentials: true,
});
// service.defaults.headers.common['WWW-Authorization'] = localStorage.getItem('osm_auth');
service.interceptors.request.use(async function (config) {
  if (config.url !== '/jwt_auth/') {
    let expires= localStorage.getItem('osm_auth_expires');
    if ((!localStorage.getItem('osm_auth'))||expires<Date.now()/1000) {
      let jwt={"jwt":localStorage.getItem("token")};
      await api.token(jwt)
        .then((response) => {
          localStorage.setItem('osm_auth', response.data.id);
          localStorage.setItem('osm_auth_expires', response.data.expires);
        });
    }
    config.headers['WWW-Authorization'] = localStorage.getItem('osm_auth');
  }


  return config;
}, function (error) {
  return Promise.reject(error);
});


//添加响应拦截器
service.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status <= 204) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          MessageBox.alert('token验证未通过,请刷新页面','错误');
          localStorage.removeItem('osm_auth');
          localStorage.removeItem('osm_auth_expires');
          // window.location.reload();
          break;
        case 409:
          MessageBox.alert(error.response.data,'错误');
          break;
        // 其他错误，直接抛出错误提示
        default:

           MessageBox.alert(error.response.data,'错误');
      }
      return Promise.reject(error.response);
    }
  }
);

export default service;
