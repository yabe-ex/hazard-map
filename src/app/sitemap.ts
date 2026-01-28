import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { getAllCities } from '@/lib/cityParams';

const BASE_URL = 'https://machi-repo.jp';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // 静的ルート
    const routes = [
        '',
        '/contact',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // 動的ルート（自治体ページ）
    const cities = await getAllCities();
    const cityRoutes = cities.map((city) => ({
        url: `${BASE_URL}/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...routes, ...cityRoutes];
}
