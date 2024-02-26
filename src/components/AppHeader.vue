<template>
  <div class="flex justify-between items-center h-full p10px">
    <div></div>

    <a-tooltip title="切换主题">
      <a-switch
        v-model:checked="checked"
        checked-children="🌞"
        un-checked-children="🌙"
        checked-value="light"
        un-checked-value="dark"
        @change="($e) => $emit('change', $e)"
      />
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const checked = ref<'light' | 'dark'>('light');

defineEmits<{
  change: [any];
}>();
</script>

<style scoped></style>
