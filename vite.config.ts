import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { fileURLToPath, URL } from 'node:url';
import VueJsx from '@vitejs/plugin-vue-jsx';
// https://github.com/posva/unplugin-vue-router
import VueRouter from 'unplugin-vue-router/vite';
import { VueRouterAutoImports } from 'unplugin-vue-router';
import Inspect from 'vite-plugin-inspect';
import VueDevTools from 'vite-plugin-vue-devtools';
// https://github.com/mmf-fe/vite-plugin-cdn-import/blob/HEAD/README.zh-CN.md
import { Plugin as ImportCdn } from 'vite-plugin-cdn-import';

// https://vitejs.dev/config/
export default defineConfig({
  // 插入cdn
  plugins: [
    VueJsx(),
    VueRouter({
      routesFolder: ['src/views'],
      // Exclude directories prefixed with “_”
      exclude: ['src/views/**/_*[\\w-]*', 'src/views/**/src'],
      // extensions: ['.vue'],
      // importMode: 'async',
    }),
    Unocss(),
    Vue({
      script: {
        propsDestructure: true,
      },
    }),
    AutoImport({
      resolvers: [AntDesignVueResolver({})],
      imports: [VueRouterAutoImports],
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
    Inspect(),
    ImportCdn({
      modules: [
        // {
        //   name: 'loading-attribute-polyfill',
        //   path: 'https://cdn.bootcdn.net/ajax/libs/loading-attribute-polyfill/2.0.0-beta.1/loading-attribute-polyfill.js',
        //   var: 'loadingAttributePolyfill',
        // },
      ],
    }),
    // VueDevTools(),
  ],
  resolve: {
    alias: {
      '@/': fileURLToPath(new URL('./src', import.meta.url)) + '/',
    },
  },
  server: {
    // 预热文件以提前转换和缓存结果。这改善了服务器启动期间的初始页面加载，并防止了转换瀑布。
    warmup: {
      clientFiles: ['./src/components/*.vue'],
    },
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
