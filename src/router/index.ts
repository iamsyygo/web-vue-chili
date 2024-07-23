import { Route } from '@/enums/routes.e';
import { useAppConfigStore } from '@/store/app-config';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// @ts-expect-error
import { routes } from 'vue-router/auto-routes';

// 🐞 Depending on the order of imports this will fail
const uninitpaths: string[] = [Route.MAIN, Route.NOT_FOUND];
const initRoutes: RouteRecordRaw[] = [];
// 等待被处理的路由
export const waitRoutes: RouteRecordRaw[] = [];
routes.forEach((route: RouteRecordRaw) => {
  if (uninitpaths.includes(route.path)) {
    waitRoutes.push(route);
  } else {
    initRoutes.push(route);
  }
});
const router = createRouter({
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event
  history: createWebHistory(),
  // history: createWebHashHistory(),
  // extendRoutes(routes) {
  //   return routes;
  // },
  routes: initRoutes,
});

router.beforeEach((to, from, next) => {
  // console.log(to, from, '✅');
  // ✅ This will work because the router starts its navigation after
  // the router is installed and pinia will be installed too
  const { authorization, clearAuthorization } = useAppConfigStore();

  if (!authorization?.accessToken && to.path !== Route.LOGIN) {
    clearAuthorization();
    next({ path: Route.LOGIN });
  }
  next();
});

export default router;
