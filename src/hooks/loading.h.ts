import { reactive } from 'vue';
type Loading = {
  loading: boolean;
  text?: string;
};
export const useLoading = (text?: string) => {
  const flag: Loading = reactive({
    loading: false,
    text,
  });
  const setLoading = (txt?: string, l?: boolean) => {
    flag.loading = l ?? !flag.loading;
    if (!flag.loading && !txt) {
      flag.text = text;
    } else {
      flag.text = txt;
    }
  };
  return {
    flag,
    setLoading,
  };
};
