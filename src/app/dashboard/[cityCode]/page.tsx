import { getAllCities } from '@/lib/cityParams';
import AdminDashboard from '@/components/AdminDashboard';

// 静的パスの生成
export async function generateStaticParams() {
    const allCities = await getAllCities();
    const paths: { cityCode: string }[] = [];

    allCities.forEach((city) => {
        // IDとSlugの両方でアクセスできるようにする
        paths.push({ cityCode: city.slug });
        paths.push({ cityCode: city.id });
    });

    return paths;
}

// キャッシュ無効化
export const revalidate = 0;

export default async function DashboardCityPage({ params }: { params: Promise<{ cityCode: string }> }) {
    const { cityCode } = await params;
    const allCities = await getAllCities();

    // データ検索
    const cityData = allCities.find((c) => c.slug === cityCode || c.id === cityCode);

    if (!cityData) {
        return <div className="p-10">エリアが見つかりません (Code: {cityCode})</div>;
    }

    // 関連する自治体を抽出（親子関係の汎用処理）
    let relevantCities = [cityData];

    // パターンA: 政令指定都市（親）の場合 -> 子供（区）を含める
    if (cityData.is_designated) {
        const children = allCities
            .filter((c) => c.parent_city_id === cityData.id)
            .sort((a, b) => a.id.localeCompare(b.id));
        relevantCities = [cityData, ...children];
    }
    // パターンB: 政令指定都市の区（子）の場合 -> 親と兄弟（他の区）を含める
    else if (cityData.parent_city_id) {
        const parent = allCities.find((c) => c.id === cityData.parent_city_id);
        // 親が見つかれば、親を先頭にし、兄弟（自分含む）を続ける
        if (parent) {
            const siblings = allCities
                .filter((c) => c.parent_city_id === cityData.parent_city_id)
                .sort((a, b) => a.id.localeCompare(b.id));
            relevantCities = [parent, ...siblings];
        }
    }

    // ▼▼▼ 修正: cityDataオブジェクト全体ではなく、「ID」を fixedCityCode として渡す ▼▼▼
    // AdminDashboardは fixedCityCode を受け取ると、その都市でフィルタリングする機能を持っています
    return <AdminDashboard fixedCityCode={cityData.id} allCities={relevantCities} />;
}
