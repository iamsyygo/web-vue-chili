import { defineComponent } from 'vue';

// 为了能在不使用 tsx 情况下使用 vnode, tsx 编写的组件对 ts 支持不友好
export const CellVnode = defineComponent({
  props: {
    body: { type: Object, default: () => ({}) },
    slots: { type: Object, default: () => ({}) },
  },
  render(): any {
    const key = this.body.column.key;
    const slot = this.slots[key];
    return slot?.(this.body) ?? this.body.record[key];
  },
});
