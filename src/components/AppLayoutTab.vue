<template>
  <div class="app-tabs-wrapper">
    <a-tabs
      :activeKey="$route.path"
      :type="modelValue.length === 1 ? 'card' : 'editable-card'"
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
          />
          {{ pane.title || pane.path }}
        </template>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script lang="ts" setup>
import { theme } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/_util/type';
import { useRoute } from 'vue-router';
import { AppMenuItemMeta } from '@/components/layout';
const { useToken } = theme;
const { token } = useToken();
const route = useRoute();
const props = defineProps<{
  modelValue: AppMenuItemMeta[];
}>();

const emits = defineEmits<{
  change: [value: AppMenuItemMeta];
  'update:modelValue': [value: AppMenuItemMeta[]];
}>();

const onremove = (e: Key | MouseEvent | KeyboardEvent, action: 'add' | 'remove') => {
  if (action !== 'remove') return;

  const newVal = props.modelValue.filter(({ path }) => path !== e);
  emits('update:modelValue', newVal);

  const pre = newVal.at(-1);
  if (!pre && route.path !== e) return;
  // @ts-expect-error
  emits('change', pre);
};

function onchange(activeKey: Key, _: MouseEvent | KeyboardEvent) {
  const newVal = props.modelValue.find((v) => v.path === activeKey);
  if (!newVal) return;
  emits('change', newVal);
}
</script>

<style lang="scss" scoped>
$-tab-active-bg: v-bind('token.colorBgLayout');
$-tab-height: 30px;
$-tab-width: 130px;
$-tab-radius: 8px;
@mixin remove-show($opacity: 0, $cls: ant-tabs-tab-remove) {
  .#{$cls} {
    opacity: $opacity;
  }
}

@mixin display-before($v: 0) {
  &::before {
    opacity: $v;
  }
}

.app-tabs-wrapper {
  padding-top: 3px;
  background-color: v-bind('token.colorBgElevated');
}
.app-tabs--nav {
  user-select: none;
  height: $-tab-height;
  :deep(.ant-tabs-nav) {
    height: $-tab-height;
    &::before {
      display: none;
    }
  }

  :deep(.ant-tabs-tab-btn) {
    width: $-tab-width;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  :deep(.ant-tabs-nav-more) {
    padding: 4px 16px;
  }
  :deep(.ant-tabs-tab-remove) {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    line-height: 16px;
    text-align: center;
    color: v-bind('token.colorText');
    padding: 0;
    margin: 0;

    &:hover {
      background-color: v-bind('token.colorTextQuaternary');
    }
  }
}

.app-tabs--nav :deep(.ant-tabs-tab) {
  position: relative;
  font-size: 12px;
  margin: 0;
  padding: 0 5px !important;
  border: 0;
  border-radius: $-tab-radius !important;
  background-color: transparent;

  &::before {
    content: '';
    position: absolute;
    bottom: 50%;
    right: 0;
    width: 1px;
    height: 60%;
    transform: translate(1.5px, 50%);
    background-color: #ccc;
    transition: opacity 0.8s;
  }

  &:hover {
    color: v-bind('token.colorText');
    border-radius: $-tab-radius !important;
    /* background-color: rgba(255, 255, 255, 0.2); */
    background-color: v-bind('token.colorFill');

    @include remove-show(1);
    @include display-before(0);
  }

  // 下一个兄弟元素是 .ant-tabs-tab:hover 时
  // 下一个兄弟元素是 .ant-tabs-tab-active 时
  &:has(+ .ant-tabs-tab:hover),
  &:has(+ .ant-tabs-tab-active) {
    @include display-before(0);
  }

  @include remove-show(0);
}

.app-tabs--nav :deep(.ant-tabs-tab-active) {
  border-radius: $-tab-radius !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  background-color: $-tab-active-bg;

  &:hover {
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
    background-color: $-tab-active-bg;
  }

  @include display-before(0);
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
