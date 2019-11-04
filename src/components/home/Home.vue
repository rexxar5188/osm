<template>
  <div>
  <!-- <div>
    <h1>云网管理平台</h1>
    <img src="../../assets/网络.svg" />
  </div>-->
  <el-row>
    <el-col :span="12" style="margin-top:10px;">
      <el-card class="box-card">
        <ul class="nav nav-stacked">
          <li>
            <a>
              <b>项目名称:</b>
              <span class="pull-right">0ce70e7a-39aa-4f8e-a610-ff10d511f629</span>
            </a>
          </li>
          <li>
            <a>
              <b>创建时间:</b>
              <span class="pull-right">2019-05-08 07:23:40</span>
            </a>
          </li>
          <li>
            <a>
              <b>修改时间:</b>
              <span class="pull-right">2019-05-08 07:23:40</span>
            </a>
          </li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="12" style="float:right;">
      <el-row>
        <el-card class="card bg-aqua" :body-style="{ padding: '0px' }">
          <div class="inner">
            <h3>{{nsd_count}}</h3>
            <p>NS packages</p>
          </div>
          <div class="icon">
            <div>
              <i class="el-icon-receiving"></i>
            </div>
          </div>
          <div class="bottom">打开列表</div>
        </el-card>
        <el-card class="card bg-aqua" :body-style="{ padding: '0px' }">
          <div class="inner">
            <h3>{{vnfd_count}}</h3>
            <p>VNF packages</p>
          </div>
          <div class="icon">
            <i class="el-icon-suitcase-1"></i>
          </div>
          <div class="bottom">打开列表</div>
        </el-card>
      </el-row>
      <el-row>
        <el-card class="card bg-maroon" :body-style="{ padding: '0px' }">
          <div class="inner">
            <h3>{{ns_count}}</h3>
            <p>NS Instances</p>
          </div>
          <div class="icon">
            <i class="el-icon-cpu"></i>
          </div>
          <div class="bottom">打开列表</div>
        </el-card>
        <el-card class="card bg-maroon" :body-style="{ padding: '0px' }">
          <div class="inner">
            <h3>{{vnf_count}}</h3>
            <p>VNF Instances</p>
          </div>
          <div class="icon">
            <i class="el-icon-menu"></i>
          </div>
          <div class="bottom">打开列表</div>
        </el-card>
      </el-row>
    </el-col>
  </el-row>
  <vim-echart></vim-echart>
  </div>
</template>

<script>
import Info from "../info";
import Editor from "../Editor";
import instantiation from "../instantiation";
import operation from "../operation";
import upload from "../upload";
import vimEchart from './vimEchart';

export default {
  name: "Home",
  components: {
    vimEchart,
  },
  data() {
    return {
      nsd_count:"",
      ns_count:"",
      vnfd_count:"",
      vnf_count:""
    };
  },
  mounted(){
    this.getNsdCount();
    this.getNsCount();
    this.getVnfdCount();
    this.getVnfCount();
  },
  methods: {
    getNsdCount(){
      this.$api.ns.list().then(response => {
        this.nsd_count = response.data.length;
      });
    },
    getNsCount(){
      this.$api.ssi.list().then(response => {
        this.ns_count = response.data.length;
      });
    },
    getVnfdCount(){
      this.$api.vnf.list().then(response => {
        this.vnfd_count = response.data.length;
      });
    },
    getVnfCount(){
      this.$api.vnfi.list().then(response => {
        this.vnf_count = response.data.length;
      });
    }

  }
};
</script>

<style>
.nav {
  text-align: left;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.pull-right {
  float: right !important;
}
.nav > li {
  border-bottom: 1px solid #f4f4f4;
  margin: 10px;
}
.card {
  float: left;
  margin: 10px;
  padding: 0px;
  color: white;
}
.bg-aqua {
  background-color: #00c0ef !important;
}
.bg-maroon {
  background-color: #d81b60 !important;
}

.inner {
  text-align: left;
  float: left;
  padding: 10px;
}
.inner h3 {
  font-size: 38px;
  font-weight: bold;
  margin: 0 0 0 0;
  white-space: nowrap;
  padding: 0;
}
.inner p {
  margin: 0 0 0 0;
}
.icon {
  float: right;
  -webkit-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  z-index: 0;
  font-size: 90px;
  color: rgba(0, 0, 0, 0.15);
}

.padding {
  padding: 20px;
}
.button {
  padding: 0;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
