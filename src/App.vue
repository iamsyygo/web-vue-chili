<script setup lang="ts">
import { ref, onMounted, TransitionProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { APP_THEME_CONFIG } from '@/utils/theme';
import AppLayout from '@/components/Layout.vue';

const router = useRouter();
const route = useRoute();
const routes = router.getRoutes();
const valueRoute = ref();
console.log(routes, '🔥');
onMounted(() => {
  valueRoute.value = route.path;
});
const transitionProps: TransitionProps = {
  name: 'app-top-page',
  appear: true,
  mode: 'out-in',
  // enterActiveClass: 'animate__animated animate__fadeInRightBig',
  // leaveActiveClass: 'animate__animated animate__zoomOut',
};
</script>

<template>
  <a-config-provider :theme="APP_THEME_CONFIG">
    <AppLayout>
      <template #logo="{ collapsed }">
        <div class="logo" :style="{ padding: collapsed ? '6px 10px' : '6px 12px' }">
          🛵
          <transition :duration="{ enter: 3000, leave: 0 }" name="logo-title">
            <h5 v-show="!collapsed">iamsyygo</h5>
          </transition>
        </div>
      </template>
      <router-view
        v-slot="{ Component, route }"
        v-if="route.meta?.keepAlive === false"
        class="app-router-view"
      >
        <transition v-bind="transitionProps">
          <component :is="Component" :route-meta="route.meta" :key="route.fullPath">
            <!-- some slot content -->
          </component>
        </transition>
      </router-view>

      <router-view v-slot="{ Component, route }" class="app-router-view">
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
    </AppLayout>
  </a-config-provider>
</template>

<style scoped lang="scss">
$name: App;

.logo {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px;
  padding: 6px 12px;
  font-size: 25px;
  border-radius: 6px;
  background: rgba(116, 116, 116, 0.1);
  h5 {
    font-weight: 700;
  }

  animation: logoframe 10s infinite;
}
@keyframes logoframe {
  0% {
    filter: drop-shadow(0 0 6px #f0b03a);
  }
  50% {
    filter: drop-shadow(0 0 6px #fd4816);
  }
  100% {
    filter: drop-shadow(0 0 6px #f0b03a);
  }
}

.logo-title-enter-active {
  animation: bounceInRight 1s;
}
.app-top-page-enter-active {
  animation: fadeInRightBig 0.5s;
}
.app-top-page-leave-active {
  animation: zoomOut 0.3s;
}

// fix 2 router-view position not overlap displaced unfriendly experience.
.app-router-view {
  position: absolute;
  top: 0;
}
</style>
