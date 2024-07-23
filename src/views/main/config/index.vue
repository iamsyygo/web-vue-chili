<template>
  <div class="w-full p-10px">
    <TableMaster :columns :fetch-api="fetchConfigData" ref="tableRef">
      <template #status="{ value, column }">
        {{ getDictionaryLabel('sys_state', value[column.key]) }}
      </template>

      <template #controls="{ record }">
        <a-space warp>
          <a-button type="dashed" size="small" @click="openFormWindow(record)"> 编辑 </a-button>
          <a-popconfirm title="请确认是否执行删除？" @confirm="remove(record)">
            <a-button type="dashed" size="small" danger>删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
      <template #table-above>
        <a-button type="primary" @click="openFormWindow()"> 新增 </a-button>
      </template>
    </TableMaster>
    <a-drawer v-model:open="visible" title="编辑配置" width="50%">
      <FormMaster ref="formRef" v-model:model="formValues" :items="items" :form-props="formProps"> </FormMaster>
      <template #footer>
        <a-space warp>
          <a-button @click="visible = false">取消</a-button>
          <a-button type="primary" @click="submit">提交</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import TableMaster from '@/components/table-master/index.vue';
import { tableColumns } from './columns';
import { formItems } from './formItems';
import { ref } from 'vue';
import { addConfig, deleteConfigById, fetchConfigData, updateConfig } from '@/api';
import FormMaster from '@/components/form-master/index.vue';
import { useForm } from '@/hooks/form.h';
import { getDictionaryLabel } from '@/utils/dictionary';
const columns = ref(tableColumns);
const tableRef = ref<GenericComponentExports<typeof TableMaster>>();
const { formProps, formRef, formValues, openFormWindow, items, visible, submit, remove } = useForm({
  formItems,
  formProps: {
    labelCol: { span: 5 },
    wrapperCol: { span: 13 },
  },
  addApi: addConfig,
  updateApi: updateConfig,
  deleteApi: deleteConfigById,
  onsucceed() {
    tableRef.value?.getData();
  },
});
</script>

<style scoped></style>
