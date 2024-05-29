// vite.config.ts
import { defineConfig } from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/vite@5.2.6_@types+node@20.11.30_sass@1.72.0/node_modules/vite/dist/node/index.js";
import Vue from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/@vitejs+plugin-vue@5.0.4_vite@5.2.6_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Unocss from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/unocss@0.58.6_postcss@8.4.38_rollup@2.79.1_vite@5.2.6/node_modules/unocss/dist/vite.mjs";
import AutoImport from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/unplugin-auto-import@0.17.5_@vueuse+core@10.9.0_rollup@2.79.1/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/unplugin-vue-components@0.26.0_rollup@2.79.1_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { AntDesignVueResolver } from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/unplugin-vue-components@0.26.0_rollup@2.79.1_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import { fileURLToPath, URL } from "node:url";
import VueRouter from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/unplugin-vue-router@0.8.5_rollup@2.79.1_vue-router@4.3.0_vue@3.4.21/node_modules/unplugin-vue-router/dist/vite.mjs";
import { VueRouterAutoImports } from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/unplugin-vue-router@0.8.5_rollup@2.79.1_vue-router@4.3.0_vue@3.4.21/node_modules/unplugin-vue-router/dist/index.mjs";
import Inspect from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/vite-plugin-inspect@0.8.3_rollup@2.79.1_vite@5.2.6/node_modules/vite-plugin-inspect/dist/index.mjs";
import { Plugin as ImportCdn } from "file:///Volumes/aoe/web-design/meta/web-vue-chili/node_modules/.pnpm/vite-plugin-cdn-import@0.3.5_rollup@2.79.1/node_modules/vite-plugin-cdn-import/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///Volumes/aoe/web-design/meta/web-vue-chili/vite.config.ts";
var vite_config_default = defineConfig({
  // 插入cdn
  plugins: [
    VueRouter({
      routesFolder: ["src/views"],
      // Exclude directories prefixed with “_”
      exclude: ["src/views/**/_*[\\w-]*", "src/views/**/src"]
      // extensions: ['.vue'],
      // importMode: 'async',
    }),
    Unocss(),
    Vue(),
    AutoImport({
      resolvers: [AntDesignVueResolver({})],
      imports: [VueRouterAutoImports]
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false
        })
      ]
    }),
    Inspect(),
    ImportCdn({
      modules: [
        // {
        //   name: 'loading-attribute-polyfill',
        //   path: 'https://cdn.bootcdn.net/ajax/libs/loading-attribute-polyfill/2.0.0-beta.1/loading-attribute-polyfill.js',
        //   var: 'loadingAttributePolyfill',
        // },
      ]
    })
  ],
  resolve: {
    alias: {
      "@/": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)) + "/"
    }
  },
  server: {
    port: 3e3,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVm9sdW1lcy9hb2Uvd2ViLWRlc2lnbi9tZXRhL3dlYi12dWUtY2hpbGlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Wb2x1bWVzL2FvZS93ZWItZGVzaWduL21ldGEvd2ViLXZ1ZS1jaGlsaS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVm9sdW1lcy9hb2Uvd2ViLWRlc2lnbi9tZXRhL3dlYi12dWUtY2hpbGkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBWdWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBVbm9jc3MgZnJvbSAndW5vY3NzL3ZpdGUnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IEFudERlc2lnblZ1ZVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bvc3ZhL3VucGx1Z2luLXZ1ZS1yb3V0ZXJcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJztcbmltcG9ydCB7IFZ1ZVJvdXRlckF1dG9JbXBvcnRzIH0gZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlcic7XG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0JztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL21tZi1mZS92aXRlLXBsdWdpbi1jZG4taW1wb3J0L2Jsb2IvSEVBRC9SRUFETUUuemgtQ04ubWRcbmltcG9ydCB7IFBsdWdpbiBhcyBJbXBvcnRDZG4gfSBmcm9tICd2aXRlLXBsdWdpbi1jZG4taW1wb3J0JztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC8vIFx1NjNEMlx1NTE2NWNkblxuICBwbHVnaW5zOiBbXG4gICAgVnVlUm91dGVyKHtcbiAgICAgIHJvdXRlc0ZvbGRlcjogWydzcmMvdmlld3MnXSxcbiAgICAgIC8vIEV4Y2x1ZGUgZGlyZWN0b3JpZXMgcHJlZml4ZWQgd2l0aCBcdTIwMUNfXHUyMDFEXG4gICAgICBleGNsdWRlOiBbJ3NyYy92aWV3cy8qKi9fKltcXFxcdy1dKicsICdzcmMvdmlld3MvKiovc3JjJ10sXG4gICAgICAvLyBleHRlbnNpb25zOiBbJy52dWUnXSxcbiAgICAgIC8vIGltcG9ydE1vZGU6ICdhc3luYycsXG4gICAgfSksXG4gICAgVW5vY3NzKCksXG4gICAgVnVlKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICByZXNvbHZlcnM6IFtBbnREZXNpZ25WdWVSZXNvbHZlcih7fSldLFxuICAgICAgaW1wb3J0czogW1Z1ZVJvdXRlckF1dG9JbXBvcnRzXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW1xuICAgICAgICBBbnREZXNpZ25WdWVSZXNvbHZlcih7XG4gICAgICAgICAgaW1wb3J0U3R5bGU6IGZhbHNlLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSksXG4gICAgSW5zcGVjdCgpLFxuICAgIEltcG9ydENkbih7XG4gICAgICBtb2R1bGVzOiBbXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICBuYW1lOiAnbG9hZGluZy1hdHRyaWJ1dGUtcG9seWZpbGwnLFxuICAgICAgICAvLyAgIHBhdGg6ICdodHRwczovL2Nkbi5ib290Y2RuLm5ldC9hamF4L2xpYnMvbG9hZGluZy1hdHRyaWJ1dGUtcG9seWZpbGwvMi4wLjAtYmV0YS4xL2xvYWRpbmctYXR0cmlidXRlLXBvbHlmaWxsLmpzJyxcbiAgICAgICAgLy8gICB2YXI6ICdsb2FkaW5nQXR0cmlidXRlUG9seWZpbGwnLFxuICAgICAgICAvLyB9LFxuICAgICAgXSxcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQC8nOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSkgKyAnLycsXG4gICAgfSxcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgLy8gcmV3cml0ZTogKHBhdGgpID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVCxTQUFTLG9CQUFvQjtBQUM3VSxPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMsZUFBZSxXQUFXO0FBR25DLE9BQU8sZUFBZTtBQUN0QixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLGFBQWE7QUFHcEIsU0FBUyxVQUFVLGlCQUFpQjtBQWR3SixJQUFNLDJDQUEyQztBQWlCN08sSUFBTyxzQkFBUSxhQUFhO0FBQUE7QUFBQSxFQUUxQixTQUFTO0FBQUEsSUFDUCxVQUFVO0FBQUEsTUFDUixjQUFjLENBQUMsV0FBVztBQUFBO0FBQUEsTUFFMUIsU0FBUyxDQUFDLDBCQUEwQixrQkFBa0I7QUFBQTtBQUFBO0FBQUEsSUFHeEQsQ0FBQztBQUFBLElBQ0QsT0FBTztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztBQUFBLE1BQ3BDLFNBQVMsQ0FBQyxvQkFBb0I7QUFBQSxJQUNoQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUEsUUFDVCxxQkFBcUI7QUFBQSxVQUNuQixhQUFhO0FBQUEsUUFDZixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLElBQ0QsUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLE1BQ1IsU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU1UO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUMsSUFBSTtBQUFBLElBQzNEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBO0FBQUEsTUFFaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
