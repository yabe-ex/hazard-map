'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type UserStat = {
    user_id: string;
    email: string;
    created_at: string;
    post_count: number;
    photo_post_count: number;
    last_active_at: string;
    last_city_code: string;
    given_reactions: number;
    received_reactions: number;
    contribution_score: number;
};

export default function UserListPage() {
    const router = useRouter();
    const [users, setUsers] = useState<UserStat[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [searchEmail, setSearchEmail] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.rpc('admin_get_users', {
                page_number: page,
                page_size: 100,
                search_email: searchQuery
            });

            if (error) throw error;
            setUsers(data || []);
        } catch (error: any) {
            console.error('Error fetching users:', error);
            console.error('Error Message:', error.message);
            console.error('Error Code:', error.code);
            console.error('Error Details:', error.details);
            console.error('Error Hint:', error.hint);
            toast.error(`ユーザー一覧の取得に失敗しました: ${error.message || 'Unknown error'} (Code: ${error.code})`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setSearchQuery(searchEmail);
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '-';
        const d = new Date(dateString);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    };

    // --- Sorting Logic ---
    type SortKey = keyof UserStat;
    const [sortKey, setSortKey] = useState<SortKey>('created_at');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc'); // Default to desc for new key
        }
    };

    const sortedUsers = [...users].sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (typeof valA === 'string' && typeof valB === 'string') {
            valA = valA.toLowerCase();
            valB = valB.toLowerCase();
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const SortHeader = ({ label, itemKey, center = false }: { label: string, itemKey: SortKey, center?: boolean }) => (
        <th
            onClick={() => handleSort(itemKey)}
            style={{
                padding: '12px',
                textAlign: center ? 'center' : 'left',
                cursor: 'pointer',
                userSelect: 'none',
                background: sortKey === itemKey ? '#eaeaea' : 'transparent',
                transition: 'background 0.2s'
            }}
            title={`${label}で並び替え`}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: center ? 'center' : 'flex-start', gap: '4px' }}>
                {label}
                <span style={{ fontSize: '10px', color: sortKey === itemKey ? '#333' : '#ccc' }}>
                    {sortKey === itemKey ? (sortOrder === 'asc' ? '▲' : '▼') : '▼'}
                </span>
            </div>
        </th>
    );

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', margin: 0 }}>ユーザー管理</h1>
                    <button
                        onClick={() => router.push('/dashboard')}
                        style={{
                            fontSize: '12px',
                            padding: '6px 12px',
                            background: '#7f8c8d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ← 総合管理へ戻る
                    </button>
                </div>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        placeholder="メールアドレスで検索"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                        style={{
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            width: '250px',
                            backgroundColor: 'white',
                            color: '#333'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            padding: '8px 16px',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        検索
                    </button>
                </form>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>読み込み中...</div>
            ) : (
                <div style={{ overflowX: 'auto', background: 'white', border: '1px solid #ddd', borderRadius: '8px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd', color: '#333' }}>
                            <tr>
                                <SortHeader label="User ID" itemKey="user_id" />
                                <SortHeader label="メールアドレス" itemKey="email" />
                                <SortHeader label="投稿数" itemKey="post_count" center />
                                <SortHeader label="写真投稿" itemKey="photo_post_count" center />
                                <SortHeader label="同感数" itemKey="given_reactions" center />
                                <SortHeader label="被同感数" itemKey="received_reactions" center />
                                <SortHeader label="獲得ポイント" itemKey="contribution_score" center />
                                <SortHeader label="登録日" itemKey="created_at" center />
                                <SortHeader label="最終活動" itemKey="last_active_at" center />
                                <th style={{ padding: '12px', textAlign: 'center' }}>操作</th>
                            </tr>
                        </thead>
                        <tbody style={{ color: '#333' }}>
                            {sortedUsers.map((user) => (
                                <tr key={user.user_id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '12px', color: '#555' }}>
                                        {user.user_id.substring(0, 8)}...
                                    </td>
                                    <td style={{ padding: '12px' }}>{user.email || 'メール不明'}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>{user.post_count}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>{user.photo_post_count}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#2980b9' }}>{user.given_reactions}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', color: '#e74c3c' }}>{user.received_reactions}</td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: '#e67e22' }}>{user.contribution_score}</td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        {formatDate(user.created_at)}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        {formatDate(user.last_active_at)}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => router.push(`/dashboard/admin/users/detail?userId=${user.user_id}`)}
                                            style={{
                                                padding: '6px 12px',
                                                background: '#2c3e50',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontSize: '12px'
                                            }}
                                        >
                                            詳細
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                        ユーザーが見つかりません
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px', alignItems: 'center' }}>
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    style={{
                        padding: '8px 16px',
                        background: page === 1 ? '#555' : '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: page === 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    前へ
                </button>
                <span style={{ padding: '8px', color: 'white', fontWeight: 'bold' }}>Page {page}</span>
                <button
                    disabled={users.length < 100}
                    onClick={() => setPage((p) => p + 1)}
                    style={{
                        padding: '8px 16px',
                        background: users.length < 100 ? '#555' : '#3498db',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: users.length < 100 ? 'not-allowed' : 'pointer'
                    }}
                >
                    次へ
                </button>
            </div>
        </div>
    );
}
