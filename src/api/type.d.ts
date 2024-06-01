export interface IPageCommonParams {
  page?: number;
  pageSize?: number;
}

interface IResponseData<T> {
  list: T[];
  total: number;
  meta: Meta;
}

interface Meta {
  page: number;
  pageSize: number;
  pages: number;
}
