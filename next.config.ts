import type { NextConfig } from 'next';

// GitHub Pages serves the site under /cmwp; local dev runs at the root.
const basePath = process.env.NODE_ENV === 'production' ? '/cmwp' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
