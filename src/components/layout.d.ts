interface Header {
  height: number;
  backgroundColor: string;
}

interface Sider {
  width: number;
  collapsedWidth: number;
  backgroundColor: string;
}

export type LayoutType = {
  sider: Sider;
  header: Header;
};

export type AppMenuItemMeta = {
  name: string;
  icon: string;
  path: string;
  children?: AppMenuItemMeta[];
};
