'use client';

import AdminDashboard from '@/components/AdminDashboard';

export default function DashboardPage() {
    // フィルタリング（エリア選択）を許可して表示
    return <AdminDashboard allowFiltering={true} />;
}
