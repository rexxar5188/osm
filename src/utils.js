
export const auth = async ()=>{
  await this.$api.token().then((response) => {
    this.$cookies.set('osm_auth',response.data.id)}
  );
};
export const getToken = async ()=>{
  if (!this.$cookies.get('osm_auth')){
    await auth();
  }
  return this.$cookies.get('osm_auth');
};
