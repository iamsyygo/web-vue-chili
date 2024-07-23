import FormMaster from '@/components/form-master/index.vue';
import { FormPlusItem, defineFormItms } from '@/components/form-master/type.d';
import { FormProps, Modal, message } from 'ant-design-vue';
import { formProps } from 'ant-design-vue/es/form';
import { Ref, ref } from 'vue';

type Key = string | number;
type FormData<T extends Key> = Partial<Record<T, any>>;
interface Options<T extends Key> {
  formItems: FormPlusItem<T>[];
  formProps: Omit<FormProps, 'model'>;
  key?: string;
  addApi?: (data: FormData<T>) => Promise<any>;
  updateApi?: (data: FormData<T>) => Promise<any>;
  deleteApi?: (data: FormData<T> | any[]) => Promise<any>;
  formatData?: (data?: FormData<T>, ...arg: any) => FormData<T>;
  onsucceed?: () => void;
  onfinally?: () => void;
  onfailed?: () => void;
}

export function useForm<T extends Key>(options: Options<T>) {
  const formRef = ref<GenericComponentExports<typeof FormMaster>>();
  // const items = defineFormItms<T>(options.formItems);
  const visible = ref(false);
  const confirming = ref(false);
  const initialValues = options.formItems.reduce((acc, cur) => {
    acc[cur.name] = cur.defaultValue ?? null;
    return acc;
  }, {} as FormData<T>);
  const formValues = ref<FormData<T>>({ ...initialValues }) as Ref<FormData<T>>;

  function openFormWindow(data?: FormData<T>, ...args: any) {
    visible.value = true;
    if (data) {
      formValues.value = options.formatData?.(data, ...args) ?? data;
    } else {
      reset();
    }
  }

  function submit() {
    formRef.value?.submit().then((params: FormData<T>) => {
      Modal.confirm({
        title: '确认提交',
        content: '请确认是否执行提交？',
        centered: true,
        onOk() {
          // @ts-expect-error
          const funcApi = params[options.key || 'id'] ? options.updateApi : options.addApi;
          confirming.value = true;
          funcApi?.(params)
            .then(() => {
              visible.value = false;
              options.onsucceed?.();
              message.success('操作成功');
            })
            .finally(() => {
              confirming.value = false;
              options.onfinally?.();
            });
        },
      });
    });
  }

  function remove(data: FormData<T>) {
    if (Array.isArray(data)) {
      Modal.confirm({
        title: '确认删除',
        content: '请确认是否执行删除？',
        centered: true,
        onOk() {
          confirming.value = true;
          options
            .deleteApi?.(data.map((item) => item[options.key || 'id']))
            .then(() => {
              options.onsucceed?.();
              message.success('操作成功');
            })
            .finally(() => {
              confirming.value = false;
              options.onfinally?.();
            });
        },
      });
    } else {
      options.deleteApi?.(data).then(() => {
        options.onsucceed?.();
      });
    }
  }

  function reset() {
    formValues.value = { ...initialValues } as FormData<T>;
  }

  return {
    formProps: { ...formProps, ...options.formProps },
    formRef,
    items: options.formItems,
    visible,
    formValues,
    initialValues,
    confirming,
    openFormWindow,
    submit,
    remove,
    reset,
  };
}

export { defineFormItms };
