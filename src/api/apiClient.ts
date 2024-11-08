import axios from 'axios';
import { QueryClient } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const userToken = getCookie('userToken');

export const apiClient = axios.create({
    baseURL,
    headers: {
        Authorization: `Bearer ${userToken}`,
    },
});

apiClient.interceptors.request.use((config) => {
    // TODO: configure request interceptor
    return config;
});

apiClient.interceptors.response.use((response) => {
    // TODO: configure response interceptor
    return response;
});

export const queryClient = new QueryClient();
