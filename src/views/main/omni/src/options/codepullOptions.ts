import * as echarts from 'echarts';

let color = ['#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];
const handleHex2Rgba = (hex: string, opacity: number) => {
  let rgbaColor = '';
  let reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt(
      '0x' + hex.slice(3, 5)
    )},${parseInt('0x' + hex.slice(5, 7))},${opacity})`;
  }
  return rgbaColor;
};

export const setPullCodeOption = ({ months, frontEnd = {}, backEnd = {} }) => {
  const xAxisData = months;
  const frontEndData = months.map((item) => {
    return frontEnd[item] || 0;
  });
  const rearEndData = months.map((item) => {
    return backEnd[item] || 0;
  });

  return {
    color: color,
    legend: { right: 10, top: 10 },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      containLabel: true,
      left: 30,
      right: 30,
      bottom: 10,
      top: 60,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: '#333',
          },
        },
        axisLine: {
          lineStyle: {
            color: '#D9D9D9',
          },
        },
        data: xAxisData,
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位：次',
        axisLabel: {
          textStyle: {
            color: '#666',
          },
        },
        nameTextStyle: {
          color: '#666',
          fontSize: 12,
          lineHeight: 40,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#E9E9E9',
          },
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: '前端',
        type: 'line',
        smooth: true,
        symbolSize: 8,
        zlevel: 3,
        lineStyle: {
          normal: {
            color: color[0],
            shadowBlur: 3,
            shadowColor: handleHex2Rgba(color[0], 0.5),
            shadowOffsetY: 8,
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: handleHex2Rgba(color[0], 0.3),
                },
                {
                  offset: 1,
                  color: handleHex2Rgba(color[0], 0.1),
                },
              ],
              false
            ),
            shadowColor: handleHex2Rgba(color[0], 0.1),
            shadowBlur: 10,
          },
        },
        data: frontEndData,
      },
      {
        name: '后端',
        type: 'line',
        smooth: true,
        symbolSize: 8,
        zlevel: 3,
        lineStyle: {
          normal: {
            color: color[1],
            shadowBlur: 3,
            shadowColor: handleHex2Rgba(color[1], 0.5),
            shadowOffsetY: 8,
          },
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: handleHex2Rgba(color[1], 0.3),
                },
                {
                  offset: 1,
                  color: handleHex2Rgba(color[1], 0.1),
                },
              ],
              false
            ),
            shadowColor: handleHex2Rgba(color[1], 0.1),
            shadowBlur: 10,
          },
        },
        data: rearEndData,
      },
    ],
  };
};
