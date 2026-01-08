'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { REASONS, ReasonType } from '@/constants/reasons';
import { CITIES } from '@/constants/cities';
import AdminPostDetailModal from './AdminPostDetailModal';

const HazardMap = dynamic(() => import('@/components/HazardMap'), {
    loading: () => <div className="p-10 text-center text-gray-500">地図を読み込み中...</div>,
    ssr: false
});

const ADMIN_STORAGE_KEY = 'hazard-map-admin-pos';

type AdminDashboardProps = {
    fixedCityCode?: string;
    allowFiltering?: boolean;
};

const INITIAL_VISIBLE_COLUMNS = {
    id: true,
    reason: true,
    address: true,
    userTags: true,
    empathy: true,
    date: true,
    adminTags: true,
    actions: true
};

export default function AdminDashboard({ fixedCityCode, allowFiltering = true }: AdminDashboardProps) {
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [selectedReasons, setSelectedReasons] = useState<ReasonType[]>([]);
    const [currentCityKey, setCurrentCityKey] = useState<string>('');
    const [center, setCenter] = useState({ lat: 35.85, lng: 139.5 });
    const [zoom, setZoom] = useState(11);
    const [mapMode, setMapMode] = useState<'standard' | 'simple' | 'satellite'>('standard');

    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHeatmapMode, setIsHeatmapMode] = useState(false);
    const [heatmapRadius, setHeatmapRadius] = useState(50);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS);

    const storageKey = fixedCityCode ? `hazard-map-admin-pos-${fixedCityCode}` : 'hazard-map-admin-pos-global';

    useEffect(() => {
        if (fixedCityCode) {
            const entry = Object.entries(CITIES).find(([_, city]) => city.id === fixedCityCode);
            if (entry) {
                const [key, city] = entry;
                setCurrentCityKey(key);
                setCenter({ lat: city.lat, lng: city.lng });
                setZoom(city.zoom);
            }
        }
    }, [fixedCityCode]);

    const fetchPosts = useCallback(async () => {
        try {
            const { data: postsData, error: postsError } = await supabase.from('hazard_posts').select('*').order('created_at', { ascending: false });

            if (postsError) {
                console.error('Posts Fetch Error:', postsError);
                toast.error('投稿データの取得に失敗しました');
                return;
            }

            const { data: postTagsData } = await supabase.from('post_tags').select('post_id, tag_id, created_at');
            const { data: adminTagsData } = await supabase.from('admin_tags').select('*');

            const processedData = (postsData || []).map((post: any) => {
                const myPostTags = (postTagsData || []).filter((pt: any) => pt.post_id === post.id);
                const tagsWithDetails = myPostTags.map((pt: any) => {
                    const tagDetail = (adminTagsData || []).find((at: any) => at.id === pt.tag_id);
                    return { ...pt, admin_tags: tagDetail };
                });
                tagsWithDetails.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                return { ...post, post_tags: tagsWithDetails };
            });

            setAllPosts(processedData);
            setFilteredPosts((prev) => (prev.length === 0 && processedData.length > 0 ? processedData : prev));
        } catch (e) {
            console.error('Unexpected Error:', e);
            toast.error('予期せぬエラーが発生しました');
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    useEffect(() => {
        if (allPosts.length === 0) return;
        let tempPosts = allPosts;
        if (selectedReasons.length > 0) {
            tempPosts = tempPosts.filter((post) => selectedReasons.includes(post.reason));
        } else {
            tempPosts = [];
        }
        if (fixedCityCode) {
            tempPosts = tempPosts.filter((post) => post.city_code === fixedCityCode);
        } else if (currentCityKey) {
            // @ts-ignore
            const cityId = CITIES[currentCityKey]?.id;
            if (cityId) tempPosts = tempPosts.filter((post) => post.city_code === cityId);
        }
        setFilteredPosts(tempPosts);
        setCurrentPage(1);
    }, [selectedReasons, currentCityKey, allPosts, fixedCityCode]);

    useEffect(() => {
        setSelectedReasons([...REASONS]);
    }, []);

    useEffect(() => {
        const savedPos = localStorage.getItem(storageKey);
        if (savedPos) {
            try {
                const parsed = JSON.parse(savedPos);
                if (parsed.lat && parsed.lng && !isNaN(parsed.lat) && !isNaN(parsed.lng)) {
                    setCenter({ lat: parsed.lat, lng: parsed.lng });
                    if (parsed.zoom) setZoom(parsed.zoom);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, [storageKey]);

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) setCurrentPage(newPage);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val > 0) {
            setItemsPerPage(val);
            setCurrentPage(1);
        }
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityKey = e.target.value;
        setCurrentCityKey(cityKey);
        if (cityKey === '') {
            const defaultCenter = { lat: 35.85, lng: 139.5 };
            setCenter(defaultCenter);
            setZoom(11);
            localStorage.setItem(storageKey, JSON.stringify({ ...defaultCenter, zoom: 11 }));
            return;
        }
        // @ts-ignore
        const city = CITIES[cityKey];
        if (city) {
            setCenter({ lat: city.lat, lng: city.lng });
            setZoom(city.zoom);
            localStorage.setItem(storageKey, JSON.stringify({ lat: city.lat, lng: city.lng, zoom: city.zoom }));
        }
    };

    const toggleReason = (reason: ReasonType) => {
        setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]));
    };

    const toggleColumn = (col: keyof typeof INITIAL_VISIBLE_COLUMNS) => {
        setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
    };

    const handleJumpToPost = (lat: number, lng: number) => {
        setCenter({ lat, lng });
        setZoom(16);
        localStorage.setItem(storageKey, JSON.stringify({ lat, lng, zoom: 16 }));
    };

    const handleMapChange = (lat: number, lng: number, newZoom: number) => {
        setCenter({ lat, lng });
        setZoom(newZoom);
        localStorage.setItem(storageKey, JSON.stringify({ lat, lng, zoom: newZoom }));
    };

    const handleShowPhoto = (imageUrl?: string) => {
        if (!imageUrl) {
            toast('写真はありません', { icon: 'no', style: { borderRadius: '10px', background: '#333', color: '#fff' } });
            return;
        }
        setPreviewImageUrl(imageUrl);
    };

    const closePreview = () => setPreviewImageUrl(null);
    const handlePostUpdate = (postId: number, newCount: number) =>
        setAllPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, empathy_count: newCount } : p)));
    const handleOpenDetail = (post: any) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };
    const handleModalUpdate = () => {
        fetchPosts();
    };

    const displayCityName = fixedCityCode
        ? Object.values(CITIES).find((c) => c.id === fixedCityCode)?.name
        : currentCityKey
        ? // @ts-ignore
          CITIES[currentCityKey]?.name
        : '全域';

    return (
        // ▼▼▼ 修正: 全体の文字色を濃く(#333)固定し、ダークモードの文字色反転を防ぐ ▼▼▼
        <div style={{ width: '100%', height: '100vh', display: 'flex', fontFamily: 'sans-serif', overflow: 'hidden', color: '#333' }}>
            <aside
                style={{
                    width: '280px',
                    background: '#2c3e50',
                    color: '#ecf0f1',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid #34495e',
                    flexShrink: 0
                }}
            >
                <div style={{ padding: '20px', borderBottom: '1px solid #34495e' }}>
                    <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                        {fixedCityCode ? `${displayCityName} 自治体管理画面` : '総合管理画面'}
                    </h1>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '25px', overflowY: 'auto' }}>
                    <div
                        style={{
                            background: 'white',
                            padding: '15px',
                            borderRadius: '8px',
                            marginBottom: '5px',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{ fontSize: '13px', color: '#555', marginBottom: '5px', fontWeight: 'bold' }}>現在の表示件数</div>
                        <div style={{ fontSize: '32px', fontWeight: '800', color: '#2c3e50', lineHeight: '1' }}>
                            {filteredPosts.length}
                            <span style={{ fontSize: '16px', marginLeft: '4px', fontWeight: 'normal' }}>件</span>
                        </div>
                    </div>
                    {/* (サイドバーの他のコントロールはそのまま) */}
                    {allowFiltering && (
                        <div>
                            <label style={{ display: 'block', fontSize: '13px', color: '#bdc3c7', marginBottom: '8px' }}>表示エリア選択</label>
                            <select
                                value={currentCityKey}
                                onChange={handleCityChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '6px',
                                    border: '1px solid #555',
                                    background: '#34495e',
                                    color: 'white',
                                    fontSize: '14px'
                                }}
                            >
                                <option value="">未選択（全域）</option>
                                {Object.entries(CITIES).map(([key, city]) => (
                                    <option key={key} value={key}>
                                        埼玉県 {city.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#bdc3c7', marginBottom: '8px' }}>可視化モード</label>
                        <button
                            onClick={() => setIsHeatmapMode(!isHeatmapMode)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: isHeatmapMode ? '#e74c3c' : '#3498db',
                                border: 'none',
                                borderRadius: '6px',
                                color: 'white',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                transition: 'all 0.3s',
                                boxShadow: isHeatmapMode ? '0 0 10px rgba(231, 76, 60, 0.5)' : 'none'
                            }}
                        >
                            {isHeatmapMode ? '🔥 ヒートマップ表示中' : '📍 ピン表示 (通常)'}
                        </button>
                        {isHeatmapMode && (
                            <div style={{ marginTop: '10px', background: '#34495e', padding: '10px', borderRadius: '6px', border: '1px solid #555' }}>
                                <label style={{ display: 'block', fontSize: '12px', color: '#bdc3c7', marginBottom: '6px' }}>
                                    広がりの強さ (半径)
                                </label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    {[25, 50, 80].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => setHeatmapRadius(r)}
                                            style={{
                                                flex: 1,
                                                padding: '6px',
                                                fontSize: '12px',
                                                border: '1px solid #777',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                background: heatmapRadius === r ? '#fff' : 'transparent',
                                                color: heatmapRadius === r ? '#333' : '#fff',
                                                fontWeight: heatmapRadius === r ? 'bold' : 'normal'
                                            }}
                                        >
                                            {r === 25 ? '小' : r === 50 ? '中' : '大'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#bdc3c7', marginBottom: '8px' }}>地図表示モード</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <button
                                onClick={() => setMapMode('standard')}
                                style={{
                                    padding: '10px',
                                    border: 'none',
                                    background: mapMode === 'standard' ? '#3498db' : '#34495e',
                                    color: 'white',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '13px'
                                }}
                            >
                                標準 (OSM)
                            </button>
                            <button
                                onClick={() => setMapMode('simple')}
                                style={{
                                    padding: '10px',
                                    border: 'none',
                                    background: mapMode === 'simple' ? '#3498db' : '#34495e',
                                    color: 'white',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '13px'
                                }}
                            >
                                シンプル
                            </button>
                            <button
                                onClick={() => setMapMode('satellite')}
                                style={{
                                    padding: '10px',
                                    border: 'none',
                                    background: mapMode === 'satellite' ? '#3498db' : '#34495e',
                                    color: 'white',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '13px'
                                }}
                            >
                                航空写真
                            </button>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#bdc3c7', marginBottom: '8px' }}>不安カテゴリで絞り込み</label>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                                background: '#34495e',
                                padding: '12px',
                                borderRadius: '6px'
                            }}
                        >
                            {REASONS.map((reason) => (
                                <label
                                    key={reason}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        color: 'white'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedReasons.includes(reason)}
                                        onChange={() => toggleReason(reason)}
                                        style={{ accentColor: '#3498db', transform: 'scale(1.2)' }}
                                    />
                                    {reason}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: 'auto', borderTop: '1px solid #34495e', paddingTop: '20px' }}>
                        <a
                            href="/"
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '12px',
                                background: 'transparent',
                                border: '1px solid #7f8c8d',
                                color: '#ecf0f1',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                textAlign: 'center',
                                textDecoration: 'none'
                            }}
                        >
                            ← 一般ページへ戻る
                        </a>
                    </div>
                </div>
            </aside>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: '0 0 auto', height: '60vh', position: 'relative', borderBottom: '1px solid #ddd' }}>
                    <HazardMap
                        posts={filteredPosts}
                        centerPos={center}
                        zoomLevel={zoom}
                        onMapChange={handleMapChange}
                        mapMode={mapMode}
                        // @ts-ignore
                        selectedCityId={fixedCityCode || (currentCityKey ? CITIES[currentCityKey]?.id : null)}
                        isAdmin={true}
                        onPostUpdate={handlePostUpdate}
                        showHeatmap={isHeatmapMode}
                        heatmapRadius={heatmapRadius}
                        onAdminSelectPost={handleOpenDetail}
                    />
                </div>

                <div style={{ flex: 1, overflowY: 'auto', background: '#f0f2f5', padding: '20px' }}>
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            border: '1px solid #e1e4e8',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', background: '#fff' }}>
                            <details>
                                <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#333', fontSize: '14px' }}>
                                    ⚙️ 表示オプション / カラム設定
                                </summary>
                                <div
                                    style={{
                                        marginTop: '15px',
                                        padding: '15px',
                                        background: '#f9f9f9',
                                        borderRadius: '6px',
                                        border: '1px solid #eee'
                                    }}
                                >
                                    <div style={{ marginBottom: '15px' }}>
                                        <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                                            表示するカラム:
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            >
                                                <input type="checkbox" checked={visibleColumns.id} onChange={() => toggleColumn('id')} /> ID
                                            </label>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            >
                                                <input type="checkbox" checked={visibleColumns.reason} onChange={() => toggleColumn('reason')} /> 不安
                                            </label>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            >
                                                <input type="checkbox" checked={visibleColumns.address} onChange={() => toggleColumn('address')} />{' '}
                                                住所
                                            </label>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            >
                                                <input type="checkbox" checked={visibleColumns.userTags} onChange={() => toggleColumn('userTags')} />{' '}
                                                ユーザータグ
                                            </label>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            >
                                                <input type="checkbox" checked={visibleColumns.empathy} onChange={() => toggleColumn('empathy')} />{' '}
                                                同感
                                            </label>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            >
                                                <input type="checkbox" checked={visibleColumns.date} onChange={() => toggleColumn('date')} /> 日時
                                            </label>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={visibleColumns.adminTags}
                                                    onChange={() => toggleColumn('adminTags')}
                                                />{' '}
                                                管理用タグ
                                            </label>
                                            <label
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    fontSize: '13px',
                                                    cursor: 'pointer',
                                                    color: '#333'
                                                }}
                                            >
                                                <input type="checkbox" checked={visibleColumns.actions} onChange={() => toggleColumn('actions')} />{' '}
                                                操作
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                                            ページネーション:
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '13px', color: '#333' }}>ページごとに表示する項目数:</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={itemsPerPage}
                                                onChange={handleItemsPerPageChange}
                                                style={{
                                                    width: '60px',
                                                    padding: '4px',
                                                    borderRadius: '4px',
                                                    border: '1px solid #ccc',
                                                    color: '#333',
                                                    background: '#fff'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </details>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead style={{ background: '#34495e' }}>
                                    <tr>
                                        {visibleColumns.id && (
                                            <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>ID</th>
                                        )}
                                        {visibleColumns.reason && (
                                            <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>不安</th>
                                        )}
                                        {visibleColumns.address && (
                                            <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>住所</th>
                                        )}
                                        {visibleColumns.userTags && (
                                            <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>タグ(ユーザー)</th>
                                        )}
                                        {visibleColumns.empathy && (
                                            <th style={{ padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '600' }}>同感</th>
                                        )}
                                        {visibleColumns.date && (
                                            <th style={{ padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '600' }}>日時</th>
                                        )}
                                        {visibleColumns.adminTags && (
                                            <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>管理タグ</th>
                                        )}
                                        {visibleColumns.actions && (
                                            <th style={{ padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '600' }}>操作</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedPosts.map((post, index) => (
                                        <tr
                                            key={post.id}
                                            style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}
                                        >
                                            {/* ▼▼▼ 修正: 文字色を #333 や #111 に濃く変更 ▼▼▼ */}
                                            {visibleColumns.id && <td style={{ padding: '12px 14px', color: '#333' }}>{post.id}</td>}
                                            {visibleColumns.reason && (
                                                <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#111' }}>{post.reason}</td>
                                            )}
                                            {visibleColumns.address && (
                                                <td
                                                    style={{
                                                        padding: '12px 14px',
                                                        color: '#333',
                                                        maxWidth: '200px',
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                >
                                                    {post.address || '-'}
                                                </td>
                                            )}
                                            {visibleColumns.userTags && (
                                                <td style={{ padding: '12px 14px', color: '#333' }}>{post.tags?.join(', ')}</td>
                                            )}
                                            {visibleColumns.empathy && (
                                                <td style={{ padding: '12px 14px', textAlign: 'center', color: '#111', fontWeight: 'bold' }}>
                                                    {post.empathy_count}
                                                </td>
                                            )}
                                            {visibleColumns.date && (
                                                <td style={{ padding: '12px 14px', textAlign: 'center', color: '#444' }}>
                                                    {new Date(post.created_at).toLocaleString('ja-JP', {
                                                        year: 'numeric',
                                                        month: '2-digit',
                                                        day: '2-digit',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </td>
                                            )}
                                            {visibleColumns.adminTags && (
                                                <td style={{ padding: '12px 14px' }}>
                                                    {post.post_tags && post.post_tags.length > 0 ? (
                                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                            {post.post_tags.map((pt: any) => (
                                                                <span
                                                                    key={pt.tag_id}
                                                                    style={{
                                                                        fontSize: '11px',
                                                                        padding: '2px 6px',
                                                                        borderRadius: '4px',
                                                                        color: 'white',
                                                                        background: pt.admin_tags?.color || '#999'
                                                                    }}
                                                                >
                                                                    {pt.admin_tags?.label}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span style={{ fontSize: '11px', color: '#999' }}>未設定</span>
                                                    )}
                                                </td>
                                            )}
                                            {visibleColumns.actions && (
                                                <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                        <button
                                                            onClick={() => handleJumpToPost(post.lat, post.lng)}
                                                            style={{
                                                                padding: '6px 10px',
                                                                background: '#3498db',
                                                                border: '1px solid #2980b9',
                                                                color: 'white',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                fontSize: '12px'
                                                            }}
                                                            title="地図へ移動"
                                                        >
                                                            🗺️
                                                        </button>
                                                        <button
                                                            onClick={() => handleShowPhoto(post.image_url)}
                                                            disabled={!post.image_url}
                                                            style={{
                                                                padding: '6px 10px',
                                                                background: post.image_url ? '#e67e22' : '#f0f2f5',
                                                                border: post.image_url ? '1px solid #d35400' : '1px solid #dce0e5',
                                                                color: post.image_url ? '#ffffff' : '#aab2bd',
                                                                borderRadius: '4px',
                                                                cursor: post.image_url ? 'pointer' : 'not-allowed',
                                                                fontSize: '12px'
                                                            }}
                                                            title="写真を見る"
                                                        >
                                                            📷
                                                        </button>
                                                        <button
                                                            onClick={() => handleOpenDetail(post)}
                                                            style={{
                                                                padding: '6px 10px',
                                                                background: '#2c3e50',
                                                                border: '1px solid #34495e',
                                                                color: 'white',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                fontSize: '12px'
                                                            }}
                                                            title="管理詳細・タグ編集"
                                                        >
                                                            🛠
                                                        </button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                    {filteredPosts.length === 0 && (
                                        <tr>
                                            <td colSpan={10} style={{ padding: '30px', textAlign: 'center', color: '#555' }}>
                                                データがありません
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        {filteredPosts.length > itemsPerPage && (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: '15px',
                                    gap: '15px',
                                    borderTop: '1px solid #eee',
                                    background: '#f9f9f9'
                                }}
                            >
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '8px 15px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        background: currentPage === 1 ? '#eee' : 'white',
                                        color: currentPage === 1 ? '#aaa' : '#333',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    前へ
                                </button>
                                <span style={{ fontSize: '14px', color: '#333', fontWeight: 'bold' }}>
                                    {currentPage} / {totalPages} ページ
                                </span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '8px 15px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        background: currentPage === totalPages ? '#eee' : 'white',
                                        color: currentPage === totalPages ? '#aaa' : '#333',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    次へ
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AdminPostDetailModal
                post={selectedPost}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdate={handleModalUpdate}
                cityCodeFilter={fixedCityCode || null}
            />
            {previewImageUrl && (
                <div
                    onClick={closePreview}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0, 0, 0, 0.85)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99999,
                        cursor: 'pointer',
                        padding: '20px'
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            maxWidth: '90%',
                            maxHeight: '90%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={previewImageUrl}
                            alt="拡大プレビュー"
                            style={{
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                borderRadius: '4px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                            }}
                        />
                        <button
                            onClick={closePreview}
                            style={{
                                position: 'absolute',
                                top: '-40px',
                                right: '-10px',
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '30px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
