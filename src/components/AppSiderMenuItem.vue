<template>
  <a-menu-item
    :key="menu.path"
    v-if="!menu.children"
    :title="menu.name"
    class="app-sider-menu-item"
    :menu-icon="menu.icon"
  >
    <a-icon>
      <template #component>
        <symbol-icon :icon="menu.icon" style="margin-right: 6px"></symbol-icon>
      </template>
    </a-icon>
    <span class="app-sider-menu-item--title">{{ menu.name || menu.path }}</span>
    <a-badge status="processing" style="float: right" v-if="$route.path === menu.path" />
  </a-menu-item>
  <a-sub-menu :key="menu.path" v-if="menu.children">
    <template #title>
      <span>
        <a-icon>
          <template #component>
            <symbol-icon :icon="menu.icon" style="margin-right: 6px"></symbol-icon>
          </template>
        </a-icon>
        <span class="app-sider-menu-item--title">{{ menu.name }}</span>
      </span>
    </template>
    <app-sider-menu-item v-for="item in menu.children" :key="item.path" :menu="item" />
  </a-sub-menu>
</template>

<script setup lang="ts">
import AIcon from '@ant-design/icons-vue';
import AppSiderMenuItem from '@/components/AppSiderMenuItem.vue';
import { AppMenuItemMeta } from '@/components/layout';

defineProps<{
  menu: AppMenuItemMeta;
}>();
</script>

<style>
.app-sider-menu-item .ant-menu-title-content {
  display: flex;
  align-items: center;
}

.app-sider-menu-item--title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
