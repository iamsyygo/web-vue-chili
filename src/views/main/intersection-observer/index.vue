<template>
  <div class="flex flex-wrap gap-4 p-8">
    <div v-for="image in images" :key="image.src" class="image">
      <img :src="defaulturl" :data-src="image.src" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

definePage({
  meta: {
    keepAlive: true,
    icon: 'voice',
    title: '图片懒加载',
  },
  props: (route) => ({ code: route.query.code }),
});

const defaulturl = 'https://www.jz.eng.br/wp-content/themes/temajs/img/instagram/insta1.png';

const images = Array.from({ length: 200 }).map((_, index) => {
  // const height = Math.floor(Math.random() * 200) + 200;
  return {
    src: `https://picsum.photos/200/200?r=${index}`,
    loaded: false,
  };
});

onMounted(() => {
  const images = document.querySelectorAll('img[data-src]');
  const ob = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.style.opacity = '0';
          img.style.transition = 'opacity 1s';

          img.src = img.dataset.src!;
          img.onload = () => {
            img.removeAttribute('data-src');
            img.style.opacity = '1';
          };

          // 停止观察
          ob.unobserve(img);
        }
      });
    },
    {
      // 与视口交叉时触发，root 告诉观察者与哪个元素交叉，默认为 null，即视口，即 img 元素在视口内时触发
      root: null,
      // 交叉距离，rootMargin 用于扩展或缩小交叉区域，默认为 0px，10px 表示在视口外多 10px 时触发
      rootMargin: '10px',
      // 交叉比例，threshold 为一个数组，表示交叉比例，默认为 0，即任何部分交叉都触发，0.5 表示 50% 交叉时触发
      // 即 img 元素 50% 在视口内时触发
      threshold: 0,
    }
  );
  images.forEach((img) => ob.observe(img));
});
</script>

<style scoped lang="scss"></style>
