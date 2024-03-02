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

  // 😕fix /path?xxx=000 it was redirected to /path unable to get xxx
  // parseQuery(search) {
  //   const params = new URLSearchParams(search);
  //   return Array.from(params).reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  // },
});

router.beforeEach((to, from) => {
  // 而不是去检查每条路由记录
  // to.matched.some(record => record.meta.requiresAuth)
  // if (to.meta.requiresAuth && !auth.isLoggedIn()) {
  //   // 此路由需要授权，请检查是否已登录
  //   // 如果没有，则重定向到登录页面
  //   return {
  //     path: '/login',
  //     // 保存我们所在的位置，以便以后再来
  //     query: { redirect: to.fullPath },
  //   }
  // }
});

// 5. Export create and mount the root instance.
export default router;

// Now the app has started!
