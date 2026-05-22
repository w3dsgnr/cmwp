import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/cmwp',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
