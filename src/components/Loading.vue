<template>
  <svg class="app-loading--gegga">
    <defs>
      <filter id="app-loading--gegga">
        <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
          result="inreGegga"
        />
        <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
      </filter>
    </defs>
  </svg>
  <svg class="app-loading--snurra" width="200" height="200" viewBox="0 0 200 200">
    <defs>
      <linearGradient id="linjärGradient">
        <stop class="app-loading--stopp1" offset="0" />
        <stop class="app-loading--stopp2" offset="1" />
      </linearGradient>
      <linearGradient
        y2="160"
        x2="160"
        y1="40"
        x1="40"
        gradientUnits="userSpaceOnUse"
        id="app-loading--gradient"
        xlink:href="#linjärGradient"
      />
    </defs>
    <path
      class="app-loading--halvan"
      d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
    />
    <circle class="app-loading--strecken" cx="100" cy="100" r="64" />
  </svg>
  <svg class="app-loading--skugga" width="200" height="200" viewBox="0 0 200 200">
    <path
      class="app-loading--halvan"
      d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
    />
    <circle class="app-loading--strecken" cx="100" cy="100" r="64" />
  </svg>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
</script>

<style scoped lang="scss">
.app-loading--gegga {
  width: 0;
}

// 动画部分
.app-loading--snurra {
  filter: url(#app-loading--gegga);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.app-loading--stopp1 {
  stop-color: v-bind('token.colorPrimary');
}
.app-loading--stopp2 {
  stop-color: v-bind('token.colorPrimaryBg');
}
.app-loading--halvan {
  animation: Snurra 10s infinite linear;
  stroke-dasharray: 180 800;
  fill: none;
  stroke: url(#app-loading--gradient);
  stroke-width: 23;
  stroke-linecap: round;
}
.app-loading--strecken {
  animation: Snurra 3s infinite linear;
  stroke-dasharray: 26 54;
  fill: none;
  stroke: url(#app-loading--gradient);
  stroke-width: 23;
  stroke-linecap: round;
}

// 阴影部分
.app-loading--skugga {
  filter: blur(5px);
  opacity: 0.3;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@keyframes Snurra {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -403px;
  }
}
</style>
