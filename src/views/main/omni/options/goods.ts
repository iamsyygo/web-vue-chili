import * as echarts from 'echarts';
let myData5 = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月',
];
let ht = [1100, 1200, 800, 900, 1000, 400, 500, 1200, 1150, 800, 1026, 1300];
export let option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0, 255, 233,0)',
            },
            {
              offset: 0.5,
              color: 'rgba(255, 255, 255,1)',
            },
            {
              offset: 1,
              color: 'rgba(0, 255, 233,0)',
            },
          ],
          global: false,
        },
      },
    },
    textStyle: {
      color: '#fff',
    },
    backgroundColor: 'rgba(0, 58, 99, 0.8)', //设置背景颜色
    borderColor: 'rgba(0, 58, 99, 0.8)',
    confine: true,
    formatter: '{b}：{c}份合同',
  },
  grid: {
    top: '14%',
    left: '2%',
    right: '4%',
    bottom: '2%',
    containLabel: true,
  },
  xAxis: {
    show: false,

    type: 'category',
    data: myData5,
    axisLabel: {
      color: '#A4A7AA',
      interval: 0,
      fontSize: 12,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(127, 214, 255, .4)',
      },
    },
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    boundaryGap: false,
  },
  yAxis: {
    show: false,
    type: 'value',
    name: '',
    nameTextStyle: {
      color: '#A4A7AA',
      fontSize: 12,
    },
    axisLine: {
      show: false,
      lineStyle: {
        color: 'rgba(127, 214, 255, .4)',
      },
    },
    min: 0,
    axisLabel: {
      show: true,
      color: '#A4A7AA',
      fontSize: 12,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        width: 0.8,
        color: 'rgba(127, 214, 255, .4)',
        type: 'dashed',
      },
    },
  },
  series: [
    {
      name: '合同数量',
      type: 'line',
      showSymbol: false,
      smooth: true,
      itemStyle: {
        color: 'rgb(234, 128, 125)',
        borderColor: '#fff',
        borderWidth: 1,
      },
      lineStyle: {
        normal: {
          color: 'rgb(234, 128, 125)',
          shadowColor: 'rgba(234, 128, 125, .4)',
          shadowBlur: 8,
          shadowOffsetY: 10,
          shadowOffsetX: 0,
        },
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(234, 128, 125, .4)',
            },
            {
              offset: 1,
              color: 'rgba(234, 128, 125, 0)',
            },
          ]),
        },
      },
      data: ht, //data.values
    },
  ],
};
