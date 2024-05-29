<template>
  <div class="container">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="w-50px h-50px"></div>
    <p>This is some text inside the container.</p>
  </div>
</template>

<script setup lang="ts">
definePage({
  meta: {
    keepAlive: true,
    icon: 'huore',
    title: 'test',
  },
  props: (route) => ({ code: route.query.code }),
});
</script>

<style scoped lang="scss">
.container {
  border: 2px solid black;
  padding: 20px;
  /* 创建BFC */
  // overflow: auto;
}

.box {
  width: 100px;
  height: 100px;
  background-color: lightblue;
  // display: inline-block;
  float: left; /* 浮动 */
  margin-right: 10px;
}
</style>
