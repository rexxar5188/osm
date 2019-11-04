import service from '@/request/http';
import qs from 'qs';

const api = {
  token(jwt) {
    return service({
      url: '/jwt_auth/',
      method: 'POST',
      data:jwt,
    })
  },
  ns: {
    list() {
      return service({
        url: '/nsd/',
        method: 'GET'
      });
    },
    detail(id) {
      return service({
        url: '/nsd/' + id + '/',
        method: 'GET'
      });
    },
    delete(id) {
      return service({
        url: '/nsd/' + id + '/',
        method: 'DELETE'
      });
    },
    upload(data) {
      return service({
        url: '/nsd/',
        method: 'POST',
        data: data,
        headers: { 'content-type': 'multipart/form-data' },
      });
    },
    put(id,data){
      return service({
        url: '/nsd/' + id+'/' ,
        method: 'PUT',
        headers:{'content-type': 'application/json' },
        data:data,
      });
    },
  },
  vnf: {
    list() {
      return service({
        url: '/vnfd/',
        method: 'GET'
      });
    },
    detail(id) {
      return service({
        url: '/vnfd/' + id + '/',
        method: 'GET'
      });
    },
    delete(id) {
      return service({
        url: '/vnfd/' + id + '/',
        method: 'DELETE'
      });
    },
    upload(data) {
      return service({
        url: '/vnfd/',
        method: 'POST',
        data: data,
        headers: { 'content-type': 'multipart/form-data' },
      });
    },
    download(id){
      return service({
        url: '/vnfd/download/'+id+'/',
        method: 'GET',
        responseType: 'blob',
      });
    },
    put(id,data){
      return service({
        url: '/vnfd/' + id +'/',
        method: 'PUT',
        headers:{'content-type': 'application/json' },
        data:data,
      });
    },
  },
  nst: {
    list() {
      return service({
        url: '/netslicetemplate/',
        method: 'GET'
      });
    },
    upload(data) {
      return service({
        url: '/netslicetemplate/',
        method: 'POST',
        data: data,
        headers: { 'content-type': 'multipart/form-data' },
      });
    },
    detail(id) {
      return service({
        url: '/netslicetemplate/' + id + '/',
        method: 'GET'
      });
    },
    delete(id) {
      return service({
        url: '/netslicetemplate/' + id + '/',
        method: 'DELETE'
      });
    },
    put(id,data){
      return service({
        url: '/netslicetemplate/' + id + '/nst/',
        method: 'PUT',
        headers:{'content-type': 'application/json' },
        data:data,
      });
    },
  },
  nsi: {
    list() {
      return service({
        url: '/netslice/',
        method: 'GET'
      });
    },
    detail(id) {
      return service({
        url: '/netslice/' + id + '/',
        method: 'GET'
      });
    },
    create(data) {
      return service({
        url: '/netslice/',
        method: 'POST',
        data: data,
      });
    },
    delete(id) {
      return service({
        url: '/netslice/' + id + '/',
        method: 'DELETE'
      });
    },
    stop(id){
      return service({
        url: '/netslice/terminate/' + id + '/',
        method: 'POST'
      })
    },
    start(id,data){
      return service({
        url: '/netslice/active/' + id + '/',
        method: 'POST',
        data:data,
      })
    },
  },
  ssi: {
    list() {
      return service({
        url: '/ns/',
        method: 'GET'
      });
    },
    detail(id) {
      return service({
        url: '/ns/' + id + '/',
        method: 'GET'
      });
    },
    create(data) {
      return service({
        url: '/ns/',
        method: 'POST',
        data: data,
      });
    },
    delete(id) {
      return service({
        url: '/ns/' + id + '/',
        method: 'DELETE'
      });
    },
    stop(id){
      return service({
        url: '/ns/terminate/' + id + '/',
        method: 'POST'
      })
    },
    start(id,data){
      return service({
        url: '/ns/active/' + id + '/',
        method: 'POST',
        data:data,
      })
    },
  },
  vnfi: {
    list() {
      return service({
        url: '/vnfs/',
        method: 'GET'
      });
    },
    detail(id) {
      return service({
        url: '/vnfs/' + id + '/',
        method: 'GET'
      });
    },
  },
  pdu: {
    list() {
      return service({
        url: '/pdu/',
        method: 'GET'
      });
    },
    delete(pduId) {
      return service({
        url: '/pdu/' + pduId + '/',
        method: 'DELETE'
      });
    },
    create(data) {
      return service(
        {
          url: '/pdu/',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          data: data,
        });

    }
  },
  sdn: {
    list() {
      return service(
        { url: '/sdns/', method: 'GET', });
    },
    detail(sdnId) {
      return service(
        {
          url: '/sdns/' + sdnId + '/',
          method: 'GET',
        });
    },
    delete(sdnId) {
      return service(
        {
          url: '/sdns/' + sdnId + '/',
          method: 'DELETE',
        });
    },
    create(data) {
      return service(
        {
          url: '/sdns/',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          data: data,
        });
    },
  },
  vim: {
    list() {
      return service(
        { url: '/vims/', method: 'GET', });
    },
    detail(vimAccountId) {
      return service(
        {
          url: '/vims/' + vimAccountId + '/',
          method: 'GET',
        });
    },
    delete(vimAccountId) {
      return service(
        {
          url: '/vims/' + vimAccountId + '/',
          method: 'DELETE',
        });
    },
    create(data) {
      return service(
        {
          url: '/vims/',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          data: data,
        });
    },
    resouceInfo(){
      return service(
        {
          url: '/vims/resource_info/',
          method: 'GET',
        });
    },
  },
  pol:{
    list() {
      return service({
        url: '/policy/',
        method: 'GET'
      });
    },
    start(vnfr_id,policy_id){
      return service({
        url: '/vnfs/'+vnfr_id+'/policies/' + policy_id + '/active/',
        method: 'PUT',
      })
    },
    stop(vnfr_id,policy_id){
      return service({
        url: '/vnfs/'+vnfr_id+'/policies/' +  policy_id + '/deactive/',
        method: 'PUT'
      })
    },
    create(vnfr_id,data) {
      return service({
        url: '/vnfs/'+vnfr_id+'/policies/',
        method: 'POST',
        data: data,
      });
    },
    detail(vnfr_id,policy_id) {
      return service({
        url: '/vnfs/'+vnfr_id+'/policies/'+policy_id+'/',
        method: 'GET',
      });
    },
    delete(vnfrid,policy_id) {
      return service({
        url: '/vnfs/'+vnfrid+'/policies/' + policy_id + '/',
        method: 'DELETE'
      });
    },
    update(vnfrid,policy_id,data) {
      return service({
        url: '/vnfs/'+vnfrid+'/policies/' + policy_id + '/',
        method: 'PUT',
        data: data,
      });
    },

  },
  operation: {
    ssi(id) {
      return service(
        { url: '/ns/operation/' + id + '/', method: 'GET', });
    },
    nsi(id) {
      return service(
        { url: '/netslice/operation/' + id + '/', method: 'GET', });
    },
  },
  downLoadPost:function(url,data,fileNamePre,fn) {
    service ({
      method : 'post',
      url : url , // 请求地址
      data : data,
      responseType : 'arraybuffer',
      observe: 'response',
    } ).then ( ( res ) => {
      if(fn){
        fn();
      }
      let blob = new Blob([res.data], {type: "application/gzip"});
      if ( 'download' in document.createElement ( 'a' ) ) { // 非IE下载
        const elink = document.createElement ( 'a' );
        elink.download = fileNamePre+'.tar.gz';
        elink.style.display = 'none';
        elink.href = URL.createObjectURL ( blob );
        document.body.appendChild ( elink );
        elink.click ();
        URL.revokeObjectURL ( elink.href ); // 释放URL 对象
        document.body.removeChild ( elink )
      } else { // IE10+下载
        navigator.msSaveBlob ( blob, fileNamePre )
      }
    })
  },
  user: {
    list() {
      return service(
        { url: '/users/', method: 'GET', });
    },
    detail(userId) {
      return service(
        {
          url: '/users/' + userId + '/',
          method: 'GET',
        });
    },
    delete(userId) {
      return service(
        {
          url: '/users/' + userId + '/',
          method: 'DELETE',
        });
    },
    create(data) {
      return service(
        {
          url: '/users/',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          data: data,
        });
    },
  },
  project: {
    list() {
      return service(
        { url: '/projects/', method: 'GET', });
    },
    detail(userId) {
      return service(
        {
          url: '/projects/' + userId + '/',
          method: 'GET',
        });
    },
    delete(userId) {
      return service(
        {
          url: '/projects/' + userId + '/',
          method: 'DELETE',
        });
    },
    create(data) {
      return service(
        {
          url: '/projects/',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          data: data,
        });
    },
  },
  wim: {
    list() {
      return service(
        { url: '/wims/', method: 'GET', });
    },
    detail(wimAccountId) {
      return service(
        {
          url: '/wims/' + wimAccountId + '/',
          method: 'GET',
        });
    },
    delete(wimAccountId) {
      return service(
        {
          url: '/wims/' + wimAccountId + '/',
          method: 'DELETE',
        });
    },
    create(data) {
      return service(
        {
          url: '/wims/',
          headers: { 'content-type': 'application/json' },
          method: 'POST',
          data: data,
        });
    },
  },

};
export default api;
