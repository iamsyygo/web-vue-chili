<style scoped></style>
<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  routeMeta: Record<keyof any, any>;
}>();

const valueSwitch = ref(false);
</script>

<template>
  <div>
    🎉{{ routeMeta.title }}
    <el-switch v-model="valueSwitch" :active-value="true" :inactive-value="false" @change="">
    </el-switch>
  </div>
</template>

<style scoped></style>
<route lang="json">
{ "meta": { "keepAlive": false } }
</route>
