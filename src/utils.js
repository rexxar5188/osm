import vue from './main';

export const auth = async ()=>{
  await _this.$api.token().then((response) => {
    localstorage.setItem('osm_auth',response.data.id)}
  );
};
export const getToken = async ()=>{
  if (!_this.$cookies.get('osm_auth')){
    await auth();
  }
  return _this.$cookies.get('osm_auth');
};
export const install = function (vue) {
  _this = vue
};
