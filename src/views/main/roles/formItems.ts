import { defineFormItms } from './src/form-plus/type.d';
export const formItems = defineFormItms([
  {
    label: '角色名称',
    name: 'name',
  },
  {
    label: '角色值',
    name: 'value',
    rules: [{ required: true, message: '必填', trigger: 'blur' }],
  },
  {
    label: '角色状态',
    name: 'status',
    defaultValue: '1',
    component: 'radio-group',
    props: {
      options: [
        { label: '启用', value: '1' },
        { label: '禁用', value: '0' },
      ],
    },
  },
  {
    label: '角色描述',
    name: 'description',
    component: 'textarea',
    props: {
      placeholder: '请输入',
    },
  },
]);
