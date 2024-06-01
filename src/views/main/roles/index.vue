<template>
  <div class="w-full p-10px">
    <TablePlus :columns="columns" :fetch-api="fetchRoleList">
      <template #controls="{ record }">
        <a-space warp>
          <a-button type="dashed" size="small" @click="onOpenDrawer(record)">编辑</a-button>
          <a-button type="dashed" size="small" danger>删除</a-button>
        </a-space>
      </template>
    </TablePlus>
  </div>
</template>

<script setup lang="ts">
import TablePlus from './src/table-plus/index.vue';
import { tableColumns } from './columns';
import { ref } from 'vue';
import { fetchRoleList, RoleData } from '@/api/role.api';

const columns = ref(tableColumns);

function onOpenDrawer(record: RoleData) {}
</script>

<style scoped></style>
