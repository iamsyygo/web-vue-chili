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

      <a-layout-content style="display: flex; flex-direction: column">
        <layout-tab
          v-model="records"
          @change="setRoute"
          :style="{
            boxShadow: isShadow ? '0 2px 6px rgba(0, 0, 0, 0.15)' : 'none',
            transition: 'box-shadow 0.3s',
          }"
        />
        <div class="app-content-wrapper" ref="contentWrapRef">
          <slot>
            <router-view
              v-slot="{ Component, route }"
              v-if="route.meta?.keepAlive === false"
              class="app-router-view"
            >
              <transition v-bind="transitionProps" mode="out-in">
                <component :is="Component" :route-meta="route.meta" :key="route.fullPath">
                  <!-- some slot content -->
                </component>
              </transition>
            </router-view>

            <router-view v-slot="{ Component, route }" class="app-router-view">
              <transition v-bind="transitionProps" mode="out-in">
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
import { onMounted } from 'vue';
import { debounce } from 'lodash-es';
import { onBeforeUnmount } from 'vue';
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
    icon: item['menu-icon'],
    name: item.title as string,
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
    // 这里的图标取不对✅
    setRoute({
      icon: route.meta.icon as string,
      path: path,
      name: route.meta.title as string,
    });
  }
});

const transitionProps: TransitionProps = {
  name: 'app-top-page',
  appear: true,
  mode: 'out-in',
};

const contentWrapRef = ref<HTMLElement | null>(null);
const isShadow = ref<boolean>(false);
onMounted(() => {
  if (contentWrapRef.value) {
    // 判断里面内容是否在滚动
    contentWrapRef.value.addEventListener('scroll', contentRefScroll);
  }
});

const contentRefScroll = debounce((evt: Event) => {
  const target = evt.target as HTMLElement;
  const { scrollTop, clientHeight } = target;
  if (scrollTop + clientHeight > clientHeight) {
    isShadow.value = true;
  } else {
    isShadow.value = false;
  }
}, 100);
onBeforeUnmount(() => {
  if (contentWrapRef.value) {
    contentWrapRef.value.removeEventListener('scroll', contentRefScroll);
  }
});
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
    background-color: v-bind('token.colorBgContainer');
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

.app-content-wrapper {
  position: relative;
  flex: 1;
  overflow: auto;
}

// fix 2 router-view position not overlap displaced unfriendly experience.
.app-router-view {
  position: absolute;
  top: 0;
}
</style>
