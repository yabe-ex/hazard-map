'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { REASONS, ReasonType, REASON_TAGS } from '@/constants/reasons';
import { CITIES } from '@/constants/cities';
import AdminPostDetailModal from './AdminPostDetailModal';
import { AdminTag } from '@/types/admin';

const HazardMap = dynamic(() => import('@/components/HazardMap'), {
    loading: () => <div className="p-10 text-center text-gray-500">地図を読み込み中...</div>,
    ssr: false
});

const ADMIN_POS_KEY_PREFIX = 'hazard-map-admin-pos';
const ADMIN_SETTINGS_KEY = 'hazard-map-admin-settings';

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

type SortKey = 'id' | 'reason' | 'address' | 'empathy_count' | 'created_at';
type SortOrder = 'asc' | 'desc';

export default function AdminDashboard({ fixedCityCode, allowFiltering = true }: AdminDashboardProps) {
    // Data States
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [adminTagsMaster, setAdminTagsMaster] = useState<AdminTag[]>([]);

    // Filter States
    const [filterKeyword, setFilterKeyword] = useState('');
    const [filterHasPhoto, setFilterHasPhoto] = useState(false);
    const [selectedReasons, setSelectedReasons] = useState<ReasonType[]>([]);
    const [selectedAdminTagIds, setSelectedAdminTagIds] = useState<number[]>([]);
    const [selectedUserTags, setSelectedUserTags] = useState<string[]>([]);
    const [currentCityKey, setCurrentCityKey] = useState<string>('');

    // Map & UI States
    const [center, setCenter] = useState({ lat: 35.85, lng: 139.5 });
    const [zoom, setZoom] = useState(11);
    const [mapMode, setMapMode] = useState<'standard' | 'simple' | 'satellite'>('standard');
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHeatmapMode, setIsHeatmapMode] = useState(false);
    const [heatmapRadius, setHeatmapRadius] = useState(50);
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    // Pagination & Settings
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [visibleColumns, setVisibleColumns] = useState(INITIAL_VISIBLE_COLUMNS);
    const [mapHeightRatio, setMapHeightRatio] = useState(0.5);
    const [isDragging, setIsDragging] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Sort
    const [sortKey, setSortKey] = useState<SortKey>('created_at');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

    // CSV Export States
    const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
    const [csvStartDate, setCsvStartDate] = useState('');
    const [csvEndDate, setCsvEndDate] = useState('');

    const storagePosKey = fixedCityCode ? `${ADMIN_POS_KEY_PREFIX}-${fixedCityCode}` : `${ADMIN_POS_KEY_PREFIX}-global`;

    // 1. 初期化・設定読み込み
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

        setSelectedReasons([...REASONS]);

        const savedSettings = localStorage.getItem(ADMIN_SETTINGS_KEY);
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                if (parsed.visibleColumns) setVisibleColumns(parsed.visibleColumns);
                if (parsed.itemsPerPage) setItemsPerPage(parsed.itemsPerPage);
                if (parsed.mapHeightRatio) setMapHeightRatio(parsed.mapHeightRatio);
            } catch (e) {
                console.error(e);
            }
        }

        const savedPos = localStorage.getItem(storagePosKey);
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

        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        setCsvStartDate(firstDay.toISOString().split('T')[0]);
        setCsvEndDate(lastDay.toISOString().split('T')[0]);
    }, [fixedCityCode, storagePosKey]);

    useEffect(() => {
        const settings = { visibleColumns, itemsPerPage, mapHeightRatio };
        localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings));
    }, [visibleColumns, itemsPerPage, mapHeightRatio]);

    // 2. データ取得
    const fetchPosts = useCallback(async () => {
        try {
            const { data: postsData, error: postsError } = await supabase.from('hazard_posts').select('*').order('created_at', { ascending: false });

            if (postsError) {
                toast.error('データの取得に失敗しました');
                return;
            }

            const { data: postTagsData } = await supabase.from('post_tags').select('post_id, tag_id, created_at');
            const { data: adminTagsData } = await supabase.from('admin_tags').select('*').order('id');

            if (adminTagsData) setAdminTagsMaster(adminTagsData);

            const processedData = (postsData || []).map((post: any) => {
                const myPostTags = (postTagsData || []).filter((pt: any) => pt.post_id === post.id);
                const tagsWithDetails = myPostTags.map((pt: any) => {
                    const tagDetail = (adminTagsData || []).find((at: any) => at.id === pt.tag_id);
                    return { ...pt, admin_tags: tagDetail };
                });
                tagsWithDetails.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

                let displayColor = undefined;
                let isWhite = false;
                if (!tagsWithDetails || tagsWithDetails.length === 0) {
                    isWhite = true;
                } else {
                    const latestTag = tagsWithDetails[0].admin_tags;
                    if (latestTag?.label === '未着手') isWhite = true;
                    else if (latestTag?.color) displayColor = latestTag.color;
                }

                return {
                    ...post,
                    post_tags: tagsWithDetails,
                    admin_display_color: displayColor,
                    admin_is_white: isWhite
                };
            });

            setAllPosts(processedData);
            setFilteredPosts((prev) => (prev.length === 0 && processedData.length > 0 ? processedData : prev));
        } catch (e) {
            console.error(e);
            toast.error('予期せぬエラーが発生しました');
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // 3. フィルタリング & ソートロジック
    useEffect(() => {
        if (allPosts.length === 0) return;

        let temp = allPosts;

        if (fixedCityCode) {
            temp = temp.filter((p) => p.city_code === fixedCityCode);
        } else if (currentCityKey) {
            // @ts-ignore
            const cityId = CITIES[currentCityKey]?.id;
            if (cityId) temp = temp.filter((p) => p.city_code === cityId);
        }

        if (filterKeyword.trim()) {
            const kw = filterKeyword.trim().toLowerCase();
            temp = temp.filter(
                (p) =>
                    (p.address && p.address.toLowerCase().includes(kw)) ||
                    (p.reason && p.reason.toLowerCase().includes(kw)) ||
                    (p.tags && p.tags.some((t: string) => t.toLowerCase().includes(kw)))
            );
        }

        if (filterHasPhoto) temp = temp.filter((p) => p.image_url);

        if (selectedReasons.length > 0) temp = temp.filter((p) => selectedReasons.includes(p.reason));
        else temp = [];

        if (selectedAdminTagIds.length > 0) {
            const includeNoTag = selectedAdminTagIds.includes(-1);
            const targetIds = selectedAdminTagIds.filter((id) => id !== -1);
            temp = temp.filter((p) => {
                const hasTags = p.post_tags && p.post_tags.length > 0;
                if (includeNoTag && !hasTags) return true;
                if (hasTags && p.post_tags.some((pt: any) => targetIds.includes(pt.tag_id))) return true;
                return false;
            });
        }

        if (selectedUserTags.length > 0) {
            temp = temp.filter((p) => p.tags && p.tags.some((t: string) => selectedUserTags.includes(t)));
        }

        temp = [...temp].sort((a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];
            if (valA === null || valA === undefined) return 1;
            if (valB === null || valB === undefined) return -1;
            if (typeof valA === 'number' && typeof valB === 'number') {
                return sortOrder === 'asc' ? valA - valB : valB - valA;
            }
            if (sortKey === 'created_at') {
                const dateA = new Date(valA).getTime();
                const dateB = new Date(valB).getTime();
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
            valA = String(valA).toLowerCase();
            valB = String(valB).toLowerCase();
            if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
            if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredPosts(temp);
        setCurrentPage(1);
    }, [
        allPosts,
        fixedCityCode,
        currentCityKey,
        filterKeyword,
        filterHasPhoto,
        selectedReasons,
        selectedAdminTagIds,
        selectedUserTags,
        sortKey,
        sortOrder
    ]);

    // 4. ハンドラ類
    const toggleReason = (reason: ReasonType) => {
        setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]));
    };
    const toggleAdminTag = (tagId: number) => {
        setSelectedAdminTagIds((prev) => (prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]));
    };
    const toggleUserTag = (tag: string) => {
        setSelectedUserTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    };

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setSortOrder('desc');
        }
    };

    const renderSortHeader = (label: string, key: SortKey, align: 'left' | 'center' = 'left', minWidth?: string) => (
        <th
            onClick={() => handleSort(key)}
            style={{
                padding: '14px',
                textAlign: align,
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                userSelect: 'none',
                minWidth: minWidth,
                whiteSpace: minWidth ? 'nowrap' : 'normal'
            }}
            title={`${label}で並び替え`}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: align === 'center' ? 'center' : 'flex-start', gap: '4px' }}>
                {label}
                {sortKey === key && <span style={{ fontSize: '10px' }}>{sortOrder === 'asc' ? '▲' : '▼'}</span>}
                {sortKey !== key && <span style={{ fontSize: '10px', opacity: 0.3 }}>▼</span>}
            </div>
        </th>
    );

    const handleDownloadCsv = async () => {
        if (!csvStartDate || !csvEndDate) {
            toast.error('期間を指定してください');
            return;
        }
        const start = new Date(csvStartDate);
        const end = new Date(csvEndDate);
        end.setHours(23, 59, 59, 999);

        let targetPosts = allPosts.filter((p) => {
            const d = new Date(p.created_at);
            return d >= start && d <= end;
        });

        if (fixedCityCode) {
            targetPosts = targetPosts.filter((p) => p.city_code === fixedCityCode);
        } else if (currentCityKey) {
            // @ts-ignore
            const cityId = CITIES[currentCityKey]?.id;
            if (cityId) targetPosts = targetPosts.filter((p) => p.city_code === cityId);
        }

        if (targetPosts.length === 0) {
            toast.error('指定期間にデータがありません');
            return;
        }

        const header = ['ID', '日時', '不安カテゴリ', '住所', '詳細タグ(ユーザー)', '管理ステータス', '同感数', '緯度', '経度', '画像URL'];
        const rows = targetPosts.map((post) => {
            const dateStr = new Date(post.created_at).toLocaleString('ja-JP');
            const userTagsStr = post.tags ? post.tags.join(' | ') : '';
            const adminTagsStr = post.post_tags ? post.post_tags.map((pt: any) => pt.admin_tags?.label).join(' | ') : '未対応';
            const escape = (val: any) => `"${String(val || '').replace(/"/g, '""')}"`;
            return [
                escape(post.id),
                escape(dateStr),
                escape(post.reason),
                escape(post.address),
                escape(userTagsStr),
                escape(adminTagsStr),
                escape(post.empathy_count),
                escape(post.lat),
                escape(post.lng),
                escape(post.image_url)
            ].join(',');
        });

        const csvContent = '\uFEFF' + header.join(',') + '\n' + rows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `hazard_report_${csvStartDate}_${csvEndDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsCsvModalOpen(false);
        toast.success(`${targetPosts.length}件を出力しました`);
    };

    const handleDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const ratio = Math.max(0.1, Math.min(0.9, (e.clientY - rect.top) / rect.height));
            setMapHeightRatio(ratio);
        };
        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                window.dispatchEvent(new Event('resize'));
            }
        };
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const key = e.target.value;
        setCurrentCityKey(key);
        // @ts-ignore
        const city = CITIES[key];
        const target = city ? { lat: city.lat, lng: city.lng, zoom: city.zoom } : { lat: 35.85, lng: 139.5, zoom: 11 };
        setCenter({ lat: target.lat, lng: target.lng });
        setZoom(target.zoom);
        localStorage.setItem(storagePosKey, JSON.stringify(target));
    };
    const handleJumpToPost = (lat: number, lng: number) => {
        setCenter({ lat, lng });
        setZoom(16);
        localStorage.setItem(storagePosKey, JSON.stringify({ lat, lng, zoom: 16 }));
    };
    const handleMapChange = (lat: number, lng: number, z: number) => {
        setCenter({ lat, lng });
        setZoom(z);
        localStorage.setItem(storagePosKey, JSON.stringify({ lat, lng, zoom: z }));
    };
    const handleShowPhoto = (url?: string) => {
        if (!url) return;
        setPreviewImageUrl(url);
    };
    const closePreview = () => setPreviewImageUrl(null);
    const handlePostUpdate = (id: number, count: number) =>
        setAllPosts((prev) => prev.map((p) => (p.id === id ? { ...p, empathy_count: count } : p)));
    const handleOpenDetail = (post: any) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };
    const handleModalUpdate = () => fetchPosts();
    const handlePageChange = (p: number) => setCurrentPage(p);
    const toggleColumn = (col: keyof typeof INITIAL_VISIBLE_COLUMNS) => setVisibleColumns((prev) => ({ ...prev, [col]: !prev[col] }));
    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = parseInt(e.target.value);
        if (v > 0) {
            setItemsPerPage(v);
            setCurrentPage(1);
        }
    };

    const displayCityName = fixedCityCode
        ? Object.values(CITIES).find((c) => c.id === fixedCityCode)?.name
        : currentCityKey
        ? // @ts-ignore
          CITIES[currentCityKey]?.name
        : '全域';

    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
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
                {/* サイドバー */}
                <div style={{ padding: '15px 20px', borderBottom: '1px solid #34495e' }}>
                    <h1 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                        {fixedCityCode ? `${displayCityName} 管理画面` : '総合管理画面'}
                    </h1>
                </div>

                <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
                    {/* 件数表示 */}
                    <div
                        style={{
                            background: 'white',
                            padding: '10px',
                            borderRadius: '6px',
                            textAlign: 'center',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{ fontSize: '11px', color: '#555', fontWeight: 'bold' }}>現在の表示件数</div>
                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#2c3e50', lineHeight: '1.2' }}>
                            {filteredPosts.length}
                            <span style={{ fontSize: '12px', marginLeft: '2px', fontWeight: 'normal' }}>件</span>
                        </div>
                    </div>

                    {/* ▲▲▲ キーワード検索・写真フィルタはここから削除しました ▲▲▲ */}

                    {allowFiltering && (
                        <div>
                            <label style={{ display: 'block', fontSize: '12px', color: '#bdc3c7', marginBottom: '5px' }}>表示エリア</label>
                            <select
                                value={currentCityKey}
                                onChange={handleCityChange}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #555',
                                    background: '#34495e',
                                    color: 'white',
                                    fontSize: '13px'
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
                    <hr style={{ border: 'none', borderTop: '1px solid #34495e', margin: '0' }} />
                    <details>
                        <summary style={{ fontSize: '13px', color: '#ecf0f1', cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>
                            🗺️ 地図・表示設定
                        </summary>
                        <div style={{ paddingLeft: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button
                                onClick={() => setIsHeatmapMode(!isHeatmapMode)}
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    background: isHeatmapMode ? '#e74c3c' : '#3498db',
                                    border: 'none',
                                    borderRadius: '4px',
                                    color: 'white',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                }}
                            >
                                {isHeatmapMode ? '🔥 ヒートマップ中' : '📍 ピン表示中'}
                            </button>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <button
                                    onClick={() => setMapMode('standard')}
                                    style={{
                                        flex: 1,
                                        padding: '6px',
                                        border: 'none',
                                        background: mapMode === 'standard' ? '#2980b9' : '#34495e',
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    標準
                                </button>
                                <button
                                    onClick={() => setMapMode('simple')}
                                    style={{
                                        flex: 1,
                                        padding: '6px',
                                        border: 'none',
                                        background: mapMode === 'simple' ? '#2980b9' : '#34495e',
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    白地図
                                </button>
                                <button
                                    onClick={() => setMapMode('satellite')}
                                    style={{
                                        flex: 1,
                                        padding: '6px',
                                        border: 'none',
                                        background: mapMode === 'satellite' ? '#2980b9' : '#34495e',
                                        color: 'white',
                                        borderRadius: '4px',
                                        fontSize: '11px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    航空
                                </button>
                            </div>
                        </div>
                    </details>
                    <hr style={{ border: 'none', borderTop: '1px solid #34495e', margin: '0' }} />
                    <details open>
                        <summary style={{ fontSize: '13px', color: '#ecf0f1', cursor: 'pointer', fontWeight: 'bold', marginBottom: '8px' }}>
                            🏷️ 管理ステータス
                        </summary>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '5px' }}>
                            <label
                                style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#bdc3c7', cursor: 'pointer' }}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedAdminTagIds.includes(-1)}
                                    onChange={() => toggleAdminTag(-1)}
                                    style={{ accentColor: '#3498db' }}
                                />
                                <span style={{ padding: '2px 6px', borderRadius: '4px', background: '#95a5a6', color: 'white', fontSize: '11px' }}>
                                    未対応 (タグなし)
                                </span>
                            </label>
                            {adminTagsMaster.map((tag) => (
                                <label
                                    key={tag.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        fontSize: '13px',
                                        color: '#bdc3c7',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedAdminTagIds.includes(tag.id)}
                                        onChange={() => toggleAdminTag(tag.id)}
                                        style={{ accentColor: '#3498db' }}
                                    />
                                    <span
                                        style={{ padding: '2px 6px', borderRadius: '4px', background: tag.color, color: 'white', fontSize: '11px' }}
                                    >
                                        {tag.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </details>
                    <hr style={{ border: 'none', borderTop: '1px solid #34495e', margin: '0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#ecf0f1' }}>⚠️ 不安カテゴリ・詳細</div>
                        {REASONS.map((reason) => {
                            const isSelected = selectedReasons.includes(reason);
                            const tags = REASON_TAGS[reason] || [];
                            return (
                                <div
                                    key={reason}
                                    style={{ borderLeft: isSelected ? '3px solid #3498db' : '3px solid transparent', paddingLeft: '8px' }}
                                >
                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            fontSize: '13px',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontWeight: isSelected ? 'bold' : 'normal'
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => toggleReason(reason)}
                                            style={{ accentColor: '#3498db' }}
                                        />
                                        {reason}
                                    </label>
                                    {isSelected && (
                                        <div style={{ marginTop: '5px', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            {tags.map((tag) => (
                                                <label
                                                    key={tag}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '6px',
                                                        fontSize: '12px',
                                                        color: '#bdc3c7',
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUserTags.includes(tag)}
                                                        onChange={() => toggleUserTag(tag)}
                                                        style={{ accentColor: '#1abc9c' }}
                                                    />
                                                    {tag}
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                        <a
                            href="/"
                            style={{
                                display: 'block',
                                width: '100%',
                                padding: '10px',
                                background: 'transparent',
                                border: '1px solid #7f8c8d',
                                color: '#ecf0f1',
                                borderRadius: '4px',
                                fontSize: '13px',
                                textAlign: 'center',
                                textDecoration: 'none'
                            }}
                        >
                            ← 一般ページへ戻る
                        </a>
                    </div>
                </div>
            </aside>

            {/* メインエリア */}
            <div ref={containerRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                <div style={{ height: `${mapHeightRatio * 100}%`, position: 'relative', borderBottom: '1px solid #ddd', minHeight: '100px' }}>
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
                    <div
                        style={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            zIndex: 1000,
                            display: 'flex',
                            gap: '6px',
                            background: 'rgba(255,255,255,0.9)',
                            padding: '6px',
                            borderRadius: '4px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}
                    >
                        <button
                            onClick={() => {
                                setMapHeightRatio(0.25);
                                setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
                            }}
                            style={{
                                fontSize: '11px',
                                padding: '4px 8px',
                                border: '1px solid #ccc',
                                borderRadius: '3px',
                                background: mapHeightRatio === 0.25 ? '#3498db' : 'white',
                                color: mapHeightRatio === 0.25 ? 'white' : '#333',
                                cursor: 'pointer'
                            }}
                        >
                            小
                        </button>
                        <button
                            onClick={() => {
                                setMapHeightRatio(0.5);
                                setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
                            }}
                            style={{
                                fontSize: '11px',
                                padding: '4px 8px',
                                border: '1px solid #ccc',
                                borderRadius: '3px',
                                background: mapHeightRatio === 0.5 ? '#3498db' : 'white',
                                color: mapHeightRatio === 0.5 ? 'white' : '#333',
                                cursor: 'pointer'
                            }}
                        >
                            中
                        </button>
                        <button
                            onClick={() => {
                                setMapHeightRatio(0.75);
                                setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
                            }}
                            style={{
                                fontSize: '11px',
                                padding: '4px 8px',
                                border: '1px solid #ccc',
                                borderRadius: '3px',
                                background: mapHeightRatio === 0.75 ? '#3498db' : 'white',
                                color: mapHeightRatio === 0.75 ? 'white' : '#333',
                                cursor: 'pointer'
                            }}
                        >
                            大
                        </button>
                    </div>
                </div>
                <div
                    onMouseDown={handleDragStart}
                    style={{
                        height: '10px',
                        background: '#f0f2f5',
                        borderTop: '1px solid #ddd',
                        borderBottom: '1px solid #ddd',
                        cursor: 'row-resize',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}
                >
                    <div style={{ width: '40px', height: '4px', background: '#ccc', borderRadius: '2px' }}></div>
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
                        {/* ▼▼▼ リスト上部ヘッダー (レイアウト修正版) ▼▼▼ */}
                        <div style={{ padding: '15px 20px', borderBottom: '1px solid #eee', background: '#fff' }}>
                            {/* Flexコンテナ: 左側に検索・フィルタ、右側に設定・CSV */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                                {/* 左側: 検索 & フィルタ */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                    {/* 1. キーワード検索 (背景を白に) */}
                                    <div style={{ position: 'relative' }}>
                                        <input
                                            type="text"
                                            value={filterKeyword}
                                            onChange={(e) => setFilterKeyword(e.target.value)}
                                            placeholder="キーワード検索..."
                                            style={{
                                                padding: '8px 24px 8px 10px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                background: '#fff', // 背景白
                                                color: '#333', // 文字黒
                                                fontSize: '13px',
                                                width: '240px'
                                            }}
                                        />
                                        {filterKeyword && (
                                            <button
                                                onClick={() => setFilterKeyword('')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '5px',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    color: '#999',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                ×
                                            </button>
                                        )}
                                    </div>

                                    {/* 2. 写真フィルタ */}
                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            cursor: 'pointer',
                                            color: '#333',
                                            fontSize: '13px',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={filterHasPhoto}
                                            onChange={(e) => setFilterHasPhoto(e.target.checked)}
                                            style={{ accentColor: '#3498db', width: '16px', height: '16px' }}
                                        />
                                        写真あり
                                    </label>
                                </div>

                                {/* 右側: 設定ボタン & CSV出力 */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {/* 3. 表示設定ボタン (アイコンなし・ボタンスタイル化) */}
                                    <button
                                        onClick={() => setShowSettings(!showSettings)}
                                        style={{
                                            padding: '8px 14px',
                                            background: '#34495e', // ヘッダーに合わせた濃い色
                                            border: 'none',
                                            borderRadius: '4px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        表示オプション / カラム設定
                                        <span style={{ fontSize: '10px' }}>{showSettings ? '▲' : '▼'}</span>
                                    </button>

                                    {/* 4. CSV出力ボタン */}
                                    <button
                                        onClick={() => setIsCsvModalOpen(true)}
                                        style={{
                                            padding: '8px 14px',
                                            background: '#27ae60', // 緑色
                                            border: 'none',
                                            borderRadius: '4px',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            fontSize: '12px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px'
                                        }}
                                    >
                                        📥 CSV出力
                                    </button>
                                </div>
                            </div>

                            {/* 設定パネル (アコーディオン) */}
                            {showSettings && (
                                <div
                                    style={{
                                        marginTop: '15px',
                                        padding: '15px',
                                        background: '#f8f9fa',
                                        borderRadius: '6px',
                                        border: '1px solid #e9ecef'
                                    }}
                                >
                                    <div style={{ marginBottom: '15px' }}>
                                        <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>
                                            表示するカラム:
                                        </div>
                                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                            {Object.keys(INITIAL_VISIBLE_COLUMNS).map((col) => (
                                                <label
                                                    key={col}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '5px',
                                                        fontSize: '13px',
                                                        cursor: 'pointer',
                                                        color: '#333'
                                                    }}
                                                >
                                                    {/* @ts-ignore */}
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns[col]}
                                                        onChange={() => toggleColumn(col as keyof typeof INITIAL_VISIBLE_COLUMNS)}
                                                        style={{ accentColor: '#34495e' }}
                                                    />
                                                    {col === 'id'
                                                        ? 'ID'
                                                        : col === 'reason'
                                                        ? '不安'
                                                        : col === 'address'
                                                        ? '住所'
                                                        : col === 'userTags'
                                                        ? 'ユーザータグ'
                                                        : col === 'empathy'
                                                        ? '同感'
                                                        : col === 'date'
                                                        ? '日時'
                                                        : col === 'adminTags'
                                                        ? '管理タグ'
                                                        : '操作'}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '13px', color: '#333', fontWeight: 'bold' }}>ページあたりの表示数:</span>
                                        <input
                                            type="number"
                                            min="1"
                                            value={itemsPerPage}
                                            onChange={handleItemsPerPageChange}
                                            style={{
                                                width: '70px',
                                                padding: '6px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                color: '#333',
                                                background: '#fff'
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* テーブル */}
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                                <thead style={{ background: '#34495e' }}>
                                    <tr>
                                        {visibleColumns.id && renderSortHeader('ID', 'id', 'left')}
                                        {visibleColumns.reason && renderSortHeader('不安', 'reason', 'left', '122px')}
                                        {visibleColumns.address && renderSortHeader('住所', 'address', 'left')}
                                        {visibleColumns.userTags && (
                                            <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>タグ(ユーザー)</th>
                                        )}
                                        {visibleColumns.empathy && renderSortHeader('同感', 'empathy_count', 'center', '98px')}
                                        {visibleColumns.date && renderSortHeader('日時', 'created_at', 'center')}
                                        {visibleColumns.adminTags && (
                                            <th
                                                style={{
                                                    padding: '14px',
                                                    textAlign: 'left',
                                                    color: '#fff',
                                                    fontWeight: '600',
                                                    minWidth: '83px',
                                                    whiteSpace: 'nowrap'
                                                }}
                                            >
                                                管理タグ
                                            </th>
                                        )}
                                        {visibleColumns.actions && (
                                            <th style={{ padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '600' }}>操作</th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedPosts.map((post, index) => (
                                        // ▼▼▼ ユーザー指定のHTMLコードを適用 ▼▼▼
                                        <tr
                                            key={post.id}
                                            style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}
                                        >
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
                                                                background: '#f0f2f5',
                                                                border: '1px solid #dce0e5',
                                                                color: '#555',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                fontSize: '12px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}
                                                            title="地図へ"
                                                        >
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 0 18 0z" />
                                                                <circle cx="12" cy="10" r="3" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleShowPhoto(post.image_url)}
                                                            disabled={!post.image_url}
                                                            style={{
                                                                padding: '6px 10px',
                                                                background: post.image_url ? '#e67e22' : '#f0f2f5',
                                                                border: post.image_url ? '1px solid #d35400' : '1px solid #dce0e5',
                                                                color: post.image_url ? '#ffffff' : '#555',
                                                                borderRadius: '4px',
                                                                cursor: post.image_url ? 'pointer' : 'not-allowed',
                                                                fontSize: '12px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center'
                                                            }}
                                                            title="写真を見る"
                                                        >
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            >
                                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                                <polyline points="21 15 16 10 5 21" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleOpenDetail(post)}
                                                            style={{
                                                                padding: '6px 10px',
                                                                background: '#f0f2f5',
                                                                border: '1px solid #dce0e5',
                                                                color: '#2c3e50',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                fontSize: '12px'
                                                            }}
                                                            title="詳細"
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
            {isCsvModalOpen && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 99999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => setIsCsvModalOpen(false)}
                >
                    <div
                        style={{
                            background: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            width: '350px',
                            maxWidth: '90%',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', fontWeight: 'bold', color: '#2c3e50', textAlign: 'center' }}>
                            CSV出力期間の設定
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#7f8c8d', marginBottom: '5px' }}>開始日</label>
                                <input
                                    type="date"
                                    value={csvStartDate}
                                    onChange={(e) => setCsvStartDate(e.target.value)}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#7f8c8d', marginBottom: '5px' }}>終了日</label>
                                <input
                                    type="date"
                                    value={csvEndDate}
                                    onChange={(e) => setCsvEndDate(e.target.value)}
                                    style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button
                                    onClick={() => setIsCsvModalOpen(false)}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        background: '#ccc',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    キャンセル
                                </button>
                                <button
                                    onClick={handleDownloadCsv}
                                    style={{
                                        flex: 1,
                                        padding: '10px',
                                        background: '#27ae60',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ダウンロード
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
                    <img
                        src={previewImageUrl}
                        onClick={(e) => e.stopPropagation()}
                        style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                    />
                    <button
                        onClick={closePreview}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '30px',
                            cursor: 'pointer'
                        }}
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}
