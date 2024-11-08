import dynamic from 'next/dynamic';

export const DashboardLayout = dynamic(() => import('./DashboardLayout'), { ssr: false });
export const AuthLayout = dynamic(() => import('./AuthLayout'), { ssr: false });
