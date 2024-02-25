<template>
  <a-timeline mode="alternate">
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item color="green">Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
      laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
      beatae vitae dicta sunt explicabo.
    </a-timeline-item>
    <a-timeline-item color="red">Network problems being solved 2015-09-01</a-timeline-item>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>
      <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
      Technical testing 2015-09-01
    </a-timeline-item>
  </a-timeline>
</template>
<script lang="ts" setup>
import { ClockCircleOutlined } from '@ant-design/icons-vue';
</script>

<style lang="scss" scoped>
:deep(#components-grid-demo-flex) [class~='ant-row'] {
  background: rgba(128, 128, 128, 0.08);
}
</style>

<route lang="json">
{ "meta": { "keepAlive": false, "icon": "knowledge_one", "title": "知识一" } }
</route>
