<template>
  <div class="app-color-picker">
    <!-- 颜色显示方块 -->
    <div
      class="color-pick-block"
      :style="{ backgroundColor: modelColorValue }"
      @click.stop="!disabled && (showPanel = true)"
    ></div>
    <!-- 颜色面板 -->
    <div class="color-pick-panel" v-show="showPanel" @click.stop="">
      <!-- 画布 -->
      <div class="color-pick-canvas">
        <canvas
          :id="canvasId"
          :width="width"
          :height="height"
          @click="onCanvasClick"
          @mousedown="onCanvasMousedown"
        ></canvas>
        <!-- 当前选中小块 -->
        <em class="color-pick-cur" :id="curId" @mousedown="onCanvasMousedown($event, 'cur')"></em>
        <!-- 左侧色条选中小块 -->
        <em class="color-pick-bar" :id="barId" @mousedown="onCanvasMousedown($event, 'cur')"></em>
        <!-- 透明度控制条 -->
        <div class="color-pick-alpha-silder" v-if="showAlpha">
          <div
            class="color-pick-alpha-silder-bar"
            :style="alphaBarStyle"
            @click="onAlphaClick"
            @mousedown="onAlphaMousedown"
          ></div>
          <em
            class="color-pick-alpha"
            :id="alphaId"
            :style="{ left: alpha * 100 + '%' }"
            @mousedown="onAlphaMousedown"
          ></em>
        </div>
      </div>
      <!-- 底部按钮栏 -->
      <div class="color-pick-control">
        <input class="color-pick-input" :value="modelColorValue" />
        <div class="color-pick-btns">
          <div class="color-pick-btn-clear" @click="modelColorValue = ''">清空</div>
          <div class="color-pick-btn-confirm" @click="confirm">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      default: '#ff0000',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showAlpha: {
      type: Boolean,
      default: false,
    },
    /* 可选值：hex，rgb */
    colorFormat: {
      type: String,
      default: 'hex',
    },
  },
  data() {
    return {
      canvasId: 'canvas-' + Date.now(), // 画布 id，防止多组件时冲突
      curId: 'cur-' + Date.now(), // 当前选中小块 id，防止多组件时冲突
      barId: 'bar-' + Date.now(), // 左侧色条选中小块 id，防止多组件时冲突
      alphaId: 'alpha-' + Date.now(), // 透明度选中小块 id，防止多组件时冲突
      canvas: null, // 画布
      ctx: null, // 画布实例
      modelColorValue: '', // 当前选中颜色
      activeColor: '', // bar选中颜色
      alpha: 1, // 透明度
      width: 286, // canvas宽度
      height: 200, // canvas高度
      showPanel: false, // 是否显示颜色面板
    };
  },
  computed: {
    alphaBarStyle() {
      return (
        'background: linear-gradient(to right, rgba(255, 69, 0, 0) 0%, ' +
        this.activeColor +
        ' 100%);'
      );
    },
  },
  watch: {
    modelValue(val) {
      this.modelColorValue = val;
      this.resetModelColorValue();
    },
  },
  created() {
    this.handler = () => {
      this.showPanel = false;
    };
    document.body.addEventListener('click', this.handler);
    this.$nextTick(() => {
      this.modelColorValue = this.modelValue;
      this.activeColor = '#ff0000';
      this.resetModelColorValue();
      this.init();
    });
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.handler);
  },
  methods: {
    init() {
      this.canvas = document.getElementById(this.canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.makeColorBar();
      this.makeColorBox('#ff0000');
    },
    /* 绘制左侧面板颜色选择条 */
    makeColorBar() {
      var gradientBar = this.ctx.createLinearGradient(0, 0, 0, this.height);
      gradientBar.addColorStop(0, '#f00');
      gradientBar.addColorStop(1 / 6, '#f0f');
      gradientBar.addColorStop(2 / 6, '#00f');
      gradientBar.addColorStop(3 / 6, '#0ff');
      gradientBar.addColorStop(4 / 6, '#0f0');
      gradientBar.addColorStop(5 / 6, '#ff0');
      gradientBar.addColorStop(1, '#f00');

      this.ctx.fillStyle = gradientBar;
      this.ctx.fillRect(0, 0, 20, this.height);
    },
    /* 绘制颜色选择区域 */
    makeColorBox(color) {
      var gradientBase = this.ctx.createLinearGradient(30, 0, this.width, 0);
      gradientBase.addColorStop(1, color);
      gradientBase.addColorStop(0, 'rgba(255,255,255,1)');
      this.ctx.fillStyle = gradientBase;
      this.ctx.fillRect(30, 0, this.width, this.height);

      var my_gradient1 = this.ctx.createLinearGradient(0, 0, 0, this.height);
      my_gradient1.addColorStop(0, 'rgba(0,0,0,0)');
      my_gradient1.addColorStop(1, 'rgba(0,0,0,1)');
      this.ctx.fillStyle = my_gradient1;
      this.ctx.fillRect(30, 0, this.width, this.height);
    },
    /* canvas点击 */
    onCanvasClick(e) {
      var ePos = {
        x: e.offsetX || e.layerX,
        y: e.offsetY || e.layerY,
      };
      var rgbaStr = '#000';
      if (ePos.x >= 0 && ePos.x < 20) {
        // in
        rgbaStr = this.getRgbaAtPoint(ePos, 'bar');
        var barBlock = document.getElementById(this.barId);
        barBlock.style.top = ePos.y + 'px';
        this.makeColorBox('rgb(' + rgbaStr.slice(0, 3).join() + ')');
        this.$emit(
          'active-change',
          this.rgb2hex('rgba(' + rgbaStr.slice(0, 3).join() + ',' + this.alpha + ')')
        );
      } else if (ePos.x >= 30) {
        rgbaStr = this.getRgbaAtPoint(ePos, 'box');
        var cur = document.getElementById(this.curId);
        cur.style.left = ePos.x + 'px';
        cur.style.top = ePos.y + 'px';
      } else {
        return;
      }
      this.setModelColorValue(rgbaStr);
    },
    /* canvas鼠标按下，绑定鼠标拖动函数 */
    onCanvasMousedown(ev, type) {
      var self = this;
      var ePos = {
        x: ev.layerX || ev.offsetX,
        y: ev.layerY || ev.offsetY,
      };
      var offsetTop = parseInt(ev.target.offsetTop);
      var offsetLeft = parseInt(ev.target.offsetLeft);
      if (
        type === 'cur' ||
        (ePos.x >= 30 && ePos.x < 30 + this.width && ePos.y >= 0 && ePos.y < this.height)
      ) {
        var cur = document.getElementById(this.curId);
        document.onmouseup = function () {
          document.onmouseup = document.onmousemove = null;
        };
        document.onmousemove = function (e) {
          try {
            var pos = {
              x: e.clientX - ev.clientX + ev.offsetX + offsetLeft,
              y: e.clientY - ev.clientY + ev.offsetY + offsetTop,
            };

            pos.x = pos.x <= 30 ? 30 : pos.x && (pos.x > self.width - 1 ? self.width - 1 : pos.x);
            pos.y = pos.y <= 0 ? 0 : pos.y && (pos.y > self.height - 1 ? self.height - 1 : pos.y);

            var rgbaStr = self.getRgbaAtPoint(pos, 'box');
            self.setModelColorValue(rgbaStr);
            cur.style.left = pos.x + 'px';
            cur.style.top = pos.y + 'px';
          } catch (e) {
            console.log(e);
          }
        };
      } else if (ePos.x <= 20 && ePos.y <= this.height) {
        var bar = document.getElementById(this.barId);
        document.onmouseup = function () {
          document.onmouseup = document.onmousemove = null;
        };
        document.onmousemove = function (e) {
          try {
            var pos = {
              x: 0,
              y: e.clientY - ev.clientY + ev.offsetY + offsetTop,
            };

            pos.y = pos.y <= 0 ? 0 : pos.y && (pos.y > self.height - 1 ? self.height - 1 : pos.y);

            var rgbaStr = self.getRgbaAtPoint(pos, 'box');
            bar.style.top = pos.y + 'px';
            self.activeColor = self.rgb2hex('rgb(' + rgbaStr.slice(0, 3).join() + ')');
            self.makeColorBox('rgb(' + rgbaStr.slice(0, 3).join() + ')');
            self.$emit('active-change', self.activeColor);
          } catch (e) {
            console.log(e);
          }
        };
      }
    },
    /* 透明度控制条点击 */
    onAlphaClick(e) {
      var x = e.offsetX || e.layerX;
      var bar = document.getElementById(this.alphaId);
      var parentNode = bar.parentNode;
      this.alpha = parseFloat(x / parentNode.clientWidth).toFixed(2);
      this.resetModelColorValue();
    },
    /* 透明度控制 */
    onAlphaMousedown(ev) {
      var self = this;
      var ePos = {
        x: ev.layerX || ev.offsetX,
        y: ev.layerY || ev.offsetY,
      };
      var offsetTop = parseInt(ev.target.offsetTop);
      var offsetLeft = parseInt(ev.target.offsetLeft);
      var bar = document.getElementById(this.alphaId);
      var parentNode = bar.parentNode;
      document.onmouseup = function () {
        document.onmouseup = document.onmousemove = null;
      };
      document.onmousemove = function (e) {
        try {
          var pos = {
            x: e.clientX - ev.clientX + ev.offsetX + offsetLeft,
            y: 0,
          };

          pos.x =
            pos.x <= 0
              ? 0
              : pos.x && (pos.x > parentNode.clientWidth ? parentNode.clientWidth : pos.x);

          self.alpha = parseFloat(pos.x / parentNode.clientWidth).toFixed(2);
          self.resetModelColorValue();
        } catch (e) {
          console.log(e);
        }
      };
    },
    /* 透明度变化重新计算当前颜色值 */
    resetModelColorValue() {
      var modelColorValue = this.modelColorValue;
      var alpha = this.alpha;
      var reg = /^(rgb|RGB)/;
      if (!reg.test(modelColorValue)) {
        modelColorValue = this.hex2rgb(modelColorValue.slice(0, 7));
      }
      var colorArr = modelColorValue.replace(/(?:rgba|rgb|RGBA|RGB|\(|\))*/g, '').split(',');
      colorArr[3] = alpha;
      this.setModelColorValue(colorArr);
    },
    /* 设置当前颜色值 */
    setModelColorValue(rgbaStr) {
      var txt = 'a';
      if ((rgbaStr.length === 4 && parseFloat(rgbaStr[3]) === 1) || !this.showAlpha) {
        rgbaStr = rgbaStr.slice(0, 3);
        txt = '';
      }
      if (this.colorFormat === 'hex') {
        this.modelColorValue = this.rgb2hex('rgb' + txt + '(' + rgbaStr.join() + ')');
      } else if (this.colorFormat === 'rgb') {
        this.modelColorValue = 'rgb' + txt + '(' + rgbaStr.join() + ')';
      }
      this.$emit('input', this.modelColorValue);
      this.sendChange();
    },
    /* 确认按钮点击 */
    confirm() {
      this.sendChange();
      this.showPanel = false;
      this.$emit('confirm', this.modelColorValue);
    },
    /* 触发change回调 */
    sendChange() {
      this.$emit('update:modelValue', this.modelColorValue);
      this.$emit('change', this.modelColorValue);
    },
    /* 获取rgb */
    getRgbaAtPoint(pos, area) {
      if (area == 'bar') {
        var imgData = this.ctx.getImageData(0, 0, 20, this.height);
      } else {
        var imgData = this.ctx.getImageData(0, 0, this.width, this.height);
      }
      var data = imgData.data;
      var dataIndex = (pos.y * imgData.width + pos.x) * 4;
      /* 开始消除误差 */
      if (pos.x >= 30 && pos.y > this.height - 3) {
        return [0, 0, 0, this.alpha];
      }
      if (pos.x >= 30 && pos.y <= 1) {
        data[dataIndex] = 255;
      }
      if (pos.x >= 30 && pos.x <= 31) {
        return [data[dataIndex], data[dataIndex], data[dataIndex], this.alpha];
      }
      if (pos.x >= this.width - 1) {
        return [data[dataIndex], 0, 0, this.alpha];
      }
      /* 消除误差结束 */
      return [data[dataIndex], data[dataIndex + 1], data[dataIndex + 2], this.alpha];
    },
    /* rgb/rgba色值转16进制 */
    rgb2hex(rgb) {
      var reg = /^(rgb|RGB)/;
      var a;
      if (reg.test(rgb)) {
        var colorArr = rgb.replace(/(?:rgba|rgb|RGBA|RGB|\(|\))*/g, '').split(',');
        var alpha = ((colorArr && colorArr[3]) || '').trim();
        var hex =
          '#' +
          (
            (1 << 24) +
            (parseInt(colorArr[0]) << 16) +
            (parseInt(colorArr[1]) << 8) +
            parseInt(colorArr[2])
          )
            .toString(16)
            .slice(1);
        if (alpha != '' && alpha != '1') {
          a = ((alpha * 255) | (1 << 8)).toString(16).slice(1);
          hex = hex + a;
        }
        return hex;
      } else {
        return rgb;
      }
    },
    /* 16进制色值转rgb */
    hex2rgb(hex) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      var color = hex.toLowerCase();
      if (reg.test(color)) {
        if (color.length === 4) {
          var colorNew = '#';
          for (var i = 1; i < color.length; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        var colorChange = [];
        for (var i = 1; i < color.length; i += 2) {
          colorChange.push(parseInt('0x' + color.slice(i, i + 2)));
        }
        return 'rgb(' + colorChange.join(',') + ')';
      } else {
        return color;
      }
    },
  },
};
</script>

<style>
.app-color-picker {
  position: relative;
  padding: 3px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: inline-block;
}

.color-pick-block {
  width: 18px;
  height: 18px;
  border-radius: 2px;
}

.color-pick-panel {
  position: absolute;
  top: 30px;
  left: -137px;
  z-index: 9999;
  transform-origin: center top;
  padding: 6px;
  box-sizing: content-box;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}

.color-pick-canvas {
  position: relative;
}

.color-pick-canvas canvas {
  left: 0;
  top: 0;
}

.color-pick-cur {
  width: 3px;
  height: 3px;
  outline: 2px solid #fff;
  margin-left: -1px;
  margin-top: -1px;
  position: absolute;
  border-radius: 50%;
  box-shadow: 0 0 0 1.5px #fff, inset 0 0 1px 1px rgb(0 0 0 / 30%), 0 0 1px 2px rgb(0 0 0 / 40%);
}

.color-pick-bar,
.color-pick-alpha {
  background-color: #fff;
  position: absolute;
  cursor: pointer;
  border-radius: 1px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);
}

.color-pick-bar {
  width: 20px;
  height: 3px;
  left: 0;
  top: 0;
}

.color-pick-alpha {
  width: 5px;
  height: 20px;
  left: 100%;
  top: 0;
  margin-left: -3px;
  margin-top: -1px;
}

.color-pick-alpha-silder {
  position: relative;
  box-sizing: border-box;
  width: 256px;
  margin-left: 30px;
  height: 18px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
}

.color-pick-alpha-silder-bar {
  position: relative;
  background: linear-gradient(to right, rgba(255, 69, 0, 0) 0%, rgb(255, 69, 0) 100%);
  height: 100%;
}

.color-pick-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.color-pick-input {
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 160px;
  font-size: 12px;
  height: 28px;
  line-height: 28px;
}

.color-pick-input:focus {
  border-color: #409eff;
}

.color-pick-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.color-pick-btn-clear {
  font-size: 12px;
  color: #409eff;
  cursor: pointer;
}

.color-pick-btn-confirm {
  padding: 7px 15px;
  margin-left: 10px;
  font-size: 12px;
  border-radius: 3px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  font-weight: 500;
}
</style>
