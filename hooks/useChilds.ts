import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useChilds = () => {
  const { data, error, isLoading } = useSwr('/api/childs', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useChilds;