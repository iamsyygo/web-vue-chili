<template>
  <a-dropdown-button>
    点击 🚁
    <template #overlay>
      <a-menu>
        <a-menu-item key="1">
          <UserOutlined />
          1st menu item
        </a-menu-item>
        <a-menu-item key="2">
          <UserOutlined />
          2nd menu item
        </a-menu-item>
        <a-menu-item key="3">
          <UserOutlined />
          3rd item
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown-button>
</template>
<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { inject } from 'vue';
import { Node } from '@antv/x6';

const node = ref<Node | null>(null);
const getNode = inject('getNode') as () => Node | null;

onMounted(() => {
  node.value = getNode();
  console.log(node.value);
});
</script>
