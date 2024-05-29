<template>
  <div class="w-full h-full flex justify-center p-16">
    <div class="warpper">
      <div class="internal">📦</div>
    </div>
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
.warpper {
  width: 400px;
  height: 400px;
  background-color: antiquewhite;
  position: relative;
}

.internal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // margin: auto;
  // 没有设置宽高就会继承父元素的宽高
  width: 100px;
  height: 40px;
  background: #f0a238;
}
</style>
