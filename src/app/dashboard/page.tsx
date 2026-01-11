'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AdminDashboard from '@/components/AdminDashboard';
import { getAllCities } from '@/lib/cityParams';
import { CityData } from '@/constants/cities'; // 型定義のみ使用
import toast from 'react-hot-toast';

export default function DashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [allCities, setAllCities] = useState<CityData[]>([]);

    useEffect(() => {
        const checkPermission = async () => {
            // 1. ログインユーザー取得
            const {
                data: { user }
            } = await supabase.auth.getUser();

            if (!user) {
                router.replace('/');
                return;
            }

            // 2. 権限チェック (RLSにより自分の権限のみ取得可能)
            const { data: roleData, error } = await supabase.from('admin_roles').select('*').eq('user_id', user.id).single();

            // エラー または Super Admin でない場合はアクセス拒否
            if (error || !roleData || roleData.role !== 'super_admin') {
                // 自治体担当者だった場合は、その自治体のページへ誘導
                if (roleData?.city_code) {
                    toast('担当自治体のページへ移動します');
                    router.replace(`/dashboard/${roleData.city_code}`);
                } else {
                    toast.error('アクセス権限がありません');
                    router.replace('/');
                }
                return;
            }

            // 3. 自治体マスタ取得
            const cities = await getAllCities();
            setAllCities(cities);

            // 4. 許可
            setIsAuthorized(true);
            setIsLoading(false);
        };

        checkPermission();
    }, [router]);

    if (isLoading) {
        return <div style={{ padding: '50px', textAlign: 'center' }}>読み込み中...</div>;
    }

    if (!isAuthorized) {
        return null; // リダイレクト中
    }

    // フィルタリング（エリア選択）を許可して表示
    return <AdminDashboard allowFiltering={true} allCities={allCities} />;
}
