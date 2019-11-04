<template>
  <div id="app">
      <router-view ></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
     },
    data () {
      return {

      }
    },
    mounted () {
    },


}
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
  i{cursor: pointer;}
  @-webkit-keyframes spin {
    0%   {left: 500px;top:-88px;opacity: 1;}
    100% {left: 600px;top:0;opacity: 0;}
  }

  @keyframes spin {
    0%   {left: 500px;top:-88px;opacity: 1;}
    100% {left: 600px;top:0;opacity: 0;}
  }

  @-webkit-keyframes spin2 {
    0%   {left: 600px;top:-58px;opacity: 1;}
    100% {left: 650px;top:0;opacity: 0;}
  }

  @keyframes spin2 {
    0%   {left: 600px;top:-58px;opacity: 1;}
    100% {left: 650px;top:0;opacity: 0;}
  }

  @-webkit-keyframes spin3 {
    0%   {left: 750px;top:-58px;opacity: 1;}
    100% {left: 800px;top:0;opacity: 0;}
  }

  @keyframes spin3 {
    0%   {left: 750px;top:-58px;opacity: 1;}
    100% {left: 800px;top:0;opacity: 0;}
  }


  @-webkit-keyframes spin4 {
    0%   {left: 1000px;top:-68px;opacity: 1;}
    100% {left: 1050px;top:0;opacity: 0;}
  }

  @keyframes spin4 {
    0%   {left: 1000px;top:-68px;opacity: 1;}
    100% {left: 1050px;top:0;opacity: 0;}
  }

  @-webkit-keyframes spin5 {
    0%   {left: 1200px;top:-58px;opacity: 1;}
    100% {left: 1250px;top:0;opacity: 0;}
  }

  @keyframes spin5 {
    0%   {left: 1200px;top:-58px;opacity: 1;}
    100% {left: 1250px;top:0;opacity: 0;}
  }


  @-webkit-keyframes dian1 {
    0%   {left: 0;top:6px;}
    50%   {left: 600px;top:54px;}
    100% {left: 1200px;top:0;}
  }

  @keyframes dian1 {
    0%   {left: 0;top:6px;}
    50%   {left: 600px;top:54px;}
    100% {left: 1200px;top:0;}
  }


  @-webkit-keyframes dian2 {
    0%   {right: 0;top:6px;}
    50%   {right: 600px;top:54px;}
    100% {right: 1200px;top:0;}
  }

  @keyframes dian2 {
    0%   {right: 0;top:6px;}
    50%   {right: 600px;top:54px;}
    100% {right: 1200px;top:0;}
  }


  @-webkit-keyframes dian3 {
    0%   {left: 600px;top:0;}
    50%   {left: 800px;top:50px;}
    100% {left: 1000px;top:0;}
  }

  @keyframes dian3 {
    0%   {left: 600px;top:0;}
    50%   {left: 800px;top:50px;}
    100% {left: 1000px;top:0;}
  }
</style>
