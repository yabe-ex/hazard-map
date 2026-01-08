import AdminDashboard from '@/components/AdminDashboard';
import { CITIES } from '@/constants/cities';

// ▼▼▼ 追加: 静的エクスポート用に生成するパスを定義する関数 ▼▼▼
export async function generateStaticParams() {
    // CITIESに定義されているすべての自治体IDの配列を返します
    // 例: [{ cityCode: '11201' }, { cityCode: '11208' }, ...]
    return Object.values(CITIES).map((city) => ({
        cityCode: city.id
    }));
}

type Props = {
    params: Promise<{ cityCode: string }>;
};

export default async function CityDashboardPage({ params }: Props) {
    const { cityCode } = await params;
    return <AdminDashboard fixedCityCode={cityCode} allowFiltering={false} />;
}
