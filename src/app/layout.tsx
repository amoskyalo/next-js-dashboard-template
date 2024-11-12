import type { Metadata } from 'next';
import { SnackbarContainer } from '@/components/Snackbar';
import { QueryClientProviderWrapper, CountriesProvider } from '@/context';
import './globals.css';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;

export const metadata: Metadata = {
    title: APP_NAME,
    description: APP_NAME,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <QueryClientProviderWrapper>
                    <CountriesProvider>
                        <SnackbarContainer />
                        {children}
                    </CountriesProvider>
                </QueryClientProviderWrapper>
            </body>
        </html>
    );
}
