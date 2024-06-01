import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { waitRoutes, default as router } from '@/router';
import { cloneDeep } from 'lodash-es';

interface AppMenuState {
  mpaths: string[];
  menus: RouteRecordRaw[];
}

export const useAppMenu2RouteStore = defineStore('APP_MENU', {
  state(): AppMenuState {
    return {
      mpaths: ['/main'],
      menus: [],
    };
  },
  actions: {
    initializeRoutes(/* mpath: string, waitRoutes: RouteRecordRaw[] */ to: string = '/main') {
      const filter = (waitRoutes: RouteRecordRaw[], prefix: string) => {
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
          if (!this.mpaths.includes(path)) return acc;

          if (route.children) {
            route.children = filter(route.children, path);
          }
          acc.push(route);
          return acc;
        }, [] as RouteRecordRaw[]);
      };
      const routes = filter(cloneDeep(waitRoutes), '/');
      routes.forEach((route) => {
        router.addRoute(route);
      });
      router.isReady().then(() => {
        router.push(to);
      });
    },
  },

  persist: {
    // CONFIG OPTIONS HERE
    beforeRestore(context) {},
    paths: ['mpaths', 'menus'],
  },
});
