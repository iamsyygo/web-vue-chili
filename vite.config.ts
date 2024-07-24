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
    //     createHtmlPlugin({
    //       template: resolve(__dirname, 'index.html'),
    //       minify: true,
    //       inject: {
    //         data: {
    //           title: packageData.name,
    //           version: packageData.version,
    //           logo: '/logo.png',
    //           loadingHtml: `<svg class="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg"> <defs> <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0"> <stop offset="0%" stop-color="#5ebd3e" /> <stop offset="33%" stop-color="#ffb900" /> <stop offset="67%" stop-color="#f78200" /> <stop offset="100%" stop-color="#e23838" /> </linearGradient> <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0"> <stop offset="0%" stop-color="#e23838" /> <stop offset="33%" stop-color="#973999" /> <stop offset="67%" stop-color="#009cdf" /> <stop offset="100%" stop-color="#5ebd3e" /> </linearGradient> </defs> <g fill="none" stroke-linecap="round" stroke-width="16"> <g class="ip__track" stroke="#ddd"> <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" /> <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" /> </g> <g stroke-dasharray="180 656"> <path class="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" /> <path class="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" /> </g> </g> </svg>`,
    //           loadingStyle: `<style>
    // .ip {
    // 	width: 16em;
    // 	height: 8em;
    //   position: fixed;
    //   inset: 0;
    //   margin: auto;
    // }
    // .ip__track {
    // 	stroke: hsl(var(--hue),90%,90%);
    // 	transition: stroke var(--trans-dur);
    // }
    // .ip__worm1,
    // .ip__worm2 {
    // 	animation: worm1 2s linear infinite;
    // }
    // .ip__worm2 {
    // 	animation-name: worm2;
    // }
    // @keyframes worm1 {
    // 	from {
    // 		stroke-dashoffset: 0;
    // 	}
    // 	50% {
    // 		animation-timing-function: steps(1);
    // 		stroke-dashoffset: -358;
    // 	}
    // 	50.01% {
    // 		animation-timing-function: linear;
    // 		stroke-dashoffset: 358;
    // 	}
    // 	to {
    // 		stroke-dashoffset: 0;
    // 	}
    // }
    // @keyframes worm2 {
    // 	from {
    // 		stroke-dashoffset: 358;
    // 	}
    // 	50% {
    // 		stroke-dashoffset: 0;
    // 	}
    // 	to {
    // 		stroke-dashoffset: -358;
    // 	}
    // }
    //   </style>`,
    //         },
    //         tags: [
    //           { tag: 'script', attrs: { src: '/iconfont.js' } },
    //           { tag: 'script', attrs: { src: '/iconfont-remote.js' } },
    //           { tag: 'script', attrs: { src: '/iconfont-main.js' } },
    //         ],
    //       },
    //     }),
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
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
