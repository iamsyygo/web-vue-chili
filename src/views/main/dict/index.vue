<template>
  <div class="p-10px w-full h-full flex flex-row dict-box">
    <div class="p-10px w-200px h-full bg-white rounded-8px flex flex-col">
      <div class="h-30px w-full">
        <a-button type="dashed" size="small" class="mr-6px" @click="openFormDrawer({}, 'categorie')"> 新增 </a-button>
        <a-button
          type="dashed"
          size="small"
          @click="openFormDrawer({}, 'categorie')"
          class="mr-6px"
          :disabled="!selectCategory.code"
        >
          编辑
        </a-button>
        <a-popconfirm title="请确认是否执行删除？" @confirm="onremove({ id: selectCategory.id }, deleteCategory)">
          <a-button type="dashed" size="small" danger :disabled="!selectCategory.code">删除</a-button>
        </a-popconfirm>
      </div>
      <a-tree :tree-data="categories" :field-names blockNode @select="ontreeselect" class="flex-1 overflow-y-auto">
        <template #title="item">
          <span>{{ item.name }}</span>
        </template>
      </a-tree>
    </div>
    <div class="flex-1 h-full overflow-y-auto ml-10px">
      <TableMaster :columns="columns" :fetch-api="fetchDictsByCategoryCode" ref="tableRef">
        <template #controls="{ record }">
          <a-space warp>
            <a-button type="dashed" size="small" @click="openFormDrawer(record, 'dict')"> 编辑 </a-button>
            <a-popconfirm title="请确认是否执行删除？" @confirm="onremove(record, deleteDict)">
              <a-button type="dashed" size="small" danger>删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
        <template #table-above>
          <a-button type="primary" @click="openFormDrawer({}, 'dict')" :disabled="!selectCategory.code">
            新增
          </a-button>
        </template>
      </TableMaster>
    </div>
    <a-drawer v-model:open="visible" title="编辑角色" width="50%">
      <FormMaster v-model:model="formModel" ref="formRef" :items :form-props>
        <template #parentId="item">
          <a-tree-select
            v-model:value="formModel[item.name]"
            style="width: 100%"
            :tree-data="categories"
            :field-names="fieldSelectNames"
            placeholder="请选择"
          >
          </a-tree-select>
        </template>
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
<script lang="ts" setup>
import {
  DictItem,
  addDict,
  deleteDict,
  fetchCategories,
  fetchDictsByCategoryCode,
  updateDict,
  deleteCategory,
  addCategory,
  updateCategory,
} from '@/api';
import FormMaster from '@/components/form-master/index.vue';
import TableMaster from '@/components/table-master/index.vue';
import { FormProps, Modal, message } from 'ant-design-vue';
import { computed, ref, watch } from 'vue';
import { formItems, formCategoryItems } from './formItems';
import { tableColumns as columns } from './columns';
import { UnPromisifyData } from '@/types/utils';

const items = ref(formItems);
const fieldNames = {
  children: 'children',
  title: 'name',
  label: 'name',
  key: 'code',
  value: 'code',
};
const fieldSelectNames = {
  children: 'children',
  title: 'name',
  label: 'name',
  key: 'id',
  value: 'id',
};

const tableRef = ref<GenericComponentExports<typeof TableMaster>>();
const categories = ref<UnPromisifyData<typeof fetchCategories>>([]);
function getCategors() {
  fetchCategories().then((data) => {
    categories.value = data;
  });
}
getCategors();
const selectCategory = ref<{
  code?: string;
}>({});
function ontreeselect(selectedKeys: string[], info: any) {
  selectCategory.value = info.node;
  tableRef.value?.getData({ categoryCode: info.node.code });
}

// const
const visible = ref(false);
const formModel = ref({});
const formProps: FormProps = {
  labelCol: { span: 5 },
  wrapperCol: { span: 13 },
  rules: {},
};

let type: any;
const openFormDrawer = async (item?: any, t?: 'dict' | 'categorie') => {
  type = t;
  if (type === 'categorie') {
    items.value = formCategoryItems;
    formModel.value.parentId = item?.parentId;
  } else {
    items.value = formItems;
    formModel.value.categoryCode! = selectCategory.value.code;
  }
  formModel.value = {
    sort: 0,
    status: '1',
    ...(type === 'dict' ? item : selectCategory.value),
  };
  visible.value = true;
};
function onremove(item: any, fn: Function) {
  fn(item.id).then(() => {
    message.success('删除成功');
    tableRef.value?.getData({ categoryCode: selectCategory.value.code || void 0 });
    if (!item.categoryCode) {
      getCategors();
    }
  });
}

const formRef = ref<GenericComponentExports<typeof FormMaster>>();
function onSubmit() {
  formRef.value?.submit().then((params: any) => {
    Modal.confirm({
      title: '确认提交',
      content: '请确认是否执行提交？',
      centered: true,
      onOk() {
        (type === 'categorie' ? (params.id ? updateCategory : addCategory) : params.id ? updateDict : addDict)({
          ...params,
        }).then(() => {
          message.success('提交成功');
          visible.value = false;
          if (type === 'categorie') {
            getCategors();
          } else {
            tableRef.value?.getData({ categoryCode: selectCategory.value.code });
          }
        });
      },
    });
  });
}
</script>
<style scoped lang="scss">
:deep(.ant-tree-node-content-wrapper) {
  padding: 0 5px;
}
</style>
