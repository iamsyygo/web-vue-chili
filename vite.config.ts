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
import { createHtmlPlugin } from 'vite-plugin-html';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import { resolve } from 'node:path';
import packageData from './package.json';

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
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    createHtmlPlugin({
      template: resolve(__dirname, 'index.html'),
      minify: true,
      inject: {
        data: {
          title: packageData.name,
          version: packageData.version,
          logo: '/logo.png',
          loadingHtml:
            '<svg class="init-loading"><g><path d="M 50,100 A 1,1 0 0 1 50,0"/></g><g><path d="M 50,75 A 1,1 0 0 0 50,-25"/></g><defs><linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FF56A1;stop-opacity:1" /><stop offset="100%" style="stop-color:#FF9350;stop-opacity:1" /></linearGradient></defs></svg>',
          loadingStyle: `<style> .init-loading { overflow: visible; width: 100px; height: 150px; g { animation: slide 2s linear infinite; &:nth-child(2) { animation-delay: 2s / 4; path { animation-delay: 2s / 4; stroke-dasharray: 0px 157px + 1; stroke-dashoffset: 1px; } } } path { stroke: url(#gradient); stroke-width: 20px; stroke-linecap: round; fill: none; stroke-dasharray: 0 157px; stroke-dashoffset: 0; animation: escalade 2s cubic-bezier(0.8, 0, 0.2, 1) infinite; } } @keyframes slide { 0% { transform: translateY(-50px); } 100% { transform: translateY(50px); } } @keyframes escalade { 0% { stroke-dasharray: 0 157px; stroke-dashoffset: 0; } 50% { stroke-dasharray: 157px 157px; stroke-dashoffset: 0; } 100% { stroke-dasharray: 157px 157px; stroke-dashoffset: -(157px - 1); } } </style>`,
        },
        tags: [
          { tag: 'script', attrs: { src: '/iconfont.js' } },
          { tag: 'script', attrs: { src: '/iconfont-remote.js' } },
          { tag: 'script', attrs: { src: '/iconfont-main.js' } },
        ],
      },
    }),
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
