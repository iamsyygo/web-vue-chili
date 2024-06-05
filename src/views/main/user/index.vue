<template>
  <div class="w-full p-10px">
    <TableMaster :columns="columns" :fetch-api="fetchUserData" ref="tableRef">
      <template #controls="{ record }">
        <a-space warp>
          <a-button type="dashed" size="small" @click="onOpenDrawer(record)"> 编辑 </a-button>
          <a-popconfirm title="请确认是否执行删除？" @confirm="onRemove(record)">
            <a-button type="dashed" size="small" danger>删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
      <!-- <template #table-above>
        <a-button type="primary" @click="onOpenDrawer()"> 新增 </a-button>
      </template> -->
    </TableMaster>
    <a-drawer
      v-model:open="visible"
      title="编辑用户"
      width="60%"
      :footer-style="{ textAlign: 'right' }"
    >
      <FormMaster
        ref="formRef"
        :items="formItems"
        :form-props="formProps"
        v-model:model="formModel"
        @update:model="onUpdateModel"
      >
        <!-- <template #description="data"> 默认</template>
        <template #description-label="data"> label </template> -->
      </FormMaster>
      <template #footer>
        <a-space warp>
          <a-button @click="visible = false">取消</a-button>
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import TableMaster from '@/components/table-master/index.vue';
import { tableColumns } from './columns';
import { formItems } from './formItems';
import { ref, UnwrapRef } from 'vue';
import { fetchUserData, UserData, deleteUserById, saveUser } from '@/api/user.api';
import FormMaster from '@/components/form-master/index.vue';
import { reactive } from 'vue';
import { FormProps, message, Modal } from 'ant-design-vue';
const columns = ref(tableColumns);

const visible = ref(false);
type UnPromisify<T> = T extends Promise<infer U> ? U : T;
type UnPromisifyData<Api extends (...args: any) => Promise<any>> = UnPromisify<ReturnType<Api>>;
type UnData = UnPromisifyData<typeof fetchUserData>['list'] extends (infer U)[] ? U : never;
const formModel: UnwrapRef<Partial<UnData>> = reactive({});
const formProps: FormProps = {
  labelCol: { span: 5 },
  wrapperCol: { span: 13 },
  model: formModel,
  rules: {
    name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  },
};
const tableRef = ref<GenericComponentExports<typeof TableMaster>>();

const initModel = formItems.reduce(
  (acc, cur) => {
    acc[cur.name] = cur.defaultValue ?? null;
    return acc;
  },
  { id: null } as Record<string, any>
);
function onOpenDrawer(record?: UserData) {
  if (!record?.id) {
    Object.assign(formModel, initModel);
  }
  visible.value = true;
  Object.assign(formModel, record);
}
function onUpdateModel(val: UnwrapRef<Partial<UnData>>) {
  // Object.assign(formModel, val);
}
function onRemove(record: UserData) {
  deleteUserById(record).then(() => {
    tableRef.value?.getData();
    message.success('删除成功');
  });
}

const formRef = ref<GenericComponentExports<typeof FormMaster>>();
function onSubmit() {
  formRef.value?.submit().then((params: UserData) => {
    Modal.confirm({
      title: '确认提交',
      content: '请确认是否执行提交？',
      centered: true,
      onOk() {
        saveUser({
          ...params,
          id: formModel.id!,
        }).then(() => {
          tableRef.value?.getData();
          message.success('提交成功');
          visible.value = false;
        });
      },
    });
  });
}
</script>

<style scoped></style>
./src/form-master/index.vue ./src/table-master/index.vue
