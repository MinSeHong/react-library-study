import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /raw/, // *.svg?raw
      type: 'asset/source', // 문자열로 import됨
    });
    return config;
  },
};

export default nextConfig;
