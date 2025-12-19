import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // ▼▼▼ これを追加して false にする ▼▼▼
    reactStrictMode: false,
    // ▲▲▲ 追加ここまで ▲▲▲

    experimental: {
        cpus: 1,
        workerThreads: false
    },
    output: 'export',
    images: {
        unoptimized: true
    }
};

export default nextConfig;
