import axios from '@/utils/http';
export const fetchDatabaseData = () => {
  return axios.get('/api/database');
};
