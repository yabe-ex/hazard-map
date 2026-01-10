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
"[project]/src/constants/reasons.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 不安のメインカテゴリ（4種類固定）
__turbopack_context__.s([
    "REASONS",
    ()=>REASONS,
    "REASON_TAGS",
    ()=>REASON_TAGS
]);
const REASONS = [
    '暗い',
    '見通しが悪い',
    '人通りが少ない',
    '歩道が狭い'
];
const REASON_TAGS = {
    暗い: [
        '街灯が少ない',
        '街灯があっても暗い',
        '街灯が木や建物に遮られている',
        '街灯の間隔が広い',
        '夜間に特に暗い',
        '雨天時にさらに暗くなる',
        '足元が見えにくい',
        '路面が暗色で見えにくい',
        '影が多い',
        '照明が老朽化している',
        '夜になると周囲が無人になる',
        '建物の明かりがない',
        '公園・緑地が暗い',
        'トンネル・高架下で暗い',
        '歩行者用照明がない'
    ],
    見通しが悪い: [
        'カーブがきつい',
        '曲がり角が多い',
        '建物が近接している',
        '塀や壁で視界が遮られている',
        '植栽・雑草が生い茂っている',
        '電柱・看板が多い',
        '高低差がある',
        '坂の途中で先が見えない',
        '見通しの悪い交差点',
        '死角が多い',
        '見通しの悪い横断歩道',
        '駐車車両で視界が遮られる',
        '自転車・歩行者が急に出てくる',
        '夜間はさらに見えにくい',
        '雨霧・天候の影響を受けやすい'
    ],
    人通りが少ない: [
        '夜間に人通りが少ない',
        '時間帯によって無人になる',
        '住宅が少ない',
        '店舗が少ない',
        '営業時間外になると無人',
        '裏道・抜け道になっている',
        '通学・通勤ルートから外れている',
        '公共施設が少ない',
        '見守りの目が届きにくい',
        '人が通っても立ち止まらない',
        '短時間で人がいなくなる',
        '休日に人通りが減る',
        '平日昼間に人通りが少ない',
        '夜間に車だけが通る',
        '住宅の出入りが少ない'
    ],
    歩道が狭い: [
        '歩道の幅が狭い',
        '歩行者と自転車が混在',
        '歩道と車道の区別が弱い',
        'ガードレールがない',
        '路肩を歩く必要がある',
        '車道が近い',
        '大型車の通行が多い',
        '車両速度が速い',
        '自転車の通行が多い',
        'ベビーカー・車椅子が通りにくい',
        '段差が多い',
        '路面がでこぼこしている',
        '雨天時に滑りやすい',
        '歩道が途中で途切れる',
        '横断時に待機スペースが狭い'
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/constants/cities.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// 自治体データ定義
// IDは総務省の全国地方公共団体コードを使用
// GeoJSONの取得や、投稿時の自動判定に使用します
__turbopack_context__.s([
    "CITIES",
    ()=>CITIES,
    "CITY_NAME_TO_CODE",
    ()=>CITY_NAME_TO_CODE
]);
const CITIES = {
    kawagoe: {
        id: '11201',
        name: '川越市',
        lat: 35.9251,
        lng: 139.4858,
        zoom: 13
    },
    tokorozawa: {
        id: '11208',
        name: '所沢市',
        lat: 35.7994,
        lng: 139.4687,
        zoom: 13
    },
    sayama: {
        id: '11215',
        name: '狭山市',
        lat: 35.8533,
        lng: 139.4122,
        zoom: 13
    },
    fujimino: {
        id: '11245',
        name: 'ふじみ野市',
        lat: 35.8794,
        lng: 139.5197,
        zoom: 13
    }
};
const CITY_NAME_TO_CODE = {
    川越市: '11201',
    所沢市: '11208',
    狭山市: '11215',
    ふじみ野市: '11245'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/dashboard/[cityCode]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/reasons.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/cities.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
const HazardMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-10 text-center text-gray-500",
            children: "地図を読み込み中..."
        }, void 0, false, {
            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
            lineNumber: 12,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0)),
    ssr: false
});
_c = HazardMap;
const ITEMS_PER_PAGE = 100; // リストの1ページあたりの表示件数
function AdminDashboard({ fixedCityCode, allowFiltering = true }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [allPosts, setAllPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredPosts, setFilteredPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedReasons, setSelectedReasons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentCityKey, setCurrentCityKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [center, setCenter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        lat: 35.85,
        lng: 139.5
    });
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(11);
    const [mapMode, setMapMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('standard');
    const [isHeatmapMode, setIsHeatmapMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [heatmapRadius, setHeatmapRadius] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(50);
    const [previewImageUrl, setPreviewImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    // ストレージキーを役割ごとに分ける（全権用と各自治体用で位置情報を混在させないため）
    const storageKey = fixedCityCode ? `hazard-map-admin-pos-${fixedCityCode}` : 'hazard-map-admin-pos-global';
    // 初期化：fixedCityCodeがある場合、対応するCityKeyを特定してセットする
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            if (fixedCityCode) {
                const entry = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITIES"]).find({
                    "AdminDashboard.useEffect.entry": ([_, city])=>city.id === fixedCityCode
                }["AdminDashboard.useEffect.entry"]);
                if (entry) {
                    const [key, city] = entry;
                    setCurrentCityKey(key);
                    // 初期位置もその自治体に合わせる
                    setCenter({
                        lat: city.lat,
                        lng: city.lng
                    });
                    setZoom(city.zoom);
                }
            }
        }
    }["AdminDashboard.useEffect"], [
        fixedCityCode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            const fetchPosts = {
                "AdminDashboard.useEffect.fetchPosts": async ()=>{
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('hazard_posts').select('*').order('created_at', {
                        ascending: false
                    }).range(0, 10000);
                    if (error) {
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('データの取得に失敗しました');
                    } else {
                        setAllPosts(data || []);
                        setFilteredPosts(data || []);
                        setSelectedReasons([
                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REASONS"]
                        ]);
                    }
                }
            }["AdminDashboard.useEffect.fetchPosts"];
            fetchPosts();
        }
    }["AdminDashboard.useEffect"], []);
    // 位置情報の復元
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            const savedPos = localStorage.getItem(storageKey);
            if (savedPos) {
                try {
                    const parsed = JSON.parse(savedPos);
                    if (parsed.lat && parsed.lng) {
                        setCenter({
                            lat: parsed.lat,
                            lng: parsed.lng
                        });
                        if (parsed.zoom) setZoom(parsed.zoom);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
    }["AdminDashboard.useEffect"], [
        storageKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminDashboard.useEffect": ()=>{
            let tempPosts = allPosts;
            if (selectedReasons.length > 0) tempPosts = tempPosts.filter({
                "AdminDashboard.useEffect": (post)=>selectedReasons.includes(post.reason)
            }["AdminDashboard.useEffect"]);
            else tempPosts = [];
            // 固定コードがある場合は、強制的にその自治体でフィルタリング
            if (fixedCityCode) {
                tempPosts = tempPosts.filter({
                    "AdminDashboard.useEffect": (post)=>post.city_code === fixedCityCode
                }["AdminDashboard.useEffect"]);
            } else if (currentCityKey) {
                // 選択された自治体がある場合
                // @ts-ignore
                const cityId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITIES"][currentCityKey]?.id;
                if (cityId) tempPosts = tempPosts.filter({
                    "AdminDashboard.useEffect": (post)=>post.city_code === cityId
                }["AdminDashboard.useEffect"]);
            }
            setFilteredPosts(tempPosts);
            setCurrentPage(1);
        }
    }["AdminDashboard.useEffect"], [
        selectedReasons,
        currentCityKey,
        allPosts,
        fixedCityCode
    ]);
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
    const handlePageChange = (newPage)=>{
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };
    const handleCityChange = (e)=>{
        const cityKey = e.target.value;
        setCurrentCityKey(cityKey);
        if (cityKey === '') {
            const defaultCenter = {
                lat: 35.85,
                lng: 139.5
            };
            setCenter(defaultCenter);
            setZoom(11);
            localStorage.setItem(storageKey, JSON.stringify({
                ...defaultCenter,
                zoom: 11
            }));
            return;
        }
        // @ts-ignore
        const city = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITIES"][cityKey];
        if (city) {
            setCenter({
                lat: city.lat,
                lng: city.lng
            });
            setZoom(city.zoom);
            localStorage.setItem(storageKey, JSON.stringify({
                lat: city.lat,
                lng: city.lng,
                zoom: city.zoom
            }));
        }
    };
    const toggleReason = (reason)=>{
        setSelectedReasons((prev)=>prev.includes(reason) ? prev.filter((r)=>r !== reason) : [
                ...prev,
                reason
            ]);
    };
    const handleJumpToPost = (lat, lng)=>{
        setCenter({
            lat,
            lng
        });
        setZoom(16);
        localStorage.setItem(storageKey, JSON.stringify({
            lat,
            lng,
            zoom: 16
        }));
    };
    const handleMapChange = (lat, lng, newZoom)=>{
        setCenter({
            lat,
            lng
        });
        setZoom(newZoom);
        localStorage.setItem(storageKey, JSON.stringify({
            lat,
            lng,
            zoom: newZoom
        }));
    };
    const handleShowPhoto = (imageUrl)=>{
        if (!imageUrl) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('写真はありません', {
                icon: 'no',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff'
                }
            });
            return;
        }
        setPreviewImageUrl(imageUrl);
    };
    const closePreview = ()=>{
        setPreviewImageUrl(null);
    };
    const handlePostUpdate = (postId, newCount)=>{
        setAllPosts((prev)=>prev.map((p)=>p.id === postId ? {
                    ...p,
                    empathy_count: newCount
                } : p));
    };
    // 現在表示中の自治体名を取得（固定モードの場合はその名前）
    const displayCityName = fixedCityCode ? Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITIES"]).find((c)=>c.id === fixedCityCode)?.name : currentCityKey ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITIES"][currentCityKey]?.name : '全域';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            overflow: 'hidden'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                style: {
                    width: '280px',
                    background: '#2c3e50',
                    color: '#ecf0f1',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: '1px solid #34495e',
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '20px',
                            borderBottom: '1px solid #34495e'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                margin: 0,
                                fontSize: '18px',
                                fontWeight: 'bold'
                            },
                            children: fixedCityCode ? `${displayCityName} 管理画面` : '管理者メニュー (全域)'
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                            lineNumber: 199,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                        lineNumber: 198,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '25px',
                            overflowY: 'auto'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    marginBottom: '5px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '13px',
                                            color: '#7f8c8d',
                                            marginBottom: '5px',
                                            fontWeight: 'bold'
                                        },
                                        children: "現在の表示件数"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 214,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '32px',
                                            fontWeight: '800',
                                            color: '#2c3e50',
                                            lineHeight: '1'
                                        },
                                        children: [
                                            filteredPosts.length,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '16px',
                                                    marginLeft: '4px',
                                                    fontWeight: 'normal'
                                                },
                                                children: "件"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 217,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 215,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                lineNumber: 204,
                                columnNumber: 21
                            }, this),
                            allowFiltering && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '13px',
                                            color: '#bdc3c7',
                                            marginBottom: '8px'
                                        },
                                        children: "表示エリア選択"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: currentCityKey,
                                        onChange: handleCityChange,
                                        style: {
                                            width: '100%',
                                            padding: '10px',
                                            borderRadius: '6px',
                                            border: '1px solid #555',
                                            background: '#34495e',
                                            color: 'white',
                                            fontSize: '14px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "未選択（全域）"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 238,
                                                columnNumber: 33
                                            }, this),
                                            Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITIES"]).map(([key, city])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: key,
                                                    children: [
                                                        "埼玉県 ",
                                                        city.name
                                                    ]
                                                }, key, true, {
                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 37
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 225,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                lineNumber: 223,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '13px',
                                            color: '#bdc3c7',
                                            marginBottom: '8px'
                                        },
                                        children: "可視化モード"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 249,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsHeatmapMode(!isHeatmapMode),
                                        style: {
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
                                        },
                                        children: isHeatmapMode ? '🔥 ヒートマップ表示中' : '📍 ピン表示 (通常)'
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 250,
                                        columnNumber: 25
                                    }, this),
                                    isHeatmapMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: '10px',
                                            background: '#34495e',
                                            padding: '10px',
                                            borderRadius: '6px',
                                            border: '1px solid #555'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'block',
                                                    fontSize: '12px',
                                                    color: '#bdc3c7',
                                                    marginBottom: '6px'
                                                },
                                                children: "広がりの強さ (半径)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 279,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: '5px'
                                                },
                                                children: [
                                                    25,
                                                    50,
                                                    80
                                                ].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setHeatmapRadius(r),
                                                        style: {
                                                            flex: 1,
                                                            padding: '6px',
                                                            fontSize: '12px',
                                                            border: '1px solid #777',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer',
                                                            background: heatmapRadius === r ? '#fff' : 'transparent',
                                                            color: heatmapRadius === r ? '#333' : '#fff',
                                                            fontWeight: heatmapRadius === r ? 'bold' : 'normal'
                                                        },
                                                        children: r === 25 ? '小' : r === 50 ? '中' : '大'
                                                    }, r, false, {
                                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 41
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 282,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 270,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                lineNumber: 248,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '13px',
                                            color: '#bdc3c7',
                                            marginBottom: '8px'
                                        },
                                        children: "地図表示モード"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 308,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '6px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setMapMode('standard'),
                                                style: {
                                                    padding: '10px',
                                                    border: 'none',
                                                    background: mapMode === 'standard' ? '#3498db' : '#34495e',
                                                    color: 'white',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    transition: 'all 0.2s'
                                                },
                                                children: "標準 (OSM)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setMapMode('simple'),
                                                style: {
                                                    padding: '10px',
                                                    border: 'none',
                                                    background: mapMode === 'simple' ? '#3498db' : '#34495e',
                                                    color: 'white',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    transition: 'all 0.2s'
                                                },
                                                children: "シンプル (Positron)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 325,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setMapMode('satellite'),
                                                style: {
                                                    padding: '10px',
                                                    border: 'none',
                                                    background: mapMode === 'satellite' ? '#3498db' : '#34495e',
                                                    color: 'white',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    fontSize: '13px',
                                                    transition: 'all 0.2s'
                                                },
                                                children: "航空写真 (Esri)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 340,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 309,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                lineNumber: 307,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '13px',
                                            color: '#bdc3c7',
                                            marginBottom: '8px'
                                        },
                                        children: "不安カテゴリで絞り込み"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '8px',
                                            background: '#34495e',
                                            padding: '12px',
                                            borderRadius: '6px'
                                        },
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REASONS"].map((reason)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                    cursor: 'pointer',
                                                    fontSize: '14px',
                                                    color: 'white'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: selectedReasons.includes(reason),
                                                        onChange: ()=>toggleReason(reason),
                                                        style: {
                                                            accentColor: '#3498db',
                                                            transform: 'scale(1.2)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                        lineNumber: 382,
                                                        columnNumber: 37
                                                    }, this),
                                                    reason
                                                ]
                                            }, reason, true, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 371,
                                                columnNumber: 33
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 360,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                lineNumber: 358,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 'auto',
                                    borderTop: '1px solid #34495e',
                                    paddingTop: '20px'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/'),
                                    style: {
                                        width: '100%',
                                        padding: '12px',
                                        background: 'transparent',
                                        border: '1px solid #7f8c8d',
                                        color: '#ecf0f1',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    },
                                    children: "← 一般ページへ戻る"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                    lineNumber: 395,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                lineNumber: 394,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                        lineNumber: 203,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                lineNumber: 187,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: '0 0 60%',
                            position: 'relative',
                            borderBottom: '1px solid #ddd'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HazardMap, {
                            posts: filteredPosts,
                            centerPos: center,
                            zoomLevel: zoom,
                            onMapChange: handleMapChange,
                            mapMode: mapMode,
                            // 固定コードがある場合はそれを、なければ選択中のキーからIDを引く
                            // @ts-ignore
                            selectedCityId: fixedCityCode || (currentCityKey ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CITIES"][currentCityKey]?.id : null),
                            isAdmin: true,
                            onPostUpdate: handlePostUpdate,
                            showHeatmap: isHeatmapMode,
                            heatmapRadius: heatmapRadius
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                            lineNumber: 416,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                        lineNumber: 415,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto',
                            background: '#f0f2f5',
                            padding: '20px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                background: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                overflow: 'hidden',
                                border: '1px solid #e1e4e8',
                                display: 'flex',
                                flexDirection: 'column'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        overflowX: 'auto'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        style: {
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            fontSize: '13px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                style: {
                                                    background: '#34495e'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'left',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "ID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'left',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "不安"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'left',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "住所"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 449,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'left',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "タグ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 450,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'center',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "同感"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 451,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'center',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "日時"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'center',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "操作"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 453,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 445,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: [
                                                    paginatedPosts.map((post, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                borderBottom: '1px solid #eee',
                                                                background: index % 2 === 0 ? '#fff' : '#f9f9f9'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        color: '#555'
                                                                    },
                                                                    children: post.id
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                    lineNumber: 462,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        fontWeight: 'bold',
                                                                        color: '#2c3e50'
                                                                    },
                                                                    children: post.reason
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                    lineNumber: 463,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        color: '#333',
                                                                        maxWidth: '200px',
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis'
                                                                    },
                                                                    children: post.address || '-'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                    lineNumber: 464,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        color: '#555'
                                                                    },
                                                                    children: post.tags?.join(', ')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                    lineNumber: 476,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        textAlign: 'center',
                                                                        color: '#2c3e50',
                                                                        fontWeight: 'bold'
                                                                    },
                                                                    children: post.empathy_count
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                    lineNumber: 477,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        textAlign: 'center',
                                                                        color: '#666'
                                                                    },
                                                                    children: new Date(post.created_at).toLocaleString('ja-JP', {
                                                                        year: 'numeric',
                                                                        month: '2-digit',
                                                                        day: '2-digit',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                    lineNumber: 480,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        textAlign: 'center'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            gap: '8px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleJumpToPost(post.lat, post.lng),
                                                                                style: {
                                                                                    padding: '6px 10px',
                                                                                    background: '#3498db',
                                                                                    border: '1px solid #2980b9',
                                                                                    color: 'white',
                                                                                    borderRadius: '4px',
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '12px',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    transition: 'all 0.2s ease'
                                                                                },
                                                                                title: "地図へ移動",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    width: "16",
                                                                                    height: "16",
                                                                                    viewBox: "0 0 24 24",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2",
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 0 18 0z"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                            lineNumber: 525,
                                                                                            columnNumber: 61
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                            cx: "12",
                                                                                            cy: "10",
                                                                                            r: "3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                            lineNumber: 526,
                                                                                            columnNumber: 61
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                    lineNumber: 515,
                                                                                    columnNumber: 57
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                lineNumber: 498,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleShowPhoto(post.image_url),
                                                                                disabled: !post.image_url,
                                                                                style: {
                                                                                    padding: '6px 10px',
                                                                                    background: post.image_url ? '#3498db' : '#f0f2f5',
                                                                                    border: post.image_url ? '1px solid #2980b9' : '1px solid #dce0e5',
                                                                                    color: post.image_url ? '#ffffff' : '#aab2bd',
                                                                                    borderRadius: '4px',
                                                                                    cursor: post.image_url ? 'pointer' : 'not-allowed',
                                                                                    fontSize: '12px',
                                                                                    whiteSpace: 'nowrap',
                                                                                    display: 'flex',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'center',
                                                                                    transition: 'all 0.2s ease'
                                                                                },
                                                                                title: post.image_url ? '写真を見る' : '写真はありません',
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    width: "16",
                                                                                    height: "16",
                                                                                    viewBox: "0 0 24 24",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2",
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                                            x: "3",
                                                                                            y: "3",
                                                                                            width: "18",
                                                                                            height: "18",
                                                                                            rx: "2",
                                                                                            ry: "2"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                            lineNumber: 559,
                                                                                            columnNumber: 61
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                            cx: "8.5",
                                                                                            cy: "8.5",
                                                                                            r: "1.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                            lineNumber: 560,
                                                                                            columnNumber: 61
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                                            points: "21 15 16 10 5 21"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                            lineNumber: 561,
                                                                                            columnNumber: 61
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                    lineNumber: 549,
                                                                                    columnNumber: 57
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                                lineNumber: 530,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                        lineNumber: 490,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, post.id, true, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 458,
                                                            columnNumber: 41
                                                        }, this)),
                                                    filteredPosts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 7,
                                                            style: {
                                                                padding: '30px',
                                                                textAlign: 'center',
                                                                color: '#999'
                                                            },
                                                            children: "データがありません"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                            lineNumber: 570,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                        lineNumber: 569,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                                lineNumber: 456,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                        lineNumber: 444,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                    lineNumber: 443,
                                    columnNumber: 25
                                }, this),
                                filteredPosts.length > ITEMS_PER_PAGE && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '15px',
                                        gap: '15px',
                                        borderTop: '1px solid #eee',
                                        background: '#f9f9f9'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handlePageChange(currentPage - 1),
                                            disabled: currentPage === 1,
                                            style: {
                                                padding: '8px 15px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                background: currentPage === 1 ? '#eee' : 'white',
                                                color: currentPage === 1 ? '#aaa' : '#333',
                                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                            },
                                            children: "前へ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                            lineNumber: 591,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '14px',
                                                color: '#555',
                                                fontWeight: 'bold'
                                            },
                                            children: [
                                                currentPage,
                                                " / ",
                                                totalPages,
                                                " ページ"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                            lineNumber: 605,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handlePageChange(currentPage + 1),
                                            disabled: currentPage === totalPages,
                                            style: {
                                                padding: '8px 15px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                background: currentPage === totalPages ? '#eee' : 'white',
                                                color: currentPage === totalPages ? '#aaa' : '#333',
                                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                            },
                                            children: "次へ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                            lineNumber: 608,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                                    lineNumber: 580,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                            lineNumber: 432,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                        lineNumber: 431,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                lineNumber: 414,
                columnNumber: 13
            }, this),
            previewImageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: closePreview,
                style: {
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
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>e.stopPropagation(),
                    style: {
                        position: 'relative',
                        maxWidth: '90%',
                        maxHeight: '90%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: previewImageUrl,
                            alt: "拡大プレビュー",
                            style: {
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%',
                                maxHeight: '85vh',
                                borderRadius: '4px',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                            lineNumber: 657,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closePreview,
                            style: {
                                position: 'absolute',
                                top: '-40px',
                                right: '-10px',
                                background: 'transparent',
                                border: 'none',
                                color: 'white',
                                fontSize: '30px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            },
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                            lineNumber: 669,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                    lineNumber: 646,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
                lineNumber: 629,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/[cityCode]/page.tsx",
        lineNumber: 178,
        columnNumber: 9
    }, this);
}
_s(AdminDashboard, "SKhHv6S0s2cGzVKzn2kqZq+fMxs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c1 = AdminDashboard;
var _c, _c1;
__turbopack_context__.k.register(_c, "HazardMap");
__turbopack_context__.k.register(_c1, "AdminDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_3a20b7b7._.js.map