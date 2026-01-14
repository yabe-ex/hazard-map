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

const ITEMS_PER_PAGE = 100;

// ランク定義
const RANK_SYSTEM = [
    { name: 'ビギナー', minScore: 0, color: '#888' },
    { name: 'ウォッチャー', minScore: 100, color: '#4caf50' },
    { name: 'レポーター', minScore: 300, color: '#00bcd4' },
    { name: 'スカウト', minScore: 600, color: '#2196f3' },
    { name: 'レンジャー', minScore: 1200, color: '#3f51b5' },
    { name: 'センチネル', minScore: 2400, color: '#9c27b0' },
    { name: 'ガーディアン', minScore: 5000, color: '#ff9800' },
    { name: 'レジェンド', minScore: 10000, color: '#ff5722' }
];

const getRankInfo = (score: number) => {
    let currentRank = RANK_SYSTEM[0];
    let nextRank = null;

    for (let i = 0; i < RANK_SYSTEM.length; i++) {
        if (score >= RANK_SYSTEM[i].minScore) {
            currentRank = RANK_SYSTEM[i];
            nextRank = RANK_SYSTEM[i + 1] || null;
        } else {
            break;
        }
    }
    return { currentRank, nextRank };
};

export default function MyPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'posts' | 'empathies'>('posts');
    const [myPosts, setMyPosts] = useState<any[]>([]);
    const [empathizedPosts, setEmpathizedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [userId, setUserId] = useState<string | null>(null);
    const [score, setScore] = useState(0);

    // ページネーション用ステート
    const [postsPage, setPostsPage] = useState(1);
    const [empathiesPage, setEmpathiesPage] = useState(1);

    // 画像ポップアップ用ステート
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);



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

        // 2. 同感した投稿を取得（結合テーブルを経由）
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

        // 3. 貢献スコアを取得
        const { data: profile } = await supabase.from('profiles').select('contribution_score').eq('id', uid).single();
        if (profile) {
            setScore(profile.contribution_score || 0);
        }



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
        // 強制的にURLを変更して、ページを最初から読み込ませる
        window.location.href = `/?lat=${lat}&lng=${lng}&zoom=18`;
    };

    // ページネーション計算
    const getPaginatedData = (data: any[], page: number) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return data.slice(start, end);
    };

    const PaginationControls = ({ totalItems, currentPage, setPage }: { totalItems: number; currentPage: number; setPage: (p: number) => void }) => {
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        if (totalPages <= 1) return null;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button
                    onClick={() => setPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    style={{
                        padding: '8px 16px',
                        background: currentPage === 1 ? '#eee' : '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                    }}
                >
                    前へ
                </button>
                <span style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#666' }}>
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                        padding: '8px 16px',
                        background: currentPage === totalPages ? '#eee' : '#fff',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                    }}
                >
                    次へ
                </button>
            </div>
        );
    };

    const { currentRank, nextRank } = getRankInfo(score);

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
                <h1 style={{ margin: 0, fontSize: '18px', flex: 1, textAlign: 'center', paddingRight: '110px', color: '#333', fontWeight: 'bold' }}>マイページ</h1>
            </header>



            {/* スコア・ランク表示エリア */}
            <div style={{ background: '#fff', padding: '20px', borderBottom: '1px solid #eee' }}>
                <div
                    style={{
                        background: 'linear-gradient(135deg, #0070f3 0%, #00a6ff 100%)',
                        color: 'white',
                        borderRadius: '12px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,112,243,0.3)',
                        maxWidth: '400px',
                        margin: '0 auto'
                    }}
                >
                    <span style={{ fontSize: '14px', fontWeight: 'bold', opacity: 0.9, marginBottom: '5px' }}>あなたの地域貢献スコア</span>
                    <div style={{ fontSize: '42px', fontWeight: '800', lineHeight: 1, marginBottom: '10px' }}>{score.toLocaleString()}<span style={{ fontSize: '20px', marginLeft: '4px' }}>pt</span></div>

                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
                        ランク: {currentRank.name}
                    </div>
                    {nextRank && (
                        <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.9 }}>
                            次のランク「{nextRank.name}」まで あと {nextRank.minScore - score} pt
                        </div>
                    )}
                </div>


            </div>

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
                    同感した投稿 ({empathizedPosts.length})
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
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {myPosts.length === 0 && (
                                        <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>まだ投稿がありません</p>
                                    )}

                                    {getPaginatedData(myPosts, postsPage).map((post) => (
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
                                                <span style={{ fontSize: '12px', color: '#999' }}>
                                                    {formatDate(post.created_at)}
                                                    <span style={{ marginLeft: '8px', fontFamily: 'monospace' }}>ID:{post.id}</span>
                                                </span>
                                                {/* 同感数バッジ */}
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
                                                    🤝 同感 {post.empathy_count}
                                                </span>
                                            </div>

                                            <div style={{ display: 'flex', gap: '15px' }}>
                                                <div style={{ flex: 1 }}>
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
                                                </div>

                                                {/* 画像表示（サムネイル） */}
                                                {post.image_url && (
                                                    <div style={{ flexShrink: 0 }}>
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={post.image_url}
                                                            alt="投稿画像"
                                                            onClick={() => setSelectedImageUrl(post.image_url)}
                                                            style={{
                                                                width: '80px',
                                                                height: '80px',
                                                                objectFit: 'cover',
                                                                borderRadius: '8px',
                                                                border: '1px solid #eee',
                                                                cursor: 'pointer'
                                                            }}
                                                        />
                                                    </div>
                                                )}
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
                                <PaginationControls totalItems={myPosts.length} currentPage={postsPage} setPage={setPostsPage} />
                            </>
                        )}

                        {/* --- 同感した投稿リスト --- */}
                        {activeTab === 'empathies' && (
                            <>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {empathizedPosts.length === 0 && (
                                        <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>まだ同感がありません</p>
                                    )}

                                    {getPaginatedData(empathizedPosts, empathiesPage).map((post) => (
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
                                <PaginationControls totalItems={empathizedPosts.length} currentPage={empathiesPage} setPage={setEmpathiesPage} />
                            </>
                        )}
                    </>
                )}
            </div>

            {/* 画像拡大モーダル */}
            {
                selectedImageUrl && (
                    <div
                        onClick={() => setSelectedImageUrl(null)}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(0,0,0,0.8)',
                            zIndex: 1000,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '20px'
                        }}
                    >
                        <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={selectedImageUrl}
                                alt="拡大画像"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '90vh',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                                }}
                                onClick={(e) => e.stopPropagation()} // 画像クリックでは閉じない
                            />
                            <button
                                onClick={() => setSelectedImageUrl(null)}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    right: '0',
                                    background: 'none',
                                    border: 'none',
                                    color: '#fff',
                                    fontSize: '30px',
                                    cursor: 'pointer',
                                    padding: '5px'
                                }}
                            >
                                × 閉じる
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
