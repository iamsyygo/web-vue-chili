import { defineFormItms } from '@/components/form-master/type.d';
import { fetchDictionary } from '@/utils/dictionary';

export const formItems = defineFormItms([
  {
    label: '配置名称',
    name: 'name',
    rules: [{ required: true, message: '必填', trigger: 'blur' }],
  },
  {
    label: '配置值',
    name: 'value',
    component: 'input',
    rules: [{ required: true, message: '必填', trigger: 'blur' }],
  },
  {
    label: '状态',
    name: 'status',
    defaultValue: '1',
    component: 'radio-group',
    props: {
      options: fetchDictionary('sys_state', 'number'),
    },
  },
  {
    label: '描述',
    name: 'description',
    component: 'textarea',
    props: {
      placeholder: '请输入',
    },
  },
]);
