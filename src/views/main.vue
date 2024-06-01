<script setup lang="ts">
import { theme as extTheme } from 'ant-design-vue';
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import AppHeader from '@/components/AppHeader.vue';
import AppLayout from '@/components/AppLayout.vue';
import { AppMenuItemMeta } from '@/components/layout';
import { useAppConfigStore } from '@/store/app-config';
import { useAppMenu2RouteStore } from '@/store/app-menu';
import { watch } from 'vue';

definePage({
  meta: {},
  // redirect: '/main/mind',
  // redirect: '/main',
});

const router = useRouter();
const { useToken } = extTheme;
const { token } = useToken();
const appconfig = useAppConfigStore();
const appMenu2Route = useAppMenu2RouteStore();

onMounted(() => {
  appconfig.setThemePrimaryColor();
});
</script>

<template>
  <a-config-provider :theme="appconfig.theme" componentSize="middle">
    <AppLayout :menus="appMenu2Route.menus[0].children" :layout="appconfig.layout">
      <template #logo="{ collapsed }">
        <div class="logo" :style="{ padding: collapsed ? '6px 10px' : '6px 12px' }">
          💫
          <transition :duration="{ enter: 3000, leave: 0 }" name="logo-title">
            <h5 v-show="!collapsed">iamsyygo</h5>
          </transition>
        </div>
      </template>
      <template #header>
        <AppHeader
          @change="appconfig.setThemeScheme"
          :themeScheme="appconfig.themeScheme"
          :primary-color="appconfig.theme.token?.colorPrimary"
          @update:primary-color="appconfig.setThemePrimaryColor"
        />
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
  // justify-content: space-between;
  gap: 10px;
  margin: 8px;
  padding: 6px 12px;
  font-size: 25px;
  border-radius: 6px;
  background-color: v-bind('token.colorFillSecondary');
  color: v-bind('token.colorText');
  h5 {
    font-weight: 700;
  }

  // animation: logoframe 10s infinite;
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
