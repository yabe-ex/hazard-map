'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import toast, { Toaster } from 'react-hot-toast';
import * as turf from '@turf/turf';

const HazardMap = dynamic(() => import('@/components/HazardMap'), {
    loading: () => <div style={{ height: '100%', background: '#eee' }}>地図読込中...</div>,
    ssr: false
});

// 川越市データ
const KAWAGOE_BOUNDARY = {
    type: 'Feature',
    properties: { name: '川越市' },
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [139.4312, 35.9458],
                [139.4623, 35.9521],
                [139.4985, 35.9412],
                [139.5241, 35.9234],
                [139.5312, 35.8956],
                [139.5123, 35.8712],
                [139.4756, 35.8543],
                [139.4421, 35.8612],
                [139.4156, 35.8845],
                [139.3985, 35.9123],
                [139.4123, 35.9312],
                [139.4312, 35.9458]
            ]
        ]
    }
};

export default function AdminPage() {
    // ▼▼▼ 変更：最初は「立ち入り禁止(false)」にする ▼▼▼
    const [isAdmin, setIsAdmin] = useState(false);
    const [isChecking, setIsChecking] = useState(true); // チェック中フラグ

    const [center, setCenter] = useState({ lat: 35.9251, lng: 139.4858 });
    const [zoom, setZoom] = useState(13);
    const [selectedBoundary, setSelectedBoundary] = useState<any>(null);

    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

    const router = useRouter();

    // ▼▼▼ 復活：管理者権限チェック ▼▼▼
    useEffect(() => {
        const checkAdmin = async () => {
            // 1. ログインしているか確認
            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (!session) {
                toast.error('ログインしてください');
                router.push('/'); // トップへ追放
                return;
            }

            // 2. admin_usersテーブルにIDがあるか確認
            const { data, error } = await supabase.from('admin_users').select('*').eq('id', session.user.id).single();

            if (error || !data) {
                console.error('管理者権限なし:', session.user.id);
                toast.error('管理者権限がありません');
                router.push('/'); // トップへ追放
            } else {
                // 3. 合格！
                setIsAdmin(true);
                setIsChecking(false);
                // 合格した場合のみデータを読み込む
                fetchPosts();
            }
        };

        checkAdmin();
    }, [router]);

    // データ取得関数（認証OK後に呼ぶため外に出しました）
    const fetchPosts = async () => {
        const { data, error } = await supabase.from('hazard_posts').select('*').order('created_at', { ascending: false });

        if (!error && data) {
            setAllPosts(data);
            setFilteredPosts(data);
        }
    };

    const handleDelete = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!window.confirm('本当にこの投稿を削除しますか？\nこの操作は取り消せません。')) return;

        const { error } = await supabase.from('hazard_posts').delete().eq('id', id);
        if (error) {
            toast.error('削除に失敗しました');
            return;
        }
        setAllPosts((prev) => prev.filter((post) => post.id !== id));
        setFilteredPosts((prev) => prev.filter((post) => post.id !== id));
        toast.success('投稿を削除しました');
    };

    const handleSelectArea = (area: string) => {
        if (area === 'kawagoe') {
            const boundary = KAWAGOE_BOUNDARY;
            setCenter({ lat: 35.9251, lng: 139.4858 });
            setZoom(13);
            setSelectedBoundary(boundary);

            const insidePosts = allPosts.filter((post) => {
                const pt = turf.point([post.lng, post.lat]);
                const poly = boundary as any;
                return turf.booleanPointInPolygon(pt, poly);
            });
            setFilteredPosts(insidePosts);
            toast.success(`エリア内の投稿: ${insidePosts.length}件`);
        } else {
            setSelectedBoundary(null);
            setFilteredPosts(allPosts);
            toast('全エリアを表示します');
        }
    };

    // ▼▼▼ チェック中はローディング画面を出す ▼▼▼
    if (isChecking) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#2c3e50', color: 'white' }}>
                <p>権限を確認中...</p>
            </div>
        );
    }

    // 権限がない場合は何も表示しない（useEffectで飛ばされるまでのチラつき防止）
    if (!isAdmin) return null;

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
            <Toaster />

            {/* 左サイドバー */}
            <aside
                style={{
                    width: '320px',
                    background: '#2c3e50',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 20,
                    boxShadow: '2px 0 10px rgba(0,0,0,0.3)'
                }}
            >
                <div style={{ padding: '20px', borderBottom: '1px solid #34495e' }}>
                    <h1 style={{ margin: 0, fontSize: '18px' }}>🛡️ 管理画面</h1>
                </div>

                {/* 操作パネル */}
                <div style={{ padding: '20px', borderBottom: '1px solid #34495e' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#bdc3c7' }}>エリア選択</label>
                    <select
                        onChange={(e) => handleSelectArea(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            background: '#34495e',
                            color: 'white',
                            border: '1px solid #7f8c8d',
                            borderRadius: '4px'
                        }}
                    >
                        <option value="">全てのエリア</option>
                        <option value="kawagoe">埼玉県 川越市</option>
                    </select>

                    <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '14px', color: '#bdc3c7' }}>該当件数:</span>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#e74c3c' }}>{filteredPosts.length}</span>
                    </div>
                </div>

                {/* 投稿リスト */}
                <div style={{ flex: 1, overflowY: 'auto', background: '#253342' }}>
                    {filteredPosts.map((post) => (
                        <div
                            key={post.id}
                            style={{
                                padding: '15px',
                                borderBottom: '1px solid #34495e',
                                cursor: 'pointer',
                                transition: '0.2s',
                                position: 'relative'
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.background = '#34495e')}
                            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
                            onClick={() => {
                                setCenter({ lat: post.lat, lng: post.lng });
                                setZoom(16);
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', paddingRight: '30px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#ecf0f1' }}>{post.reason}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '11px', color: '#95a5a6' }}>{new Date(post.created_at).toLocaleDateString()}</span>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {post.tags?.map((tag: string) => (
                                        <span
                                            key={tag}
                                            style={{
                                                fontSize: '10px',
                                                background: '#34495e',
                                                padding: '2px 6px',
                                                borderRadius: '3px',
                                                color: '#bdc3c7'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={(e) => handleDelete(post.id, e)}
                                style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    opacity: 0.7
                                }}
                                title="削除する"
                            >
                                🗑️
                            </button>
                        </div>
                    ))}

                    {filteredPosts.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d', fontSize: '14px' }}>投稿が見つかりません</div>
                    )}
                </div>
            </aside>

            <main style={{ flex: 1, position: 'relative' }}>
                <HazardMap centerPos={center} zoomLevel={zoom} onMapChange={() => {}} posts={filteredPosts} boundary={selectedBoundary} />
            </main>
        </div>
    );
}
