import axios from '@/utils/http';
import { IPageCommonParams, IResponseData } from './type';

interface IRoleParams extends IPageCommonParams {
  name?: string;
}
export interface RoleData {
  id: number;
  createDate: string;
  updateDate: string;
  deleteDate: null;
  name: string;
  value: number;
  description: string;
}

export const fetchRoleList = (params: IRoleParams) => {
  return axios.get<IRoleParams, IResponseData<RoleData>>('/api/role/list', { params });
};
export const deleteRoleById = (params: RoleData) => {
  return axios.delete('/api/role/' + params.id);
};

// 更新
export const updateRole = (params: RoleData) => {
  return axios.patch('/api/role/' + params.id, params);
};

// 新增
export const addRole = (params: RoleData) => {
  return axios.post('/api/role', params);
};
