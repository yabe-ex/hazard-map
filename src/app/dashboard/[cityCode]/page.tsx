import { CITIES } from '@/constants/cities';
import AdminDashboard from '@/components/AdminDashboard';

// 静的パスの生成
export async function generateStaticParams() {
    const paths: { cityCode: string }[] = [];

    // パターン1: 英語名
    Object.keys(CITIES).forEach((key) => {
        paths.push({ cityCode: key });
    });

    // パターン2: ID
    Object.values(CITIES).forEach((city) => {
        paths.push({ cityCode: city.id });
    });

    return paths;
}

// キャッシュ無効化
export const revalidate = 0;

export default async function DashboardCityPage({ params }: { params: Promise<{ cityCode: string }> }) {
    const { cityCode } = await params;

    // データ検索
    const cityData = CITIES[cityCode] || Object.values(CITIES).find((c) => c.id === cityCode);

    if (!cityData) {
        return <div className="p-10">エリアが見つかりません (Code: {cityCode})</div>;
    }

    // ▼▼▼ 修正: cityDataオブジェクト全体ではなく、「ID」を fixedCityCode として渡す ▼▼▼
    // AdminDashboardは fixedCityCode を受け取ると、その都市でフィルタリングする機能を持っています
    return <AdminDashboard fixedCityCode={cityData.id} />;
}
