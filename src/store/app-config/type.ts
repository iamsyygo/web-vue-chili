import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context';

interface Header {
  height: number;
  backgroundColor: string;
}

interface Sider {
  width: number;
  collapsedWidth: number;
  backgroundColor: string;
}

type Layout = {
  sider: Sider;
  header: Header;
};

export interface IAppConfigState {
  theme: ThemeConfig;
  themeScheme: 'light' | 'dark';
  layout: Layout;
  authorization: {
    accessToken: string;
    refreshToken: string;
    user: Record<string, any>;
  } | null;
}
