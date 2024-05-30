<template>
  <div class="w-full h-full">
    <div ref="containerRef" class="w-full h-full"></div>
    <TeleportShape />
  </div>
</template>

<script setup lang="ts">
import { Edge, Graph, Node } from '@antv/x6';
import { onMounted } from 'vue';
import { ref } from 'vue';

import { reactive } from 'vue';
import { useRegisterHandler } from './register';
const containerRef = ref<HTMLElement | null>(null);
const graph = ref<Graph | null>(null);
interface Metadata {
  node: Node[];
  edge: Edge[];
}
const metadata: Metadata = reactive({
  node: [],
  edge: [],
});

const { TeleportShape } = useRegisterHandler();
onMounted(init);

function init() {
  const el = containerRef.value!;
  const { height, width } = el.getBoundingClientRect();
  graph.value = new Graph({
    container: containerRef.value!,
    height,
    width,
    background: {
      color: '#F2F7FA',
    },
  });

  onAddNode();
}

function onAddNode() {
  graph.value?.addNode({
    shape: 'dropdown-vue-node',
    x: 100,
    y: 60,
  });
}
</script>

<style scoped></style>
<route lang="json">
{ "meta": { "keepAlive": false, "title": "思维导图", "icon": "versions" } }
</route>
