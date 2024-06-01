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
