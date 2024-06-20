import axios from '@/utils/http';
import { IPageCommonParams, IResponseData } from './type';
interface Categorie {
  id: number;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: number;
  parentId: null;
  sort: number;
  children: Categorie[];
}

// 获取字典分类
export const fetchCategories = () => {
  return axios.post<any, Categorie[]>('/api/dict/get-categories');
};

interface DictPagetion extends IPageCommonParams {
  label?: string;
  value?: string;
  categoryCode?: number;
  description?: string;
  status?: number;
}

export interface DictItem {
  id: number;
  label: string;
  value: string;
  categoryCode: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: number;
  sort: number;
}
export const fetchDictsByCategoryCode = (params: DictPagetion) => {
  return axios.get<DictPagetion, IResponseData<DictItem>>(`/api/dict/get-dict-list`, { params });
};
export const addDict = (data: DictItem) => {
  return axios.post<DictItem, DictItem>('/api/dict/create-dict', data);
};
export const updateDict = (data: DictItem) => {
  return axios.patch<DictItem, DictItem>('/api/dict/update-dict', data);
};
export const deleteDict = (id: number) => {
  return axios.delete<any, any>(`/api/dict/remove-dict/${id}`);
};
export const addCategory = (data: Categorie) => {
  return axios.post<Categorie, Categorie>('/api/dict/create-category', data);
};
export const updateCategory = (data: Categorie) => {
  return axios.patch<Categorie, Categorie>('/api/dict/update-category', data);
};
export const deleteCategory = (id: number) => {
  return axios.delete<any, any>(`/api/dict/remove-category/${id}`);
};
