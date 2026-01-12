import { supabase } from '@/lib/supabaseClient';
import ClientMapPage from '@/components/ClientMapPage';
import { getAllCities } from '@/lib/cityParams';

// キャッシュ無効化（常に最新をビルド/取得）
// キャッシュ無効化（常に最新をビルド/取得）-> Client Side Fetchで対応するため削除
// export const revalidate = 0;

async function getAllRecentPosts() {
    const { data } = await supabase.from('hazard_posts').select('*').order('created_at', { ascending: false }).limit(30);

    return data || [];
}

export default async function Home() {
    const recentPosts = await getAllRecentPosts();
    const allCities = await getAllCities();

    return (
        <ClientMapPage
            // cityDataは渡さない（undefined）
            recentPosts={recentPosts}
            allCities={allCities}
        />
    );
}
