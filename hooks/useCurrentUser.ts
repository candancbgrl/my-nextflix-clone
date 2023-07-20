// fetcher yardımıyla user bilgisini çekeceğiz.
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

const useCurrentUser = () => {
    console.log("useCurrent")
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);
    return { data, error, isLoading, mutate }
};

export default useCurrentUser;
