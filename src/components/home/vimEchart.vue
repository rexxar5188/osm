<template>
  <el-container>
    <el-header><h1>云计算账户资源使用情况</h1></el-header>
    <el-main>

      <div v-if="data" id="chart" ref="chart" style="margin:0 10%;width: 80%;height: 300px;"></div>
      <h1 v-else>数据获取错误</h1>
    </el-main>
  </el-container>
</template>

<script>
  var echarts = require('echarts');
  import { Loading } from 'element-ui';

  export default {
    name: 'vimEchart',
    data() {
      return {
        loadding: {
          target: '#chart',
          text:'加载数据中...',
          background:'rgba(9, 64, 94, 0.3)'
        },
        charts: '',
        symbols: {
          'ram': 'path://M923.52 732.16h-60.8v77.44h60.8c9.6 0 19.2-3.84 26.24-10.88 7.04-7.04 10.88-16 10.88-26.24-0.64-20.48-16.64-40.32-37.12-40.32z m36.48-464.64c0-9.6-3.84-19.2-10.88-26.24-7.04-7.04-16-10.88-26.24-10.88h-60.8v77.44h60.8c21.12-3.84 37.12-19.84 37.12-40.32zM64 520.32c0 9.6 3.84 19.2 10.88 26.24 7.04 7.04 16 10.88 26.24 10.88h60.8V479.36h-60.8c-21.12 3.84-37.12 20.48-37.12 40.96z m0 252.16c0 9.6 3.84 19.2 10.88 26.24 7.04 7.04 16 10.88 26.24 10.88h60.8v-77.44h-60.8c-21.12 0-37.12 19.84-37.12 40.32zM768.64 104.96H251.52c-24.32 0-40.96 16-40.96 40.96v732.8c0 20.48 20.48 40.96 40.96 40.96h517.12c24.32 0 40.96-16 40.96-40.96V145.28c-0.64-22.4-18.56-40.32-40.96-40.32zM658.56 467.2l-174.72 268.8c-8.32 12.16-24.32 3.84-24.32-8.32l28.8-158.72h-102.4c-8.32 0-16-12.16-12.16-20.48l170.88-264.96c8.32-12.16 24.32-3.84 24.32 8.32l-24.32 154.88h106.24c7.68 4.48 16 12.16 7.68 20.48zM64 267.52c0 9.6 3.84 19.2 10.88 26.24 7.04 7.04 16 10.88 26.24 10.88h60.8V227.2h-60.8c-21.12 3.84-37.12 19.84-37.12 40.32z m859.52 215.68h-60.8v77.44h60.8c9.6 0 19.2-3.84 26.24-10.88 7.04-7.04 10.88-16 10.88-26.24-0.64-23.68-16.64-40.32-37.12-40.32z m0 0',
          'instances': 'path://M848.896 911.36H166.31296c-34.41664 0-57.344-22.94784-57.344-57.3696v-126.21824a57.48224 57.48224 0 0 1 57.344-57.3696H848.896a57.48736 57.48736 0 0 1 57.344 57.3696V854.016a57.48736 57.48736 0 0 1-57.344 57.344z m-5.7344-183.58784H166.31296V854.016h676.83328v-126.24384z m-608 34.8416a28.672 28.672 0 1 1-28.672 28.672 28.672 28.672 0 0 1 28.65664-28.672z m83.56352 0a28.672 28.672 0 1 1-28.38016 28.9792 28.672 28.672 0 0 1 28.35968-28.9792z m83.84 0a28.672 28.672 0 1 1-28.38016 28.9792 28.672 28.672 0 0 1 28.35968-28.9792z m445.66528-130.13504H165.63712c-34.41152 0-57.344-22.94784-57.344-57.3696V448.89088a57.48736 57.48736 0 0 1 57.344-57.3696h682.5728a57.48736 57.48736 0 0 1 57.344 57.3696v126.21824a57.48736 57.48736 0 0 1-57.344 57.3696z m-5.73952-183.58784H165.63712v126.21824h676.83328V448.89088zM234.496 483.01568a28.672 28.672 0 1 1-28.672 28.672 28.672 28.672 0 0 1 28.672-28.672z m83.08224 0a28.672 28.672 0 1 1-28.672 28.672 28.672 28.672 0 0 1 28.6464-28.672z m82.09408-0.43008a28.672 28.672 0 1 1-28.38016 28.9792 28.672 28.672 0 0 1 28.35968-28.97408zM847.44704 353.792H164.864c-34.40128 0-57.344-22.9632-57.344-57.38496V170.1888a57.48736 57.48736 0 0 1 57.344-57.3696h682.58304a57.48736 57.48736 0 0 1 57.344 57.3696v126.21824a57.48736 57.48736 0 0 1-57.344 57.38496zM841.728 170.1888H164.864v126.21824h676.864V170.1888zM233.71264 204.61568a28.672 28.672 0 1 1-28.672 28.672 28.672 28.672 0 0 1 28.672-28.672z m83.84512 0a28.672 28.672 0 1 1-28.672 28.672 28.672 28.672 0 0 1 28.66688-28.672z m83.84512 0a28.672 28.672 0 1 1-28.672 28.672 28.672 28.672 0 0 1 28.67712-28.672z',
          'cores': 'path://M1024 293.376V225.28h-80.896V157.696c0-42.496-33.792-80.896-80.896-80.896H794.112V0.512h-63.488V76.8h-101.888V0.512h-68.096V76.8H458.752V0.512H390.656V76.8H288.768V0.512H220.672V76.8H148.48c-42.496 0-72.192 33.792-72.192 72.192v72.192H0v68.096h76.288v101.888H0v68.096h76.288v101.888H0v68.096h76.288v101.888H0v68.096h76.288v68.096c0 42.496 33.792 80.896 80.896 80.896h68.096V1024h68.096v-76.288H394.752V1024h68.096v-76.288h101.888V1024h68.096v-76.288h101.888V1024h68.096v-76.288h72.192c42.496 0 72.192-33.792 72.192-72.192v-72.192h76.288v-68.096H942.592v-101.888h76.8v-68.096h-76.288V463.36H1019.392V395.264h-76.288V293.376h80.896z m-161.792 573.44H161.28V165.888h700.928v700.928z',
          'volumes': 'path://M870.4 57.617067C780.8 19.217067 652.8 0 512 0S243.2 19.217067 153.6 57.617067C51.2 102.4 0 153.6 0 217.6v595.217067c0 57.582933 51.2 115.2 153.6 153.6C243.2 1004.817067 371.2 1024 512 1024s268.8-19.217067 358.4-57.617067c96.017067-38.4 153.6-95.982933 153.6-153.6V217.6C1024 153.6 972.8 102.4 870.4 57.582933z m-57.617067 262.382933C729.6 352.017067 614.4 364.817067 512 364.817067c-108.817067 0-217.6-12.834133-300.817067-44.817067-95.982933-25.6-140.8-64-140.8-102.4s51.2-76.8 140.834134-108.817067C294.365867 76.8 403.217067 64 512 64c102.4 0 217.6 19.217067 300.817067 44.817067 89.6 31.982933 140.8 70.382933 140.8 108.782933s-44.817067 76.8-140.8 102.4zM819.2 505.617067c-83.217067 25.6-198.417067 44.782933-307.2 44.782933-108.817067 0-217.6-19.217067-307.2-44.817067-89.6-31.982933-140.8-70.382933-140.8-108.782933V326.382933c64 25.6 108.817067 57.617067 179.2 70.417067 83.217067 19.217067 172.817067 32.017067 268.8 32.017067 96.017067 0 185.617067-12.834133 268.8-32.017067 70.417067-12.8 115.2-44.817067 179.2-70.417067v76.8c0 32.017067-51.2 70.417067-140.8 102.4z m0 204.8c-83.217067 25.6-198.417067 44.782933-307.2 44.782933-108.817067 0-217.6-19.217067-307.2-44.817067s-140.8-64-140.8-108.782933v-96.017067c64 32.017067 108.817067 57.617067 179.2 76.8C326.417067 601.6 416.017067 614.4 512 614.4c96.017067 0 185.617067-12.8 268.8-32.017067 70.417067-19.182933 115.2-44.782933 179.2-76.8v96.017067c0 44.817067-51.2 83.217067-140.8 108.817067z m-307.2 249.582933c-108.817067 0-217.6-19.217067-307.2-44.817067s-140.8-64-140.8-108.782933v-96.017067c64 32.017067 108.817067 57.617067 179.2 76.8 76.8 19.217067 172.817067 32.017067 262.417067 32.017067 95.982933 0 185.582933-12.8 268.765866-32.017067 76.8-19.182933 121.617067-44.782933 185.617067-76.8v96.017067c0 38.4-51.2 76.8-140.8 108.817067-83.217067 31.982933-204.8 44.782933-307.2 44.782933z',
          'gigabytes': 'path://M921.82615 184.060695L815.366703 96.029932c-10.166527-8.17313-22.862661-15.477475-35.952768-15.477476H138.071359c-31.767454 0-57.52709 31.515721-57.527089 63.25657v747.842955c0 31.79406 25.759635 51.79454 57.527089 51.794539h747.856258c31.741872 0 57.52709-20.00048 57.52709-51.794539V229.00319c0-17.470872-7.977679-34.016677-21.628557-44.942495z m-237.238741-45.982172v172.580245H598.295239v-172.580245h86.29217z m-143.816189 0v172.580245H310.651605v-172.580245h230.119615z m201.342255 488.97361H281.886525v-57.52709h460.22695v57.52709z m-460.22695 57.527089h460.22695v201.343279H281.886525V684.579222z m604.041092 201.343279h-86.291146V569.525043c0-31.710149-25.840476-57.525043-57.522996-57.525043H281.886525c-31.711172 0-57.52402 25.814894-57.52402 57.525043v316.396434h-86.291146V138.078523h115.05418v172.580245c0 31.711172 25.814894 57.525043 57.526066 57.525043h373.935804c31.68252 0 57.52709-25.813871 57.527089-57.525043v-172.580245H770.875485v2.866275l115.053156 88.058392v656.919311z',
        },
        labelSetting: {
          normal: {
            show: true,
            position: 'outside',
            offset: [0, -20],
            formatter: function (param) {
              return param.data.in_use + '/' + param.data.limit + '\n' + (param.value * 100).toString()
                .slice(0, 4) + '%';
            },
            textStyle: {
              fontSize: 18,
              fontFamily: 'Arial'
            }
          }
        },
        data: {},
      };
    },
    mounted() {
      this.getSourceInfo();

    },
    methods: {
      getSourceInfo() {
        let loadingInstance = Loading.service(this.loadding);
        this.$api.vim.resouceInfo()
          .then((response) => {
            this.data = response.data;
            if (this.data) {
              this.drawChart('chart');
              loadingInstance.close()
            }
          })
          .catch(() => {
            this.data={}
            loadingInstance.close()
          });
      },
      drawChart(id) {
        this.charts = echarts.init(this.$refs['chart']);
        this.charts.setOption(
          {
            legend: {
              data: this.leg(this.data),
              selectedMode: 'single'
            },
            xAxis: {
              data: ['内存(MB)', '实例(个)', 'vcpu(个)', '卷储存(gb)', '卷(个)'],
              axisTick: { show: false },
              axisLine: { show: false },
              axisLabel: { show: true }
            },
            yAxis: {
              max: 1,
              show: false,
            },
            grid: {
              top: 'center',
              height: 50
            },
            markLine: {
              z: -100
            },
            series: this.get_series(this.data)
          }
        );
      },
      get_series(data) {
        let my_series = [];
        for (let vim in data) {
          let datas = [];
          if (data[vim]) {
            for (let k in data[vim]) {
              let data_item = {
                in_use: data[vim][k]['in_use'],
                limit: data[vim][k]['limit'],
                value: data[vim][k]['in_use'] / data[vim][k]['limit'],
                symbol: this.symbols[k],
                symbolSize: 50,
                symbolBoundingData: 1,
              };
              datas.push(data_item);
            }
            var series_item = {
              name: vim,
              type: 'pictorialBar',
              symbolClip: true,
              data: datas,
              label: this.labelSetting,
              z: 10,
            };
          } else {
            var series_item = {
              name: vim,
              type: 'pictorialBar',
              symbolClip: true,
              data: [0, 0, 0, 0, 0],
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  distance: 70,
                  offset: [0, -20],
                  formatter: '数据获取错误',
                  color: '	#DC143C',
                  textStyle: {
                    fontSize: 18,
                    fontFamily: 'Arial'
                  }
                }
              },
              z: 10,
            };
          }
          my_series.push(series_item);
        }
        my_series.push({
            name: 'full',
            type: 'pictorialBar',
            animationDuration: 0,
            symbolSize: 50,
            itemStyle: {
              normal: {
                color: '#ccc'
              }
            },

            symbolBoundingData: 10000,
            data: [{
              value: 0,
              symbol: this.symbols['ram'],
            }, {
              value: 0,
              symbol: this.symbols['instances'],
            }, {
              value: 0,
              symbol: this.symbols['cores'],
            }, {
              value: 0,
              symbol: this.symbols['gigabytes'],
            }, {
              value: 0,
              symbol: this.symbols['volumes'],
            }]
          }
        );
        console.log(my_series);
        return my_series;
      },
      //返回接口数据中的vim名称作为legend
      leg(data) {
        let res = [];
        for (let vim in data) {
          res.push(vim);
        }
        return res;
      }
    }
  };
</script>

<style scoped>

</style>
