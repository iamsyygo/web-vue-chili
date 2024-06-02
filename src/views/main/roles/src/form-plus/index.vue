<template>
  <a-form ref="formRef" size="large" v-bind="formProps" :model="formModel">
    <a-form-item v-for="item in items" :key="item.name" v-bind="item" :name="item.name">
      <!-- <template v-for="partName in partsSlots" #[partName]>
        <slot :name="`${item.name}-${partName}`" :model="formModel" />
        <slot :name="partName" :model="formModel" />
      </template> -->
      <item-vnode :item :slots :model="formModel" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup generic="T extends (string|number) ">
import { watchEffect, reactive, watch, ref } from 'vue';
import { FormProps } from 'ant-design-vue/es/form';

import { FormPlusItem } from './type';
import { ItemVnode } from './ItemVnode';

type UnFormItemsKeys = (typeof items)[number]['name'];
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
const { items, model, formProps } = defineProps<{
  items: FormPlusItem<T>[];
  model: FormProps['model'];
  formProps: Omit<FormProps, 'model'>;
}>();

const slots = defineSlots<{
  [key in ItemSlotKeys]?: (item: FormPlusItem<T>, model: UnModelRecord) => any;
}>();

const emits = defineEmits<{
  'update:model': [UnModelRecord];
}>();

const formModel: Record<keyof any, any> = reactive({});
watchEffect(() => {
  const wrapMode = model ?? {};
  items.forEach((item) => {
    formModel[item.name] = wrapMode[item.name] ?? item.defaultValue;
  });
});
watch(formModel, (val) => {
  emits('update:model', val);
});

defineExpose({
  getForm: () => formRef.value,
  validate: () => formRef.value.validate(),
  submit: () => submit(),
  resetFields: () => formRef.value.resetFields(),
});

const submit = () => {
  return formRef.value.validate().then(() => {
    return formModel;
  });
};
</script>
