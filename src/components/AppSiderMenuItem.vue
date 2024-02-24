<template>
  <a-menu-item
    :key="menu.path"
    v-if="!menu.children"
    :icon="menu.icon || 'ninsuofangwendeyemianbucunzai-quanju'"
    :title="menu.title || menu.path"
  >
    <a-icon>
      <template #component>
        <symbol-icon :icon="menu.icon" style="margin-right: 6px"></symbol-icon>
      </template>
    </a-icon>
    <span>{{ menu.title || menu.path }}</span>
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
        <span>{{ menu.title }}</span>
      </span>
    </template>
    <app-sider-menu-item v-for="item in menu.children" :key="item.path" :menu="item" />
  </a-sub-menu>
</template>

<script setup lang="ts">
// @ts-expect-error
import AIcon from '@ant-design/icons-vue';
import AppSiderMenuItem from '@/components/AppSiderMenuItem.vue';
export type MenuItemMeta = {
  title: string;
  icon: string;
  path: string;
  children?: MenuItemMeta[];
};
defineProps<{
  menu: MenuItemMeta;
}>();
</script>

<style scoped></style>
