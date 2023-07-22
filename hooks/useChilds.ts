import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useChilds = () => {
  const { data, error, isLoading,mutate } = useSwr('/api/childs', fetcher);
  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useChilds;