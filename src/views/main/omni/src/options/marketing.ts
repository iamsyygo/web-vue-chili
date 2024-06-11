import * as echarts from 'echarts';
// 真实后端数据
const annularList = [
  { value: 2700, name: '设备一' },
  { value: 3800, name: '设备二' },
  { value: 4400, name: '设备三' },
];

// 颜色
const colorList = {
  设备一: ['#4292FF', '#7DBAFF'],
  设备二: ['#207e8e', '#5ddeE6'],
  设备三: ['#FFB400', '#FFC900'],
};

// 组装数据
const newAnnularList = annularList.map((item) => {
  return {
    ...item,
    itemStyle: {
      color: new echarts.graphic.RadialGradient(0, 0, 1, [
        {
          offset: 0,
          color: colorList[item.name][0],
        },
        {
          offset: 1,
          color: colorList[item.name][1],
        },
      ]),
    },
  };
});

// 配置项
export const option = {
  series: [
    {
      name: '',
      type: 'pie',
      radius: ['40%', '60%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },

      labelLine: {
        show: true,
        length: 20,
        length2: 30,
      },
      data: newAnnularList,
    },
  ],
};
