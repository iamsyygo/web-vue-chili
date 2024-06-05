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
    title: '用户名',
    key: 'username',
  },
  {
    title: '邮箱',
    key: 'email',
  },
  {
    title: '电话',
    key: 'phoneNumber',
  },
  {
    title: '创建时间',
    key: 'createDate',
  },
  {
    title: '操作',
    key: 'controls',
    width: 160,
  },
]);
