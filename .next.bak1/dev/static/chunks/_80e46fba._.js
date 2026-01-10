(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/HeatmapLayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HeatmapLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2e$heat$2f$dist$2f$leaflet$2d$heat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet.heat/dist/leaflet-heat.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function HeatmapLayer({ points, radius = 50 }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const [currentZoom, setCurrentZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(map.getZoom());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"])({
        zoomend: {
            "HeatmapLayer.useMapEvents": ()=>{
                setCurrentZoom(map.getZoom());
            }
        }["HeatmapLayer.useMapEvents"]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HeatmapLayer.useEffect": ()=>{
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
            const heat = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].heatLayer(points, {
                radius: adjustedRadius,
                blur: adjustedBlur,
                maxZoom: 14,
                max: 1.0,
                gradient: {
                    0.0: 'blue',
                    0.4: 'cyan',
                    0.6: 'lime',
                    0.8: 'yellow',
                    1.0: 'red' // 高密度で赤
                }
            }).addTo(map);
            return ({
                "HeatmapLayer.useEffect": ()=>{
                    map.removeLayer(heat);
                }
            })["HeatmapLayer.useEffect"];
        }
    }["HeatmapLayer.useEffect"], [
        map,
        points,
        radius,
        currentZoom
    ]);
    return null;
}
_s(HeatmapLayer, "zGV+lqIGLzmSO/efuRdAhikf/Fo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"]
    ];
});
_c = HeatmapLayer;
var _c;
__turbopack_context__.k.register(_c, "HeatmapLayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HeatmapLayer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/HeatmapLayer.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/leaflet.heat/dist/leaflet-heat.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*
 (c) 2014, Vladimir Agafonkin
 simpleheat, a tiny JavaScript library for drawing heatmaps with Canvas
 https://github.com/mourner/simpleheat
*/ !function() {
    "use strict";
    function t(i) {
        return this instanceof t ? (this._canvas = i = "string" == typeof i ? document.getElementById(i) : i, this._ctx = i.getContext("2d"), this._width = i.width, this._height = i.height, this._max = 1, void this.clear()) : new t(i);
    }
    t.prototype = {
        defaultRadius: 25,
        defaultGradient: {
            .4: "blue",
            .6: "cyan",
            .7: "lime",
            .8: "yellow",
            1: "red"
        },
        data: function(t, i) {
            return this._data = t, this;
        },
        max: function(t) {
            return this._max = t, this;
        },
        add: function(t) {
            return this._data.push(t), this;
        },
        clear: function() {
            return this._data = [], this;
        },
        radius: function(t, i) {
            i = i || 15;
            var a = this._circle = document.createElement("canvas"), s = a.getContext("2d"), e = this._r = t + i;
            return a.width = a.height = 2 * e, s.shadowOffsetX = s.shadowOffsetY = 200, s.shadowBlur = i, s.shadowColor = "black", s.beginPath(), s.arc(e - 200, e - 200, t, 0, 2 * Math.PI, !0), s.closePath(), s.fill(), this;
        },
        gradient: function(t) {
            var i = document.createElement("canvas"), a = i.getContext("2d"), s = a.createLinearGradient(0, 0, 0, 256);
            i.width = 1, i.height = 256;
            for(var e in t)s.addColorStop(e, t[e]);
            return a.fillStyle = s, a.fillRect(0, 0, 1, 256), this._grad = a.getImageData(0, 0, 1, 256).data, this;
        },
        draw: function(t) {
            this._circle || this.radius(this.defaultRadius), this._grad || this.gradient(this.defaultGradient);
            var i = this._ctx;
            i.clearRect(0, 0, this._width, this._height);
            for(var a, s = 0, e = this._data.length; e > s; s++)a = this._data[s], i.globalAlpha = Math.max(a[2] / this._max, t || .05), i.drawImage(this._circle, a[0] - this._r, a[1] - this._r);
            var n = i.getImageData(0, 0, this._width, this._height);
            return this._colorize(n.data, this._grad), i.putImageData(n, 0, 0), this;
        },
        _colorize: function(t, i) {
            for(var a, s = 3, e = t.length; e > s; s += 4)a = 4 * t[s], a && (t[s - 3] = i[a], t[s - 2] = i[a + 1], t[s - 1] = i[a + 2]);
        }
    }, window.simpleheat = t;
}(), /*
 (c) 2014, Vladimir Agafonkin
 Leaflet.heat, a tiny and fast heatmap plugin for Leaflet.
 https://github.com/Leaflet/Leaflet.heat
*/ L.HeatLayer = (L.Layer ? L.Layer : L.Class).extend({
    initialize: function(t, i) {
        this._latlngs = t, L.setOptions(this, i);
    },
    setLatLngs: function(t) {
        return this._latlngs = t, this.redraw();
    },
    addLatLng: function(t) {
        return this._latlngs.push(t), this.redraw();
    },
    setOptions: function(t) {
        return L.setOptions(this, t), this._heat && this._updateOptions(), this.redraw();
    },
    redraw: function() {
        return !this._heat || this._frame || this._map._animating || (this._frame = L.Util.requestAnimFrame(this._redraw, this)), this;
    },
    onAdd: function(t) {
        this._map = t, this._canvas || this._initCanvas(), t._panes.overlayPane.appendChild(this._canvas), t.on("moveend", this._reset, this), t.options.zoomAnimation && L.Browser.any3d && t.on("zoomanim", this._animateZoom, this), this._reset();
    },
    onRemove: function(t) {
        t.getPanes().overlayPane.removeChild(this._canvas), t.off("moveend", this._reset, this), t.options.zoomAnimation && t.off("zoomanim", this._animateZoom, this);
    },
    addTo: function(t) {
        return t.addLayer(this), this;
    },
    _initCanvas: function() {
        var t = this._canvas = L.DomUtil.create("canvas", "leaflet-heatmap-layer leaflet-layer"), i = L.DomUtil.testProp([
            "transformOrigin",
            "WebkitTransformOrigin",
            "msTransformOrigin"
        ]);
        t.style[i] = "50% 50%";
        var a = this._map.getSize();
        t.width = a.x, t.height = a.y;
        var s = this._map.options.zoomAnimation && L.Browser.any3d;
        L.DomUtil.addClass(t, "leaflet-zoom-" + (s ? "animated" : "hide")), this._heat = simpleheat(t), this._updateOptions();
    },
    _updateOptions: function() {
        this._heat.radius(this.options.radius || this._heat.defaultRadius, this.options.blur), this.options.gradient && this._heat.gradient(this.options.gradient), this.options.max && this._heat.max(this.options.max);
    },
    _reset: function() {
        var t = this._map.containerPointToLayerPoint([
            0,
            0
        ]);
        L.DomUtil.setPosition(this._canvas, t);
        var i = this._map.getSize();
        this._heat._width !== i.x && (this._canvas.width = this._heat._width = i.x), this._heat._height !== i.y && (this._canvas.height = this._heat._height = i.y), this._redraw();
    },
    _redraw: function() {
        var t, i, a, s, e, n, h, o, r, d = [], _ = this._heat._r, l = this._map.getSize(), m = new L.Bounds(L.point([
            -_,
            -_
        ]), l.add([
            _,
            _
        ])), c = void 0 === this.options.max ? 1 : this.options.max, u = void 0 === this.options.maxZoom ? this._map.getMaxZoom() : this.options.maxZoom, f = 1 / Math.pow(2, Math.max(0, Math.min(u - this._map.getZoom(), 12))), g = _ / 2, p = [], v = this._map._getMapPanePos(), w = v.x % g, y = v.y % g;
        for(t = 0, i = this._latlngs.length; i > t; t++)if (a = this._map.latLngToContainerPoint(this._latlngs[t]), m.contains(a)) {
            e = Math.floor((a.x - w) / g) + 2, n = Math.floor((a.y - y) / g) + 2;
            var x = void 0 !== this._latlngs[t].alt ? this._latlngs[t].alt : void 0 !== this._latlngs[t][2] ? +this._latlngs[t][2] : 1;
            r = x * f, p[n] = p[n] || [], s = p[n][e], s ? (s[0] = (s[0] * s[2] + a.x * r) / (s[2] + r), s[1] = (s[1] * s[2] + a.y * r) / (s[2] + r), s[2] += r) : p[n][e] = [
                a.x,
                a.y,
                r
            ];
        }
        for(t = 0, i = p.length; i > t; t++)if (p[t]) for(h = 0, o = p[t].length; o > h; h++)s = p[t][h], s && d.push([
            Math.round(s[0]),
            Math.round(s[1]),
            Math.min(s[2], c)
        ]);
        this._heat.data(d).draw(this.options.minOpacity), this._frame = null;
    },
    _animateZoom: function(t) {
        var i = this._map.getZoomScale(t.zoom), a = this._map._getCenterOffset(t.center)._multiplyBy(-i).subtract(this._map._getMapPanePos());
        L.DomUtil.setTransform ? L.DomUtil.setTransform(this._canvas, a, i) : this._canvas.style[L.DomUtil.TRANSFORM] = L.DomUtil.getTranslateString(a) + " scale(" + i + ")";
    }
}), L.heatLayer = function(t, i) {
    return new L.HeatLayer(t, i);
};
}),
]);

//# sourceMappingURL=_80e46fba._.js.map