'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

// 日付フォーマット関数
const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
};

export default function MyPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'posts' | 'empathies'>('posts');
    const [myPosts, setMyPosts] = useState<any[]>([]);
    const [empathizedPosts, setEmpathizedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // ログインチェック
        const checkUser = async () => {
            const {
                data: { session }
            } = await supabase.auth.getSession();
            if (!session?.user) {
                router.push('/'); // ログインしてなければトップへ
                return;
            }
            setUserId(session.user.id);
            fetchData(session.user.id);
        };
        checkUser();
    }, [router]);

    const fetchData = async (uid: string) => {
        setLoading(true);

        // 1. 自分の投稿を取得
        const { data: postsData } = await supabase.from('hazard_posts').select('*').eq('user_id', uid).order('created_at', { ascending: false });

        setMyPosts(postsData || []);

        // 2. 共感した投稿を取得（結合テーブルを経由）
        // hazard_empathies テーブルから、紐づく hazard_posts を取得する
        const { data: empathiesData } = await supabase
            .from('hazard_empathies')
            .select(
                `
        created_at,
        hazard_posts (*)
      `
            )
            .eq('user_id', uid)
            .order('created_at', { ascending: false });

        // データ構造を平坦化（nullの投稿は除外）
        const validEmpathies = empathiesData?.map((item: any) => item.hazard_posts).filter((post: any) => post !== null) || [];

        setEmpathizedPosts(validEmpathies);
        setLoading(false);
    };

    // 投稿削除処理
    const handleDelete = async (postId: number) => {
        if (!window.confirm('本当に削除しますか？\nこの操作は取り消せません。')) return;

        const { error } = await supabase.from('hazard_posts').delete().eq('id', postId);

        if (error) {
            toast.error('削除に失敗しました');
        } else {
            toast.success('削除しました');
            // リストから除外
            setMyPosts((prev) => prev.filter((p) => p.id !== postId));
        }
    };

    // 地図へ移動
    const handleJumpToMap = (lat: number, lng: number) => {
        // 修正前：router.push(...)
        // これだと地図の記憶が残ってしまい、移動しないことがある

        // 修正後：window.location.href
        // 強制的にURLを変更して、ページを最初から読み込ませる
        window.location.href = `/?lat=${lat}&lng=${lng}&zoom=18`;
    };

    return (
        <div style={{ background: '#f9f9f9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            <Toaster position="top-center" />

            {/* ヘッダー：マップに戻るボタンとタイトル */}
            <header
                style={{
                    background: '#fff',
                    padding: '15px',
                    borderBottom: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10
                }}
            >
                <button
                    onClick={() => router.push('/')}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        color: '#333',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        padding: '5px'
                    }}
                >
                    <span style={{ fontSize: '18px' }}>←</span> マップに戻る
                </button>
                <h1 style={{ margin: 0, fontSize: '18px', flex: 1, textAlign: 'center', paddingRight: '110px' }}>マイページ</h1>
            </header>

            {/* タブ切り替え */}
            <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #ddd' }}>
                <button
                    onClick={() => setActiveTab('posts')}
                    style={{
                        flex: 1,
                        padding: '15px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'posts' ? '3px solid #0070f3' : 'none',
                        fontWeight: activeTab === 'posts' ? 'bold' : 'normal',
                        color: activeTab === 'posts' ? '#0070f3' : '#666',
                        cursor: 'pointer'
                    }}
                >
                    自分の投稿 ({myPosts.length})
                </button>
                <button
                    onClick={() => setActiveTab('empathies')}
                    style={{
                        flex: 1,
                        padding: '15px',
                        background: 'none',
                        border: 'none',
                        borderBottom: activeTab === 'empathies' ? '3px solid #0070f3' : 'none',
                        fontWeight: activeTab === 'empathies' ? 'bold' : 'normal',
                        color: activeTab === 'empathies' ? '#0070f3' : '#666',
                        cursor: 'pointer'
                    }}
                >
                    共感した投稿 ({empathizedPosts.length})
                </button>
            </div>

            {/* コンテンツエリア */}
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                {loading ? (
                    <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>読み込み中...</p>
                ) : (
                    <>
                        {/* --- 自分の投稿リスト --- */}
                        {activeTab === 'posts' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {myPosts.length === 0 && (
                                    <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>まだ投稿がありません</p>
                                )}

                                {myPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        style={{
                                            background: '#fff',
                                            padding: '15px',
                                            borderRadius: '12px',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '12px', color: '#999' }}>{formatDate(post.created_at)}</span>
                                            {/* 共感数バッジ */}
                                            <span
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    color: post.empathy_count > 0 ? '#e02424' : '#999',
                                                    background: post.empathy_count > 0 ? '#ffeaea' : '#f0f0f0',
                                                    padding: '2px 8px',
                                                    borderRadius: '10px'
                                                }}
                                            >
                                                🤝 共感 {post.empathy_count}
                                            </span>
                                        </div>

                                        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>{post.reason}</h3>

                                        <div style={{ marginBottom: '15px' }}>
                                            {post.tags?.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    style={{
                                                        display: 'inline-block',
                                                        fontSize: '11px',
                                                        color: '#555',
                                                        background: '#f5f5f5',
                                                        padding: '3px 8px',
                                                        borderRadius: '4px',
                                                        marginRight: '5px',
                                                        marginBottom: '5px'
                                                    }}
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button
                                                onClick={() => handleJumpToMap(post.lat, post.lng)}
                                                style={{
                                                    flex: 1,
                                                    padding: '8px',
                                                    background: '#0070f3',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px'
                                                }}
                                            >
                                                📍 地図で見る
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                style={{
                                                    width: '40px',
                                                    background: '#fff',
                                                    color: '#d32f2f',
                                                    border: '1px solid #ffcdd2',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* --- 共感した投稿リスト --- */}
                        {activeTab === 'empathies' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {empathizedPosts.length === 0 && (
                                    <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>まだ共感がありません</p>
                                )}

                                {empathizedPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        style={{
                                            background: '#fff',
                                            padding: '15px',
                                            borderRadius: '12px',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '12px', color: '#999' }}>{formatDate(post.created_at)}</span>
                                            <span style={{ fontSize: '12px', color: '#999' }}>ID: {post.id}</span>
                                        </div>

                                        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>{post.reason}</h3>

                                        <div style={{ marginBottom: '15px' }}>
                                            {post.tags?.map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    style={{
                                                        display: 'inline-block',
                                                        fontSize: '11px',
                                                        color: '#555',
                                                        background: '#f5f5f5',
                                                        padding: '3px 8px',
                                                        borderRadius: '4px',
                                                        marginRight: '5px',
                                                        marginBottom: '5px'
                                                    }}
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => handleJumpToMap(post.lat, post.lng)}
                                            style={{
                                                width: '100%',
                                                padding: '8px',
                                                background: '#fff',
                                                color: '#0070f3',
                                                border: '1px solid #0070f3',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '13px'
                                            }}
                                        >
                                            📍 地図で確認する
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
