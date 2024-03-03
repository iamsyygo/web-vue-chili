import { message as antMessage } from 'ant-design-vue';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig as AxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { ERequestErrorStatusCode, IAxiosResponseResult } from './type.d';

const isDev = import.meta.env.DEV;

const instance: AxiosInstance = axios.create({
  baseURL: isDev ? '' : 'https://web-nest-goggles.vercel.app',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // what to do before the request is sent
    Object.assign(config.headers, {
      Authorization: localStorage.getItem('Authorization'),
    });
    return config;
  },
  (error: any) => {
    // what to do about request errors
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // what to do with the response data
    const { bizdata } = response.data as IAxiosResponseResult<any>;
    return bizdata;
  },
  (error: AxiosError) => {
    // what to do with response errors
    const { response } = error;
    const { status } = response || {};
    const msg = ERequestErrorStatusCode[status || 400];
    antMessage.error(msg);

    if (status === 401) {
      localStorage.clear();
    }

    return Promise.reject(error.response?.data);
  }
);

export default instance;
