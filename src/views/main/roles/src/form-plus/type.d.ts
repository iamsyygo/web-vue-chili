import { FormItemProps, FormProps } from 'ant-design-vue/es/form';
import {
  InputProps,
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
  PasswordProps,
  NumberProps,
  TextProps,
  HiddenProps,
} from 'ant-design-vue/es';

type FormComponentype =
  | 'input'
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
  | 'number'
  | 'text'
  | 'hidden';

interface IDefaultProps {
  component?: FormComponentype;
  props?: any;
}
interface IInputProps {
  component: 'input';
  props: InputProps;
}
interface ISelectProps {
  component: 'select';
  props: SelectProps;
}
interface IRadioGroupProps {
  component: 'radio-group';
  props: RadioGroupProps;
}
interface ICheckboxGroupProps {
  component: 'checkbox-group';
  props: CheckboxGroupProps;
}
interface ITextAreaProps {
  component: 'textarea';
  props: TextAreaProps;
}

export interface IBaseFormItem<T> extends FormItemProps {
  name: T;
  defaultValue?: any;
}

type UnitedProps =
  | IDefaultProps
  | IInputProps
  | ISelectProps
  | IRadioGroupProps
  | ICheckboxGroupProps
  | ITextAreaProps;
export type FormPlusItem<T> = IBaseFormItem<T> & UnitedProps;

export function defineFormItms<T extends string | number>(items: FormPlusItem<T>[]) {
  return items;
}
