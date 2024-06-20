import { FormItemProps, FormProps } from 'ant-design-vue/es/form';
import {
  InputProps,
  InputNumberProps,
  SelectProps,
  SelectOption,
  RadioProps,
  RadioGroupProps,
  CheckboxProps,
  CheckboxGroupProps,
  TextAreaProps,
  DatePickerProps,
  UploadProps,
  CascaderProps,
  SwitchProps,
  SliderProps,
  RateProps,
  ColorProps,
  InputPassword,
  TextProps,
  HiddenProps,
} from 'ant-design-vue/es';

type FormComponentype =
  | 'input'
  | 'number'
  | 'select'
  //   | 'radio'
  | 'radio-group'
  //   | 'checkbox'
  | 'checkbox-group'
  | 'textarea'
  | 'date'
  | 'upload'
  | 'cascader'
  | 'switch'
  | 'slider'
  | 'rate'
  | 'color'
  | 'password'
  | 'text'
  | 'hidden';

interface IDefaultProps {
  component?: FormComponentype;
  props?: any;
}
interface IInputProps {
  component: 'number';
  props?: InputProps;
}

interface IInputNumberProps {
  component: 'input-number';
  props?: InputNumberProps;
}

interface ISelectProps {
  component: 'select';
  props?: SelectProps;
}
interface IRadioGroupProps {
  component: 'radio-group';
  props?: RadioGroupProps;
}
interface ICheckboxGroupProps {
  component: 'checkbox-group';
  props?: CheckboxGroupProps;
}
interface ITextAreaProps {
  component: 'textarea';
  props?: TextAreaProps;
}
interface IDatePickerProps {
  component: 'date';
  props?: DatePickerProps;
}

export interface IBaseFormItem<T> extends FormItemProps {
  name: T;
  defaultValue?: any;
  // 控制表单项的显示隐藏
  controlled?: {
    display?: boolean | ((prop: FormPlusItem<T>, model: Record<T, any>) => boolean);
    destroy?: boolean | ((prop: FormPlusItem<T>, model: Record<T, any>) => boolean);
  };
}

type UnitedProps =
  | IDefaultProps
  | IInputProps
  | IInputNumberProps
  | ISelectProps
  | IRadioGroupProps
  | ICheckboxGroupProps
  | ITextAreaProps;
export type FormPlusItem<T> = IBaseFormItem<T> & UnitedProps;

export function defineFormItms<T extends string | number>(items: FormPlusItem<T>[]) {
  return items;
}
