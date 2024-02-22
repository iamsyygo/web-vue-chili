<script setup lang="ts">
import { TransitionProps } from 'vue';
import { computed } from 'vue';
import { onMounted } from 'vue';
import { ref, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const routes = router.getRoutes();
const valueRoute = ref();
function setRoutePath(path: any) {
  router.push(path);
}
console.log(routes, '🔥');

onMounted(() => {
  valueRoute.value = route.path;
});
const transitionProps: TransitionProps = {
  name: '',
  appear: true,
  mode: 'out-in',
  duration: 300,
  enterToClass: 'animate__animated animate__bounceInRight',
  enterFromClass: 'animate__animated animate__bounceInLeft',
  leaveToClass: 'animate__animated animate__bounceOutLeft',
  leaveFromClass: 'animate__animated animate__bounceInRight',
};
</script>

<template>
  <div style="height: 550vh">
    <el-radio-group v-model="valueRoute" @change="setRoutePath">
      <el-radio v-for="route in routes" :key="route.path" :label="route.path">
        {{ route.meta?.title || route.path || route.name }}
      </el-radio>
    </el-radio-group>

    <router-view v-slot="{ Component, route }" v-if="route.meta?.keepAlive === false">
      <transition v-bind="transitionProps">
        <component :is="Component" :route-meta="route.meta" :key="route.fullPath">
          <!-- some slot content -->
        </component>
      </transition>
    </router-view>

    <router-view v-slot="{ Component, route }">
      <transition v-bind="transitionProps">
        <keep-alive :max="12">
          <component
            :is="Component"
            :route-meta="route.meta"
            :key="route.fullPath"
            v-if="route.meta?.keepAlive !== false"
          >
            <!-- some slot content -->
          </component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
  <noscript class="loading-lazy">
    <img
      src="https://oss-cn-hangzhou.aliyuncs.com/codingsky/cdn/img/2023-07-06/347aaadb07e601783037e52d903af43e"
      loading="lazy"
      class="logo"
    />
  </noscript>
</template>

<style scoped lang="scss">
$name: App;

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  // @debug 🔥 $name;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
