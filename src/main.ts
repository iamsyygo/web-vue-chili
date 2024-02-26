import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@unocss/reset/normalize.css';
import 'ant-design-vue/dist/reset.css';
import 'virtual:uno.css';
import 'animate.css';

import './style.css';
import App from './App.vue';
import router from '@/router';
import SymbolIcon from '@/components/SymbolIcon.vue';

const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);
app.component('SymbolIcon', SymbolIcon);
app.mount('#app');
