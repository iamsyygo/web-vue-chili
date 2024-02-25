<!-- Catch all / 404 Not found route -->

<template>
  <div class="flex justify-center items-center w-full">
    <symbol-icon
      icon="ninsuofangwendeyemianbucunzai-quanju"
      :size="600"
      :color="token.colorPrimaryBorder"
    />
  </div>
</template>

<script setup lang="ts">
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
</script>

<style scoped></style>
<route lang="json">
{ "meta": { "keepAlive": false } }
</route>
