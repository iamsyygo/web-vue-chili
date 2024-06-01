import { defineColumns } from './src/table-plus/type.d';
export const tableColumns = defineColumns([
  {
    title: '序号',
    key: 'seq',
    width: 80,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '角色名称',
    key: 'name',
  },
  {
    title: '角色值',
    key: 'value',
  },
  {
    title: '角色状态',
    key: 'status',
  },
  {
    title: '创建时间',
    key: 'createDate',
  },
  {
    title: '角色描述',
    key: 'description',
  },
  {
    title: '操作',
    key: 'controls',
    width: 160,
  },
]);
