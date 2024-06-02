<template>
  <a-table
    ref="tableRef"
    class="ant-table-striped w-full"
    :columns="columns"
    :data-source="data"
    :row-class-name="setRowclassname"
    :pagination="pagination"
  >
    <template #bodyCell="body">
      <cell-vnode :body="body" :slots="slots" />
    </template>
  </a-table>
</template>
<script lang="ts" setup generic="T extends Key,R = Record<keyof any,any>">
import { fetchRoleList } from '@/api/role.api';
import { ReloadOutlined } from '@ant-design/icons-vue';
import { Table, TablePaginationConfig, theme } from 'ant-design-vue';
import { Key } from 'ant-design-vue/es/table/interface';
import { createVNode, onMounted, reactive, ref } from 'vue';
import { CellVnode } from './CellVnode';
import { IBodyCell, IColumnItem } from './type';
import { IPageCommonParams } from '@/api/type';
// @ts-expect-error
import dayjs from 'dayjs';

const { useToken } = theme;
const { token } = useToken();

// token.value.zIndexPopupBase

// 🔧 CombineUnitedKeys<T> 太多可能导致消耗性能问题
// type UnColumnKeys = (typeof columns)[number]['key'] | CombineUnitedKeys<T>
// type UnColumnKeys = (typeof columns)[number]['key'];
type UnPromisify<T> = T extends Promise<infer U> ? U : T;
type UnPromisifyList = UnPromisify<ReturnType<typeof fetchApi>>['list'];

interface ITablePageOpton extends IPageCommonParams {
  [key: keyof any]: any;
}
const { columns = [], fetchApi } = defineProps<{
  columns: IColumnItem<T>[];
  fetchApi: (pageOptions: ITablePageOpton) => Promise<{ list: R[]; total: number }>;
}>();

const slots = defineSlots<{
  // [key in UnColumnKeys]?: (body: IBodyCell<T, R>) => any;
  [key in T]?: (body: IBodyCell<T, R>) => any;
}>();

const data = ref<UnPromisifyList>([]);
const tableRef = ref<InstanceType<typeof Table>>();

onMounted(() => {
  const tableEl: HTMLDivElement = tableRef.value?.$el;
  if (tableEl) {
    const { top: tableHgt } = tableEl.getBoundingClientRect();
    const docHgt = document.documentElement.clientHeight;
    const tableHeadHgt = 40;
    const tableCellHgt = 36;
    const tableFootHgt = 80;
    const remainHgt = docHgt - tableHgt - tableHeadHgt - tableFootHgt;
    const pageSize = Math.floor(remainHgt / tableCellHgt);
    pagination.pageSize = pageSize > 10 ? pageSize : 10;
    const pageSizeOptions = pagination.pageSizeOptions?.concat(pageSize).sort();
    pagination.pageSizeOptions = [...new Set(pageSizeOptions)];
    getData();
  }
});

const pagination: TablePaginationConfig = reactive({
  current: 1,
  pageSize: 10,
  update: '',
  pageSizeOptions: ['10', '20', '50', '100'],
  total: 0,
  size: 'default',
  responsive: true,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => {
    return createVNode('span', null, [
      // @ts-expect-error
      '上次更新时间：' + pagination.update,
      createVNode(ReloadOutlined, {
        size: 'small',
        onClick: () => getData(),
        style: { margin: '0 12px' },
      }),

      '共 ',
      createVNode('a', null, total),
      ' 条',
    ]);
  },
  // itemRender(opt) {
  //   return opt.originalElement;
  // },
  'onUpdate:current': (page: number) => {
    pagination.current = page;
    getData();
  },
  'onUpdate:pageSize': (pageSize: number) => {
    pagination.pageSize = pageSize;
    getData();
  },
});

function getData() {
  fetchApi({
    page: pagination.current,
    pageSize: pagination.pageSize,
  }).then(({ list, total }) => {
    // @ts-expect-error
    data.value = list;
    pagination.total = total;
    // @ts-expect-error
    pagination.update = dayjs().format('YYYY-MM-DD HH:mm:ss');
  });
}

function setSeqValue(index: number) {
  const current = pagination.current || 0;
  const pageSize = pagination.pageSize || 0;
  return (current - 1) * pageSize + index + 1;
}

function setRowclassname(_record: any, index: number) {
  return index % 2 === 1 ? 'table-striped' : '';
}

defineExpose({
  getData: getData,
});
</script>
<style lang="scss">
thead.ant-table-thead th.ant-table-cell {
  background-color: v-bind('token.colorPrimaryBg');
}
.ant-table-striped .table-striped td {
  background-color: #fafafa;
  // background-color: v-bind('token.colorPrimaryBg');
}
[data-app-theme='dark'] .ant-table-striped .table-striped td {
  background-color: rgb(29, 29, 29);
}
</style>
