import { createApp } from 'vue';
import '@unocss/reset/normalize.css';
import 'ant-design-vue/dist/reset.css';
// https://prazdevs.github.io/pinia-plugin-persistedstate/guide/why.html
import persistedstate from 'pinia-plugin-persistedstate';
import 'virtual:uno.css';
import 'animate.css';

import './scss/style.scss';
import App from './App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import SymbolIcon from '@/components/SymbolIcon.vue';

const pinia = createPinia();
pinia.use(persistedstate);

const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('SymbolIcon', SymbolIcon);
app.mount('#app');
