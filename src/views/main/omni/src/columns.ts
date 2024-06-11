import { defineColumns } from '@/components/table-master/type.d';
export const tableColumns = defineColumns([
  {
    title: '序号',
    key: 'seq',
    width: 80,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '表名',
    key: 'TABLE_NAME',
  },

  {
    title: '数量',
    key: 'TABLE_ROWS',
  },
  {
    title: '创建时间',
    key: 'CREATE_TIME',
  },
  {
    title: '更新时间',
    key: 'UPDATE_TIME',
  },
  {
    title: '描述',
    key: 'TABLE_COMMENT',
  },
  {
    title: '操作',
    key: 'controls',
    width: 160,
  },
]);
