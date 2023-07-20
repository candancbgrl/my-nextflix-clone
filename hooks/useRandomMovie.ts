import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useRandomMovie = () => {
  const { data, error, isLoading } = useSwr('/api/random', fetcher, {
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

export default useRandomMovie;