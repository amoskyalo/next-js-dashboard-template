import { useMutation } from '@tanstack/react-query';
import { apiClient, urls } from '@/api';

interface MutationParams<TData, TParams> {
    data?: TData;
    params?: TParams;
}

export const useQueryPost = <TData, TParams>(url: keyof typeof urls) => {
    return useMutation({
        mutationFn: async ({ data, params }: MutationParams<TData, TParams>) => {
            const response = await apiClient.post(urls[url], data, { params });
            return response.data;
        },
    });
};
