// import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router/auto';
// 1. Define route components.
// These can be imported from other files
// const Home = { template: "<div>Home⚡</div>" };
// const About = { template: "<div>About🎉</div>" };

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
// Nested Routes 嵌套路由
/**
 * @example https://github.com/posva/unplugin-vue-router?tab=readme-ov-file#nested-routes
 * ```
 * src/pages/
 * ├── users/
 * │   └── index.vue
 * └── users.vue
 * ```
 * ---
 * ```ts
 *
 * const routes = [
 *   {
 *     path: '/users',
 *     component: () => import('src/pages/users.vue'),
 *     children: [
 *       { path: '', component: () => import('src/pages/users/index.vue') },
 *     ],
 *   },
 * ]
 * ```
 */
export const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: import('@/views/keep-alive1/index.vue'),
    meta: { title: '闪电高压', keepAlive: true },
  },
  {
    path: '/about',
    component: import('@/views/keep-alive2/index.vue'),
    meta: { title: '拉炮彩带', keepAlive: false },
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We
  // are using the hash history for simplicity here.
  history: createWebHistory(),
  // You don't need to pass the routes anymore,
  // the plugin writes it for you 🤖
  // routes,
});

// 5. Export create and mount the root instance.
export default router;

// Now the app has started!
