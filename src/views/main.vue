<script setup lang="ts">
import { theme as extTheme } from 'ant-design-vue';
import { onMounted, watch } from 'vue';
import AppHeader from '@/components/AppHeader.vue';
import AppLayout from '@/components/AppLayout.vue';
import { useAppConfigStore } from '@/store/app-config';
import { useAppMenu2RouteStore } from '@/store/app-menu';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { getAllDict } from '@/api';
import { setlocalDictionary } from '@/utils/dictionary';
import { AppMenuItemMeta } from '@/components/layout';
dayjs.locale('zh-cn');

definePage({
  meta: {},
  redirect: '/main/omni',
});

const { useToken } = extTheme;
const { token } = useToken();
const appconfig = useAppConfigStore();
const appMenu2Route = useAppMenu2RouteStore();

watch(
  () => token.value.colorPrimary,
  (color) => {
    const primarybgKey = '--primary-color-bg';
    const primarybgColor = token.value.colorPrimaryBg;
    const primaryhoverKey = '--primary-color-hover';
    const primaryhoverColor = token.value.colorBgTextHover;
    document.documentElement.style.setProperty(primarybgKey, primarybgColor);
    document.documentElement.style.setProperty(primaryhoverKey, primaryhoverColor);
  }
);

onMounted(() => {
  appconfig.setThemePrimaryColor();
  getAllDict().then((res) => {
    setlocalDictionary(res);
  });
});
</script>

<template>
  <a-config-provider :theme="appconfig.theme" componentSize="middle" :locale="zhCN">
    <AppLayout :menus="appMenu2Route.menus[0].children as AppMenuItemMeta[]" :layout="appconfig.layout">
      <template #logo="{ collapsed }">
        <div class="logo" :style="{ padding: collapsed ? '6px 10px' : '6px 12px' }">
          <transition :duration="{ enter: 3000, leave: 0 }" name="logo-title">
            <img style="height: 30px" src="/logo.svg" v-show="!collapsed" /> </transition
          >...
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
  justify-content: center;
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
