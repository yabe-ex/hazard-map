'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';
import Link from 'next/link';

function UserDetailContent() {
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');

    if (!userId) {
        return <div style={{ padding: '20px' }}>ユーザーIDが指定されていません</div>;
    }

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px 20px', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
                <Link href="/dashboard/admin/users" style={{ textDecoration: 'none', color: '#3498db', fontWeight: 'bold' }}>← ユーザー一覧に戻る</Link>
                <span style={{ margin: '0 10px', color: '#999' }}>|</span>
                <span style={{ fontWeight: 'bold', color: '#333' }}>ユーザー詳細投稿リスト (ID: {userId})</span>
            </div>
            <div style={{ flex: 1 }}>
                <AdminDashboard targetUserId={userId} allowFiltering={true} />
            </div>
        </div>
    );
}

export default function AdminUserDetailPage() {
    return (
        <Suspense fallback={<div style={{ padding: '20px' }}>Loading...</div>}>
            <UserDetailContent />
        </Suspense>
    );
}
