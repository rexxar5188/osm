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
    name: 'grafana',
    data () {
      return {
        url: 'http://172.18.233.177:3000/d/x5vtPXmik/osm-dashboard?orgId=1&refresh=5s&kiosk=tv',

      }
    },
    mounted(){
    },
    methods:{
    },
  };
</script>

<style scoped>

</style>
