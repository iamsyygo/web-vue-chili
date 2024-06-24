import { defineFormItms } from '@/components/form-master/type.d';
import { fetchDictionary } from '@/utils/dictionary';
export const formItems = defineFormItms([
  {
    label: '字典标签',
    name: 'label',
    rules: [{ required: true, message: '必填', trigger: 'blur' }],
  },
  {
    label: '字典值',
    name: 'value',
    rules: [{ required: true, message: '必填', trigger: 'blur' }],
  },
  {
    label: '排序',
    name: 'sort',
    component: 'input-number',
    props: {
      precision: 0,
      min: 0,
    },
  },
  {
    label: '状态',
    name: 'status',
    defaultValue: '1',
    component: 'radio-group',
    props: {
      // options: [
      //   { label: '启用', value: '1' },
      //   { label: '禁用', value: '0' },
      // ],
      options: fetchDictionary('sys_state'),
    },
  },
  {
    label: '描述',
    name: 'description',
    component: 'textarea',
    props: {
      placeholder: '请输入',
    },
    controlled: {
      destroy(prop, model) {
        return model.status === '0';
      },
    },
  },
]);

export const formCategoryItems = defineFormItms([
  {
    label: '父级分类',
    name: 'parentId',
  },
  {
    label: '分类名称',
    name: 'name',
    rules: [{ required: true, message: '必填', trigger: 'blur' }],
  },
  {
    label: '分类编码',
    name: 'code',
    rules: [{ required: true, message: '必填', trigger: 'blur' }],
  },
  {
    label: '排序',
    name: 'sort',
    component: 'input-number',
    props: {
      precision: 0,
      min: 0,
    },
  },
  {
    label: '状态',
    name: 'status',
    defaultValue: '1',
    component: 'radio-group',
    props: {
      // options: [
      //   { label: '启用', value: '1' },
      //   { label: '禁用', value: '0' },
      // ],
      // sys_state
      options: fetchDictionary('sys_state'),
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
