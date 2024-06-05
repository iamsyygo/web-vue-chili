<script setup lang="ts">
import { Col as ACol, Row as ARow } from 'ant-design-vue';
import { ref, reactive, onMounted } from 'vue';
import { option as userOptions } from './options/user';
import { option as orderOptions } from './options/order';
import { option as goodsOptions } from './options/goods';
import { option as marketingOptions } from './options/marketing';
import * as echarts from 'echarts';
definePage({
  meta: {
    title: '首页中心',
    icon: 'idea',
    keepAlive: true,
  },
});
const responsive = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 6,
  xl: 6,
  xxl: 6,
};
interface Item {
  name: string;
  prop: string;
  value: number;
  color: string;
}
const items = reactive([
  {
    name: '用户',
    prop: 'user',
    value: 100,
    color: 'rgba(166,214,249,0.25)',
    options: userOptions,
  },
  {
    name: '订单',
    prop: 'order',
    value: 200,
    color: 'rgba(255,230,203,0.25)',
    options: orderOptions,
  },
  {
    name: '商品',
    prop: 'goods',
    value: 300,
    color: 'rgba(184,245,128,0.25)',
    options: goodsOptions,
  },
  {
    name: '营销',
    prop: 'marketing',
    value: 400,
    color: 'rgba(253,210,223,0.25)',
    options: marketingOptions,
  },
]);

const elRef = ref<(HTMLDivElement | null)[]>([]);
onMounted(() => {
  items.forEach((item, index) => {
    const chart = echarts.init(elRef.value[index]);
    const instance = chart.setOption(item.options);
    // @ts-expect-error
    item.instance = instance;
  });
});
</script>

<template>
  <div class="w-full h-full p-10px">
    <a-row :gutter="[10, 10]">
      <a-col :span="6" v-bind="responsive" v-for="item in items" :key="item.prop">
        <div class="info-item" :style="{ background: item.color }">
          <div class="card-overlay p-20px flex items-center justify-between">
            <div class="flex flex-col justify-between h-full">
              <div class="font-size-20px font-500">
                <!-- <symbol-icon :icon="item.prop" size="30" /> -->
                <symbol-icon icon="huore" />
                {{ item.name }}
              </div>
              <span class="font-700 font-size-40px">{{ item.value }}</span>
            </div>
            <!-- <a-progress type="circle" :percent="75" :size="90" /> -->
            <div ref="elRef" class="w-60% h-80%"></div>
          </div>
        </div>
      </a-col>
    </a-row>
    <div class="w-full h-100px bg-#fff rounded-10px mt-10px border-3px border-solid border-#EAEDF5">
      <div class="p-20px">这是一个占位的底部区域</div>
    </div>
  </div>
</template>
<style scoped lang="scss">
$--item-radius: 8px;
.info-item {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: $--item-radius;
}
.card-overlay {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  z-index: 99;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s;
}
.card-overlay:hover {
  box-shadow: 5px 0 18px rgba(183, 183, 183, 0.2);
}
</style>
