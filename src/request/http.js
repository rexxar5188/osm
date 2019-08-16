import axios from 'axios'
import store from '@/store'
import {getToken,auth} from '@/utils'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'http://172.18.234.111:8000/api/v1/',
  timeout: 5000
});
service.interceptors.request.use(function(config){
    config.headers['WWW-Authorization']=getToken();
  return config
},function(error){
  return Promise.reject(error)
});

let httpRequest = {
  api:function(url,data){
    let method = data?'post':'get';
    return new Promise((resolve, reject)=>{
      service({
        method: method,
        url: url,
        data: data
      }).then((res)=>{
        resolve(res)
      }).catch((err)=>{
        reject(err)
      })
    })
  }
};


//添加响应拦截器
service.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
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
          Message({
            message: 'mano认证过期,请刷新页面',
            duration: 1500,
            forbidClick: true
          });
          auth();
          break;
        case 409:
          Message({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
          break;
        // 其他错误，直接抛出错误提示
        default:
          Message({
            message: error.response.data.message,
            duration: 1500,
            forbidClick: true
          });
      }
      return Promise.reject(error.response);
    }
  }
);

export default {service};