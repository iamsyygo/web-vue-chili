<script setup lang="ts">
import { ref } from 'vue';
import One00 from './_common/index.vue';

defineProps<{
  routeMeta: Record<keyof any, any>;
}>();

definePage({
  meta: {
    keepAlive: true,
  },
});

const count = ref(0);
</script>

<template>
  <div class="flex">
    <One00 />
    <div>⚡{{ routeMeta.title }}</div>
    <el-input-number
      v-model="count"
      size="small"
      :step="1"
      :controls="true"
      controls-position="right"
    >
    </el-input-number>
  </div>
</template>

<style scoped></style>
