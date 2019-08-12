<template>

  <json-viewer style="text-align: left"
    :value="value"
    :expand-depth=5
    copyable
    sort></json-viewer>
</template>

<script>
  export default {
    name: 'info',
    props:{
      value:{},
    },
    data(){
      // return{
      // jsonData:{},
      // }
    },

    mounted(){
    }
  }



</script>

<style scoped>

</style>
