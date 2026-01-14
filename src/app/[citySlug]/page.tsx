import { getAllCities, getCityBySlug } from '@/lib/cityParams';
import { supabase } from '@/lib/supabaseClient';
import ClientMapPage from '@/components/ClientMapPage';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const cities = await getAllCities();
    return cities.map((city) => ({
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
    const cityData = await getCityBySlug(citySlug);

    if (!cityData) {
        return {
            title: 'ページが見つかりません - みんなのマチレポ'
        };
    }

    return {
        title: `${cityData.name}のみんなのマチレポ - 地域の安全・安心マップ`,
        description: `${cityData.name}（埼玉県）の地域安全マップ。みんなで投稿した危険箇所（暗い道、交通事故多発地点など）を地図で確認・共有できます。住民のリアルな口コミを通して、${cityData.name}の防犯・事故防止・安全な街づくりに役立てましょう。`,
        openGraph: {
            title: `${cityData.name}のみんなのマチレポ`,
            description: `${cityData.name}の防犯・安全情報を地図でチェック`
        }
    };
}

export default async function CityPage({ params }: Props) {
    const { citySlug } = await params;
    const cityData = await getCityBySlug(citySlug);
    const allCities = await getAllCities();

    if (!cityData) {
        notFound();
    }

    const recentPosts = await getCityRecentPosts(cityData.id);

    return <ClientMapPage cityData={cityData} recentPosts={recentPosts} allCities={allCities} />;
}
