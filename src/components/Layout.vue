<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :width="layout.sider.width"
      :collapsedWidth="layout.sider.collapsedWidth"
      class="app-layout-sider"
    >
      <slot name="logo" :collapsed="collapsed" :layout="layout"> </slot>
      <left-outlined
        :rotate="collapsed ? 180 : 0"
        class="app-sider-collapse--target"
        @click="collapsed = !collapsed"
      />
      <a-menu
        v-model:active-key="activeKey"
        v-model:selected-keys="selectKeys"
        theme="light"
        @select="onSelectMenu"
      >
        <app-sider-menu-item v-for="item in menus" :key="item.path" :menu="item" />
      </a-menu>
    </a-layout-sider>
    <a-layout class="app-layout-section">
      <a-layout-header class="app-layout-header" />
      <a-layout-content>
        <layout-tab v-model="records" @change="setRoute" />
        <div style="margin: 10px; position: relative"><slot></slot></div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
// @ts-expect-error
import { LeftOutlined } from '@ant-design/icons-vue';
import LayoutTab from '@/components/LayoutTab.vue';
import AppSiderMenuItem, { MenuItemMeta } from '@/components/AppSiderMenuItem.vue';
import { RouteRecordRaw } from 'vue-router/auto';
import { SelectInfo } from 'ant-design-vue/es/menu/src/interface';

const router = useRouter();
const route = useRoute();
const menus = computed<MenuItemMeta[]>(() => {
  const routes = router.getRoutes();
  return onRoutes2MenuTrees(routes);
});

// @ts-expect-error
function onRoutes2MenuTrees(routes: RouteRecordRaw[]) {
  if (!routes.length) return;
  return routes?.map((rt) => {
    return {
      icon: rt.meta?.icon,
      path: rt.path,
      title: rt.meta?.title,
      children: onRoutes2MenuTrees(rt.children!),
    };
  });
}

const collapsed = ref<boolean>(false);
const activeKey = ref<string>('');
const selectKeys = ref<any>(['/:404(.*)']);

const layout = ref({
  sider: {
    width: 200,
    collapsedWidth: 60,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 64,
    backgroundColor: '#CADFFB',
  },
});

function onSelectMenu(slt: SelectInfo) {
  setRoute({
    icon: slt.item.icon,
    path: slt.key as string,
    title: slt.item.title as string,
  });
}

const records = ref<MenuItemMeta[]>([]);
function setRoute(mu: MenuItemMeta) {
  const has = records.value.find((r) => r.path === mu.path);
  if (!has) {
    records.value.push({
      icon: mu.icon,
      path: mu.path,
      title: mu.title,
    });
  }
  router.push(mu.path);
}

watchEffect(() => {
  activeKey.value = route.path;
  selectKeys.value = [route.path];
  if (route.path !== '/' && !records.value.length) {
    setRoute({
      icon: route.meta.icon as string,
      path: route.path,
      title: route.meta.title as string,
    });
  }
});
</script>
<style scoped lang="scss">
$-app-layout-sider-width: calc(v-bind('layout.sider.width') * 1px);
$-app-layout-sider-collapsed-width: calc(v-bind('layout.sider.collapsedWidth') * 1px);
$-app-layout-header-height: calc(v-bind('layout.header.height') * 1px);
.app-layout-sider {
  position: relative;
  z-index: 999;
  user-select: none;
  height: 100vh;
  background-color: v-bind('layout.sider.backgroundColor');

  .app-sider-collapse--target {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 50%;
    transform: translate(10px, 50%);
    font-size: 12px;
    padding: 3px;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
}

.app-layout-header {
  position: sticky;
  top: 0;
  height: $-app-layout-header-height;
  background-color: v-bind('layout.header.backgroundColor');
}
</style>
