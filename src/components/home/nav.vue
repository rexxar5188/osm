<template>
  <div>
  <div class="appTop">
  <div class="liu-icon1"></div>
  <div class="liu-icon2"></div>
  <div class="liu-icon3"></div>
  <div class="liu-icon4"></div>
  <div class="liu-icon5"></div>
  <div class="dian-icon1"></div>
  <div class="dian-icon2"></div>
  <div class="dian-icon3"></div>
  <i class="el-icon-s-fold fold" v-if="!isCollapse" @click="isCollapse=!isCollapse"></i>
  <i class="el-icon-s-unfold fold" v-if="isCollapse" @click="isCollapse=!isCollapse"></i>
  <div class="topLogo">
    <div class="logo"></div>
    <span class="title">云网管理平台</span>
  </div>
  <div class="user">
    <i class="el-icon-user-solid"></i>
    <span id="user">admin</span>
  </div>
  </div>
  <el-menu class="el-menu-vertical-demo disInlineBlock" @open="handleOpen" @close="handleClose"
           :collapse="isCollapse"
           :default-active="curRouter"
           background-color="rgb(9, 64, 94)"
           text-color="#fff"
           active-text-color="#ffd04b"
           :router="true">
    <el-menu-item index="/nav/home">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="package">
      <template slot="title">
        <i class="el-icon-s-goods"></i>
        <span slot="title">描述包</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/nav/ns">子网切片描述包</el-menu-item>
        <el-menu-item index="/nav/vnf">虚拟网元描述包</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/nav/nst">
      <i class="el-icon-coin"></i>
      <span slot="title">网络切片模板</span>
    </el-menu-item>
    <el-submenu index="example">
      <template slot="title">
        <i class="el-icon-position"></i>
        <span slot="title">实例</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/nav/nsi">网络切片实例</el-menu-item>
        <el-menu-item index="/nav/ssi">子网切片实例</el-menu-item>
        <el-menu-item index="/nav/vnfi">虚拟网元实例</el-menu-item>
        <el-menu-item index="/nav/pdu">物理部署单元实例</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="sla">
      <template slot="title">
        <i class="el-icon-medal"></i>
        <span slot="title">SLA管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/nav/slat">SLA模板</el-menu-item>
        <el-menu-item index="/nav/sla">SLA实例</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/nav/sdn">
      <i class="el-icon-menu"></i>
      <span slot="title">SDN账户管理</span>
    </el-menu-item>
    <el-menu-item index="/nav/vimAccount">
      <i class="el-icon-cloudy"></i>
      <span slot="title">云计算账户管理</span>
    </el-menu-item>
    <el-submenu index="monitor">
      <template slot="title">
        <i class="el-icon-odometer"></i>
        <span slot="title">监控</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/nav/grafana">性能监控</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/nav/kibana">日志监控</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    <el-menu-item index="/nav/wimAccount">
      <i class="el-icon-s-management"></i>
      <span slot="title">WIM账户管理</span>
    </el-menu-item>
    <el-menu-item index="/nav/user">
      <i class="el-icon-s-custom"></i>
      <span slot="title">用户</span>
    </el-menu-item>
    <el-menu-item index="/nav/project">
      <i class="el-icon-s-finance"></i>
      <span slot="title">项目</span>
    </el-menu-item>
    <el-menu-item index="/nav/policy">
      <i class="el-icon-aim"></i>
      <span slot="title">策略</span>
    </el-menu-item>
  </el-menu>
  <router-view id="iframe" class="disInlineBlock" :style="'width:'+listWidth "></router-view>
  </div>
</template>

<script>
  export default {
    name: 'navi',
    data () {
      return {

        isCollapse: false, //菜单的收缩控制
        listWidth: '84%', //菜单的宽度
        links: []
      }
    },
    computed:{
      curRouter () {
        return this.$route.path;
      }
      },
    mounted () {},
    watch:{
      // 监控菜单的宽度，改变子页面的宽度
      isCollapse:function (val) {
        if(val){
          this.listWidth = '94%';
        }else{
          this.listWidth = '84%';
        }
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>

<style>
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar{
    width:5px;
    height:16px;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track{
    -webkit-box-shadow:inset0 06px rgba(0,0,0,0.3);
    border-radius:10px;
    background-color:#F5F5F5;
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb{
    border-radius:10px;
    -webkit-box-shadow: inset0 06px rgba(0,0,0,.3);
    background-color:#555;
  }

  i{cursor: pointer;}
  .el-menu-vertical-demo{
    vertical-align: top;
    float: left;
    text-align: left;
    height: calc(100vh - 20px);
    overflow-y: auto;
    overflow-x: hidden;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 15.9%;
    min-height: 400px;
  }
  #iframe{
    float: right;
    padding: 10px;
    height: calc(100vh - 20px);
    box-sizing: border-box;
    overflow-y: auto;
  }
  .disInlineBlock{
    display: inline-block;
  }
  .fold{
    font-size: 23px;
    color: #fff;
    float: left;
    margin: 15px 10px;
  }
  /*页头样式*/
  .appTop{
    position: fixed;
    top: 0;
    left: 0;
    min-width: 1200px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background:#09405e  no-repeat center top;
    background-size: 1280px 60px;
    z-index: 999;
    color: #fff;
  }
  .topLogo{
    display: inline-block;
    vertical-align: middle;
    float: left;
  }
  .logo{
    background: url("../../assets/images/logo-img.png");
    height: 32px;
    width: 112px;
    margin: 15px;
    float: left;
  }
  .title{
    font-size: 22px;
    font-weight: 700;
  }
  .user{
    color:#fff;
    float: right;
    margin-right: 20px;
  }
  /*页头动画*/
  .liu-icon1 {
    display: block;
    width: 36px;
    height: 57px;
    background: url(../../assets/images/liu-icon1.png) no-repeat;
    background-size: cover;
    position: absolute;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  @-webkit-keyframes spin {
    0%   {left: 500px;top:-88px;opacity: 1;}
    100% {left: 600px;top:0;opacity: 0;}
  }

  @keyframes spin {
    0%   {left: 500px;top:-88px;opacity: 1;}
    100% {left: 600px;top:0;opacity: 0;}
  }
  .liu-icon2 {
    display: block;
    width: 36px;
    height: 57px;
    background: url(../../assets/images/liu-icon1.png) no-repeat;
    background-size: cover;
    position: absolute;
    -webkit-animation: spin2 1s linear infinite;
    animation: spin2 1s linear infinite;
  }

  @-webkit-keyframes spin2 {
    0%   {left: 600px;top:-58px;opacity: 1;}
    100% {left: 650px;top:0;opacity: 0;}
  }

  @keyframes spin2 {
    0%   {left: 600px;top:-58px;opacity: 1;}
    100% {left: 650px;top:0;opacity: 0;}
  }
  .liu-icon3 {
    display: block;
    width: 36px;
    height: 57px;
    background: url(../../assets/images/liu-icon1.png) no-repeat;
    background-size: cover;
    position: absolute;
    -webkit-animation: spin3 1.5s linear infinite;
    animation: spin3 1.5s linear infinite;
  }

  @-webkit-keyframes spin3 {
    0%   {left: 750px;top:-58px;opacity: 1;}
    100% {left: 800px;top:0;opacity: 0;}
  }

  @keyframes spin3 {
    0%   {left: 750px;top:-58px;opacity: 1;}
    100% {left: 800px;top:0;opacity: 0;}
  }
  .liu-icon4 {
    display: block;
    width: 36px;
    height: 57px;
    background: url(../../assets/images/liu-icon1.png) no-repeat;
    background-size: cover;
    position: absolute;
    -webkit-animation: spin4 2s linear infinite;
    animation: spin4 2s linear infinite;
  }

  @-webkit-keyframes spin4 {
    0%   {left: 1000px;top:-68px;opacity: 1;}
    100% {left: 1050px;top:0;opacity: 0;}
  }

  @keyframes spin4 {
    0%   {left: 1000px;top:-68px;opacity: 1;}
    100% {left: 1050px;top:0;opacity: 0;}
  }
  .liu-icon5 {
    display: block;
    width: 36px;
    height: 57px;
    background: url(../../assets/images/liu-icon1.png) no-repeat;
    background-size: cover;
    position: absolute;
    -webkit-animation: spin5 1s linear infinite;
    animation: spin5 1s linear infinite;
  }

  @-webkit-keyframes spin5 {
    0%   {left: 1200px;top:-58px;opacity: 1;}
    100% {left: 1250px;top:0;opacity: 0;}
  }

  @keyframes spin5 {
    0%   {left: 1200px;top:-58px;opacity: 1;}
    100% {left: 1250px;top:0;opacity: 0;}
  }
  .dian-icon1 {
    display: block;
    width: 6px;
    height: 6px;
    background: url(../../assets/images/dian-icon1.png) no-repeat;
    background-size: cover;
    position: absolute;
    -webkit-animation: dian1 10s linear infinite alternate;
    animation: dian1 10s linear infinite alternate;
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
  .dian-icon2 {
    display: block;
    width: 6px;
    height: 6px;
    background: url(../../assets/images/dian-icon2.png) no-repeat;
    background-size: cover;
    position: absolute;
    -webkit-animation: dian2 12s linear infinite alternate;
    animation: dian2 12s linear infinite alternate;
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
  .dian-icon3 {
    display: block;
    width: 10px;
    height: 10px;
    background: url(../../assets/images/dian-icon3.png) no-repeat;
    background-size: cover;
    position: absolute;
    -webkit-animation: dian3 4s linear infinite alternate;
    animation: dian3 4s linear infinite alternate;
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
