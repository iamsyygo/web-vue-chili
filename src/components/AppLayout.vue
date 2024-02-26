<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :width="layout.sider.width"
      :collapsedWidth="layout.sider.collapsedWidth"
      theme="light"
      class="app-layout-sider"
    >
      <slot name="logo" :collapsed="collapsed" :layout="layout"> </slot>

      <left-outlined
        :rotate="collapsed ? 180 : 0"
        class="app-sider-collapse--target"
        @click="collapsed = !collapsed"
      />
      <slot name="menu">
        <a-menu
          v-model:active-key="activeKey"
          v-model:selected-keys="selectKeys"
          mode="inline"
          theme="light"
          :style="{ backgroundColor: token.colorBgContainer }"
          @select="onSelectMenu"
        >
          <app-sider-menu-item v-for="item in menus" :key="item.path" :menu="item" />
        </a-menu>
      </slot>
    </a-layout-sider>
    <a-layout class="app-layout-section">
      <a-layout-header class="app-layout-header">
        <slot name="header"> </slot>
      </a-layout-header>

      <a-layout-content>
        <layout-tab v-model="records" @change="setRoute" />
        <div style="margin: 10px; position: relative">
          <slot>
            <router-view
              v-slot="{ Component, route }"
              v-if="route.meta?.keepAlive === false"
              class="app-router-view"
            >
              <transition v-bind="transProps">
                <component :is="Component" :route-meta="route.meta" :key="route.fullPath">
                  <!-- some slot content -->
                </component>
              </transition>
            </router-view>

            <router-view v-slot="{ Component, route }" class="app-router-view">
              <transition v-bind="transProps">
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
          </slot>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref, watchEffect, TransitionProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { LeftOutlined } from '@ant-design/icons-vue';
import LayoutTab from '@/components/AppLayoutTab.vue';
import AppSiderMenuItem from '@/components/AppSiderMenuItem.vue';
import { SelectInfo } from 'ant-design-vue/es/menu/src/interface';
import { AppMenuItemMeta, LayoutType } from '@/components/layout';
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();

const router = useRouter();
const route = useRoute();

defineProps<{
  layout: LayoutType;
  menus: AppMenuItemMeta[];
}>();

const collapsed = ref<boolean>(false);
const activeKey = ref<string>('');
const selectKeys = ref<any>([]);

function onSelectMenu({ item, key }: SelectInfo) {
  setRoute({
    icon: item.icon,
    title: item.title as string,
    path: key as string,
  });
}

// cache the opened menu
const records = ref<AppMenuItemMeta[]>([]);
function setRoute(mu: AppMenuItemMeta) {
  const has = records.value.find((r) => r.path === mu.path);
  if (!has) records.value.push(mu);
  router.push(mu.path);
}

watchEffect(() => {
  const path = route.path;
  activeKey.value = path;
  selectKeys.value = [path];
  if (path !== '/' && !records.value.length) {
    setRoute({
      icon: route.meta.icon as string,
      path: path,
      title: route.meta.title as string,
    });
  }
});

const transProps: TransitionProps = {
  name: 'app-top-page',
  appear: true,
  mode: 'out-in',
};
</script>
<style scoped lang="scss">
$-app-layout-sider-width: calc(v-bind('layout.sider.width') * 1px);
$-app-layout-sider-collapsed-width: calc(v-bind('layout.sider.collapsedWidth') * 1px);
$-app-layout-header-height: calc(v-bind('layout.header.height') * 1px);
.app-layout-sider {
  user-select: none;
  position: relative;
  z-index: 999;
  height: 100vh;

  .app-sider-collapse--target {
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translate(10px, 50%);
    z-index: 1;
    font-size: 12px;
    padding: 3px;
    color: v-bind('token.colorText');
    background-color: v-bind('token.colorBorderSecondary');
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  :deep(.ant-menu-root.ant-menu-inline) {
    border-inline-end: none !important;
  }
}

.app-layout-header {
  position: sticky;
  top: 0;
  padding: 0;
  height: $-app-layout-header-height;
  background-color: v-bind('layout.header.backgroundColor');
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
