import useSwr from "swr";
import fetcher from "@/lib/fetcher";

const useChildsFavorites = (childId?: string) => {
  const { data, error, isLoading, mutate } = useSwr(
    childId ? `/api/childFav/${childId}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useChildsFavorites;
