<template>
  <a-form ref="formRef" size="large" v-bind="formProps" :model="formModel">
    <a-form-item v-for="item in formItems" :key="item.name" v-bind="item" :name="item.name">
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
import { debounce } from 'lodash-es';
import { FormProps } from 'ant-design-vue/es/form';
import { FormPlusItem } from './type';
import { ItemVnode } from './ItemVnode';
import { nextTick } from 'vue';

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

const formItems = ref<FormPlusItem<T>[]>();
watch(formModel, (val) => {
  nextTick(() => {
    handleFormItems();
  });
  emits('update:model', val);
});

const handleFormItems = debounce(() => {
  nextTick(() => {
    formItems.value = items.filter((item) => {
      if (typeof item.controlled === 'undefined') return true;
      if (typeof item.controlled === 'object') {
        return typeof item.controlled.destroy === 'boolean'
          ? !item.controlled.destroy
          : !item.controlled.destroy?.(item, formModel);
      }
      throw new Error('controlled 类型错误');
    });
  });
}, 200);
handleFormItems();

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

// TODO: 优化
// const formItems = computed(() => {
//   console.log(111);

//   return items.filter((item) => {
//     if (typeof item.controlled === 'undefined') return true;
//     if (typeof item.controlled === 'object') {
//       return typeof item.controlled.destroy === 'boolean'
//         ? !item.controlled.destroy
//         : !item.controlled.destroy?.(item, formModel);
//     }
//     throw new Error('controlled 类型错误');
//   });
// });
</script>
