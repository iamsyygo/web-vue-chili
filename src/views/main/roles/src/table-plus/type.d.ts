import { ColumnType } from 'ant-design-vue/es/table';
import { DefaultRecordType } from 'ant-design-vue/es/vc-table/interface';
import { ColumnTitle, Key } from 'ant-design-vue/es/table/interface';

export interface IColumnItem<T, RecordType = DefaultRecordType> extends ColumnType<RecordType> {
  key: T;
}
export function defineColumns<T extends Key>(configs: IColumnItem<T>[]) {
  return configs;
}

export interface IBodyCell<T, R = Record<string, any>> {
  text: any;
  value: any;
  record: R;
  index: number;
  column: IColumnItem<T>;
}

/**
 * 使用逗号组合联合类型
 * @example
 * type Unite = 'name' | 'value' | 'describes'
 * const test1:CombineUnitedKeys<Unite> = 'name,value'
 * const test2:CombineUnitedKeys<Unite> = 'name,describes'
 * ...
 */
type CombineUnitedKeys<T extends Key, U extends string = T> = T extends any
  ? `${T},${CombineUnitedKeys<Exclude<U, T>>}` | T
  : never;
