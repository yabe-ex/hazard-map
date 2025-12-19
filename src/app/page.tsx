'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabaseClient';
import dynamic from 'next/dynamic';
import AuthModal from '@/components/AuthModal';
import { User } from '@supabase/supabase-js';
import { REASONS, REASON_TAGS, ReasonType } from '@/constants/reasons';
import toast from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation';

const HazardMap = dynamic(() => import('@/components/HazardMap'), {
    loading: () => <div className="p-10 text-center text-gray-500">地図を読み込み中...</div>,
    ssr: false
});

const STORAGE_KEY = 'hazard-map-pos';

const TIME_OPTIONS = [
    { value: 'morning', label: '🌅 朝' },
    { value: 'day', label: '☀️ 昼' },
    { value: 'evening', label: '🌆 夕方' },
    { value: 'night', label: '🌃 夜' }
];

// ▼▼▼ URL制御ロジック（ここは頂いたコードのまま、変更なし） ▼▼▼
function MapControllerLogic({ setCenter, setZoom }: { setCenter: (pos: { lat: number; lng: number }) => void; setZoom: (z: number) => void }) {
    const searchParams = useSearchParams();

    // 1. URLが変わった時の処理
    useEffect(() => {
        const latParam = searchParams.get('lat');
        const lngParam = searchParams.get('lng');
        const zoomParam = searchParams.get('zoom');

        if (latParam && lngParam) {
            const lat = parseFloat(latParam);
            const lng = parseFloat(lngParam);

            if (!isNaN(lat) && !isNaN(lng)) {
                setCenter({ lat, lng });
                if (zoomParam) {
                    const z = parseInt(zoomParam, 10);
                    if (!isNaN(z)) setZoom(z);
                }
            }
        }
    }, [searchParams, setCenter, setZoom]);

    // 2. 初回ロード時だけの処理
    useEffect(() => {
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.has('lat') && currentParams.has('lng')) {
            return;
        }

        const savedPos = localStorage.getItem(STORAGE_KEY);
        if (savedPos) {
            try {
                const parsed = JSON.parse(savedPos);
                if (parsed.lat && parsed.lng && parsed.zoom) {
                    setCenter({ lat: parsed.lat, lng: parsed.lng });
                    setZoom(parsed.zoom);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    return null;
}

export default function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [center, setCenter] = useState({ lat: 35.9251, lng: 139.4858 });
    const [zoom, setZoom] = useState(14);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const [formReason, setFormReason] = useState<ReasonType>('暗い');
    const [formTags, setFormTags] = useState<string[]>([]);
    const [formTimes, setFormTimes] = useState<string[]>([]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingGPS, setIsLoadingGPS] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser(session.user);
            } else {
                signInAnonymously();
            }
        });

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInAnonymously = async () => {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) console.error('Anonymous auth error:', error);
    };

    const fetchPosts = async () => {
        const { data, error } = await supabase.from('hazard_posts').select('*').order('created_at', { ascending: false });

        if (error) console.error('Error:', error);
        else setPosts(data || []);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        setFormTags([]);
    }, [formReason]);

    const handleMapChange = (lat: number, lng: number, newZoom: number) => {
        setCenter({ lat, lng });
        setZoom(newZoom);
        // マップを動かした時だけ保存
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ lat, lng, zoom: newZoom }));
    };

    // ▼▼▼ 修正箇所：現在地への移動ロジック（空振り判定を追加） ▼▼▼
    const handleCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error('お使いのブラウザでは現在地機能が使えません');
            return;
        }
        setIsLoadingGPS(true);
        toast.loading('現在地を取得中...', { id: 'gps' });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // 距離判定ロジック：今見ている場所(center)と、GPSの場所の距離を簡易計算
                // 0.00005度 ≒ 約5メートル
                const dist = Math.abs(center.lat - latitude) + Math.abs(center.lng - longitude);
                const isMoved = dist > 0.00005;
                const isZoomChanged = zoom !== 16; // ズームレベルが目標(16)と違うか

                // 移動またはズーム変更が必要な場合のみ実行
                if (isMoved || isZoomChanged) {
                    setCenter({ lat: latitude, lng: longitude });
                    setZoom(16);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify({ lat: latitude, lng: longitude, zoom: 16 }));
                    toast.success('現在地に移動しました', { id: 'gps' });
                } else {
                    // すでに同じ場所にいる場合は、ローディングを消して終了（メッセージは出さない）
                    console.log('すでに現在地です');
                    toast.dismiss('gps'); // ローディング表示を消す
                }

                setIsLoadingGPS(false);
            },
            (error) => {
                console.error(error);
                setIsLoadingGPS(false);
                toast.error('現在地を取得できませんでした', { id: 'gps' });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    };
    // ▲▲▲ 修正ここまで ▲▲▲

    const toggleTag = (tag: string) => {
        setFormTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    };

    const toggleTime = (timeValue: string) => {
        setFormTimes((prev) => (prev.includes(timeValue) ? prev.filter((t) => t !== timeValue) : [...prev, timeValue]));
    };

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast('認証情報の取得中です。少々お待ちください。');
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading('送信中...');

        const { error } = await supabase.from('hazard_posts').insert([
            {
                lat: center.lat,
                lng: center.lng,
                reason: formReason,
                tags: formTags,
                time_slot: formTimes,
                user_id: user.id
            }
        ]);

        setIsSubmitting(false);

        if (error) {
            toast.error(`エラーが発生しました: ${error.message}`, { id: toastId });
        } else {
            toast.success('投稿しました！', { id: toastId });
            setIsModalOpen(false);
            setFormTags([]);
            setFormTimes([]);
            fetchPosts();
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333', fontSize: '15px' };
    const subLabelStyle = { fontWeight: 'normal', fontSize: '12px', color: '#666', marginLeft: '6px' };
    const sectionStyle = { marginBottom: '28px' };

    return (
        <main
            style={{
                width: '100%',
                height: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            }}
        >
            <Suspense fallback={null}>
                <MapControllerLogic setCenter={setCenter} setZoom={setZoom} />
            </Suspense>

            <header
                style={{
                    padding: '12px 16px',
                    background: '#222',
                    color: '#fff',
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
            >
                {/* タイトル */}
                <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '600', whiteSpace: 'nowrap' }}>みんなのハザードマップ</h1>

                <div>
                    {user && !user.is_anonymous ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* マイページボタン */}
                            <button
                                onClick={() => router.push('/mypage')}
                                aria-label="マイページ"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    background: '#0070f3',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                }}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </button>

                            {/* ログアウトボタン */}
                            <button
                                onClick={handleLogout}
                                aria-label="ログアウト"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    background: '#444',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            style={{
                                fontSize: '12px',
                                padding: '8px 14px',
                                background: '#0070f3',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            ログイン
                        </button>
                    )}
                </div>
            </header>

            <div style={{ flex: 1, position: 'relative' }}>
                <HazardMap posts={posts} centerPos={center} zoomLevel={zoom} onMapChange={handleMapChange} />

                {/* 現在地ボタン */}
                {!isModalOpen && (
                    <button
                        onClick={handleCurrentLocation}
                        disabled={isLoadingGPS}
                        style={{
                            position: 'absolute',
                            bottom: '100px',
                            right: '20px',
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'white',
                            color: '#333',
                            fontSize: '24px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            zIndex: 1001,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                        onMouseOut={(e) => (e.currentTarget.style.background = 'white')}
                    >
                        {isLoadingGPS ? '...' : '📍'}
                    </button>
                )}

                {/* 投稿ボタン */}
                {!isModalOpen && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        style={{
                            position: 'absolute',
                            bottom: '30px',
                            right: '20px',
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#ff4d4f',
                            color: 'white',
                            fontSize: '32px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(255, 77, 79, 0.4)',
                            cursor: 'pointer',
                            zIndex: 1001,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.1s'
                        }}
                        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.95)')}
                        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        ＋
                    </button>
                )}
            </div>

            {/* モーダル部分（そのまま） */}
            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        style={{
                            background: 'white',
                            padding: '24px',
                            borderRadius: '16px',
                            width: '100%',
                            maxWidth: '420px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            color: '#333'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 style={{ marginTop: 0, fontSize: '20px', fontWeight: '700', textAlign: 'center', marginBottom: '20px' }}>
                            不安を投稿する
                        </h2>
                        {user?.is_anonymous && (
                            <div
                                style={{
                                    fontSize: '13px',
                                    color: '#d32f2f',
                                    background: '#fff0f0',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    marginBottom: '20px',
                                    border: '1px solid #ffcdd2'
                                }}
                            >
                                現在<b>ゲストモード</b>です。投稿は可能ですが、後でログインすると履歴として管理できます。
                            </div>
                        )}
                        <form onSubmit={handlePost}>
                            <div style={sectionStyle}>
                                <label style={labelStyle}>
                                    何が一番不安ですか？ <span style={{ color: '#ff4d4f', fontSize: '12px', marginLeft: '4px' }}>*必須</span>
                                </label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {REASONS.map((reason) => {
                                        const isSelected = formReason === reason;
                                        return (
                                            <label
                                                key={reason}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '12px',
                                                    border: isSelected ? '2px solid #ff4d4f' : '1px solid #eee',
                                                    borderRadius: '8px',
                                                    cursor: 'pointer',
                                                    background: isSelected ? '#fff5f5' : 'white',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '50%',
                                                        border: isSelected ? '5px solid #ff4d4f' : '2px solid #ddd',
                                                        marginRight: '12px',
                                                        boxSizing: 'border-box',
                                                        flexShrink: 0
                                                    }}
                                                ></div>
                                                <input
                                                    type="radio"
                                                    name="reason"
                                                    value={reason}
                                                    checked={isSelected}
                                                    onChange={() => setFormReason(reason)}
                                                    style={{ display: 'none' }}
                                                />
                                                <span
                                                    style={{
                                                        fontWeight: isSelected ? '700' : '400',
                                                        fontSize: '16px',
                                                        color: isSelected ? '#ff4d4f' : '#333'
                                                    }}
                                                >
                                                    {reason}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={sectionStyle}>
                                <label style={labelStyle}>
                                    差し支えなければ、当てはまるものを選んでください
                                    <span style={subLabelStyle}>（任意、複数可）</span>
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {REASON_TAGS[formReason].map((tag) => {
                                        const isSelected = formTags.includes(tag);
                                        return (
                                            <button
                                                key={tag}
                                                type="button"
                                                onClick={() => toggleTag(tag)}
                                                style={{
                                                    padding: '8px 12px',
                                                    fontSize: '13px',
                                                    fontWeight: isSelected ? '600' : '400',
                                                    border: isSelected ? '1px solid #0070f3' : '1px solid #e0e0e0',
                                                    borderRadius: '20px',
                                                    background: isSelected ? '#eaf4ff' : '#f7f7f7',
                                                    color: isSelected ? '#0070f3' : '#555',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {tag}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={sectionStyle}>
                                <label style={labelStyle}>
                                    気になる時間帯があれば選択してください
                                    <span style={subLabelStyle}>（任意、複数可）</span>
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {TIME_OPTIONS.map((item) => {
                                        const isSelected = formTimes.includes(item.value);
                                        return (
                                            <button
                                                key={item.value}
                                                type="button"
                                                onClick={() => toggleTime(item.value)}
                                                style={{
                                                    flex: '1 0 45%', // 2列表示
                                                    padding: '10px',
                                                    fontSize: '14px',
                                                    border: isSelected ? '1px solid #0070f3' : '1px solid #e0e0e0',
                                                    borderRadius: '8px',
                                                    background: isSelected ? '#eaf4ff' : 'white',
                                                    color: isSelected ? '#0070f3' : '#555',
                                                    cursor: 'pointer',
                                                    fontWeight: isSelected ? '600' : '400',
                                                    transition: 'all 0.2s',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {item.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: '#f0f0f0',
                                        color: '#333',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '16px'
                                    }}
                                >
                                    キャンセル
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{
                                        flex: 1,
                                        padding: '12px',
                                        background: isSubmitting ? '#ff9c9e' : '#ff4d4f',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: '600',
                                        fontSize: '16px',
                                        transition: 'background 0.2s'
                                    }}
                                >
                                    {isSubmitting ? '送信中...' : '投稿する'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </main>
    );
}
