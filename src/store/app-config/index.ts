import { defineStore } from 'pinia';
import { theme } from 'ant-design-vue';
import type { IAppConfigState } from './type';
import { getAuthorization } from '@/utils';
const { compactAlgorithm, darkAlgorithm, defaultAlgorithm, defaultSeed } = theme;

const token = defaultAlgorithm(defaultSeed);

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppConfigStore = defineStore('APP_CONFIG', {
  state(): IAppConfigState {
    // fix data persistence issue: function serialization problems arise
    const algorithm = [compactAlgorithm];
    try {
      const APP_CONFIG_JSON = localStorage.getItem('APP_CONFIG');
      const local = APP_CONFIG_JSON ? JSON.parse(APP_CONFIG_JSON) : {};

      if (local.themeScheme === 'dark') {
        algorithm.push(darkAlgorithm);
      }
      document.body.setAttribute('data-app-theme', local.themeScheme);
    } catch (e) {
      console.error(e, '🍍 APP_CONFIG');
    }

    return {
      theme: {
        token: {
          colorPrimary: '#00b96b',
        },
        algorithm,
        components: {
          Button: {},
          Table: {},
          Form: {
            sizeStep: 20,
            sizeSM: 24,
          },
        },
      },
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
      authorization: getAuthorization() as IAppConfigState['authorization'],
    };
  },

  actions: {
    setThemeScheme(scheme: IAppConfigState['themeScheme']) {
      this.themeScheme = scheme;
      document.body.setAttribute('data-app-theme', scheme);
      if (scheme === 'dark' && Array.isArray(this.theme.algorithm)) {
        this.theme.algorithm.push(darkAlgorithm);
      }
      if (scheme === 'light' && Array.isArray(this.theme.algorithm)) {
        // const algorithm = this.theme.algorithm.filter((a) => a !== darkAlgorithm);
        // Object.assign(this.theme, { algorithm });
        this.theme.algorithm.pop();
      }
    },
    setThemePrimaryColor(color?: string) {
      color ??= this.theme.token?.colorPrimary;

      document.body.setAttribute('style', `--app-symbol-primary: ${color}`);
      if (this.theme.token) {
        this.theme.token.colorPrimary = color;
      }
    },
    setAuthorization(authorization: IAppConfigState['authorization']) {
      this.authorization = authorization;
    },
    clearAuthorization() {
      localStorage.removeItem('ACCESS_TOKEN');
      localStorage.removeItem('REFRESH_TOKEN');
      this.authorization = null;
    },
  },

  persist: {
    // CONFIG OPTIONS HERE
    beforeRestore(context) {},
    paths: ['theme.token', 'themeScheme', 'layout', 'authorization'],
  },
});
