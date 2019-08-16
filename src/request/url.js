
import service from '@/request/http'

const api={
  token(){
    return service.get(`/auth/`);
  },
  vimApi(){
    return service.get(`/vims/`);
  }
};
export default api
