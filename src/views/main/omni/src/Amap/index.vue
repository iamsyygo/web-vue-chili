<template>
  <div class="w-full h-200px bg-#fff rounded-6px p-6px mt-8px mb-8px" ref="wrappAmapRef">
    <div id="amap" ref="amapRef" class="w-full h-full rounded-6px relative z-9999 overflow-hidden">
      <a-spin :spinning="spinning" size="large" />

      <div
        class="h-30px w-30px flex items-center justify-center plane-box"
        ref="planeRef"
        style="display: none"
      >
        <img
          src="@/assets/amap/plane.png"
          alt="plane"
          class="top-0 left-0 z-99 w-full"
          style="transform: rotate(90deg)"
        />
      </div>

      <img
        src="@/assets/amap/planeshadow.png"
        ref="planeshadowRef"
        alt="planeshadow"
        style="display: none"
        class="absolute top-0 left-0 w-30px h-30px z-99 planeshadow-box"
      />

      <img
        src="@/assets/amap/cloud.png"
        alt="cloud"
        class="absolute top-0 left-0 w-100px h-100px z-99 cloud-box"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { getPoints } from './point';

const amapRef = ref<HTMLDivElement | null>();
const wrappAmapRef = ref<HTMLDivElement | null>();
const spinning = ref(true);
window._AMapSecurityConfig = {
  // https://lbs.amap.com/api/javascript-api-v2/guide/abc/jscode 安全整改
  securityJsCode: '29066a56391a5ff22699a0297937761e',
};
onMounted(init);

let map = null;
function init() {
  spinning.value = false;
  AMapLoader.load({
    key: '4d2a2316dbcb30552875ab802d4811f7', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.Scale'], //需要使用的的插件列表，如比例尺'AMap.Scale'，支持添加多个如：['...','...']
  })
    .then((AMap) => {
      map = new AMap.Map('amap', {
        // 设置地图容器id
        viewMode: '3D', // 是否为3D地图模式
        zoom: 11, // 初始化地图级别
        center: [116.397428, 39.90923], // 初始化地图中心点位置
      });
      onAnimate();
    })
    .finally(() => {
      spinning.value = false;
    })
    .catch((e) => {
      console.log(e);
    });
}

const planeRef = ref<HTMLDivElement | null>();
const planeshadowRef = ref<HTMLDivElement | null>();
const planeRef2 = ref<HTMLDivElement | null>();

function onAnimate() {
  setTimeout(() => {
    planeRef.value!.style.display = 'block';
    const { point1: p1, point2: p2, rotationAngle: angle } = getPoints(wrappAmapRef.value!);
    // 随机 10 - 18 秒
    const duration = Math.floor(Math.random() * 11 + 10) * 1000;
    planeRef
      .value!.animate(
        [
          { transform: `translate(${p1.x}px, ${p1.y}px) rotate(${angle}deg)` },
          { transform: `translate(${p2.x}px, ${p2.y}px) rotate(${angle}deg)` },
        ],
        {
          duration,
          // iterations: Infinity,
        }
      )
      .finished.then(() => {
        planeRef.value!.style.display = 'none';
        onAnimate();
      });

    planeshadowRef.value!.style.display = 'block';
    planeshadowRef
      .value!.animate(
        [
          { transform: `translate(${p1.x - 5}px, ${p1.y + 5}px) rotate(${angle + 90}deg)` },
          { transform: `translate(${p2.x - 5}px, ${p2.y + 5}px) rotate(${angle + 90}deg)` },
        ],
        {
          duration,
          // iterations: Infinity,
        }
      )
      .finished.then(() => {
        planeshadowRef.value!.style.display = 'none';
      });
  }, 2000);
}
onMounted(() => {});
</script>

<style>
.amap-logo {
  display: none !important;
}
.amap-copyright {
  display: none !important;
}
</style>
<style lang="scss">
.plane-box {
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  transform-origin: 50% 50%;
}

.cloud-box {
  animation: cloud 60s linear infinite;
}
@keyframes cloud {
  0% {
    transform: translate(-120%, 0) scale(2.6);
  }

  30% {
    transform: translate(25vw, 16px) scale(2.2);
  }

  60% {
    transform: translate(50vw, 80px) scale(1.8);
  }
  80% {
    transform: translate(80vw, 50px) scale(1.5);
  }

  100% {
    transform: translate(120vw, 10px) scale(1);
  }
}
</style>
