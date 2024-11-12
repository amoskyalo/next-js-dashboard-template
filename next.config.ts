import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ hostname: 'flagcdn.com' }, { hostname: 'upload.wikimedia.org' }],
    },
};

export default nextConfig;
