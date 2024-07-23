import { defineColumns } from '@/components/table-master/type.d';
import { getDictionaryLabel } from '@/utils/dictionary';
export const tableColumns = defineColumns([
  {
    title: '序号',
    key: 'seq',
    width: 80,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '配置名称',
    key: 'name',
  },
  {
    title: '配置值',
    key: 'value',
  },
  {
    title: '创建时间',
    key: 'createDate',
  },
  {
    title: '修改时间',
    key: 'updateDate',
  },
  {
    title: '状态',
    key: 'status',
    // customRender(opt) {
    //   const { column, value } = opt;
    //   return getDictionaryLabel('sys_state', value[column.key!]);
    // },
    // customCell(data, index, col) {
    //   if (!col?.key) return;
    //   return {
    //     attrs: {
    //       colSpan: 1,
    //       rowSpan: 1,
    //     },
    //     children: getDictionaryLabel('sys_state', data[col.key]),
    //   };
    // },
  },
  {
    title: '描述',
    key: 'description',
  },
  {
    title: '操作',
    key: 'controls',
    width: 160,
  },
]);
