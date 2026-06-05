import type { NextConfig } from 'next';

// Served at the root of the custom domain (cmwp.eu), so no basePath.
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
