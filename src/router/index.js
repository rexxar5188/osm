import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/home/Home';
import Nst from '@/components/packages/nst';
import vnf from "../components/packages/vnf";
import ns from "../components/packages/ns";
import composeVnf from "../components/packages/composeVnf"
import ssi from '../components/instances/ssi';
import operation from '../components/operation';
import vnfi from '../components/instances/vnfi';
import pdu from '../components/instances/pdu';
import vimAccount from '../components/packages/vimAccount';
import nsi from '../components/instances/nsi';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/npage/osm/home',
      name: 'home',
      component: Home,
      meta: []
    },
    {
      path: '/npage/osm/vnf',
      name: 'vnf',
      component: vnf,
      meta: [
        { title: '首页' ,url: '/npage/osm/home'},
        { title: '虚拟网元描述包' },
      ]
    },
    {
      path: '/npage/osm/composeVnf',
      name: 'composeVnf',
      component: composeVnf,
      meta: [
        { title: '首页',url: '/npage/osm/home' },
        { title: '创建虚拟网元' },
      ]
    },

    {
      path: '/npage/osm/ns',
      name: 'ns',
      component: ns,
      meta: [
        { title: '首页', url: '/npage/osm/home' },
        { title: '网络服务' },
      ]
    },
    {
      path: '/npage/osm/nst',
      name: 'Nst',
      component: Nst,
      meta: [
        { title: '首页', url: '/npage/osm/home' },
        { title: '网络切片模板' },
      ]
    },
    {
      path: '/npage/osm/ssi',
      name: 'Ssi',
      component: ssi,
      meta: [
        { title: '首页', url: '/npage/osm/home' },
        { title: '子网切片实例' },
      ]
    },
    {
      path: '/npage/osm/operation/:type/:id',
      name: 'operation',
      component: operation,
      meta: [
        { title: '首页', url: '/npage/osm/home' },
        { title: '操作历史信息' },
      ]
    },
    {
      path: '/npage/osm/vnfi',
      name: 'vnfi',
      component: vnfi,
      meta: [
        { title: '首页', url: '/npage/osm/home' },
        { title: '虚拟网元实例' },
      ]
    },
    {
      path: '/npage/osm/pdu',
      name: 'pdu',
      component: pdu,
      meta: [
        { title: '首页', url: '/npage/osm/home' },
        { title: '物理部署单元' },
      ]
    },
    {
      path: '/npage/osm/vimAccount',
      name: 'vimAccount',
      component: vimAccount,
      meta: [
        { title: '首页', url: '/npage/osm/home' },
        { title: '云计算账户管理' },
      ]
    },
    {
      path: '/npage/osm/nsi',
      name: 'nsi',
      component: nsi,
      meta: [
        { title: '首页', url: '/npage/osm/home' },
        { title: '网络切片实例' },
      ]
    },
  ]
});

