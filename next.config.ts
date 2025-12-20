import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // 既存の設定
    reactStrictMode: false,

    // ビルドのメモリ対策（既存）
    experimental: {
        cpus: 1,
        workerThreads: false
    },

    output: 'export',

    // ▼▼▼ 今回の修正：これを true にする ▼▼▼
    // これにより admin.html ではなく admin/index.html が生成され、
    // /admin/ にアクセスしても 403 エラーにならなくなります。
    trailingSlash: true,
    // ▲▲▲ 追加ここまで ▲▲▲

    images: {
        unoptimized: true
    }
};

export default nextConfig;
