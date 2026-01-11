'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { CITIES } from '@/constants/cities';

export default function TeamManagementPage() {
    const router = useRouter();
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [myRole, setMyRole] = useState<any>(null);

    // 入力フォーム用
    const [inputEmail, setInputEmail] = useState('');
    const [selectedCity, setSelectedCity] = useState(Object.values(CITIES)[0].id); // SuperAdmin用初期値
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        // 1. 自分の情報を取得
        const {
            data: { user }
        } = await supabase.auth.getUser();
        if (!user) {
            router.replace('/');
            return;
        }

        // 2. 自分の権限を確認
        const { data: roleData } = await supabase.from('admin_roles').select('*').eq('user_id', user.id).single();

        setMyRole(roleData);

        // 3. メンバー一覧を取得 (RPCを使用)
        // city_staffの場合は取得できない（そもそもアクセス制限するが、念のため）
        if (roleData?.role === 'super_admin' || roleData?.role === 'city_manager') {
            const { data: membersData, error } = await supabase.rpc('get_admin_members_with_email');

            if (error) {
                console.error('get_admin_members_with_email error:', error);
                toast.error('データ取得エラー');
            } else {
                setMembers(membersData || []);
            }
        }
        setLoading(false);
    };

    // メンバー追加（RPC呼び出し）
    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputEmail) return;

        // 重複チェック
        const normalize = (email: string) => email.trim().toLowerCase();
        const exists = members.some((m) => normalize(m.email) === normalize(inputEmail));
        if (exists) {
            toast.error('そのメールアドレスは既に登録されています');
            return;
        }

        setIsSubmitting(true);

        try {
            // 自分の役割によって追加するターゲットを決める
            const isSuperAdmin = myRole?.role === 'super_admin';

            const targetRole = isSuperAdmin ? 'city_manager' : 'city_staff';
            const targetCityCode = isSuperAdmin ? selectedCity : myRole.city_code;

            const { data, error } = await supabase.rpc('add_team_member_by_email', {
                target_email: inputEmail,
                target_role: targetRole,
                target_city_code: targetCityCode
            });

            if (error) throw error;

            if (data.success) {
                toast.success(data.message);
                setInputEmail('');
                fetchData(); // リスト更新
            } else {
                toast.error(data.error);
            }
        } catch (e: any) {
            console.error(e);
            toast.error('エラーが発生しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    // 削除処理
    const handleRemove = async (userId: string) => {
        if (!confirm('本当に解除しますか？')) return;
        const { error } = await supabase.from('admin_roles').delete().eq('user_id', userId);
        if (error) toast.error('削除失敗');
        else {
            toast.success('解除しました');
            fetchData();
        }
    };

    if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>読み込み中...</div>;
    if (!myRole) return <div style={{ padding: '40px', textAlign: 'center' }}>権限がありません</div>;

    // city_staffはアクセス不可
    if (myRole.role === 'city_staff') {
        return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>アクセス権限がありません</div>;
    }

    const isSuperAdmin = myRole.role === 'super_admin';

    return (
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#333' }}>
            <Toaster />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                <button
                    onClick={() => router.back()}
                    style={{ marginRight: '15px', border: 'none', background: 'none', fontSize: '20px', cursor: 'pointer' }}
                >
                    ←
                </button>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{isSuperAdmin ? '全体権限管理 (Super Admin)' : 'チーム管理'}</h1>
            </div>

            {/* 追加フォーム */}
            <div style={{ background: isSuperAdmin ? '#fff3cd' : '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '40px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>
                    {isSuperAdmin ? '👑 自治体代表の任命' : '👤 職員の追加'}
                </h2>
                <form onSubmit={handleAddMember} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {isSuperAdmin && (
                        <select
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', background: 'white', color: '#333' }}
                        >
                            {Object.values(CITIES).map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <input
                        type="email"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        placeholder="user@example.com"
                        required
                        style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc', minWidth: '200px', background: 'white', color: '#333' }}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            padding: '10px 20px',
                            background: isSuperAdmin ? '#e67e22' : '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        {isSubmitting ? '処理中...' : '追加'}
                    </button>
                </form>
            </div>

            {/* 一覧表示 */}
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd', background: 'white', fontSize: '14px' }}>
                <thead style={{ background: '#f4f4f4' }}>
                    <tr>
                        <th style={{ padding: '10px', textAlign: 'left', color: '#333', fontSize: '14px' }}>ユーザー (Email)</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: '#333', fontSize: '14px' }}>ロール</th>
                        <th style={{ padding: '10px', textAlign: 'left', color: '#333', fontSize: '14px' }}>自治体</th>
                        <th style={{ padding: '10px', textAlign: 'center', color: '#333', fontSize: '14px' }}>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map((m) => {
                        const cityName = Object.values(CITIES).find((c) => c.id === m.city_code)?.name || m.city_code;
                        return (
                            <tr key={m.user_id} style={{ borderBottom: '1px solid #eee', background: 'white' }}>
                                <td style={{ padding: '10px', color: '#333', fontSize: '14px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{m.email}</div>
                                </td>
                                <td style={{ padding: '10px', color: '#333', fontSize: '14px' }}>
                                    <div style={{ fontSize: '14px' }}>{m.role}</div>
                                </td>
                                <td style={{ padding: '10px', color: '#333', fontSize: '14px' }}>{cityName}</td>
                                <td style={{ padding: '10px', textAlign: 'center', fontSize: '14px' }}>
                                    <button
                                        onClick={() => handleRemove(m.user_id)}
                                        style={{
                                            color: 'red',
                                            background: 'white',
                                            border: '1px solid red',
                                            borderRadius: '4px',
                                            padding: '4px 8px',
                                            cursor: 'pointer',
                                            fontSize: '12px'
                                        }}
                                    >
                                        解除
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
