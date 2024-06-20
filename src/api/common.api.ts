import axios from '@/utils/http';
export const getAllDict = () => {
  return axios.get('/api/dict/get-all-dict-v2');
};
