import axios from '@/utils/http';

export const onSendEmailCodeApi = (email: string) => {
  return axios.get('/api/email/qq-code', { params: { email } });
};

export const onLoginApi = (body: { email: string; password: string; code: string }) => {
  return axios.post('/api/auth/signin/email', body);
};
