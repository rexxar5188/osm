import vue from './main';
let _this = vue;
export const auth = async ()=>{
  await _this.$api.token().then((response) => {
    _this.$cookies.set('osm_auth',response.data.id)}
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
