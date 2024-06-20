<template>
  <a-tabs v-bind="props">
    <slot />
  </a-tabs>
</template>

<script setup lang="ts">
import { TabsProps } from 'ant-design-vue';
const props = defineProps<TabsProps>();
</script>

<style scoped lang="scss">
:deep(.ant-tabs-nav) {
  width: fit-content;
  background-color: #f0f1f3;
  border-radius: 6px;
  padding: 0 3px;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.1);
  margin: 0;
  &::before {
    display: none;
  }
}
:deep(.ant-tabs-ink-bar.ant-tabs-ink-bar-animated) {
  top: 50%;
  transform: translateY(-50%);
  background-color: #fff;
  height: 80%;
  border-radius: 4px;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.12), 0px 3px 1px 0px rgba(0, 0, 0, 0.04);
}
:deep(.ant-tabs-tab) {
  margin: 0;
  padding: 6px;
  position: relative;
  z-index: 99;
}
:deep(.ant-tabs-tab) + .ant-tabs-tab {
  margin: 0;
}
</style>
