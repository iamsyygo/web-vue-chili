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
    title: '字典标签',
    key: 'label',
    width: 120,
    ellipsis: true,
  },
  {
    title: '字典值',
    key: 'value',
    width: 120,
    ellipsis: true,
  },
  {
    title: '分类编码',
    key: 'categoryCode',
    minWidth: 120,
  },
  {
    title: '创建时间',
    key: 'createdAt',
    width: 160,
  },
  {
    title: '更新时间',
    key: 'updatedAt',
    width: 160,
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
  },
  {
    title: '排序',
    key: 'sort',
    width: 100,
  },
  {
    title: '描述',
    key: 'description',
  },
  {
    title: '操作',
    key: 'controls',
    width: 160,
    fixed: 'right',
  },
]);
