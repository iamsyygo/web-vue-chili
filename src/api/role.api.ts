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

export const fetchRoleData = (params: IRoleParams) => {
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

// 获取所有
export const fetchRoleAll = () => {
  return axios.get<any, RoleData[]>('/api/role');
};

// 根据实体保存
export const saveRole = (body: Partial<RoleData>) => {
  return axios.post('/api/role/save', body);
};
