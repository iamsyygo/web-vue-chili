<template>
  <a-form ref="formRef" size="large" v-bind="formProps" :model="proxyModel">
    <a-form-item v-for="item in items" :key="item.name" v-bind="item" :name="item.name">
      <!-- <template v-for="partName in partsSlots" #[partName]>
        <slot :name="`${item.name}-${partName}`" :model="formModel" />
        <slot :name="partName" :model="formModel" />
      </template> -->
      <item-vnode :item :slots :model="proxyModel" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup generic="T extends (string|number) ">
import { watch, ref } from 'vue';
import { FormProps } from 'ant-design-vue/es/form';

import { FormPlusItem } from './type';
import { ItemVnode } from './ItemVnode';
import { computed } from 'vue';
import { formItems } from '@/views/main/menu/formItems';
import { emit } from 'process';

type UnFormItemsKeys = (typeof props.items)[number]['name'];
type UnModelRecord = Partial<Record<UnFormItemsKeys, any>>;
// 全局的 slots
type PartsSlots = (typeof partsSlots)[number];
/**
 * @description 对单个 item 的 slots 进行组合
 * @example
 * 'name-label' | 'name-extra' | 'name-help' | 'name-tooltip'
 */
type CombinationItemSlots = `${T}-${PartsSlots}`;
type ItemSlotKeys = UnFormItemsKeys | CombinationItemSlots | PartsSlots;

const partsSlots = ['extra', 'help', 'label', 'tooltip'] as const;
const formRef = ref();
const props = withDefaults(
  defineProps<{
    items: FormPlusItem<T>[];
    model: Partial<Record<T, any>>;
    formProps: Omit<FormProps, 'model'>;
  }>(),
  {}
);

const slots = defineSlots<{
  [key in ItemSlotKeys]?: (item: FormPlusItem<T>, model: UnModelRecord) => any;
}>();
const emits = defineEmits<{
  'update:model': [UnModelRecord];
}>();

const initailValues = formItems.reduce((acc, item) => {
  // @ts-expect-error
  acc[item.name] = typeof props.model?.[item.name] === 'undefined' ? item.defaultValue : props.model[item.name];
  return acc;
}, {} as Record<string, any>);
const proxyModel = computed({
  get() {
    if (!props.model) {
      return {};
    }
    const proxy = new Proxy(props.model, {
      set(target, key, value) {
        console.log(`set form proxy model`);
        emits('update:model', { ...target, [key]: value });
        return true;
      },
    });
    return proxy;
  },
  set(val) {
    console.log(`set form proxy model`);

    emits('update:model', val);
  },
});

// props.items.forEach((item) => {
// proxyModel.value[item.name] = props.model?.[item.name] ?? item.defaultValue;
// });
// emits('update:model', initailValues);

defineExpose({
  getForm: () => formRef.value,
  validate: () => formRef.value.validate(),
  submit: () => submit(),
  resetFields: () => formRef.value.resetFields(),
});

const submit = () => {
  return formRef.value.validate().then(() => {
    return proxyModel.value;
  });
};
</script>
