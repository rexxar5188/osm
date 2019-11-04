<template>
  <div>
    <iframe
      :src="url"
      width="100%"
      height="100%"
      frameborder="0"
      style="border:none"
    ></iframe>
  </div>
</template>

<script>
  export default {
    name: 'kibana',
    data(){
      return{
        url: 'http://172.18.233.177:5601/app/kibana#/dashboard/7213db30-ca27-11e9-a450-6f7dd65113b7?embed=true&_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow%2Fd%2Cmode%3Aquick%2Cto%3Anow%2Fd))',
      }
    }
  };
</script>

<style scoped>

</style>
