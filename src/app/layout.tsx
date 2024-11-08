import type { Metadata } from 'next';
import { SnackbarContainer } from '@/components/Snackbar';
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
                <SnackbarContainer />
                {children}
            </body>
        </html>
    );
}
