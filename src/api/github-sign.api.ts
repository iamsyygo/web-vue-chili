import axios from '@/utils/http';

export const onAnthGitHubUser = (code: string) => {
  return axios.post<
    any,
    {
      user: Record<string, any>;
      access_token: string;
      refresh_token: string;
    }
  >('/api/user/github-auth', { code });
};
