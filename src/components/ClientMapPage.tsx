'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabaseClient';
import dynamic from 'next/dynamic';
import AuthModal from '@/components/AuthModal';
import { User } from '@supabase/supabase-js';
import { REASONS, REASON_TAGS, ReasonType } from '@/constants/reasons';
import { CITY_NAME_TO_CODE, CityData } from '@/constants/cities';
import toast from 'react-hot-toast';
import { useSearchParams, useRouter } from 'next/navigation';
import imageCompression from 'browser-image-compression';
import Link from 'next/link';

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

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371000;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

async function getAddressFromCoords(lat: number, lng: number) {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
        if (!res.ok) throw new Error('Address fetch failed');
        const data = await res.json();

        const addr = data.address;
        const pref = addr.province || addr.state || '';
        const city = addr.city || addr.town || addr.village || '';
        const suburb = addr.suburb || addr.quarter || addr.neighbourhood || '';
        const road = addr.road || '';

        const fullAddress = `${pref}${city}${suburb}${road}`;

        let cityCode = null;
        if (city && CITY_NAME_TO_CODE[city]) {
            cityCode = CITY_NAME_TO_CODE[city];
        }

        return { fullAddress, cityCode, cityName: city };
    } catch (e) {
        console.error(e);
        return { fullAddress: '', cityCode: null, cityName: '' };
    }
}

function MapControllerLogic({
    setCenter,
    setZoom,
    enableLocalStorage = true
}: {
    setCenter: (pos: { lat: number; lng: number }) => void;
    setZoom: (z: number) => void;
    enableLocalStorage?: boolean;
}) {
    const searchParams = useSearchParams();

    // 1. URLパラメータによる位置指定（最優先）
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

    // 2. ローカルストレージからの復元（enableLocalStorageがtrueの場合のみ）
    useEffect(() => {
        if (!enableLocalStorage) return;

        const currentParams = new URLSearchParams(window.location.search);
        // URLパラメータがある場合はそちらを優先するため、ストレージ読み込みはスキップ
        if (currentParams.has('lat') && currentParams.has('lng')) return;

        const savedPos = localStorage.getItem(STORAGE_KEY);
        if (savedPos) {
            try {
                const parsed = JSON.parse(savedPos);
                if (parsed.lat && parsed.lng) {
                    setCenter({ lat: parsed.lat, lng: parsed.lng });
                    if (parsed.zoom) setZoom(parsed.zoom);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, [setCenter, setZoom, enableLocalStorage]);
    return null;
}

type Props = {
    cityData?: CityData;
    recentPosts?: any[];
};

export default function ClientMapPage({ cityData, recentPosts = [] }: Props) {
    // 【SEO・表示対策】propsで渡されたデータを初期値にしつつ、stateで管理する
    const [posts, setPosts] = useState<any[]>(recentPosts);

    const [center, setCenter] = useState(cityData ? { lat: cityData.lat, lng: cityData.lng } : { lat: 35.9251, lng: 139.4858 });
    const [zoom, setZoom] = useState(cityData ? cityData.zoom : 14);

    const [mapMode, setMapMode] = useState<'standard' | 'simple' | 'satellite'>('standard');
    const [isMapMenuOpen, setIsMapMenuOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [formReason, setFormReason] = useState<ReasonType>('暗い');
    const [formTags, setFormTags] = useState<string[]>([]);
    const [formTimes, setFormTimes] = useState<string[]>([]);
    const [duplicatePost, setDuplicatePost] = useState<any | null>(null);
    const [isSelfDuplicate, setIsSelfDuplicate] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingGPS, setIsLoadingGPS] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [activePostId, setActivePostId] = useState<number | null>(null);
    const [isReportListOpen, setIsReportListOpen] = useState(true);

    const router = useRouter();

    // ▼▼▼ 自治体ページアクセス時に位置をリセットする処理 ▼▼▼
    useEffect(() => {
        if (cityData) {
            // URLパラメータで座標が指定されている場合は、そちらを優先する（共有リンクなど）
            const params = new URLSearchParams(window.location.search);
            if (params.has('lat') && params.has('lng')) {
                return;
            }
            setCenter({ lat: cityData.lat, lng: cityData.lng });
            setZoom(cityData.zoom);
        }
    }, [cityData]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) setUser(session.user);
            else signInAnonymously();
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
        // クライアント側でも最新を取りに行く（投稿直後の反映のため）
        // ▼▼▼ 前回修正分：cityDataがある場合はフィルタリングする ▼▼▼
        let query = supabase.from('hazard_posts').select('*').order('created_at', { ascending: false });

        if (cityData) {
            query = query.eq('city_code', cityData.id);
        }

        const { data, error } = await query;
        if (error) console.error('Error:', error);
        else setPosts(data || []);
    };

    // 初回ロード時に最新データをフェッチする（Propsデータが古くなっている可能性への対策）
    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        setDuplicatePost(null);
        setIsSelfDuplicate(false);
        setFormTags([]);
        setFormTimes([]);
        setSelectedFile(null);
        setPreviewUrl(null);
    }, [formReason, isModalOpen]);

    const handleMapChange = (lat: number, lng: number, newZoom: number) => {
        setCenter({ lat, lng });
        setZoom(newZoom);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ lat, lng, zoom: newZoom }));
    };

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
                setCenter({ lat: latitude, lng: longitude });
                setZoom(16);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ lat: latitude, lng: longitude, zoom: 16 }));
                toast.success('現在地に移動しました', { id: 'gps' });
                setIsLoadingGPS(false);
            },
            (error) => {
                console.error(error);
                setIsLoadingGPS(false);
                toast.error('現在地を取得できませんでした', { id: 'gps' });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const toggleTag = (tag: string) => setFormTags((p) => (p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]));
    const toggleTime = (time: string) => setFormTimes((p) => (p.includes(time) ? p.filter((t) => t !== time) : [...p, time]));

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1200,
                useWebWorker: true
            };
            const compressedFile = await imageCompression(file, options);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage.from('hazard-photos').upload(filePath, compressedFile);

            if (uploadError) {
                console.error('Upload error:', uploadError);
                throw uploadError;
            }

            const { data } = supabase.storage.from('hazard-photos').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };

    const handleCheckDuplicate = async (e: React.FormEvent) => {
        e.preventDefault();
        const DUPLICATE_DISTANCE_THRESHOLD = 50;
        const nearPosts = posts.filter((post) => {
            if (post.reason !== formReason) return false;
            const dist = calculateDistance(center.lat, center.lng, post.lat, post.lng);
            return dist <= DUPLICATE_DISTANCE_THRESHOLD;
        });

        if (nearPosts.length > 0) {
            nearPosts.sort((a, b) => {
                const distA = calculateDistance(center.lat, center.lng, a.lat, a.lng);
                const distB = calculateDistance(center.lat, center.lng, b.lat, b.lng);
                return distA - distB;
            });
            const closest = nearPosts[0];
            if (user && closest.user_id === user.id) setIsSelfDuplicate(true);
            else setIsSelfDuplicate(false);
            setDuplicatePost(closest);
            return;
        }
        await submitNewPost();
    };

    const submitNewPost = async () => {
        if (!user) {
            toast('認証情報の取得中です');
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading('データを送信中...');

        const { fullAddress, cityCode, cityName } = await getAddressFromCoords(center.lat, center.lng);

        if (cityName) {
            toast.success(`${cityName}の投稿として保存します`, { id: toastId });
        }

        let uploadedImageUrl = null;
        if (selectedFile) {
            toast.loading('写真をアップロード中...', { id: toastId });
            uploadedImageUrl = await uploadImage(selectedFile);
            if (!uploadedImageUrl) {
                toast.error('写真のアップロードに失敗しました', { id: toastId });
                setIsSubmitting(false);
                return;
            }
        }

        const { error } = await supabase.from('hazard_posts').insert([
            {
                lat: center.lat,
                lng: center.lng,
                reason: formReason,
                tags: formTags,
                time_slot: formTimes,
                user_id: user.id,
                city_code: cityCode,
                address: fullAddress,
                image_url: uploadedImageUrl
            }
        ]);

        setIsSubmitting(false);
        if (error) toast.error(`エラー: ${error.message}`, { id: toastId });
        else {
            toast.success('投稿しました！', { id: toastId });
            setIsModalOpen(false);
            setFormTags([]);
            setFormTimes([]);
            setDuplicatePost(null);
            fetchPosts();
        }
    };

    const handleAgreeToExisting = async () => {
        if (!duplicatePost || !user) return;
        setIsSubmitting(true);
        const toastId = toast.loading('処理中...');
        const { error } = await supabase.from('hazard_empathies').insert([{ post_id: duplicatePost.id, user_id: user.id }]);
        setIsSubmitting(false);
        if (error) {
            if (error.code === '23505') toast.success('既に同感済みでした', { id: toastId });
            else toast.error('エラーが発生しました', { id: toastId });
        } else {
            toast.success('同感しました！', { id: toastId });
            setPosts((prev) => prev.map((p) => (p.id === duplicatePost.id ? { ...p, empathy_count: (p.empathy_count || 0) + 1 } : p)));
        }
        setIsModalOpen(false);
        setFormTags([]);
        setFormTimes([]);
        setDuplicatePost(null);
        fetchPosts();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    const handlePostUpdate = (postId: number, newCount: number) => {
        setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, empathy_count: newCount } : p)));
    };

    const handleListClick = (post: any) => {
        const latVal = post.lat;
        const lngVal = post.lng !== undefined ? post.lng : post.lon;
        const lat = parseFloat(latVal);
        const lng = parseFloat(lngVal);

        if (isNaN(lat) || isNaN(lng)) {
            toast.error('この投稿には位置情報がありません');
            return;
        }

        setCenter({ lat, lng });
        setZoom(18);
        setActivePostId(post.id);
    };

    // 表示用ポストリスト（最大30件）
    const displayPosts = posts.length > 0 ? posts.slice(0, 30) : [];

    const sectionStyle = { marginBottom: '28px' };
    const labelStyle = { display: 'block', marginBottom: '12px', fontWeight: '700', color: '#2c3e50', fontSize: '15px' };

    return (
        <main style={{ width: '100%', height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <style jsx>{`
                .report-item {
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .report-item:hover {
                    background: #f5f5f5;
                }
                /* ▼▼▼ スマホ (幅480px以下) 向けの調整 ▼▼▼ */
                @media (max-width: 480px) {
                    .header-title {
                        font-size: 12px !important;
                        white-space: normal !important;
                        max-width: 200px;
                        line-height: 1.2;
                    }
                    .city-info-overlay {
                        font-size: 9.5px !important;
                        padding: 6px 12px !important;
                        width: 94% !important;
                        white-space: nowrap !important;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    #recent-reports-container {
                        width: 240px !important;
                        left: 3% !important;
                        bottom: 15px !important;
                        max-height: 120px !important;
                    }
                    .report-list-header {
                        padding: 8px 10px 4px !important;
                    }
                    .report-list-title {
                        font-size: 11px !important;
                    }
                    .report-item {
                        font-size: 9.5px !important;
                        padding: 3px 0 !important;
                        margin-bottom: 3px !important;
                        line-height: 1.3 !important;
                    }
                    .report-list-footer {
                        padding: 6px 10px !important;
                        font-size: 9px !important;
                    }
                    .footer-link {
                        font-size: 9px !important;
                    }
                }
            `}</style>

            <Suspense fallback={null}>
                <MapControllerLogic
                    setCenter={setCenter}
                    setZoom={setZoom}
                    enableLocalStorage={!cityData} // cityDataがある場合（地域ページ）はlocalStorageを無視して強制的に初期位置へ
                />
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
                <h1 className="header-title" style={{ margin: 0, fontSize: '16px', fontWeight: '600', whiteSpace: 'nowrap' }}>
                    {cityData ? `${cityData.name}のみんなのマチレポ` : 'みんなのマチレポ'}
                </h1>
                <div>
                    {user && !user.is_anonymous ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                                onClick={() => router.push('/mypage')}
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
                                    justifyContent: 'center'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </button>
                            <button
                                onClick={handleLogout}
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
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                                fontWeight: '600'
                            }}
                        >
                            ログイン
                        </button>
                    )}
                </div>
            </header>

            <div style={{ flex: 1, position: 'relative' }}>
                {cityData && (
                    <div
                        className="city-info-overlay"
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1000,
                            background: 'rgba(255, 255, 255, 0.9)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            fontSize: '13px',
                            fontWeight: 'bold',
                            color: '#333',
                            textAlign: 'center',
                            width: '90%',
                            maxWidth: '400px'
                        }}
                    >
                        現在、埼玉県{cityData.name}の情報を表示しています
                    </div>
                )}

                {displayPosts.length > 0 && isReportListOpen && (
                    <div
                        id="recent-reports-container"
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            zIndex: 1000,
                            background: 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            maxWidth: '300px',
                            width: '90%',
                            height: 'auto',
                            maxHeight: '300px',
                            display: 'flex',
                            flexDirection: 'column',
                            color: '#333',
                            pointerEvents: 'auto'
                        }}
                    >
                        {/* 1. ヘッダー */}
                        <div
                            className="report-list-header"
                            style={{
                                padding: '12px 12px 8px',
                                borderBottom: '1px solid #ddd',
                                flexShrink: 0,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <h3 className="report-list-title" style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>
                                {cityData ? `${cityData.name}の最新レポート` : '最新のレポート'}
                            </h3>
                            <button
                                onClick={() => setIsReportListOpen(false)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                    lineHeight: 1,
                                    padding: '0 4px',
                                    color: '#888',
                                    fontWeight: 'bold'
                                }}
                                aria-label="閉じる"
                            >
                                −
                            </button>
                        </div>

                        {/* 2. リストエリア */}
                        <div
                            style={{
                                flex: 1,
                                overflowY: 'auto',
                                minHeight: '0',
                                padding: '0 12px'
                            }}
                        >
                            <ul style={{ listStyle: 'none', padding: '8px 0', margin: 0 }}>
                                {displayPosts.map((post) => {
                                    let displayAddress = post.address || 'エリア不明';
                                    // 自治体ページの場合は「〇〇市」を削除して短くする
                                    if (cityData) {
                                        displayAddress = displayAddress.replace(/^.*?市/, '');
                                    }
                                    return (
                                        <li
                                            key={post.id}
                                            className="report-item"
                                            onClick={() => handleListClick(post)}
                                            style={{
                                                marginBottom: '6px',
                                                lineHeight: '1.4',
                                                borderBottom: '1px dotted #eee',
                                                paddingBottom: '4px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                fontSize: '12px'
                                            }}
                                        >
                                            <span style={{ fontWeight: 'bold', color: '#555' }}>{displayAddress}</span>に
                                            <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>「{post.reason}」</span>
                                            が登録。
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* 3. フッターリンク */}
                        <div
                            className="report-list-footer"
                            style={{
                                borderTop: '1px solid #eee',
                                padding: '8px 12px',
                                flexShrink: 0,
                                fontSize: '10px',
                                color: '#999',
                                textAlign: 'right',
                                background: 'rgba(255,255,255,0.5)',
                                borderRadius: '0 0 8px 8px'
                            }}
                        >
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                                <Link href="/terms" className="footer-link" style={{ color: '#888', textDecoration: 'none' }}>
                                    利用規約
                                </Link>
                                <Link href="/privacy" className="footer-link" style={{ color: '#888', textDecoration: 'none' }}>
                                    プライバシー
                                </Link>
                                <Link href="/contact" className="footer-link" style={{ color: '#888', textDecoration: 'none' }}>
                                    お問い合わせ
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {displayPosts.length > 0 && !isReportListOpen && (
                    <button
                        onClick={() => setIsReportListOpen(true)}
                        style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '20px',
                            zIndex: 1000,
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'white',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            color: '#333'
                        }}
                        title="レポートリストを表示"
                    >
                        📋
                    </button>
                )}

                <HazardMap
                    posts={posts}
                    centerPos={center}
                    zoomLevel={zoom}
                    onMapChange={handleMapChange}
                    mapMode={mapMode}
                    currentUserId={user?.id}
                    onPostUpdate={handlePostUpdate}
                    selectedCityId={cityData?.id}
                    activePostId={activePostId}
                />

                <div
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        zIndex: 9999,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end'
                    }}
                >
                    <button
                        onClick={() => setIsMapMenuOpen(!isMapMenuOpen)}
                        style={{
                            width: '44px',
                            height: '44px',
                            background: 'white',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#333'
                        }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                            <polyline points="2 17 12 22 22 17"></polyline>
                            <polyline points="2 12 12 17 22 12"></polyline>
                        </svg>
                    </button>

                    {isMapMenuOpen && (
                        <div
                            style={{
                                marginTop: '8px',
                                background: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 6px 15px rgba(0,0,0,0.3)',
                                border: '1px solid #ccc',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                minWidth: '130px'
                            }}
                        >
                            <button
                                onClick={() => {
                                    setMapMode('standard');
                                    setIsMapMenuOpen(false);
                                }}
                                style={{
                                    padding: '12px 15px',
                                    border: 'none',
                                    background: mapMode === 'standard' ? '#e6f7ff' : 'white',
                                    color: mapMode === 'standard' ? '#0070f3' : '#333',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: mapMode === 'standard' ? 'bold' : 'normal'
                                }}
                            >
                                標準 (OSM)
                            </button>
                            <button
                                onClick={() => {
                                    setMapMode('simple');
                                    setIsMapMenuOpen(false);
                                }}
                                style={{
                                    padding: '12px 15px',
                                    border: 'none',
                                    background: mapMode === 'simple' ? '#e6f7ff' : 'white',
                                    color: mapMode === 'simple' ? '#0070f3' : '#333',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: mapMode === 'simple' ? 'bold' : 'normal',
                                    borderTop: '1px solid #eee'
                                }}
                            >
                                シンプル
                            </button>
                            <button
                                onClick={() => {
                                    setMapMode('satellite');
                                    setIsMapMenuOpen(false);
                                }}
                                style={{
                                    padding: '12px 15px',
                                    border: 'none',
                                    background: mapMode === 'satellite' ? '#e6f7ff' : 'white',
                                    color: mapMode === 'satellite' ? '#0070f3' : '#333',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: mapMode === 'satellite' ? 'bold' : 'normal',
                                    borderTop: '1px solid #eee'
                                }}
                            >
                                航空写真
                            </button>
                        </div>
                    )}
                </div>

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
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                            cursor: 'pointer',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isLoadingGPS ? '...' : '📍'}
                    </button>
                )}
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
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        ＋
                    </button>
                )}
            </div>

            {isModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        style={{
                            background: '#fff',
                            padding: '24px',
                            borderRadius: '16px',
                            width: '100%',
                            maxWidth: '420px',
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            color: '#333'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {duplicatePost ? (
                            <div>
                                {isSelfDuplicate ? (
                                    <>
                                        <h2 style={{ fontSize: '18px', color: '#d32f2f', textAlign: 'center', fontWeight: 'bold' }}>
                                            既に投稿済みです
                                        </h2>
                                        <div
                                            style={{
                                                background: '#fff0f0',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                margin: '20px 0',
                                                border: '1px solid #ffcdd2'
                                            }}
                                        >
                                            <p style={{ margin: 0, color: '#d32f2f', fontSize: '14px', lineHeight: '1.5' }}>
                                                この場所（半径50m以内）には、既にあなたが同じ内容の投稿をしています。
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                background: '#f0f0f0',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                color: '#555',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            閉じる
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h2 style={{ fontSize: '18px', textAlign: 'center', fontWeight: 'bold', marginBottom: '15px' }}>
                                            近くに似た投稿があります
                                        </h2>
                                        <div
                                            style={{
                                                background: '#f5f9ff',
                                                padding: '15px',
                                                borderRadius: '8px',
                                                marginBottom: '20px',
                                                border: '1px solid #dbeafe'
                                            }}
                                        >
                                            <p style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                                                {duplicatePost.reason}
                                            </p>
                                            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                                                この投稿に「同感」して、カウントを増やしませんか？
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleAgreeToExisting}
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                background: '#0070f3',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '8px',
                                                fontSize: '15px',
                                                fontWeight: 'bold',
                                                cursor: 'pointer',
                                                marginBottom: '10px'
                                            }}
                                        >
                                            ✋ はい、同感します
                                        </button>
                                        <button
                                            onClick={submitNewPost}
                                            style={{
                                                width: '100%',
                                                padding: '14px',
                                                background: 'white',
                                                border: '1px solid #ddd',
                                                color: '#666',
                                                borderRadius: '8px',
                                                fontSize: '14px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            いいえ、新しく投稿する
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleCheckDuplicate}>
                                <h2 style={{ fontSize: '20px', textAlign: 'center', marginBottom: '25px', fontWeight: '800', color: '#2c3e50' }}>
                                    不安を投稿する
                                </h2>

                                <div style={sectionStyle}>
                                    <label style={labelStyle}>
                                        何が一番不安ですか？ <span style={{ color: '#e74c3c', fontSize: '12px', fontWeight: 'normal' }}>*必須</span>
                                    </label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {REASONS.map((r) => {
                                            const isSelected = formReason === r;
                                            return (
                                                <label
                                                    key={r}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        padding: '12px 16px',
                                                        border: isSelected ? '2px solid #3498db' : '1px solid #eee',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        background: isSelected ? '#f0f9ff' : 'white',
                                                        transition: 'all 0.2s ease',
                                                        boxShadow: isSelected ? '0 2px 5px rgba(52, 152, 219, 0.2)' : 'none'
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="reason"
                                                        value={r}
                                                        checked={isSelected}
                                                        onChange={() => setFormReason(r)}
                                                        style={{ accentColor: '#3498db', width: '18px', height: '18px' }}
                                                    />
                                                    <span
                                                        style={{
                                                            marginLeft: '12px',
                                                            fontSize: '15px',
                                                            fontWeight: isSelected ? 'bold' : 'normal',
                                                            color: '#333'
                                                        }}
                                                    >
                                                        {r}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div style={sectionStyle}>
                                    <label style={labelStyle}>
                                        詳細タグ <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#888' }}>（任意・複数可）</span>
                                    </label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {REASON_TAGS[formReason].map((tag) => {
                                            const isSelected = formTags.includes(tag);
                                            return (
                                                <button
                                                    type="button"
                                                    key={tag}
                                                    onClick={() => toggleTag(tag)}
                                                    style={{
                                                        padding: '8px 14px',
                                                        borderRadius: '20px',
                                                        border: isSelected ? '1px solid #3498db' : '1px solid #ddd',
                                                        background: isSelected ? '#3498db' : '#f8f9fa',
                                                        color: isSelected ? 'white' : '#555',
                                                        fontSize: '13px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        fontWeight: isSelected ? 'bold' : 'normal'
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
                                        時間帯 <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#888' }}>（任意・複数可）</span>
                                    </label>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        {TIME_OPTIONS.map((opt) => {
                                            const isSelected = formTimes.includes(opt.value);
                                            return (
                                                <button
                                                    type="button"
                                                    key={opt.value}
                                                    onClick={() => toggleTime(opt.value)}
                                                    style={{
                                                        flex: '1 0 40%',
                                                        padding: '10px',
                                                        borderRadius: '8px',
                                                        border: isSelected ? '1px solid #3498db' : '1px solid #ddd',
                                                        background: isSelected ? '#e6f7ff' : 'white',
                                                        color: isSelected ? '#0070f3' : '#555',
                                                        fontSize: '13px',
                                                        cursor: 'pointer',
                                                        fontWeight: isSelected ? 'bold' : 'normal'
                                                    }}
                                                >
                                                    {opt.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div style={sectionStyle}>
                                    <label style={labelStyle}>
                                        写真 <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#888' }}>（任意・1枚のみ）</span>
                                    </label>

                                    {!previewUrl ? (
                                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                                id="file-upload"
                                                style={{
                                                    position: 'absolute',
                                                    left: 0,
                                                    top: 0,
                                                    opacity: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '8px',
                                                    padding: '15px',
                                                    border: '2px dashed #ccc',
                                                    borderRadius: '8px',
                                                    color: '#666',
                                                    background: '#f9f9f9',
                                                    cursor: 'pointer',
                                                    textAlign: 'center',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                <span style={{ fontSize: '20px' }}>📷</span> 写真を選択する
                                            </label>
                                        </div>
                                    ) : (
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <img
                                                src={previewUrl}
                                                alt="プレビュー"
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '200px',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd'
                                                }}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveFile}
                                                style={{
                                                    position: 'absolute',
                                                    top: '-8px',
                                                    right: '-8px',
                                                    background: '#ff4d4f',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '24px',
                                                    height: '24px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '14px',
                                                    fontWeight: 'bold',
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                }}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        style={{
                                            flex: 1,
                                            padding: '14px',
                                            background: '#f1f2f6',
                                            color: '#555',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '15px'
                                        }}
                                    >
                                        キャンセル
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            flex: 1,
                                            padding: '14px',
                                            background: '#ff4d4f',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            fontSize: '15px',
                                            boxShadow: '0 4px 10px rgba(255, 77, 79, 0.3)'
                                        }}
                                    >
                                        {isSubmitting ? '送信中...' : '投稿する'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </main>
    );
}
