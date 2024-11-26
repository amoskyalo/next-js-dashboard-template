import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [{ hostname: 'flagcdn.com' }, { hostname: 'avatar.iran.liara.run' }],
    },
};

export default nextConfig;
