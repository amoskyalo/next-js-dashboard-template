'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/api';

const QueryClientProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryClientProviderWrapper;
