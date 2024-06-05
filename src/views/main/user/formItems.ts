import { defineFormItms } from '@/components/form-master/type.d';

// {
//   title: '用户名',
//   key: 'username',
// },
// {
//   title: '邮箱',
//   key: 'email',
// },
// {
//   title: '电话',
//   key: 'phoneNumber',
// },
// {
//   title: '创建时间',
//   key: 'createDate',
// },

export const formItems = defineFormItms([
  {
    label: '用户名',
    name: 'username',
  },
  {
    label: '邮箱',
    name: 'email',
  },
  {
    label: '电话',
    name: 'phoneNumber',
  },
]);
