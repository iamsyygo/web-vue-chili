import { register } from '@antv/x6-vue-shape';
import Dropdown from '../vue-shape/dropdown.vue';

export function registerVueShape() {
  register({
    shape: 'dropdown-vue-node',
    // width: 100,
    // height: 100,
    component: Dropdown,
  });
}
