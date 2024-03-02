import axios from '@/utils/http';

export const onSignInGitHub = (redirect_uri: string) => {
  return axios.get(`/api/user/sign-in/github?redirect_uri=${redirect_uri}`);
};
