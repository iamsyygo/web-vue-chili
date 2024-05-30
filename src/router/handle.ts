import { RouteRecordRaw } from 'vue-router';

// 根据菜单注册路由
export function initializeRoutes(mpath: string, waitRoutes: RouteRecordRaw[]) {
  const filter = function (waitRoutes: RouteRecordRaw[], prefix: string) {
    return waitRoutes.reduce((acc, route) => {
      let path = route.path;

      // 如果不是以 / or '' 开头的,则加上前缀
      if (!path.startsWith('/') && path !== '') {
        path = prefix + '/' + path;
      }

      // index.vue 为默认路由,兼容 unplugin-vue-router
      if (path === '') {
        path = prefix;
      }
      // 不在菜单中的路由不注册
      if (!mpath.includes(path)) return acc;

      if (route.children) {
        route.children = filter(route.children, path);
      }
      acc.push(route);
      return acc;
    }, [] as RouteRecordRaw[]);
  };
  const routes = filter(waitRoutes, '/');
  return routes;
}
