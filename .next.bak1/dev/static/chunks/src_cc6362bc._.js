(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://jmmyndjhysitqosemjfc.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbXluZGpoeXNpdHFvc2VtamZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDk4MDcsImV4cCI6MjA4MTcyNTgwN30.Uuht_XeVWmuJ0yDZKbkzQTzR_FNBw2giuczTOF8z-X0");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/EmpathyButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EmpathyButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function EmpathyButton({ postId, initialCount, postUserId, onEmpathy }) {
    _s();
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialCount);
    const [hasEmpathized, setHasEmpathized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [myUserId, setMyUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ▼▼▼ 追加: 親データ(initialCount)が更新されたら、表示(count)も同期する ▼▼▼
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmpathyButton.useEffect": ()=>{
            setCount(initialCount);
        }
    }["EmpathyButton.useEffect"], [
        initialCount
    ]);
    // ▲▲▲ 追加ここまで ▲▲▲
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "EmpathyButton.useEffect": ()=>{
            const checkStatus = {
                "EmpathyButton.useEffect.checkStatus": async ()=>{
                    const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                    const userId = session?.user?.id;
                    if (userId) {
                        setMyUserId(userId);
                        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('hazard_empathies').select('id').eq('post_id', postId).eq('user_id', userId).maybeSingle();
                        if (data) setHasEmpathized(true);
                    }
                }
            }["EmpathyButton.useEffect.checkStatus"];
            checkStatus();
        }
    }["EmpathyButton.useEffect"], [
        postId
    ]);
    const handleClick = async ()=>{
        if (myUserId && myUserId === postUserId) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('自分の投稿には同感できません', {
                icon: '🙅‍♂️'
            });
            return;
        }
        setIsLoading(true);
        try {
            let targetUserId = myUserId;
            if (!targetUserId) {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInAnonymously();
                if (error || !data.user) {
                    throw new Error('認証に失敗しました');
                }
                targetUserId = data.user.id;
                setMyUserId(targetUserId);
            }
            if (targetUserId === postUserId) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('自分の投稿には同感できません', {
                    icon: '🙅‍♂️'
                });
                setIsLoading(false);
                return;
            }
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('hazard_empathies').insert([
                {
                    post_id: postId,
                    user_id: targetUserId
                }
            ]);
            if (error) {
                if (error.code === '23505') {
                    setHasEmpathized(true);
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('既に同感済みです');
                } else {
                    console.error(error);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('通信エラーが発生しました');
                }
            } else {
                const newCount = count + 1;
                setCount(newCount);
                if (onEmpathy) {
                    onEmpathy(newCount);
                }
                setHasEmpathized(true);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('同感しました！', {
                    icon: '✋'
                });
            }
        } catch (err) {
            console.error(err);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('処理に失敗しました');
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginTop: '8px',
            paddingTop: '8px',
            borderTop: '1px solid #eee'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleClick,
                disabled: hasEmpathized || myUserId === postUserId || isLoading,
                style: {
                    background: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    color: hasEmpathized ? '#0070f3' : '#555',
                    backgroundColor: hasEmpathized ? '#e6f7ff' : 'white',
                    borderColor: hasEmpathized ? '#0070f3' : '#ddd',
                    cursor: hasEmpathized || myUserId === postUserId ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'all 0.2s'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: hasEmpathized ? '✋ 同感済み' : '✋ 同感'
                    }, void 0, false, {
                        fileName: "[project]/src/components/EmpathyButton.tsx",
                        lineNumber: 118,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 'bold'
                        },
                        children: count
                    }, void 0, false, {
                        fileName: "[project]/src/components/EmpathyButton.tsx",
                        lineNumber: 120,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/EmpathyButton.tsx",
                lineNumber: 98,
                columnNumber: 13
            }, this),
            myUserId && myUserId === postUserId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: '10px',
                    color: '#999',
                    marginLeft: '8px'
                },
                children: "※自分の投稿"
            }, void 0, false, {
                fileName: "[project]/src/components/EmpathyButton.tsx",
                lineNumber: 123,
                columnNumber: 53
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/EmpathyButton.tsx",
        lineNumber: 97,
        columnNumber: 9
    }, this);
}
_s(EmpathyButton, "dKv/g93FN/tGEVrFr3dV3trRBaU=");
_c = EmpathyButton;
var _c;
__turbopack_context__.k.register(_c, "EmpathyButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HazardMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HazardMap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$GeoJSON$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/GeoJSON.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2d$cluster$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet-cluster/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EmpathyButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/EmpathyButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
const HeatmapLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/HeatmapLayer.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/HeatmapLayer.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
_c = HeatmapLayer;
const TIME_LABELS = {
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
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    satellite: {
        name: '航空写真 (Esri)',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri...'
    }
};
// ▼▼▼ 修正: アイコン生成は常に「reason（不安理由）」に基づく色で行う ▼▼▼
const createCustomIcon = (reason, count)=>{
    try {
        // 通常のカテゴリ色分け
        let color = 'grey';
        switch(reason){
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
        const badgeHtml = count > 0 ? `<div style="position: absolute; top: -6px; right: -6px; background-color: #ff4d4f; color: white; border-radius: 10px; min-width: 20px; height: 20px; padding: 0 4px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); z-index: 10;">${count > 99 ? '99+' : count}</div>` : '';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].divIcon({
            className: '',
            html: `<div style="position: relative; width: 25px; height: 41px;">
                    <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png" style="width: 25px; height: 41px; display: block;" alt="marker" />
                    ${badgeHtml}
                   </div>`,
            iconSize: [
                25,
                41
            ],
            iconAnchor: [
                12,
                41
            ],
            popupAnchor: [
                1,
                -34
            ]
        });
    } catch (e) {
        console.error('Icon creation failed', e);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
            iconSize: [
                25,
                41
            ],
            iconAnchor: [
                12,
                41
            ]
        });
    }
};
function MapUpdater({ center, zoom }) {
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapUpdater.useEffect": ()=>{
            if (!center || isNaN(center.lat) || isNaN(center.lng)) return;
            const currentCenter = map.getCenter();
            const currentZoom = map.getZoom();
            const dist = Math.abs(currentCenter.lat - center.lat) + Math.abs(currentCenter.lng - center.lng);
            if (dist > 0.000001 || currentZoom !== zoom) {
                map.flyTo([
                    center.lat,
                    center.lng
                ], zoom, {
                    duration: 1.5
                });
            }
        }
    }["MapUpdater.useEffect"], [
        center,
        zoom,
        map
    ]);
    return null;
}
_s(MapUpdater, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c1 = MapUpdater;
function MapController({ onMapChange }) {
    _s1();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"])({
        moveend: {
            "MapController.useMapEvents[map]": ()=>onMapChange?.(map.getCenter().lat, map.getCenter().lng, map.getZoom())
        }["MapController.useMapEvents[map]"],
        zoomend: {
            "MapController.useMapEvents[map]": ()=>onMapChange?.(map.getCenter().lat, map.getCenter().lng, map.getZoom())
        }["MapController.useMapEvents[map]"]
    });
    return null;
}
_s1(MapController, "D2AvXN8Rt/r3DPix6IJfcPGmgF0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"]
    ];
});
_c2 = MapController;
function CityBoundary({ cityId }) {
    _s2();
    const [geoData, setGeoData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CityBoundary.useEffect": ()=>{
            if (!cityId) return;
            setGeoData(null);
            const url = `https://raw.githubusercontent.com/niiyz/JapanCityGeoJson/master/geojson/11/${cityId}.json`;
            fetch(url).then({
                "CityBoundary.useEffect": (res)=>res.json()
            }["CityBoundary.useEffect"]).then({
                "CityBoundary.useEffect": (data)=>setGeoData(data)
            }["CityBoundary.useEffect"]).catch(console.error);
        }
    }["CityBoundary.useEffect"], [
        cityId
    ]);
    if (!geoData) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$GeoJSON$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GeoJSON"], {
        data: geoData,
        style: {
            color: '#1E90FF',
            weight: 4,
            opacity: 0.9,
            fillColor: '#1E90FF',
            fillOpacity: 0.15
        }
    }, cityId, false, {
        fileName: "[project]/src/components/HazardMap.tsx",
        lineNumber: 160,
        columnNumber: 12
    }, this);
}
_s2(CityBoundary, "XFwNiZU7V1vH1/ltkkdan/GVUMo=");
_c3 = CityBoundary;
function HazardMap({ posts, centerPos, zoomLevel, onMapChange, selectedCityId, mapMode = 'standard', currentUserId, isAdmin = false, onPostUpdate, showHeatmap = false, heatmapRadius = 50, onAdminSelectPost }) {
    _s3();
    const currentMode = mapMode && MAP_STYLES[mapMode] ? mapMode : 'standard';
    const tileStyle = MAP_STYLES[currentMode];
    const validPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HazardMap.useMemo[validPosts]": ()=>{
            return posts.filter({
                "HazardMap.useMemo[validPosts]": (p)=>p.lat && p.lng && !isNaN(p.lat) && !isNaN(p.lng)
            }["HazardMap.useMemo[validPosts]"]);
        }
    }["HazardMap.useMemo[validPosts]"], [
        posts
    ]);
    const heatPoints = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HazardMap.useMemo[heatPoints]": ()=>{
            return validPosts.map({
                "HazardMap.useMemo[heatPoints]": (p)=>{
                    const intensity = Math.min(1.0, 0.3 + (p.empathy_count || 0) * 0.1);
                    return [
                        p.lat,
                        p.lng,
                        intensity
                    ];
                }
            }["HazardMap.useMemo[heatPoints]"]);
        }
    }["HazardMap.useMemo[heatPoints]"], [
        validPosts
    ]);
    const safeCenter = centerPos && !isNaN(centerPos.lat) && !isNaN(centerPos.lng) ? centerPos : {
        lat: 35.85,
        lng: 139.5
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            background: '#e0e0e0'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
                center: [
                    safeCenter.lat,
                    safeCenter.lng
                ],
                zoom: zoomLevel,
                style: {
                    height: '100%',
                    width: '100%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                        attribution: tileStyle.attribution,
                        url: tileStyle.url
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 196,
                        columnNumber: 17
                    }, this),
                    selectedCityId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CityBoundary, {
                        cityId: selectedCityId
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 197,
                        columnNumber: 36
                    }, this),
                    showHeatmap ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HeatmapLayer, {
                        points: heatPoints,
                        radius: heatmapRadius
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 200,
                        columnNumber: 21
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2d$cluster$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        chunkedLoading: true,
                        children: validPosts.map((post)=>{
                            // ▼▼▼ 修正: 管理者かどうかにかかわらず、通常のアイコン生成ロジックを使用 ▼▼▼
                            const icon = createCustomIcon(post.reason, post.empathy_count || 0);
                            const showImage = isAdmin || currentUserId && post.user_id === currentUserId;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                                position: [
                                    post.lat,
                                    post.lng
                                ],
                                icon: icon,
                                eventHandlers: {
                                    click: ()=>{
                                        // 管理者の場合は詳細モーダルを開く
                                        if (isAdmin && onAdminSelectPost) {
                                            onAdminSelectPost(post);
                                        }
                                    }
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                                    minWidth: 200,
                                    maxWidth: 280,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontFamily: 'sans-serif'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '16px',
                                                    fontWeight: 'bold',
                                                    color: '#333',
                                                    marginBottom: '8px',
                                                    paddingBottom: '8px',
                                                    borderBottom: '1px solid #eee'
                                                },
                                                children: post.reason
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 224,
                                                columnNumber: 45
                                            }, this),
                                            post.image_url && showImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginBottom: '8px'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: post.image_url,
                                                    alt: "現場写真",
                                                    style: {
                                                        width: '100%',
                                                        height: 'auto',
                                                        borderRadius: '6px',
                                                        objectFit: 'cover',
                                                        maxHeight: '150px',
                                                        border: '1px solid #eee'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 53
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 237,
                                                columnNumber: 49
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: '12px',
                                                    color: '#666',
                                                    marginBottom: '8px'
                                                },
                                                children: [
                                                    ...post.tags || [],
                                                    ...(post.time_slot || []).map((t)=>TIME_LABELS[t])
                                                ].join('・')
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 252,
                                                columnNumber: 45
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$EmpathyButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                postId: post.id,
                                                initialCount: post.empathy_count || 0,
                                                postUserId: post.user_id,
                                                onEmpathy: (newCount)=>onPostUpdate?.(post.id, newCount)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 255,
                                                columnNumber: 45
                                            }, this),
                                            isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    marginTop: '10px',
                                                    textAlign: 'center'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onAdminSelectPost?.(post),
                                                    style: {
                                                        fontSize: '12px',
                                                        padding: '4px 8px',
                                                        background: '#2c3e50',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    },
                                                    children: "管理詳細を開く"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 263,
                                                    columnNumber: 53
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 262,
                                                columnNumber: 49
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 223,
                                        columnNumber: 41
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 222,
                                    columnNumber: 37
                                }, this)
                            }, post.id, false, {
                                fileName: "[project]/src/components/HazardMap.tsx",
                                lineNumber: 209,
                                columnNumber: 33
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 202,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapUpdater, {
                        center: safeCenter,
                        zoom: zoomLevel
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 286,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapController, {
                        onMapChange: onMapChange
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 287,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HazardMap.tsx",
                lineNumber: 195,
                columnNumber: 13
            }, this),
            !showHeatmap && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1000,
                    pointerEvents: 'none'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    width: "40",
                    height: "40",
                    viewBox: "0 0 40 40",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                            cx: "20",
                            cy: "20",
                            r: "18",
                            stroke: "red",
                            strokeWidth: "2",
                            strokeDasharray: "4 2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 295,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "20",
                            y1: "10",
                            x2: "20",
                            y2: "30",
                            stroke: "red",
                            strokeWidth: "2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 296,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "10",
                            y1: "20",
                            x2: "30",
                            y2: "20",
                            stroke: "red",
                            strokeWidth: "2"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 297,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HazardMap.tsx",
                    lineNumber: 294,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HazardMap.tsx",
                lineNumber: 291,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HazardMap.tsx",
        lineNumber: 194,
        columnNumber: 9
    }, this);
}
_s3(HazardMap, "oS4ETkNxv5x8pR3htJbuVECxEIQ=");
_c4 = HazardMap;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "HeatmapLayer");
__turbopack_context__.k.register(_c1, "MapUpdater");
__turbopack_context__.k.register(_c2, "MapController");
__turbopack_context__.k.register(_c3, "CityBoundary");
__turbopack_context__.k.register(_c4, "HazardMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/HazardMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_cc6362bc._.js.map