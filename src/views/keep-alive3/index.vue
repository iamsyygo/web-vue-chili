<style scoped></style>
<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  routeMeta: Record<keyof any, any>;
}>();

const valueSlider = ref(0);
</script>

<template>
  <div>
    📦{{ routeMeta.title }}
    <el-slider v-model="valueSlider" :step="0.1"> </el-slider>
  </div>
</template>

<style scoped></style>
