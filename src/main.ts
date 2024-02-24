import { createApp } from 'vue';
import '@unocss/reset/normalize.css';
import 'ant-design-vue/dist/reset.css';
import 'virtual:uno.css';
import 'animate.css';

import './style.css';
import App from './App.vue';
import router from '@/router';
import SymbolIcon from '@/components/SymbolIcon.vue';

const app = createApp(App);
app.use(router);
app.component('SymbolIcon', SymbolIcon);
app.mount('#app');
