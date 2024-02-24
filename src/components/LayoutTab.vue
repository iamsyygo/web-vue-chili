<template>
  <div class="app-tabs-wrapper">
    <a-tabs
      :activeKey="$route.path"
      :type="props.modelValue.length === 1 ? 'card' : 'editable-card'"
      size="small"
      hide-add
      class="app-tabs--nav"
      @tab-click="onchange"
      @edit="onremove"
    >
      <a-tab-pane v-for="pane in props.modelValue" :key="pane.path" closable>
        <template #tab>
          <svg class="app-tab-radius--b" width="7" height="7" v-show="$route.path == pane.path">
            <path d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z"></path>
          </svg>
          <svg class="app-tab-radius--a" width="7" height="7" v-show="$route.path == pane.path">
            <path d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z"></path>
          </svg>
          <symbol-icon
            :icon="pane.icon || 'ninsuofangwendeyemianbucunzai-quanju'"
            style="margin-right: 3px"
          ></symbol-icon>
          {{ pane.title || pane.path }}
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { theme } from 'ant-design-vue';
import { MenuItemMeta } from '@/components/AppSiderMenuItem.vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { useRoute } from 'vue-router';
const route = useRoute();
const { useToken } = theme;
const { token } = useToken();

const props = defineProps<{
  modelValue: MenuItemMeta[];
}>();

const emits = defineEmits<{
  change: [value: MenuItemMeta];
  'update:modelValue': [value: MenuItemMeta[]]; // named tuple syntax
}>();
const onremove = (e: Key | MouseEvent | KeyboardEvent, action: 'add' | 'remove') => {
  if (action === 'remove') {
    const newVal = props.modelValue.filter(({ path }) => path !== e);
    emits('update:modelValue', newVal);

    const pre = newVal.at(-1);
    if (!pre && route.path !== e) return;
    // @ts-expect-error
    emits('change', pre);
  }
};
function onchange(activeKey: Key, e: MouseEvent | KeyboardEvent) {
  const newVal = props.modelValue.find((v) => v.path === activeKey);
  if (!newVal) return;
  emits('change', newVal);
}
</script>

<style lang="scss" scoped>
$-tab-active-bg: #f6f6f6;
@mixin remove-show($opacity: 0, $cls: ant-tabs-tab-remove) {
  .#{$cls} {
    opacity: $opacity;
  }
}

.app-tabs-wrapper {
  padding-top: 3px;
  background-color: #fff;
}
.app-tabs--nav {
  height: 30px;
  :deep(.ant-tabs-nav) {
    user-select: none;
    height: 30px;
  }

  :deep(.ant-tabs-tab-btn) {
    width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :deep(.ant-tabs-nav-more) {
    padding: 4px 16px;
  }
  :deep(.ant-tabs-tab-remove) {
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    padding: 0;
    margin: 0;

    &:hover {
      background-color: rgba(219, 219, 219, 0.9);
    }
  }
}

.app-tabs--nav :deep(.ant-tabs-tab) {
  position: relative;
  font-size: 12px;
  margin: 0;
  border: 0;
  border-radius: 8px !important;
  padding: 0 5px !important;
  background-color: transparent;

  &:hover {
    color: #000;
    border-radius: 8px !important;
    background-color: v-bind('token.colorPrimaryBg');

    @include remove-show(1);
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    bottom: 50%;
    right: 0;
    height: 60%;
    width: 1px;
    transform: translate(1.5px, 50%);
    background-color: #ccc;
  }

  &:has(+ .ant-tabs-tab-active) {
    &::before {
      display: none;
    }
  }

  @include remove-show(0);
}
.app-tabs--nav :deep(.ant-tabs-tab-active) {
  font-weight: 700;
  border-top-left-radius: 6px !important;
  border-top-right-radius: 6px !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: $-tab-active-bg;

  &:hover {
    background-color: $-tab-active-bg;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }

  &::before {
    display: none;
  }

  @include remove-show(1);
}

.app-tab-radius--b {
  position: absolute;
  bottom: 0;
  left: -7px;
  fill: $-tab-active-bg;
}
.app-tab-radius--a {
  position: absolute;
  bottom: 0;
  right: -7px;
  fill: $-tab-active-bg;
}
</style>
<style lang="scss">
.ant-tabs-dropdown-menu-item {
  height: 30px;
  border-radius: 2px;
  &.ant-tabs-dropdown-menu-item-active .ant-tabs-dropdown-menu-item-remove {
    opacity: 1;
  }
}
.ant-tabs-dropdown-menu-title-content {
  display: flex;
  justify-content: space-between;
}
.ant-tabs-dropdown-menu-item-remove {
  padding: 0;
  margin: 0;
  opacity: 0;
}
.ant-tabs-dropdown-menu {
  padding: 3px !important;
}
</style>
