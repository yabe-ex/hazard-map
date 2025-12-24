'use client';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
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
        attribution:
            'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
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
};

type Props = {
    posts: Post[];
    centerPos: { lat: number; lng: number };
    zoomLevel: number;
    onMapChange?: (lat: number, lng: number, zoom: number) => void;
    selectedCityId?: string | null;
    mapMode?: MapMode;
};

function MapUpdater({ center, zoom }: { center: { lat: number; lng: number }; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();

        // 無限ループ防止: 現在地と目標地点がほぼ同じなら移動しない
        const dist = Math.abs(currentCenter.lat - center.lat) + Math.abs(currentCenter.lng - center.lng);
        if (dist > 0.000001 || currentZoom !== zoom) {
            map.flyTo([center.lat, center.lng], zoom, { duration: 1.5 });
        }
    }, [center, zoom, map]);
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

function CityBoundary({ cityId }: { cityId: string }) {
    const [geoData, setGeoData] = useState<any>(null);

    useEffect(() => {
        if (!cityId) return;
        setGeoData(null);

        const url = `https://raw.githubusercontent.com/niiyz/JapanCityGeoJson/master/geojson/11/${cityId}.json`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setGeoData(data);
            })
            .catch((err) => {
                console.error('Failed to fetch GeoJSON:', err);
            });
    }, [cityId]);

    if (!geoData) return null;

    return (
        <GeoJSON
            key={cityId}
            data={geoData}
            style={{
                color: '#1E90FF',
                weight: 4,
                opacity: 0.9,
                fillColor: '#1E90FF',
                fillOpacity: 0.15
            }}
        />
    );
}

export default function HazardMap({ posts, centerPos, zoomLevel, onMapChange, selectedCityId, mapMode = 'standard' }: Props) {
    const currentMode = mapMode && MAP_STYLES[mapMode] ? mapMode : 'standard';
    const tileStyle = MAP_STYLES[currentMode];

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <MapContainer center={[centerPos.lat, centerPos.lng]} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
                <TileLayer attribution={tileStyle.attribution} url={tileStyle.url} />

                {selectedCityId && <CityBoundary cityId={selectedCityId} />}

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
                                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                                        {TIME_LABELS[post.time_slot?.[0]]} / 同感: {post.empathy_count || 0}
                                    </div>
                                    <EmpathyButton postId={post.id} initialCount={post.empathy_count || 0} postUserId={post.user_id} />
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                <MapUpdater center={centerPos} zoom={zoomLevel} />
                <MapController onMapChange={onMapChange} />
            </MapContainer>

            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, pointerEvents: 'none' }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" stroke="red" strokeWidth="2" strokeDasharray="4 2" />
                    <line x1="20" y1="10" x2="20" y2="30" stroke="red" strokeWidth="2" />
                    <line x1="10" y1="20" x2="30" y2="20" stroke="red" strokeWidth="2" />
                </svg>
            </div>
        </div>
    );
}
