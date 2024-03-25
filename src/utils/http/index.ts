import { message as antMessage } from 'ant-design-vue';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig as AxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { ERequestErrorStatusCode, AxiosResponseResult } from './type.d';

const isDev = import.meta.env.DEV;

const ApiClient: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 10000,
});

// request interceptor
ApiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const Authorization = localStorage.getItem('Authorization');
    Object.assign(config.headers, { Authorization });
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}
const queue: PendingTask[] = [];
let valve = false;

// response interceptor
ApiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const { response, config } = error;
    const { status } = response || {};

    if (valve) {
      return new Promise((resolve) => {
        // 让失败需要重试的请求等待 resolve
        queue.push({ config: config!, resolve });
      });
    }

    if (status === 401 && config?.url !== '/auth/refreshToken') {
      valve = true;
      const res = await refreshToken();
      valve = false;

      // 重新认证回来后，继续执行队列中的请求
      // 重新认证回来后，缓存密钥
      ApiClient(config);
      queue.forEach((task) => {
        task.resolve(ApiClient(task.config));
      });
    }
    const msg = ERequestErrorStatusCode[status || 400];
    antMessage.error(msg);

    return Promise.reject(error.response?.data);
  }
);

export default ApiClient;
