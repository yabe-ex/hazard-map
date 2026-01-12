'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
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
import EXIF from 'exif-js';

const HazardMap = dynamic(() => import('@/components/HazardMap'), {
    loading: () => <div className="p-10 text-center text-gray-500">地図を読み込み中...</div>,
    ssr: false
});

const getPrefName = (prefCode: string) => {
    const prefs: Record<string, string> = {
        '01': '北海道', '02': '青森県', '03': '岩手県', '04': '宮城県', '05': '秋田県',
        '06': '山形県', '07': '福島県', '08': '茨城県', '09': '栃木県', '10': '群馬県',
        '11': '埼玉県', '12': '千葉県', '13': '東京都', '14': '神奈川県', '15': '新潟県',
        '16': '富山県', '17': '石川県', '18': '福井県', '19': '山梨県', '20': '長野県',
        '21': '岐阜県', '22': '静岡県', '23': '愛知県', '24': '三重県', '25': '滋賀県',
        '26': '京都府', '27': '大阪府', '28': '兵庫県', '29': '奈良県', '30': '和歌山県',
        '31': '鳥取県', '32': '島根県', '33': '岡山県', '34': '広島県', '35': '山口県',
        '36': '徳島県', '37': '香川県', '38': '愛媛県', '39': '高知県', '40': '福岡県',
        '41': '佐賀県', '42': '長崎県', '43': '熊本県', '44': '大分県', '45': '宮崎県',
        '46': '鹿児島県', '47': '沖縄県'
    };
    return prefs[prefCode] || '';
};

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

function convertDMSToDD(degrees: number, minutes: number, seconds: number, direction: string): number {
    let dd = degrees + minutes / 60 + seconds / (60 * 60);
    if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
    }
    return dd;
}

async function getAddressFromCoords(lat: number, lng: number, allCities: CityData[]) {
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
        // 1. まずcityDataにある名前でマッチング
        if (city) {
            // allCitiesから検索 (語尾の「市」などはデータによって微妙に違うかもしれないので、ある程度柔軟に...と言いたいが、
            // 今はallCities.nameとOpenStreetMapのcity名が一致することを期待する)
            const found = allCities.find(c => c.name === city || city.includes(c.name));
            if (found) cityCode = found.id;

            // フォールバック: 定数定義も見ておく（互換性のため）
            if (!cityCode && CITY_NAME_TO_CODE[city]) {
                cityCode = CITY_NAME_TO_CODE[city];
            }
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
    allCities?: CityData[];
};

type RankingItem = {
    city_code: string;
    city_name: string;
    prefecture_code: string;
    post_count: number;
};

// 都道府県コードから県名を取得するヘルパー関数


function RankingWidget({
    allCities,
    isOpen,
    setIsOpen
}: {
    allCities: CityData[];
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}) {
    const [ranking, setRanking] = useState<RankingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchRanking = async () => {
            const { data, error } = await supabase.rpc('get_municipality_ranking', { limit_count: 20 });
            if (error) {
                console.error('Ranking fetch error:', error);
            } else {
                setRanking(data as RankingItem[]);
            }
            setLoading(false);
        };
        fetchRanking();
    }, []);



    // RankingWidgetは開いている状態のコンテンツのみを返す（閉じるボタンの制御は親のisOpen管理に依存）
    return (
        <div
            className="ranking-widget"
            style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                width: '100%',
                overflow: 'hidden',
                fontFamily: 'sans-serif',
                maxHeight: '200px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div
                className="report-list-header"
                style={{
                    padding: '12px 12px 8px',
                    borderBottom: '1px solid #ddd',
                    background: '#f8f9fa',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0
                }}
            >
                <div className="report-list-title" style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    投稿数ランキング
                </div>
                <button
                    onClick={() => setIsOpen(false)}
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
                >
                    −
                </button>
            </div>

            <div style={{ padding: '0 12px', overflowY: 'auto', flex: 1 }}>
                {loading ? (
                    <div style={{ padding: '15px', textAlign: 'center', fontSize: '12px', color: '#666' }}>読み込み中...</div>
                ) : ranking.length === 0 ? (
                    <div style={{ padding: '15px', textAlign: 'center', fontSize: '12px', color: '#666' }}>データがありません</div>
                ) : (
                    <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0' }}>
                        {ranking.map((item, index) => {
                            const foundCity = allCities.find((c) => c.id === item.city_code);
                            const slug = foundCity?.slug || item.city_code;
                            const prefName = getPrefName(item.prefecture_code);

                            return (
                                <li
                                    key={item.city_code}
                                    className="report-item"
                                    onClick={() => router.push(`/${slug}`)}
                                    style={{
                                        marginBottom: '6px',
                                        borderBottom: '1px dotted #eee',
                                        paddingBottom: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '12px',
                                        lineHeight: '1.4'
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <span
                                        style={{
                                            fontWeight: 'bold',
                                            color: index === 0 ? '#d4af37' : index === 1 ? '#a0a0a0' : index === 2 ? '#cd7f32' : '#666',
                                            minWidth: '18px',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {index + 1}
                                    </span>
                                    <span style={{ flex: 1, color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {prefName}{item.city_name}
                                    </span>
                                    <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>
                                        {item.post_count}
                                        <span style={{ fontSize: '10px', fontWeight: 'normal', color: '#666', marginLeft: '2px' }}>件</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default function ClientMapPage({ cityData, recentPosts = [], allCities = [] }: Props) {
    // 【SEO・表示対策】propsで渡されたデータを初期値にしつつ、stateで管理する
    const [posts, setPosts] = useState<any[]>(recentPosts);

    const [center, setCenter] = useState(cityData ? { lat: cityData.lat, lng: cityData.lng } : { lat: 35.9251, lng: 139.4858 });
    const [zoom, setZoom] = useState(cityData ? cityData.zoom : 14);

    const [mapMode, setMapMode] = useState<'standard' | 'simple' | 'satellite'>('standard');
    const [isMapMenuOpen, setIsMapMenuOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

    const [isRankingOpen, setIsRankingOpen] = useState(false);
    // レスポンシブ初期状態: PC (幅768px以上) はオープン、スマホはクローズ


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
    const [isLocationVerified, setIsLocationVerified] = useState(false);
    const [photoDistance, setPhotoDistance] = useState<number | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [activePostId, setActivePostId] = useState<number | null>(null);
    const [isReportListOpen, setIsReportListOpen] = useState(true);
    const [citySearchQuery, setCitySearchQuery] = useState('');

    // 自治体リストの並び替え（東京・埼玉・千葉・神奈川・茨城・栃木・群馬を優先表示）
    const sortedCities = useMemo(() => {
        return [...allCities].sort((a, b) => {
            const getPriority = (id: string) => {
                if (id.startsWith('13')) return 0; // Tokyo
                if (id.startsWith('11')) return 1; // Saitama
                if (id.startsWith('12')) return 2; // Chiba
                if (id.startsWith('14')) return 3; // Kanagawa
                if (id.startsWith('08')) return 4; // Ibaraki
                if (id.startsWith('09')) return 5; // Tochigi
                if (id.startsWith('10')) return 6; // Gunma
                return 99; // Others (Hokkaido 01...)
            };
            const pA = getPriority(a.id);
            const pB = getPriority(b.id);
            if (pA !== pB) return pA - pB;
            return a.id.localeCompare(b.id);
        });
    }, [allCities]);

    const router = useRouter();

    // ▼▼▼ 自治体ページアクセス時に位置をリセットする処理 ▼▼▼
    // URLパラメータやpropsの初期化周り
    // ▼▼▼ 最新レポートの開閉状態を復元 ▼▼▼
    useEffect(() => {
        const savedState = localStorage.getItem('hazard-map-report-list-open');
        if (savedState === 'false') {
            setIsReportListOpen(false);
        }
    }, []);

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
        // cityDataがある場合はフィルタリングする
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
            setIsLocationVerified(false); // Reset first
            setPhotoDistance(null); // Reset distance



            // HEIC check
            if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
                toast('HEIC形式の画像は位置情報が読み取れない場合があります。JPG/PNGを推奨します。', { icon: '⚠️' });
            }

            // EXIF Location Check
            // @ts-ignore
            EXIF.getData(file, function () {
                // @ts-ignore
                const latTags = EXIF.getTag(this, 'GPSLatitude');
                // @ts-ignore
                const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
                // @ts-ignore
                const lngTags = EXIF.getTag(this, 'GPSLongitude');
                // @ts-ignore
                const lngRef = EXIF.getTag(this, 'GPSLongitudeRef');

                // Debug logs
                // @ts-ignore
                const allTags = EXIF.getAllTags(this);
                console.log('[EXIF DEBUG] All Tags:', allTags);
                console.log('[EXIF DEBUG] Raw Tags:', { latTags, latRef, lngTags, lngRef });

                if (latTags && latRef && lngTags && lngRef) {
                    const lat = convertDMSToDD(latTags[0], latTags[1], latTags[2], latRef);
                    const lng = convertDMSToDD(lngTags[0], lngTags[1], lngTags[2], lngRef);

                    // Calculate distance from map center (pin location)
                    const dist = calculateDistance(center.lat, center.lng, lat, lng);
                    console.log(`[EXIF DEBUG] Image: ${lat}, ${lng} / Map: ${center.lat}, ${center.lng} / Dist: ${dist}m`);
                    console.log('[EXIF DEBUG] Threshold: 500m');
                    setPhotoDistance(dist);

                    if (dist <= 500) { // 500m threshold
                        setIsLocationVerified(true);
                        toast.success('写真の位置情報が確認されました (+50pt!)', { icon: '📸' });
                    } else {
                        toast.error(`撮影場所が遠すぎます (${Math.round(dist)}m)`, { icon: '📍' });
                    }
                } else {
                    console.log('[EXIF DEBUG] No GPS data found in image.');
                    console.log('[EXIF DEBUG] Tags missing:', {
                        hasLat: !!latTags,
                        hasLatRef: !!latRef,
                        hasLng: !!lngTags,
                        hasLngRef: !!lngRef
                    });
                    toast('写真に位置情報が含まれていません', { icon: 'ℹ️' });
                }
            });
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsLocationVerified(false);
        setPhotoDistance(null);
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        try {
            let fileToUpload = file;

            // 0. HEIC Conversion (Client-side)
            if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
                toast('HEIC画像を変換中...', { icon: '🔄' });
                try {
                    const heic2any = (await import('heic2any')).default;
                    const convertedBlob = await heic2any({
                        blob: file,
                        toType: 'image/jpeg',
                        quality: 0.8
                    });
                    const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
                    fileToUpload = new File([blob], file.name.replace(/\.heic$/i, '.jpg'), {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    });
                } catch (e) {
                    console.error('HEIC conversion failed:', e);
                    toast('HEIC変換に失敗しました。そのままアップロードを試みます。', { icon: '⚠️' });
                }
            }

            // 1. Try to compress
            try {
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1200,
                    useWebWorker: true,
                    fileType: 'image/jpeg' // Force convert to JPEG if possible
                };
                fileToUpload = await imageCompression(file, options);
            } catch (compressionError) {
                console.warn('Image compression failed, using original file:', compressionError);
                toast('画像の圧縮に失敗したため、オリジナルサイズでアップロードします', { icon: '⚠️' });
            }

            // 2. Upload (Compressed or Original)
            const fileExt = fileToUpload.name.split('.').pop() || 'jpg';
            // Ensure unique name
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage.from('hazard-photos').upload(filePath, fileToUpload);

            if (uploadError) {
                console.error('Upload error:', uploadError);
                throw uploadError;
            }

            const { data } = supabase.storage.from('hazard-photos').getPublicUrl(filePath);
            return data.publicUrl;

        } catch (error: any) {
            console.error('Image upload failed:', error);
            toast.error('画像のアップロードに失敗しました', { id: 'upload-error' });
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

        const { fullAddress, cityCode, cityName } = await getAddressFromCoords(center.lat, center.lng, allCities);

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
                image_url: uploadedImageUrl,
                is_location_verified: isLocationVerified,
                photo_taken_at: photoDistance ? Math.round(photoDistance) : null
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
                /* 共通ボタンクラス */
                .map-fab-btn {
                    width: 55px !important;
                    height: 55px !important;
                    min-width: 55px !important;
                    flex-shrink: 0 !important;
                    font-size: 24px !important;
                    border-radius: 50% !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
                    border: none !important;
                    cursor: pointer !important;
                    background: white;
                    color: #333;
                    z-index: 999 !important;
                    transition: all 0.2s ease !important;
                }
                .map-fab-btn:active {
                    transform: scale(0.95);
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2) !important;
                }
                
                /* ▼▼▼ スマホ (幅480px以下) 向けの調整 ▼▼▼ */
                @media (max-width: 480px) {
                    .map-fab-btn {
                        width: 45px !important;
                        height: 45px !important;
                        min-width: 45px !important;
                        font-size: 22px !important;
                    }
                    .header-title {
                        font-size: 14px !important;
                        white-space: normal !important;
                        max-width: 200px;
                        line-height: 1.3;
                        display: block !important;
                        text-align: left;
                    }
                    .mobile-br {
                        display: inline;
                    }
                    /* ... (omitting other existing overrides to keep them) ... */

                    #recent-reports-container {
                        width: 288px !important;
                        left: 3% !important;
                        bottom: 15px !important;
                        max-height: 120px !important;
                    }
                    /* ... (keeping rest) ... */
                    .report-list-header {
                        padding: 8px 10px 4px !important;
                    }
                    .report-list-title {
                        font-size: 13.5px !important;
                    }
                    .report-item {
                        font-size: 11.5px !important;
                        padding: 3px 0 !important;
                        margin-bottom: 3px !important;
                        line-height: 1.3 !important;
                    }
                    .report-list-footer {
                        padding: 6px 10px !important;
                        font-size: 11px !important;
                    }
                    .footer-link {
                        font-size: 11px !important;
                        padding-right: 4px !important;
                        padding-left: 4px !important;
                    }
                }

                /* Hide mobile-br on larger screens */
                @media (min-width: 481px) {
                    .mobile-br {
                        display: none;
                    }
                }

                /* ▼▼▼ Ranking Widget Mobile & Animation ▼▼▼ */
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                @media (max-width: 768px) {
                    .ranking-widget-wrapper {
                        top: 0 !important;
                        left: 0 !important;
                        width: 100% !important;
                        z-index: 3000 !important;
                        animation: slideDown 0.3s ease-out;
                    }
                    .ranking-widget {
                        max-width: none !important;
                        border-radius: 0 0 8px 8px !important; /* Bottom rounded only */
                        box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important;
                        border-top: none !important;
                    }
                    .ranking-header {
                        display: none;
                    }
                    .ranking-item {
                        display: none;
                    }
                }
            `}</style>

            <Suspense fallback={null}>
                <MapControllerLogic
                    setCenter={setCenter}
                    setZoom={setZoom}
                    enableLocalStorage={!cityData}
                />
            </Suspense>

            <header
                style={{
                    padding: '12px 8px',
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
                <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                    <h1
                        className="header-title"
                        style={{
                            margin: 0,
                            fontSize: '19px',
                            fontWeight: '600',
                            whiteSpace: 'normal',
                            lineHeight: 1.2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                        }}
                    >
                        {cityData ? (
                            <>
                                {getPrefName(cityData.id.substring(0, 2))}{cityData.name}
                                <br className="mobile-br" />
                                みんなのマチレポ
                            </>
                        ) : 'みんなのマチレポ'}
                    </h1>
                </div>
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


                {/* Top Left: Zoom Controls & Ranking */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button className="map-fab-btn" onClick={() => setZoom(zoom + 1)} title="拡大">＋</button>
                        <button className="map-fab-btn" onClick={() => setZoom(zoom - 1)} title="縮小">－</button>
                    </div>

                    <button
                        className="map-fab-btn"
                        onClick={() => setIsRankingOpen(true)}
                        title="投稿ランキング"
                        style={{
                            opacity: isRankingOpen ? 0 : 1,
                            pointerEvents: isRankingOpen ? 'none' : 'auto',
                            transform: isRankingOpen ? 'scale(0.8)' : 'scale(1)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        🏆
                    </button>
                </div>

                {/* Absolute Ranking Widget (Always Rendered for Animation) */}
                <div
                    className="ranking-widget-wrapper"
                    style={{
                        position: 'absolute',
                        top: '150px',
                        left: '20px',
                        zIndex: 1000,
                        width: '300px',
                        opacity: isRankingOpen ? 1 : 0,
                        transform: isRankingOpen ? 'translateY(0) scale(1)' : 'translateY(-20px) scale(0.95)',
                        transformOrigin: 'top left',
                        pointerEvents: isRankingOpen ? 'auto' : 'none',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' // 'Power3.easeOut' like curve
                    }}
                >
                    <RankingWidget
                        allCities={allCities}
                        isOpen={isRankingOpen}
                        setIsOpen={setIsRankingOpen}
                    />
                </div>


                {/* Top Right: Search & Map Menu */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '16px' }}>
                    {/* Search Button */}
                    <button
                        className="map-fab-btn"
                        onClick={() => setIsSearchModalOpen(true)}
                        title="地域検索"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <button
                            className="map-fab-btn"
                            onClick={() => setIsMapMenuOpen(!isMapMenuOpen)}
                            title="地図切り替え"
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
                </div>

                {/* Bottom Right: GPS & Post */}
                {!isModalOpen && (
                    <div style={{ position: 'absolute', bottom: '30px', right: '20px', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 1000 }}>
                        <button
                            className="map-fab-btn"
                            onClick={handleCurrentLocation}
                            disabled={isLoadingGPS}
                            title="現在地へ"
                        >
                            {isLoadingGPS ? (
                                '...'
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                                </svg>
                            )}
                        </button>
                        <button
                            className="map-fab-btn"
                            onClick={() => setIsModalOpen(true)}
                            title="投稿する"
                            style={{ background: '#E91E63', color: 'white' }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Bottom Left: Report List Re-open Button (Closed State) */}
                {displayPosts.length > 0 && !isReportListOpen && !isModalOpen && (
                    <button
                        className="map-fab-btn"
                        onClick={() => {
                            setIsReportListOpen(true);
                            localStorage.setItem('hazard-map-report-list-open', 'true');
                        }}
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            zIndex: 1000,
                            padding: '0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '44px',
                            height: '44px',
                            background: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            cursor: 'pointer',
                            color: '#666'
                        }}
                        title="最新レポートを表示"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                    </button>
                )}

                {/* Bottom Left: Report List (Open State) */}
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
                            maxWidth: '360px',
                            width: '90%',
                            height: 'auto',
                            maxHeight: '230px',
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
                            <h3 className="report-list-title" style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                                {cityData ? `${cityData.name}の最新レポート` : '最新のレポート'}
                            </h3>
                            <button
                                onClick={() => {
                                    setIsReportListOpen(false);
                                    localStorage.setItem('hazard-map-report-list-open', 'false');
                                }}
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
                                                fontSize: '15px'
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
                                fontSize: '12px',
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
                        className="map-fab-btn"
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                        }}
                        aria-label="レポートリストを開く"
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
            </div>

            {
                isModalOpen && (
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
                )
            }
            {isSearchModalOpen && (
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
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        padding: '20px',
                        paddingTop: '80px' // Slightly from top
                    }}
                    onClick={() => setIsSearchModalOpen(false)}
                >
                    <div
                        style={{
                            background: '#fff',
                            width: '100%',
                            maxWidth: '400px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '80vh'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ padding: '16px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                type="text"
                                placeholder="自治体名を入力 (例: 新宿)"
                                value={citySearchQuery}
                                onChange={(e) => setCitySearchQuery(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '16px',
                                    padding: '4px',
                                    background: '#fff',
                                    color: '#333'
                                }}
                                autoFocus
                            />
                            <button
                                onClick={() => setIsSearchModalOpen(false)}
                                style={{
                                    background: '#f0f0f0',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div style={{ overflowY: 'auto', flex: 1, padding: '0' }}>
                            {sortedCities.filter(c => c.name.includes(citySearchQuery)).length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
                                    見つかりませんでした
                                </div>
                            ) : (
                                <ul style={{ listStyle: 'none', margin: 0, padding: '0' }}>
                                    {sortedCities
                                        .filter((city) => city.name.includes(citySearchQuery))
                                        .map((city) => (
                                            <li key={city.id}>
                                                <Link
                                                    href={`/${city.slug}`}
                                                    style={{
                                                        display: 'block',
                                                        padding: '12px 16px',
                                                        textDecoration: 'none',
                                                        color: '#333',
                                                        borderBottom: '1px solid #f0f0f0',
                                                        fontSize: '15px'
                                                    }}
                                                    onClick={() => setIsSearchModalOpen(false)}
                                                >
                                                    {city.name}
                                                    <span style={{ fontSize: '11px', color: '#888', marginLeft: '8px' }}>
                                                        {getPrefName(city.prefecture_code || '')}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </main >
    );
}
