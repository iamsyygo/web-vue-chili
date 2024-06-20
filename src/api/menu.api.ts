import axios from '@/utils/http';
import { RoleData } from './role.api';

export interface MenuData {
  id: number;
  status: number;
  name: string;
  path: string;
  level: number;
  description: string;
  sort: number;
  icon: string;
  roles: any[];
  meta: any;
  parentId: number;
  children: MenuData[];
}

/**
 * 获取系统菜单
 * @returns
 */
// export const getSysMenus = () => {
//   return axios.post<any, { menus: MenuData[]; paths: string[] }>('/api/menu/menu-tree');
// };
export const getSysMenus = () => {
  return axios.post<any, { menus: MenuData[]; paths: Record<MenuData['path'], MenuData> }>('/api/menu/find-menu-tree');
};

/**
 * 根据id获取菜单
 * @param id
 * @returns
 */
export const getMenuById = (id: number) => {
  return axios.get<
    any,
    MenuData & {
      parent: MenuData | null;
      roles: RoleData[];
    }
  >(`/api/menu/${id}`);
};

/**
 * 新增菜单
 * @param data
 * @returns
 */
export const addMenu = (data: Partial<MenuData>) => {
  return axios.post('/api/menu/create', data);
};

// delete menu
export const deleteMenu = (id: number) => {
  return axios.delete(`/api/menu/${id}`);
};
