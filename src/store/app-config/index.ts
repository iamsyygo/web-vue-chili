import { defineStore } from 'pinia';
import { theme } from 'ant-design-vue';
import type { IAppConfigState } from './type';
const { compactAlgorithm, darkAlgorithm, defaultAlgorithm, defaultSeed } = theme;

// const { token } = useToken();
const token = defaultAlgorithm(defaultSeed);

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppConfigStore = defineStore('APP_CONFIG', {
  state() {
    return {
      theme: { algorithm: [compactAlgorithm] },
      themeScheme: 'light',
      layout: {
        sider: {
          width: 200,
          collapsedWidth: 60,
          backgroundColor: token.colorBgContainer,
        },
        header: {
          height: 50,
          backgroundColor: '#CADFFB',
        },
      },
    };
  },

  actions: {
    setThemeScheme(scheme: IAppConfigState['themeScheme']) {
      this.themeScheme = scheme;
      if (scheme === 'dark' && Array.isArray(this.theme.algorithm)) {
        this.theme.algorithm.push(darkAlgorithm);
        return;
      }
      if (scheme === 'light' && Array.isArray(this.theme.algorithm)) {
        this.theme.algorithm = this.theme.algorithm.filter((a) => a !== darkAlgorithm);
      }
    },
  },
});
