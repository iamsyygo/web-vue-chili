// 获取 authorization token
export const getAuthorization = (key?: 'ACCESS_TOKEN' | 'REFRESH_TOKEN') => {
  if (!key) {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');
    return { accessToken, refreshToken };
  }
  return localStorage.getItem(key);
};
