import useSwr from 'swr'
import fetcher from '@/lib/fetcher';

const useSerieMovies = (serie:string) => {
  const { data, error, isLoading } = useSwr(serie ? `/api/series/${serie}` : null, fetcher, {
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

export default useSerieMovies;