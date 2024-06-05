import axios from '@/utils/http';
import { IPageCommonParams, IResponseData } from './type';

interface IUserParams extends IPageCommonParams {
  name?: string;
}
interface UserData {
  id: number;
  createDate: string;
  updateDate: string;
  deleteDate: null;
  gender: number;
  username: null;
  password: string;
  email: string;
  phoneNumber: null;
  platform: number;
  platformId: null;
  bio: null;
  avatar: null;
  socialLinks: null;
  lastLoginIp: string;
  lastLoginDate: string;
}

export const fetchUserData = (params: IUserParams) => {
  return axios.get<IUserParams, IResponseData<UserData>>('/api/user/list', { params });
};
export const deleteUserById = (params: UserData) => {
  return axios.delete('/api/user/' + params.id);
};

// 更新
export const updateUser = (params: UserData) => {
  return axios.patch('/api/user/' + params.id, params);
};

// 新增
export const addUser = (params: UserData) => {
  return axios.post('/api/user', params);
};

// 根据实体保存
export const saveUser = (body: Partial<UserData>) => {
  return axios.post('/api/user/save', body);
};
