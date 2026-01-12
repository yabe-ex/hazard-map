'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import dynamic from 'next/dynamic';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { REASONS, ReasonType } from '@/constants/reasons';
import { getAllCities } from '@/lib/cityParams';

const HazardMap = dynamic(() => import('@/components/HazardMap'), {
    loading: () => <div className="p-10 text-center text-gray-500">地図を読み込み中...</div>,
    ssr: false
});

// 管理画面用の保存キー
const ADMIN_STORAGE_KEY = 'hazard-map-admin-pos';

export default function AdminPage() {
    const router = useRouter();
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [selectedReasons, setSelectedReasons] = useState<ReasonType[]>([]);
    const [currentCityId, setCurrentCityId] = useState<string>('');
    const [center, setCenter] = useState({ lat: 35.85, lng: 139.5 });
    const [zoom, setZoom] = useState(11);
    const [mapMode, setMapMode] = useState<'standard' | 'simple' | 'satellite'>('standard');
    const [cities, setCities] = useState<any[]>([]); // New state

    useEffect(() => {
        const loadCities = async () => {
            const data = await getAllCities();
            setCities(data);
        };
        loadCities();

        const fetchPosts = async () => {
            // ... (existing fetchPosts)
            const { data, error } = await supabase.from('hazard_posts').select('*').order('created_at', { ascending: false });
            if (error) {
                toast.error('データの取得に失敗しました');
            } else {
                setAllPosts(data || []);
                setFilteredPosts(data || []);
                setSelectedReasons([...REASONS]);
            }
        };
        fetchPosts();
    }, []);

    // ▼▼▼ 位置情報の復元 ▼▼▼
    useEffect(() => {
        const savedPos = localStorage.getItem(ADMIN_STORAGE_KEY);
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
    }, []);

    useEffect(() => {
        let tempPosts = allPosts;
        if (selectedReasons.length > 0) tempPosts = tempPosts.filter((post) => selectedReasons.includes(post.reason));
        else tempPosts = [];

        if (currentCityId) {
            tempPosts = tempPosts.filter((post) => post.city_code === currentCityId);
        }
        setFilteredPosts(tempPosts);
    }, [selectedReasons, currentCityId, allPosts]);

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = e.target.value;
        setCurrentCityId(cityId);

        if (cityId === '') {
            const defaultCenter = { lat: 35.85, lng: 139.5 };
            setCenter(defaultCenter);
            setZoom(11);
            localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({ ...defaultCenter, zoom: 11 }));
            return;
        }

        const city = cities.find(c => c.id === cityId);
        if (city) {
            setCenter({ lat: city.lat, lng: city.lng });
            setZoom(city.zoom);
            localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({ lat: city.lat, lng: city.lng, zoom: city.zoom }));
        }
    };

    const toggleReason = (reason: ReasonType) => {
        setSelectedReasons((prev) => (prev.includes(reason) ? prev.filter((r) => r !== reason) : [...prev, reason]));
    };

    const handleJumpToPost = (lat: number, lng: number) => {
        setCenter({ lat, lng });
        setZoom(16);
        // 保存
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({ lat, lng, zoom: 16 }));
    };

    const handleMapChange = (lat: number, lng: number, newZoom: number) => {
        setCenter({ lat, lng });
        setZoom(newZoom);
        // 保存
        localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify({ lat, lng, zoom: newZoom }));
    };

    return (
        <main style={{ width: '100%', height: '100vh', display: 'flex', fontFamily: '"Helvetica Neue", Arial, sans-serif', overflow: 'hidden' }}>
            {/* ... */}
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
                    <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>管理者メニュー</h1>
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
                        <div style={{ fontSize: '13px', color: '#7f8c8d', marginBottom: '5px', fontWeight: 'bold' }}>現在の表示件数</div>
                        <div style={{ fontSize: '32px', fontWeight: '800', color: '#2c3e50', lineHeight: '1' }}>
                            {filteredPosts.length}
                            <span style={{ fontSize: '16px', marginLeft: '4px', fontWeight: 'normal' }}>件</span>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', color: '#bdc3c7', marginBottom: '8px' }}>表示エリア選択</label>
                        <select
                            value={currentCityId}
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
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    埼玉県 {city.name}
                                </option>
                            ))}
                        </select>
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
                                    fontSize: '13px',
                                    transition: 'all 0.2s'
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
                                    fontSize: '13px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                シンプル (Positron)
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
                                    fontSize: '13px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                航空写真 (Esri)
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
                                        // @ts-ignore
                                        onChange={() => toggleReason(reason)}
                                        style={{ accentColor: '#3498db', transform: 'scale(1.2)' }}
                                    />
                                    {reason}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', borderTop: '1px solid #34495e', paddingTop: '20px' }}>
                        <button
                            onClick={() => router.push('/')}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'transparent',
                                border: '1px solid #7f8c8d',
                                color: '#ecf0f1',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            ← 一般ページへ戻る
                        </button>
                    </div>
                </div>
            </aside>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ flex: '0 0 60%', position: 'relative', borderBottom: '1px solid #ddd' }}>
                    <HazardMap
                        posts={filteredPosts}
                        centerPos={center}
                        zoomLevel={zoom}
                        onMapChange={handleMapChange}
                        mapMode={mapMode}
                        // @ts-ignore
                        selectedCityId={currentCityId || null}
                    />
                </div>
                <div style={{ flex: 1, overflowY: 'auto', background: '#f0f2f5', padding: '20px' }}>
                    <div
                        style={{
                            background: 'white',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            overflow: 'hidden',
                            border: '1px solid #e1e4e8'
                        }}
                    >
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                            <thead style={{ background: '#34495e' }}>
                                <tr>
                                    <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>ID</th>
                                    <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>不安</th>
                                    <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>住所</th>
                                    <th style={{ padding: '14px', textAlign: 'left', color: '#fff', fontWeight: '600' }}>タグ</th>
                                    <th style={{ padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '600' }}>同感</th>
                                    <th style={{ padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '600' }}>日時</th>
                                    <th style={{ padding: '14px', textAlign: 'center', color: '#fff', fontWeight: '600' }}>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((post, index) => (
                                    <tr key={post.id} style={{ borderBottom: '1px solid #eee', background: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                        <td style={{ padding: '12px 14px', color: '#555' }}>{post.id}</td>
                                        <td style={{ padding: '12px 14px', fontWeight: 'bold', color: '#2c3e50' }}>{post.reason}</td>
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
                                        <td style={{ padding: '12px 14px', color: '#555' }}>{post.tags?.join(', ')}</td>
                                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#2c3e50', fontWeight: 'bold' }}>
                                            {post.empathy_count}
                                        </td>
                                        <td style={{ padding: '12px 14px', textAlign: 'center', color: '#666' }}>
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                                            <button
                                                onClick={() => handleJumpToPost(post.lat, post.lng)}
                                                style={{
                                                    padding: '6px 14px',
                                                    background: '#3498db',
                                                    border: 'none',
                                                    color: 'white',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                移動
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPosts.length === 0 && (
                                    <tr>
                                        <td colSpan={7} style={{ padding: '30px', textAlign: 'center', color: '#999' }}>
                                            データがありません
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main >
    );
}
