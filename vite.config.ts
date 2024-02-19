import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath, URL } from 'node:url';

// https://github.com/posva/unplugin-vue-router
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routesFolder: 'src/views',
      // Exclude directories prefixed with “_”
      exclude: ['src/views/**/_*[\\w-]*'],
      extensions: ['.vue'],
      importMode: 'async',
    }),
    Unocss(),
    Vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: [VueRouterAutoImports],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('./src', import.meta.url)) + '/',
    },
  },
});
