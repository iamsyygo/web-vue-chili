import FormMaster from '@/components/form-master/index.vue';
import { FormPlusItem, defineFormItms } from '@/components/form-master/type';
import { FormProps, Modal } from 'ant-design-vue';
import { Ref } from 'vue';
import { ref } from 'vue';

interface Options<T extends string | number> {
  formItems: FormPlusItem<T>[];
  key: string;
  formProps: FormProps;
  addApi?: (data: Partial<Record<T, any>>) => Promise<void>;
  updateApi?: (data: Partial<Record<T, any>>) => Promise<void>;
  formatData?: (data: Partial<Record<T, any>>, ...arg: any) => Partial<Record<T, any>>;
}

export function useForm<T extends string | number>(options: Options<T>) {
  const formRef = ref<GenericComponentExports<typeof FormMaster>>();
  const items = defineFormItms(options.formItems);
  const visible = ref(false);
  const formValues = ref<Partial<Record<T, any>>>(
    items.reduce((acc, cur) => {
      acc[cur.name] = cur.defaultValue ?? null;
      return acc;
    }, {} as Partial<Record<T, any>>)
  ) as Ref<Partial<Record<T, any>>>;

  function openFormWindow(data?: Partial<Record<T, any>>, ...args: any) {
    visible.value = true;
    formValues.value = options.formatData?.(data ?? {}, ...args) ?? (data || {});
  }

  function submit() {
    return formRef.value?.submit().then((params: Partial<Record<T, any>>) => {
      return new Promise<void>((resolve) => {
        Modal.confirm({
          title: '确认提交',
          content: '请确认是否执行提交？',
          centered: true,
          onOk() {
            // @ts-expect-error
            const funcApi = params[options.key] ? options.updateApi : options.addApi;
            funcApi?.(params).then(() => {
              visible.value = false;
              resolve();
            });
          },
        });
      });
    });
  }

  return {
    formRef,
    items,
    visible,
    formValues,
    openFormWindow,
    submit,
  };
}
