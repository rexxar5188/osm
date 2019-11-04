import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/components/home/Home';
import Nst from '@/components/packages/nst';
import vnf from '../components/packages/vnf';
import ns from '../components/packages/ns';
import composeVnf from '../components/packages/composeVnf';
import ssi from '../components/instances/ssi';
import operation from '../components/operation';
import vnfi from '../components/instances/vnfi';
import pdu from '../components/instances/pdu';
import vimAccount from '../components/packages/vimAccount';
import nsi from '../components/instances/nsi';
import sdnController from '../components/packages/sdnController';
import navi from '../components/home/nav';
import page404 from '../components/home/page404';
import user from '../components/packages/user';
import project from '../components/packages/project';
import grafana from '../components/packages/grafana';
import slat from '../components/packages/slat';
import sla from '../components/packages/sla';
import wimAccount from '../components/packages/wimAccount';
import kibana from '../components/packages/kibana';
import vimEchart from '../components/home/vimEchart';
import policy from '../components/packages/policy';
import page403 from '../components/home/page403';


Vue.use(Router);
// 当路由以nav开头时显示导航栏

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/nav',
      component: navi,
      children: [
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'grafana',
          component: grafana,
        },
        {
          path: 'kibana',
          component: kibana,
        },
        {
          path: 'vnf',
          component: vnf,
        },
        {
          path: 'composeVnf',
          component: composeVnf,
        },

        {
          path: 'ns',
          component: ns,
        },
        {
          path: 'nst',
          component: Nst,
        },
        {
          path: 'ssi',
          component: ssi,
        },
        {
          path: 'operation/:type/:id',
          name:'nav_operation',
          component: operation,
        },
        {
          path: 'vnfi',

          component: vnfi,
        },
        {
          path: 'pdu',

          component: pdu,
        },
        {
          path: 'vimAccount',

          component: vimAccount,
        },
        {
          path: 'nsi',

          component: nsi,
        },
        {
          path: 'sdn',

          component: sdnController,
        },
        {
          path: 'user',

          component: user,
        },
        {
          path: 'project',

          component: project,
        },
        {
          path: 'slat',

          component: slat,
        },
        {
          path: 'sla',

          component: sla,
        },
        {
          path: 'wimAccount',

          component: wimAccount,
        },
        {
          path: 'vimEchart',

          component: vimEchart,
        },
        {
          path: 'policy',

          component: policy,
        },
        {
          path: '*',
          redirect: '/page404'
        },
      ],
    },
    {
      path: '/npage/osm/home',
      component: Home,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/vnf',
      component: vnf,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/composeVnf',
      meta: {requirejwt:true},
      component: composeVnf,
    },

    {
      path: '/npage/osm/ns',
      meta: {requirejwt:true},
      component: ns,
    },
    {
      path: '/npage/osm/nst',
      meta: {requirejwt:true},
      component: Nst,
    },
    {
      path: '/npage/osm/ssi',
      meta: {requirejwt:true},
      component: ssi,
    },
    {
      path: '/npage/osm/operation/:type/:id',
      name:'operation',
      component: operation,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/vnfi',
      meta: {requirejwt:true},
      component: vnfi,
    },
    {
      path: '/npage/osm/pdu',
      meta: {requirejwt:true},
      component: pdu,
    },
    {
      path: '/npage/osm/vimAccount',
      meta: {requirejwt:true},
      component: vimAccount,
    },
    {
      path: '/npage/osm/nsi',
      component: nsi,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/sdn',
      component: sdnController,
      meta: {requirejwt:true},
    },
    {
      path: '/nsi',
      component: nsi,
      meta: {requirejwt:true},
    },
    {
      path: '/403',
      component: page403,
    },
    {
      path: '/npage/osm/user',
      component: user,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/project',
      component: project,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/slat',
      component: slat,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/sla',
      component: sla,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/wimAccount',
      component: wimAccount,
      meta: {requirejwt:true},
    },
    {
      path: 'npage/osm/grafana',
      component: grafana,
      meta: {requirejwt:true},
    },
    {
      path: 'npage/osm/kibana',
      component: kibana,
      meta: {requirejwt:true},
    },
    {
      path: 'npage/osm/vimEchart',
      component: vimEchart,
      meta: {requirejwt:true},
    },
    {
      path: '/npage/osm/project',
      component: project,
      meta: {requirejwt:true},
    },
    {
      path: '*',
      component: page404,
      meta: {requirejwt:true},
    },
  ]
});

