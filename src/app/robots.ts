import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/dashboard/', // 管理画面はクロールさせない
        },
        sitemap: 'https://machi-repo.jp/sitemap.xml',
    };
}
