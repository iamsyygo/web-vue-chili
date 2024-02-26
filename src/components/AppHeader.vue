<template>
  <div class="flex justify-between items-center h-full p10px">
    <div></div>

    <a-popover trigger="click">
      <template #content>
        <a-switch
          :checked="themeScheme"
          checked-children="🌞"
          un-checked-children="🌙"
          checked-value="light"
          un-checked-value="dark"
          @change="($e) => $emit('change', $e)"
        />
      </template>
      <a-button type="text">🎨</a-button>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  themeScheme: string;
}>();
defineEmits<{
  change: [any];
}>();
</script>

<style scoped></style>
