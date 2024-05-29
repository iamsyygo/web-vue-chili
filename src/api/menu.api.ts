import axios from '@/utils/http';

export const getSysMenus = () => {
  return axios.post('/api/menu/menu-tree');
};
