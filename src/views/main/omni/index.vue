<script setup lang="ts">
import { Col as ACol, Row as ARow } from 'ant-design-vue';
import { ref, reactive, onMounted } from 'vue';
import { option as userOptions } from './src/options/user';
import { option as orderOptions } from './src/options/order';
import { option as goodsOptions } from './src/options/goods';
import { option as marketingOptions } from './src/options/marketing';
import { setPullCodeOption } from './src/options/codepullOptions';
import * as echarts from 'echarts';
import Tab2button from '@/components/tab2button.vue/index.vue';
import { fetchGithubCommits } from '@/api/omni.api';
import { tableColumns as columns } from './src/columns';
import dayjs from 'dayjs';
import { fetchDatabaseData } from '@/api/database.api';
import Amap from './src/Amap/index.vue';
definePage({
  meta: {
    title: '首页中心',
    icon: 'idea',
    keepAlive: true,
  },
});

const codepullRef = ref<HTMLElement | null>(null);
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
const commitData = ref({
  'web-vue-chili': {
    commits: [],
    records: [],
  },
  'web-nest-goggles': {
    commits: [],
    records: [],
  },
});
const progresss: any[] = [
  { key: 'web-vue-chili', label: '前端' },
  { key: 'web-nest-goggles', label: '后端' },
];
const progressActivekey = ref<Repo>(progresss[0].key);

const spinning = ref(false);
onMounted(() => {
  items.forEach((item, index) => {
    const chart = echarts.init(elRef.value[index]);
    const instance = chart.setOption(item.options);
    // @ts-expect-error
    item.instance = instance;
  });

  spinning.value = true;
  // @ts-expect-error
  Promise.all(Object.keys(commitData.value).map((key) => getCommits(key)))
    .then(() => {
      onProgressActiveChange(progressActivekey.value);
      const el = codepullRef.value;
      const chart = echarts.init(el);
      const instance = chart.setOption(
        setPullCodeOption({
          months,
          frontEnd: commitData.value['web-vue-chili'].records,
          backEnd: commitData.value['web-nest-goggles'].records,
        })
      );
      console.log(instance);

      // setPullCodeOption
    })
    .finally(() => {
      spinning.value = false;
      console.log(commitData.value);
    });
});
const activeCommits = ref<any[]>([]);
function onProgressActiveChange(params: Repo) {
  activeCommits.value = commitData.value[params].commits;
}

type Repo = 'web-vue-chili' | 'web-nest-goggles';
const months = Array.from({ length: 5 }, (_, index) => {
  return dayjs().subtract(index, 'month').format('YYYY-MM');
});
function getCommits(params: Repo) {
  return fetchGithubCommits({
    owner: 'iamsyygo',
    repo: params,
  }).then((data: any) => {
    // 获取最近5个月的每个月提交数量
    const records = data.reduce((acc: Record<string, number>, cur: any) => {
      const month = dayjs(cur.commit.author.date).format('YYYY-MM');
      if (typeof acc[month] !== 'undefined') {
        acc[month]++;
      }
      return acc;
    }, Object.fromEntries(months.map((month) => [month, 0])));
    commitData.value[params].commits = data;
    commitData.value[params].records = records;
  });
}

function fetchDataApi(params: any) {
  return fetchDatabaseData().then((res: any) => {
    return {
      list: res.slice((params.page - 1) * params.pageSize, params.page * params.pageSize),
      total: res.length,
    };
  });
}
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
            <div ref="elRef" class="w-60% h-80%"></div>
          </div>
        </div>
      </a-col>
    </a-row>
    <Amap />

    <a-row :gutter="[10, 10]" class="mt-6px">
      <a-col :span="16" :xxl="16" :xl="16" :lg="14" :md="12" :sm="24" :xs="24">
        <div
          class="h-full bg-#fff rounded-10px p-10px w-full flex items-center justify-center"
          ref="codepullRef"
        >
          <a-spin :spinning="spinning" size="large" />
        </div>
      </a-col>
      <a-col :span="8" :xxl="8" :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
        <div class="h-full bg-#fff rounded-10px pl-15px pt-5px pb-10px">
          <div
            class="h-38px b-b-2px border-b-#E6EAF3 b-b-solid font-size-14px fw-600 flex items-center justify-between mr-10px"
          >
            项目记录
            <Tab2button v-model:active-key="progressActivekey" @change="onProgressActiveChange">
              <a-tab-pane v-for="item in progresss" :key="item.key" :tab="item.label"></a-tab-pane>
            </Tab2button>
          </div>
          <a-spin :spinning="spinning" size="large">
            <div class="h-50vh overflow-auto pt-18px pr-10px">
              <a-timeline>
                <a-timeline-item
                  color="green"
                  v-for="commit in activeCommits"
                  :key="commit.sha"
                  :style="{
                    whiteSpace: 'pre-wrap',
                  }"
                >
                  {{ commit.commit.message }}
                </a-timeline-item>
              </a-timeline>
            </div>
          </a-spin>
        </div>
      </a-col>
    </a-row>
    <div class="w-full bg-#fff rounded-10px mt-10px border-3px border-solid border-#EAEDF5">
      <TableMaster :columns :fetch-api="fetchDataApi" ref="tableRef"> </TableMaster>
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
  background-color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s;
}
.card-overlay:hover {
  box-shadow: 5px 0 18px rgba(183, 183, 183, 0.2);
}
</style>
