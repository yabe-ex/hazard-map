'use client';

import { useEffect, useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

type HeatmapLayerProps = {
    points: [number, number, number][];
    radius?: number; // 基準となる半径
};

export default function HeatmapLayer({ points, radius = 50 }: HeatmapLayerProps) {
    const map = useMap();
    const [currentZoom, setCurrentZoom] = useState(map.getZoom());

    useMapEvents({
        zoomend: () => {
            setCurrentZoom(map.getZoom());
        }
    });

    useEffect(() => {
        if (!points || points.length === 0) return;

        // 1. ズーム倍率の計算（少し控えめに）
        const zoomFactor = Math.pow(1.1, currentZoom - 12);

        // 2. 半径の計算（最大80px程度に抑える）
        const adjustedRadius = Math.min(80, radius * zoomFactor);

        // ▼▼▼ 修正箇所: ボカシを半径に連動させる ▼▼▼
        // 半径の 70% くらいの強さでボカすことで、常にフワッとした見た目を維持します
        const adjustedBlur = adjustedRadius * 0.7;
        // ▲▲▲ 修正ここまで ▲▲▲

        // @ts-ignore
        const heat = L.heatLayer(points, {
            radius: adjustedRadius,
            blur: adjustedBlur, // 計算したボカシ値を使用
            maxZoom: 14,
            max: 1.0,
            gradient: {
                0.0: 'blue', // 低密度は青から開始
                0.4: 'cyan',
                0.6: 'lime',
                0.8: 'yellow',
                1.0: 'red' // 高密度で赤
            }
        }).addTo(map);

        return () => {
            map.removeLayer(heat);
        };
    }, [map, points, radius, currentZoom]);

    return null;
}
