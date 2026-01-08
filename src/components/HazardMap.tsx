'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, GeoJSON } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import { useEffect, useState, useMemo } from 'react';
import EmpathyButton from './EmpathyButton';
import dynamic from 'next/dynamic';

const HeatmapLayer = dynamic(() => import('./HeatmapLayer'), { ssr: false });

const TIME_LABELS: Record<string, string> = {
    morning: '🌅 朝',
    day: '☀️ 昼',
    evening: '🌆 夕方',
    night: '🌃 夜'
};

const MAP_STYLES = {
    standard: {
        name: '標準 (OSM)',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    simple: {
        name: 'シンプル (Positron)',
        url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    satellite: {
        name: '航空写真 (Esri)',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri...'
    }
};

type MapMode = 'standard' | 'simple' | 'satellite';

type Post = {
    id: number;
    lat: number;
    lng: number;
    reason: string;
    tags: string[];
    time_slot: string[];
    user_id: string;
    empathy_count: number;
    city_code?: string;
    image_url?: string;
    // 管理者用のプロパティは地図表示には影響させないため削除、または無視する
    admin_display_color?: string;
    admin_is_white?: boolean;
};

type Props = {
    posts: Post[];
    centerPos: { lat: number; lng: number };
    zoomLevel: number;
    onMapChange?: (lat: number, lng: number, zoom: number) => void;
    selectedCityId?: string | null;
    mapMode?: MapMode;
    currentUserId?: string;
    isAdmin?: boolean;
    onPostUpdate?: (postId: number, newCount: number) => void;
    showHeatmap?: boolean;
    heatmapRadius?: number;
    onAdminSelectPost?: (post: Post) => void;
};

// ▼▼▼ 修正: アイコン生成は常に「reason（不安理由）」に基づく色で行う ▼▼▼
const createCustomIcon = (reason: string, count: number) => {
    try {
        // 通常のカテゴリ色分け
        let color = 'grey';
        switch (reason) {
            case '暗い':
                color = 'violet';
                break;
            case '見通しが悪い':
                color = 'gold';
                break;
            case '人通りが少ない':
                color = 'blue';
                break;
            case '歩道が狭い':
                color = 'green';
                break;
            default:
                color = 'grey';
                break;
        }

        const badgeHtml =
            count > 0
                ? `<div style="position: absolute; top: -6px; right: -6px; background-color: #ff4d4f; color: white; border-radius: 10px; min-width: 20px; height: 20px; padding: 0 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); z-index: 10;">${
                      count > 99 ? '99+' : count
                  }</div>`
                : '';

        return L.divIcon({
            className: '',
            html: `<div style="position: relative; width: 25px; height: 41px;">
                    <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png" style="width: 25px; height: 41px; display: block;" alt="marker" />
                    ${badgeHtml}
                   </div>`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34]
        });
    } catch (e) {
        console.error('Icon creation failed', e);
        return L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });
    }
};

function MapUpdater({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        if (!center || isNaN(center.lat) || isNaN(center.lng)) return;
        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();
        const dist = Math.abs(currentCenter.lat - center.lat) + Math.abs(currentCenter.lng - center.lng);
        if (dist > 0.000001 || currentZoom !== zoom) {
            map.flyTo([center.lat, center.lng], zoom, { duration: 1.5 });
        }
    }, [center, zoom, map]);
    return null;
}

function MapController({ onMapChange }: { onMapChange?: (lat: number, lng: number, zoom: number) => void }) {
    const map = useMapEvents({
        moveend: () => onMapChange?.(map.getCenter().lat, map.getCenter().lng, map.getZoom()),
        zoomend: () => onMapChange?.(map.getCenter().lat, map.getCenter().lng, map.getZoom())
    });
    return null;
}

function CityBoundary({ cityId }: { cityId: string }) {
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
        if (!cityId) return;
        setGeoData(null);
        const url = `https://raw.githubusercontent.com/niiyz/JapanCityGeoJson/master/geojson/11/${cityId}.json`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => setGeoData(data))
            .catch(console.error);
    }, [cityId]);

    if (!geoData) return null;
    return <GeoJSON key={cityId} data={geoData} style={{ color: '#1E90FF', weight: 4, opacity: 0.9, fillColor: '#1E90FF', fillOpacity: 0.15 }} />;
}

export default function HazardMap({
    posts,
    centerPos,
    zoomLevel,
    onMapChange,
    selectedCityId,
    mapMode = 'standard',
    currentUserId,
    isAdmin = false,
    onPostUpdate,
    showHeatmap = false,
    heatmapRadius = 50,
    onAdminSelectPost
}: Props) {
    const currentMode = mapMode && MAP_STYLES[mapMode] ? mapMode : 'standard';
    const tileStyle = MAP_STYLES[currentMode];

    const validPosts = useMemo(() => {
        return posts.filter((p) => p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng));
    }, [posts]);

    const heatPoints: [number, number, number][] = useMemo(() => {
        return validPosts.map((p) => {
            const intensity = Math.min(1.0, 0.3 + (p.empathy_count || 0) * 0.1);
            return [p.lat, p.lng, intensity];
        });
    }, [validPosts]);

    const safeCenter = centerPos && !isNaN(centerPos.lat) && !isNaN(centerPos.lng) ? centerPos : { lat: 35.85, lng: 139.5 };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#e0e0e0' }}>
            <MapContainer center={[safeCenter.lat, safeCenter.lng]} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
                <TileLayer attribution={tileStyle.attribution} url={tileStyle.url} />
                {selectedCityId && <CityBoundary cityId={selectedCityId} />}

                {showHeatmap ? (
                    <HeatmapLayer points={heatPoints} radius={heatmapRadius} />
                ) : (
                    <MarkerClusterGroup chunkedLoading>
                        {validPosts.map((post) => {
                            // ▼▼▼ 修正: 管理者かどうかにかかわらず、通常のアイコン生成ロジックを使用 ▼▼▼
                            const icon = createCustomIcon(post.reason, post.empathy_count || 0);
                            const showImage = isAdmin || (currentUserId && post.user_id === currentUserId);

                            return (
                                <Marker
                                    key={post.id}
                                    position={[post.lat, post.lng]}
                                    icon={icon}
                                    eventHandlers={{
                                        click: () => {
                                            // 管理者の場合は詳細モーダルを開く
                                            if (isAdmin && onAdminSelectPost) {
                                                onAdminSelectPost(post);
                                            }
                                        }
                                    }}
                                >
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
                                            {post.image_url && showImage && (
                                                <div style={{ marginBottom: '8px' }}>
                                                    <img
                                                        src={post.image_url}
                                                        alt="現場写真"
                                                        style={{
                                                            width: '100%',
                                                            height: 'auto',
                                                            borderRadius: '6px',
                                                            objectFit: 'cover',
                                                            maxHeight: '150px',
                                                            border: '1px solid #eee'
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                                                {[...(post.tags || []), ...(post.time_slot || []).map((t) => TIME_LABELS[t])].join('・')}
                                            </div>
                                            <EmpathyButton
                                                postId={post.id}
                                                initialCount={post.empathy_count || 0}
                                                postUserId={post.user_id}
                                                onEmpathy={(newCount) => onPostUpdate?.(post.id, newCount)}
                                            />
                                            {isAdmin && (
                                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                                    <button
                                                        onClick={() => onAdminSelectPost?.(post)}
                                                        style={{
                                                            fontSize: '12px',
                                                            padding: '4px 8px',
                                                            background: '#2c3e50',
                                                            color: 'white',
                                                            border: 'none',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer'
                                                        }}
                                                    >
                                                        管理詳細を開く
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MarkerClusterGroup>
                )}
                <MapUpdater center={safeCenter} zoom={zoomLevel} />
                <MapController onMapChange={onMapChange} />
            </MapContainer>

            {!showHeatmap && (
                <div
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, pointerEvents: 'none' }}
                >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="red" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="20" y1="10" x2="20" y2="30" stroke="red" strokeWidth="2" />
                        <line x1="10" y1="20" x2="30" y2="20" stroke="red" strokeWidth="2" />
                    </svg>
                </div>
            )}
        </div>
    );
}
