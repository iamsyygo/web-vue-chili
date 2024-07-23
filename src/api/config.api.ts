import axios from '@/utils/http';
import { IPageCommonParams, IResponseData } from './type';

interface IConfigParams extends IPageCommonParams {
  name?: string;
}
export const fetchConfigData = (params: IConfigParams) => {
  return axios.get<IConfigParams, IResponseData<any>>('/api/config/list', { params });
};

export const deleteConfigById = (params: any) => {
  return axios.delete('/api/config/' + params.id);
};

// 更新
export const updateConfig = (params: any) => {
  return axios.patch('/api/config/' + params.id, params);
};

// 新增
export const addConfig = (params: any) => {
  return axios.post('/api/config', params);
};
