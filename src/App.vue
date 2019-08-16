<template>
  <div id="app">
        <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {
     },
    data () {
      return {
        links: []
      }
    },
    mounted () {}

}


  // methods: {
  //   getToken() {
  //     this.$axios.get('/osm/token').then(this.saveToken);
  //   //   this.$axios.post('/json_auth/',
  //   //     { username: 'admin', password: 'admin', project_id: '',next: '#' },
  //   //     { headers: { Accept: 'application/json' ,ContentType: 'application/json'},withCredentials: false, })
  //   //     .then(this.saveToken);
  //   },
  //   saveToken(token) {
  //     // this.$alert(token.data)
  //     sessionStorage.setItem('token', token.data);
  //   },
  // },
  // mounted() {
  //   this.getToken();
  // },
  // "https://172.18.232.194:9999/osm/admin/v1/tokens"
  // 请求体:
  // {'username': 'admin', 'password': 'admin', 'project_id': ''}
  //  请求头:
  // {'Accept': 'application/json'}
  // 返回结果:
  // {'project_id': 'admin',
  //  'admin': True,
  //  'issued_at': 1563246045.497413,
  //  'id': 'hRLKuMAB49YgeGq46IOvm5VcbTI1hJOJ',
  //  '_id': 'hRLKuMAB49YgeGq46IOvm5VcbTI1hJOJ',
  //  'remote_host': '10.255.0.2',
  //  'expires': 1563249645.497413,
  //  'username': 'admin',
  //  'remote_port': 49771}

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .action_icon {
    font-size: 16px;
    padding: 5px;
  }
  i{
    cursor: pointer;}
</style>
