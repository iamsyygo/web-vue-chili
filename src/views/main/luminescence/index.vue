<template>
  <div>
    <h1>发光效果</h1>

    <div class="flex w-100% flex-wrap justify-around mt-20px luminescence-wrapper">
      <div class="luminescence" @mousemove="onmousemove">
        <div>
          <h2>Beautiful Graphics</h2>
          <h3>With 10+ Tools.</h3>
          <h4>Instantly & Effortless!</h4>
          <p>
            Create unique graphics for social media posts, landing pages and branding in a few
            clicks. Then export them as images, or even code (SVG & CSS).
          </p>
        </div>
      </div>
      <div class="luminescence" @mousemove="onmousemove">
        <div>
          <h2>Beautiful Graphics</h2>
          <h3>With 10+ Tools.</h3>
          <h4>Instantly & Effortless!</h4>
          <p>
            Create unique graphics for social media posts, landing pages and branding in a few
            clicks. Then export them as images, or even code (SVG & CSS).
          </p>
        </div>
      </div>
      <div class="luminescence" @mousemove="onmousemove">
        <div>
          <h2>Beautiful Graphics</h2>
          <h3>With 10+ Tools.</h3>
          <h4>Instantly & Effortless!</h4>
          <p>
            Create unique graphics for social media posts, landing pages and branding in a few
            clicks. Then export them as images, or even code (SVG & CSS).
          </p>
        </div>
      </div>
      <div class="luminescence" @mousemove="onmousemove">
        <div>
          <h2>Beautiful Graphics</h2>
          <h3>With 10+ Tools.</h3>
          <h4>Instantly & Effortless!</h4>
          <p>
            Create unique graphics for social media posts, landing pages and branding in a few
            clicks. Then export them as images, or even code (SVG & CSS).
          </p>
        </div>
      </div>
      <div class="luminescence" @mousemove="onmousemove">
        <div>
          <h2>Beautiful Graphics</h2>
          <h3>With 10+ Tools.</h3>
          <h4>Instantly & Effortless!</h4>
          <p>
            Create unique graphics for social media posts, landing pages and branding in a few
            clicks. Then export them as images, or even code (SVG & CSS).
          </p>
        </div>
      </div>
      <div class="luminescence" @mousemove="onmousemove">
        <div>
          <h2>Beautiful Graphics</h2>
          <h3>With 10+ Tools.</h3>
          <h4>Instantly & Effortless!</h4>
          <p>
            Create unique graphics for social media posts, landing pages and branding in a few
            clicks. Then export them as images, or even code (SVG & CSS).
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from '@vueuse/core';
import { ref } from 'vue';
definePage({
  meta: {
    title: '发光效果',
    icon: 'share',
    keepAlive: true,
  },
});

// const { x, y } = useMouse();

const x = ref(0);
const y = ref(0);

const rx = ref(0);
const ry = ref(0);

const onmousemove = (e: MouseEvent) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  x.value = e.clientX - left;
  y.value = e.clientY - top;

  // 计算旋转角度
  if (x.value > width / 2) {
    rx.value = (x.value - width / 2) / (width / 2);
  } else {
    rx.value = (x.value - width / 2) / (width / 2);
  }
  if (y.value > height / 2) {
    ry.value = (y.value - height / 2) / (height / 2);
  } else {
    ry.value = (y.value - height / 2) / (height / 2);
  }
};
</script>

<style scoped lang="scss">
.luminescence-wrapper {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
}
.luminescence {
  position: relative;
  color: #fff;
  width: 40%;
  height: 180px;
  margin-top: 20px;
  padding: 5px;
  z-index: 1;
  background-color: rgba(75, 75, 75, 0.1);
  overflow: hidden;
  transition: all 0.5s;
}

.luminescence:hover {
  transform: rotateX(calc(v-bind(rx) * 15deg)) rotateY(calc(v-bind(ry) * 15deg));
  z-index: 2;
}

.luminescence > div {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  padding: 10px;
  position: relative;
  z-index: 2;
}

.luminescence:hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 150%;
  height: 150%;
  background: radial-gradient(
    circle at calc(v-bind(x) * 1px) calc(v-bind(y) * 1px),
    rgba(255, 211, 211, 0.2),
    transparent 50%
  );
  z-index: 1;
  /* animation: flicker 3s infinite; */
}
</style>
