<template>
  <div class="x-scroll-container" ref="ctaRef">
    <div class="x-scroll--wrapper">
      <div class="x-scroll--contents">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';
import { reactive } from 'vue';
import { ref } from 'vue';

const ctaRef = ref<HTMLElement | null>(null);
const container = reactive({
  width: '0px',
  height: '0px',
});

useResizeObserver(ctaRef, (entries) => {
  const entry = entries[0];
  const { width, height } = entry.contentRect;
  container.width = width + 'px';
  container.height = height + 'px';
});
</script>

<style scoped>
.x-scroll-container {
  width: 100%;
  height: 100%;
}

.x-scroll--wrapper {
  width: v-bind('container.height');
  height: v-bind('container.width');
  overflow: auto;
  position: relative;
  transform-origin: left top;
  transform: rotate(-90deg) translateX(calc(-100%));
}

.x-scroll--contents {
  width: v-bind('container.width');
  height: v-bind('container.height');
  transform: rotate(90deg) translateY(calc(-100%));
  transform-origin: left top;
  top: 0;
  left: v-bind('container.height');
}
</style>
