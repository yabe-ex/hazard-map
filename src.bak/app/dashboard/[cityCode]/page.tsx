import { CITIES } from '@/constants/cities';
import AdminDashboard from '@/components/AdminDashboard';

// 静的パスの生成
// キー(kawagoe) と ID(11201) の両方のパターンを生成して、どっちでアクセスされてもOKにします
export async function generateStaticParams() {
    const paths: { cityCode: string }[] = [];

    // 1. キーのパターン (例: /dashboard/kawagoe)
    Object.keys(CITIES).forEach((key) => {
        paths.push({ cityCode: key });
    });

    // 2. IDのパターン (例: /dashboard/11201)
    Object.values(CITIES).forEach((city) => {
        paths.push({ cityCode: city.id });
    });

    return paths;
}

// キャッシュ無効化
export const revalidate = 0;

export default async function DashboardCityPage({ params }: { params: Promise<{ cityCode: string }> }) {
    const { cityCode } = await params;

    // データ検索ロジック：
    // まず「キー」として検索し、見つからなければ「ID」として検索する
    const cityData = CITIES[cityCode] || Object.values(CITIES).find((c) => c.id === cityCode);

    if (!cityData) {
        return <div className="p-10">エリアが見つかりません (Code: {cityCode})</div>;
    }

    // 型エラー回避用 (AdminDashboardの型定義修正が不要になります)
    const DashboardComponent = AdminDashboard as any;

    return <DashboardComponent cityData={cityData} />;
}
