<template>
  <svg class="app-icon" aria-hidden="true" :font-size="size" :color="color">
    <use :xlink:href="'#icon-' + (icon || 'jiaoyu')"></use>
  </svg>
</template>
<script setup lang="ts">
import { AppSymbolIcons } from '@/types/symbol-icons-remote';

defineProps<{
  icon?: AppSymbolIcons | string;
  size?: string | number;
  color?: string;
}>();
</script>
<style>
.app-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
