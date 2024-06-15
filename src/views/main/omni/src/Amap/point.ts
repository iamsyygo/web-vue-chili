export const getPoints = (el: HTMLDivElement) => {
  const { x, y, width, height, bottom, left, right, top } = el.getBoundingClientRect();

  const topEdge = [
    { x: 0, y: 0 },
    { x: right - left, y: 0 },
  ];
  const rightEdge = [
    { x: right - left, y: 0 },
    { x: right - left, y: bottom - top },
  ];
  const bottomEdge = [
    { x: right - left, y: bottom - top },
    { x: 0, y: bottom - top },
  ];
  const leftEdge = [
    { x: 0, y: bottom - top },
    { x: 0, y: 0 },
  ];

  // 生成随机坐标
  let point1, point2;

  while (!point1 || !point2) {
    // 随机选择一个边
    const randomEdgeIndex1 = Math.floor(Math.random() * 4);
    const selectedEdge = [topEdge, rightEdge, bottomEdge, leftEdge][randomEdgeIndex1];

    // 生成坐标1
    // if top or bottom 那么它的 y 坐标一定是 top 或者 bottom
    // if left or right 那么它的 x 坐标一定是 left 或者 right
    if (selectedEdge[0].x === selectedEdge[1].x) {
      const x = selectedEdge === leftEdge ? 0 - 50 : selectedEdge[0].x;
      point1 = {
        x: x,
        y: Math.random() * (selectedEdge[1].y - selectedEdge[0].y) + selectedEdge[0].y,
      };
    } else {
      const y = selectedEdge === topEdge ? 0 - 50 : selectedEdge[0].y;
      point1 = {
        x: Math.random() * (selectedEdge[1].x - selectedEdge[0].x) + selectedEdge[0].x,
        y: y,
      };
    }

    // 候选边缘 2
    let randomEdgeIndex2;

    // do while 保证两个边不一样
    do {
      randomEdgeIndex2 = Math.floor(Math.random() * 4);
    } while (randomEdgeIndex2 === randomEdgeIndex1);
    const selectedEdge2 = [topEdge, rightEdge, bottomEdge, leftEdge][randomEdgeIndex2];

    // 生成坐标2
    if (selectedEdge2[0].x === selectedEdge2[1].x) {
      const x = selectedEdge2 === leftEdge ? 0 - 50 : selectedEdge2[0].x;
      point2 = {
        x: x,
        y: Math.random() * (selectedEdge2[1].y - selectedEdge2[0].y) + selectedEdge2[0].y,
      };
    } else {
      const y = selectedEdge2 === topEdge ? 0 - 50 : selectedEdge2[0].y;
      point2 = {
        x: Math.random() * (selectedEdge2[1].x - selectedEdge2[0].x) + selectedEdge2[0].x,
        y: y,
      };
    }

    // 如果两个点距离太近，且是相邻的边，那么重新生成
    if (Math.abs(point1.x - point2.x) < 10 && Math.abs(point1.y - point2.y) < 10) {
      point1 = null;
      point2 = null;
    }
  }

  const rotationAngle = getAngleByPoint(point1, point2);
  console.log(rotationAngle);

  return {
    point1,
    point2,
    rotationAngle,
  };
};

interface Point {
  x: number;
  y: number;
}
function getAngleByPoint(start: Point, end: Point) {
  var x = Math.abs(end.x - start.x),
    y = Math.abs(end.y - start.y),
    z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  //无拖动
  if (x == 0 && y == 0) {
    return 0;
  }
  var cos = y / z;
  var radina = Math.acos(cos); //用反三角函数求弧度
  var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度
  //鼠标在第一象限
  if (start.x <= end.x && start.y > end.y) {
    angle = Math.abs(90 - angle);
  }
  //鼠标在第二象限
  if (start.x > end.x && start.y >= end.y) {
    angle += 90;
  }
  //鼠标在第三象限
  if (start.x >= end.x && start.y < end.y) {
    angle = 270 - angle;
  }
  //鼠标在第四象限
  if (start.x < end.x && start.y <= end.y) {
    angle += 270;
  }
  angle = 360 - angle;
  return angle == 360 ? 0 : angle;
}
