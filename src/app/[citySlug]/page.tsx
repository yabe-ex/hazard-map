import { CITIES } from '@/constants/cities';
import { supabase } from '@/lib/supabaseClient';
import ClientMapPage from '@/components/ClientMapPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    return Object.values(CITIES).map((city) => ({
        citySlug: city.slug
    }));
}

async function getCityRecentPosts(cityCode: string) {
    // lat, lng を明示的に取得
    const { data } = await supabase
        .from('hazard_posts')
        .select('id, reason, address, created_at, lat, lng')
        .eq('city_code', cityCode)
        .order('created_at', { ascending: false })
        .limit(30);

    return data || [];
}

type Props = {
    params: Promise<{ citySlug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { citySlug } = await params;
    const cityData = Object.values(CITIES).find((c) => c.slug === citySlug);

    if (!cityData) {
        return {
            title: 'ページが見つかりません - みんなのマチレポ'
        };
    }

    return {
        title: `${cityData.name}のみんなのマチレポ - 地域の安全・安心マップ`,
        description: `${cityData.name}（埼玉県）の危険箇所や気づきを地図で共有。暗い道、見通しの悪い交差点などをみんなで投稿して安全な街づくりに役立てましょう。`,
        openGraph: {
            title: `${cityData.name}のみんなのマチレポ`,
            description: `${cityData.name}の防犯・安全情報を地図でチェック`
        }
    };
}

export default async function CityPage({ params }: Props) {
    const { citySlug } = await params;
    const cityData = Object.values(CITIES).find((c) => c.slug === citySlug);

    if (!cityData) {
        notFound();
    }

    const recentPosts = await getCityRecentPosts(cityData.id);

    return <ClientMapPage cityData={cityData} recentPosts={recentPosts} />;
}
