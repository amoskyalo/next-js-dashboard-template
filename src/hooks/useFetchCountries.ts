import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL,
});

export const useFetchCountries = (countryName?: string | null) => {
    const controller = countryName ? `/name/${countryName}` : '/all';

    return useQuery({
        queryKey: ['countries', countryName],
        queryFn: async () => (await axiosInstance.get(controller, { params: { fullText: false } })).data,
    });
};
