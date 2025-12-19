'use client';

// ▼ GeoJSON を追加しました
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import EmpathyButton from './EmpathyButton';

const BlueIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const RedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const TIME_LABELS: Record<string, string> = {
    morning: '🌅 朝',
    day: '☀️ 昼',
    evening: '🌆 夕方',
    night: '🌃 夜'
};

const TIME_COLORS: Record<string, string> = {
    morning: '#e3f2fd',
    day: '#fff8e1',
    evening: '#fbe9e7',
    night: '#eceff1'
};

type Post = {
    id: number;
    lat: number;
    lng: number;
    reason: string;
    tags: string[];
    time_slot: string[];
    user_id: string;
    empathy_count: number;
};

type Props = {
    posts: Post[];
    centerPos: { lat: number; lng: number };
    zoomLevel: number;
    onMapChange?: (lat: number, lng: number, zoom: number) => void;
    boundary?: any; // ▼ 追加：エリア枠線データを受け取れるようにしました
};

// ▼ 修正：以前解決した「移動とズームを同時に行う修正」を適用しました
function MapUpdater({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        // 場所(center) と ズーム(zoom) を同時に指定してアニメーション移動させる
        map.flyTo([center.lat, center.lng], zoom, {
            duration: 1.5
        });
    }, [center, zoom, map]); // center か zoom どちらかが変わったら発動

    return null;
}

function MapController({ onMapChange }: { onMapChange?: (lat: number, lng: number, zoom: number) => void }) {
    const map = useMapEvents({
        moveend: () => {
            if (onMapChange) {
                const center = map.getCenter();
                const zoom = map.getZoom();
                onMapChange(center.lat, center.lng, zoom);
            }
        },
        zoomend: () => {
            if (onMapChange) {
                const center = map.getCenter();
                const zoom = map.getZoom();
                onMapChange(center.lat, center.lng, zoom);
            }
        }
    });
    return null;
}

export default function HazardMap({ posts, centerPos, zoomLevel, onMapChange, boundary }: Props) {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer center={[centerPos.lat, centerPos.lng]} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
                <MapUpdater center={centerPos} zoom={zoomLevel} />
                <MapController onMapChange={onMapChange} />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* ▼ 追加：エリア枠線の描画機能 ▼ */}
                {boundary && (
                    <GeoJSON
                        key={JSON.stringify(boundary)} // データが切り替わったら再描画
                        data={boundary}
                        style={{
                            color: '#ff7800',
                            weight: 4,
                            opacity: 0.65,
                            fillColor: '#ff7800',
                            fillOpacity: 0.1
                        }}
                    />
                )}

                {posts.map((post) => {
                    const isHighEmpathy = (post.empathy_count || 0) >= 5;
                    const icon = isHighEmpathy ? RedIcon : BlueIcon;

                    return (
                        <Marker key={post.id} position={[post.lat, post.lng]} icon={icon}>
                            <Popup minWidth={200} maxWidth={280}>
                                <div style={{ fontFamily: 'sans-serif' }}>
                                    <div
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            color: '#333',
                                            marginBottom: '8px',
                                            paddingBottom: '8px',
                                            borderBottom: '1px solid #eee'
                                        }}
                                    >
                                        {post.reason}
                                    </div>

                                    {post.time_slot && Array.isArray(post.time_slot) && post.time_slot.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                                            {post.time_slot.map((time) => (
                                                <span
                                                    key={time}
                                                    style={{
                                                        display: 'inline-block',
                                                        fontSize: '11px',
                                                        padding: '3px 8px',
                                                        borderRadius: '12px',
                                                        background: TIME_COLORS[time] || '#f5f5f5',
                                                        color: '#555',
                                                        border: '1px solid #ddd'
                                                    }}
                                                >
                                                    {TIME_LABELS[time] || time}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    style={{
                                                        display: 'inline-block',
                                                        fontSize: '11px',
                                                        padding: '2px 8px',
                                                        borderRadius: '4px',
                                                        background: '#f9f9f9',
                                                        color: '#666',
                                                        border: '1px solid #eee'
                                                    }}
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <EmpathyButton postId={post.id} initialCount={post.empathy_count || 0} postUserId={post.user_id} />
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* 中央の十字マーク（変更なし） */}
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    pointerEvents: 'none'
                }}
            >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="red" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="20" y1="10" x2="20" y2="30" stroke="red" strokeWidth="2" />
                    <line x1="10" y1="20" x2="30" y2="20" stroke="red" strokeWidth="2" />
                </svg>
            </div>
        </div>
    );
}
