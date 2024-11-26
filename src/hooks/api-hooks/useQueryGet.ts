import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiClient, urls } from '@/api';
import { snackbarToast } from '@/components/Snackbar';

export const useQueryGet = <TData, TParams>(
    url: keyof typeof urls,
    params?: TParams,
    options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>,
) => {
    return useQuery<TData>({
        queryKey: [url, JSON.stringify(params)],
        queryFn: async () => {
            try {
                const response = await apiClient.get(urls[url], { params });
                return response.data;
            } catch (error: any) {
                if (error?.message === 'Network Error') {
                    snackbarToast.error('Ooops! No internet connection.');
                } else {
                    snackbarToast.error(error?.message);
                }
            }
        },
        ...options,
    });
};
