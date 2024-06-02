<template>
  <div class="w-full p-10px">
    <TablePlus :columns="columns" :fetch-api="fetchRoleList" ref="tableRef">
      <template #controls="{ record }">
        <a-space warp>
          <a-button type="dashed" size="small" @click="onOpenDrawer(record)"> 编辑 </a-button>
          <a-popconfirm title="请确认是否执行删除？" @confirm="onRemove(record)">
            <a-button type="dashed" size="small" danger>删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </TablePlus>
    <a-drawer
      v-model:open="visible"
      title="编辑角色"
      width="60%"
      :footer-style="{ textAlign: 'right' }"
    >
      <FormPlus
        ref="formRef"
        :items="formItems"
        :form-props="formProps"
        v-model:model="formModel"
        @update:model="onUpdateModel"
      >
        <!-- <template #description="data"> 默认</template>
        <template #description-label="data"> label </template> -->
      </FormPlus>
      <template #footer>
        <a-space warp>
          <a-button @click="(visible = false), (focusRow = null)">取消</a-button>
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import TablePlus from './src/table-plus/index.vue';
import { tableColumns } from './columns';
import { formItems } from './formItems';
import { ref, UnwrapRef } from 'vue';
import { fetchRoleList, RoleData, deleteRoleById, updateRole } from '@/api/role.api';
import FormPlus from './src/form-plus/index.vue';
import { reactive } from 'vue';
import { FormProps, message, Modal } from 'ant-design-vue';
const columns = ref(tableColumns);
const focusRow = ref<RoleData | null>(null);
function onOpenDrawer(record: RoleData) {
  visible.value = true;
  // focusRow.value = record;
  Object.assign(formModel, record);
}

const visible = ref(false);
type UnPromisify<T> = T extends Promise<infer U> ? U : T;
type UnPromisifyData<Api extends (...args: any) => Promise<any>> = UnPromisify<ReturnType<Api>>;
type UnData = UnPromisifyData<typeof fetchRoleList>['list'] extends (infer U)[] ? U : never;
const formModel: UnwrapRef<Partial<UnData>> = reactive({});
const formProps: FormProps = {
  labelCol: { span: 5 },
  wrapperCol: { span: 13 },
  model: formModel,
  rules: {
    name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  },
};
const tableRef = ref<GenericComponentExports<typeof TablePlus>>();

function onUpdateModel(val: UnwrapRef<Partial<UnData>>) {
  // Object.assign(formModel, val);
}
function onRemove(record: RoleData) {
  deleteRoleById(record).then(() => {
    tableRef.value?.getData();
    message.success('删除成功');
  });
}

const formRef = ref<GenericComponentExports<typeof FormPlus>>();
function onSubmit() {
  Modal.confirm({
    title: '确认提交',
    content: '请确认是否执行提交？',
    centered: true,
    onOk() {
      formRef.value?.submit().then((params: RoleData) => {
        console.log(params);
        updateRole({
          ...params,
          id: formModel.id!,
        }).then(() => {
          tableRef.value?.getData();
          message.success('提交成功');
          visible.value = false;
        });
      });
    },
  });
}
</script>

<style scoped></style>
