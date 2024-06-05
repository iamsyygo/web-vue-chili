import { LineSeriesOption } from 'echarts';
export const option = {
  tooltip: {
    trigger: 'axis',
  },
  xAxis: [
    {
      type: 'category',
      data: ['2023-01', '2023-02', '2023-03', '2023-04', '2023-05', '2023-06'],
      show: false,
      axisLine: {
        lineStyle: {
          color: '#999',
        },
      },
      axisLabel: {
        interval: 4,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      splitNumber: 4,
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#DDD',
        },
        // show: false,
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#333',
        },
      },
      nameTextStyle: {
        color: '#999',
      },
      splitArea: {
        show: false,
      },
      show: false,
    },
  ],
  series: [
    {
      name: '价格',
      type: 'line',
      data: [23, 60, 20, 36, 23, 85],
      lineStyle: {
        normal: {
          width: 3,
          color: {
            type: 'linear',

            colorStops: [
              {
                offset: 0,
                color: '#A9F387', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#48D8BF', // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          shadowColor: 'rgba(72,216,191, 0.3)',
          shadowBlur: 8,
          shadowOffsetY: 6,
        },
      },
      //   itemStyle: {
      //     normal: {
      //       color: '#fff',
      //       borderWidth: 5,
      //       shadowColor: 'rgba(72,216,191, 0.3)',
      //       shadowBlur: 100,
      //       borderColor: '#A9F387',
      //     },
      //   },
      smooth: true,
    },
  ],
};
