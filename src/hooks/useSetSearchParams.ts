'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import utils from '@/utils';

export const useSetSearchParams = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isDefaultPagination } = utils;

    const setParams = (params: Record<string, string | null | undefined | number>) => {
        const p = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (value && !isDefaultPagination(key, value)) {
                p.set(key, String(value));
            } else {
                p.delete(key);
            }
        });

        router.push(`?${p.toString()}`);
    };

    const getParam = (key: string) => useSearchParams().get(key);

    return { setParams, getParam };
};
