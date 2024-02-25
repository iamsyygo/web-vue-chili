// import color from 'color';
import { ThemeConfig } from 'ant-design-vue/es/config-provider/context';
import { theme } from 'ant-design-vue';

const { compactAlgorithm } = theme;
// https://antdv.com/docs/vue/customize-theme-cn
export const APP_THEME_CONFIG: ThemeConfig = {
  token: {
    // fontFamily: 'Noto Color Emoji, sans-serif',
  },
  algorithm: compactAlgorithm,
  components: {
    Tabs: {},
    Form: {},
  },
};
