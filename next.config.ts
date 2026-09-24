import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Self-contained server in .next/standalone, used by Dockerfile.prod.
  output: 'standalone',
};

export default nextConfig;
