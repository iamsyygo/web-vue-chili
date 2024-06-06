// https://api.github.com/repos/iamsyygo/web-nest-goggles/commits
import axios from '@/utils/http';

interface ICommitsParams {
  owner: 'iamsyygo';
  repo: 'web-nest-goggles' | 'web-vue-chili';
}

/**
 * 获取 github 仓库的提交记录
 * @param {iamsyygo} owner 仓库拥有者
 * @param {web-nest-goggles} repo 仓库名称
 */
export const fetchGithubCommits = (params: ICommitsParams) => {
  return axios.get(`/api/github/commits`, { params });
};
