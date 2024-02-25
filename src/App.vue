<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import AppLayout from '@/components/AppLayout.vue';
import AppHeader from '@/components/AppHeader.vue';
import { theme } from 'ant-design-vue';
import { AppMenuItemMeta } from '@/components/layout';
import { reactive } from 'vue';
const { useToken, compactAlgorithm, darkAlgorithm } = theme;
const { token } = useToken();
const router = useRouter();

onMounted(() => {
  const routes = router.getRoutes();
  console.log(routes, '🔥');
});

const menus = computed<AppMenuItemMeta[]>(() => {
  const routes = router.getRoutes();
  return onRoutes2MenuTrees(routes);
});

const t: ThemeConfig = reactive({
  algorithm: [compactAlgorithm],
  locale: 'zh-CN',
  // icon: {
  //   prefixCls: 'anticon',
  //   scriptUrl: '//at.alicdn.com/t/font_2756543_7z5z5z5z5z5.js',
  // },
});
const themealg = ref('dark');
// 切换主题
function toggletheme() {
  if (themealg.value === 'light') {
    t.algorithm = Array.isArray(t.algorithm)
      ? t.algorithm?.concat(darkAlgorithm)
      : [compactAlgorithm, darkAlgorithm];
    themealg.value = 'dark';
    return;
  }
  t.algorithm = Array.isArray(t.algorithm)
    ? t.algorithm?.filter((a) => a !== darkAlgorithm)
    : [compactAlgorithm];
  themealg.value = 'light';
}
// make default theme is light
toggletheme();

// @ts-expect-error
function onRoutes2MenuTrees(routes: RouteRecordRaw[]) {
  if (!routes.length) return;
  return routes.map((rt) => {
    return {
      icon: rt.meta?.icon,
      path: rt.path,
      title: rt.meta?.title,
      children: onRoutes2MenuTrees(rt.children!),
    };
  });
}

const layout = ref({
  sider: {
    width: 200,
    collapsedWidth: 60,
    backgroundColor: token.value.colorBgContainer,
  },
  header: {
    height: 56,
    backgroundColor: '#CADFFB',
  },
});
</script>

<template>
  <a-config-provider :theme="t" componentSize="middle">
    <AppLayout :menus="menus" :layout="layout">
      <template #logo="{ collapsed }">
        <div class="logo" :style="{ padding: collapsed ? '6px 10px' : '6px 12px' }">
          🛵
          <transition :duration="{ enter: 3000, leave: 0 }" name="logo-title">
            <h5 v-show="!collapsed">iamsyygo</h5>
          </transition>
        </div>
      </template>
      <template #header>
        <AppHeader @change="toggletheme" />
      </template>
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
  background-color: v-bind('token.colorFillSecondary');
  color: v-bind('token.colorText');
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
    filter: drop-shadow(0 0 6px v-bind('token.colorPrimaryActive'));
  }
  100% {
    filter: drop-shadow(0 0 6px #f0b03a);
  }
}

.logo-title-enter-active {
  animation: bounceInRight 1s;
}
</style>
