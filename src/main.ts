import { createApp } from 'vue';
import '@unocss/reset/normalize.css';
import 'virtual:uno.css';
import 'animate.css';

import './style.css';
import App from './App.vue';
import router from '@/router';

const app = createApp(App);
app.use(router);
app.mount('#app');
