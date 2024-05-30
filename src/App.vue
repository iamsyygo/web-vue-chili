<template>
  <a-spin :spinning="spinning" :indicator="indicator" wrapper-class-name="app-loading--wrapper">
    <!-- <transition
      appear
      enter-active-class="animate__animated animate__zoomIn"
      leave-active-class="animate__animated animate__zoomOut"
      mode="out-in"
    > -->
    <router-view></router-view>
    <!-- </transition> -->
  </a-spin>
</template>

<script setup lang="ts">
import { provide, h, ref } from 'vue';
import Loading from '@/components/Loading.vue';
import { GLOBAL_SYMBOL_BY_INJECT } from '@/utils/global.symbol';
import { useAppMenu2RouteStore } from './store/app-menu';
const spinning = ref(false);
const indicator = h(Loading);
const updateSpin = () => (spinning.value = !spinning.value);
provide(GLOBAL_SYMBOL_BY_INJECT.SPINNING, { spinning, updateSpin });

const appMenuStore = useAppMenu2RouteStore();

const path = location.pathname;
appMenuStore.initializeRoutes(path);
</script>
