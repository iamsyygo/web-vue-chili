<template>
  <div class="flex justify-between items-center h-full">
    <div class="app-header-content"></div>

    <a-popover trigger="click" class="mr-10px">
      <template #content>
        <div class="flex justify-between items-center w-70px">
          <theme-switch v-model="themeValue" @update:model-value="onThemeChange"></theme-switch>
          <color-pick
            :modelValue="primaryColor"
            show-alpha
            @change="$emit('update:primaryColor', $event)"
          />
        </div>
      </template>
      <a-button type="text">🎨</a-button>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import ColorPick from '@/components/color-pick/index.vue';
import ThemeSwitch from '@/components/ThemeSwitch.vue';
import { ref } from 'vue';
const props = defineProps<{
  themeScheme: string;
  primaryColor?: string;
}>();
const emits = defineEmits<{
  change: [any];
  'update:primaryColor': [any];
}>();

const themeValue = ref<boolean>(props.themeScheme === 'light');
function onThemeChange(value: boolean) {
  emits('change', value ? 'light' : 'dark');
}
</script>

<style scoped>
.app-header-content {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.logo {
  width: 580px;
  object-fit: cover;
}
</style>
