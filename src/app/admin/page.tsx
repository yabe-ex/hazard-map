'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import toast, { Toaster } from 'react-hot-toast';

const HazardMap = dynamic(() => import('@/components/HazardMap'), {
    loading: () => <div style={{ height: '100%', background: '#eee' }}>地図読込中...</div>,
    ssr: false
});

// ▼▼▼ テスト用：川越市周辺の簡易データ（GeoJSON形式） ▼▼▼
const KAWAGOE_BOUNDARY = {
    type: 'Feature',
    properties: { name: '川越市' },
    geometry: {
        type: 'Polygon',
        coordinates: [
            [
                [139.46, 35.9], // 左下
                [139.51, 35.9], // 右下
                [139.51, 35.95], // 右上
                [139.46, 35.95], // 左上
                [139.46, 35.9] // 始点に戻る
            ]
        ]
    }
};

export default function AdminPage() {
    const [center, setCenter] = useState({ lat: 35.9251, lng: 139.4858 });
    const [zoom, setZoom] = useState(13);
    const [selectedBoundary, setSelectedBoundary] = useState<any>(null); // 👈 エリアデータ用の状態

    // 自治体を選んだ時の処理
    const handleSelectArea = (area: string) => {
        if (area === 'kawagoe') {
            setCenter({ lat: 35.9251, lng: 139.4858 }); // 川越へジャンプ
            setZoom(13);
            setSelectedBoundary(KAWAGOE_BOUNDARY); // 👈 川越の枠線データをセット！
            toast.success('川越市を選択しました');
        } else {
            setSelectedBoundary(null); // クリア
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'sans-serif' }}>
            <Toaster />

            {/* 左サイドバー */}
            <aside style={{ width: '300px', background: '#2c3e50', color: 'white', display: 'flex', flexDirection: 'column', zIndex: 20 }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #34495e' }}>
                    <h1 style={{ margin: 0, fontSize: '18px' }}>🛡️ 管理画面</h1>
                </div>

                <div style={{ padding: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', color: '#bdc3c7' }}>エリア選択</label>
                    <select
                        onChange={(e) => handleSelectArea(e.target.value)}
                        style={{ width: '100%', padding: '10px', background: '#34495e', color: 'white', border: 'none', borderRadius: '4px' }}
                    >
                        <option value="">未選択</option>
                        <option value="kawagoe">埼玉県 川越市</option>
                    </select>

                    {selectedBoundary && (
                        <div
                            style={{
                                marginTop: '20px',
                                padding: '10px',
                                background: 'rgba(230, 126, 34, 0.2)',
                                borderRadius: '4px',
                                border: '1px solid #e67e22',
                                fontSize: '12px'
                            }}
                        >
                            📍 エリア表示中
                            <br />
                            地図上にオレンジ色の枠線が表示されています。
                        </div>
                    )}
                </div>
            </aside>

            {/* 右メインエリア */}
            <main style={{ flex: 1, position: 'relative' }}>
                <HazardMap
                    centerPos={center}
                    zoomLevel={zoom}
                    onMapChange={() => {}}
                    posts={[]}
                    boundary={selectedBoundary} // 👈 ここで地図にデータを渡す！
                />
            </main>
        </div>
    );
}
