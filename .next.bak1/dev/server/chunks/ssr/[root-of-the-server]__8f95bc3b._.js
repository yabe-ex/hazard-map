module.exports = [
"[project]/src/lib/supabaseClient.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://jmmyndjhysitqosemjfc.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptbXluZGpoeXNpdHFvc2VtamZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNDk4MDcsImV4cCI6MjA4MTcyNTgwN30.Uuht_XeVWmuJ0yDZKbkzQTzR_FNBw2giuczTOF8z-X0");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/constants/reasons.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/constants/cities.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/constants/cities.ts
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
        slug: 'kawagoe',
        lat: 35.9251,
        lng: 139.4858,
        zoom: 13
    },
    tokorozawa: {
        id: '11208',
        name: '所沢市',
        slug: 'tokorozawa',
        lat: 35.7994,
        lng: 139.4687,
        zoom: 13
    },
    sayama: {
        id: '11215',
        name: '狭山市',
        slug: 'sayama',
        lat: 35.8533,
        lng: 139.4122,
        zoom: 13
    },
    fujimino: {
        id: '11245',
        name: 'ふじみ野市',
        slug: 'fujimino',
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
}),
"[project]/src/components/AdminPostDetailModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPostDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
// URLを検出してリンク化するヘルパー関数
const renderContentWithLinks = (text)=>{
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index)=>{
        if (part.match(urlRegex)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: part,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                    color: '#3498db',
                    textDecoration: 'underline'
                },
                onClick: (e)=>e.stopPropagation(),
                children: part
            }, index, false, {
                fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                lineNumber: 22,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0));
        }
        return part;
    });
};
function AdminPostDetailModal({ post, isOpen, onClose, onUpdate, cityCodeFilter }) {
    const [allTags, setAllTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [attachedTagIds, setAttachedTagIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [memos, setMemos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [memoInput, setMemoInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingMemoId, setEditingMemoId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newTagName, setNewTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [newTagColor, setNewTagColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('#2ecc71');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const memoEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isOpen && post) {
            fetchTags();
            fetchAttachedTags();
            fetchMemos();
            setMemoInput('');
            setEditingMemoId(null);
        }
    }, [
        isOpen,
        post
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!editingMemoId) {
            memoEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }, [
        memos
    ]);
    const fetchTags = async ()=>{
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_tags').select('*').order('id', {
            ascending: true
        });
        if (cityCodeFilter) {
            query = query.or(`is_system.eq.true,city_code.eq.${cityCodeFilter}`);
        }
        const { data, error } = await query;
        if (!error && data) setAllTags(data);
    };
    const fetchAttachedTags = async ()=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('post_tags').select('tag_id').eq('post_id', post.id);
        if (!error && data) setAttachedTagIds(data.map((d)=>d.tag_id));
    };
    const fetchMemos = async ()=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_memos').select('*').eq('post_id', post.id).order('created_at', {
            ascending: true
        });
        if (!error && data) setMemos(data);
    };
    const toggleTag = async (tag)=>{
        const isAttached = attachedTagIds.includes(tag.id);
        if (isAttached) {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('post_tags').delete().eq('post_id', post.id).eq('tag_id', tag.id);
            if (!error) {
                setAttachedTagIds((prev)=>prev.filter((id)=>id !== tag.id));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('タグを外しました');
                onUpdate();
            }
        } else {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('post_tags').insert({
                post_id: post.id,
                tag_id: tag.id
            });
            if (!error) {
                setAttachedTagIds((prev)=>[
                        ...prev,
                        tag.id
                    ]);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('タグを付けました');
                onUpdate();
            }
        }
    };
    const handleSubmitMemo = async ()=>{
        if (!memoInput.trim()) return;
        setIsLoading(true);
        const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        if (!user) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('ログインが必要です');
            setIsLoading(false);
            return;
        }
        if (editingMemoId) {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_memos').update({
                content: memoInput
            }).eq('id', editingMemoId);
            if (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('メモの更新に失敗しました');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('メモを更新しました');
                setMemoInput('');
                setEditingMemoId(null);
                fetchMemos();
            }
        } else {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_memos').insert({
                post_id: post.id,
                user_id: user.id,
                content: memoInput
            });
            if (error) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('メモの送信に失敗しました');
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('メモを保存しました');
                setMemoInput('');
                fetchMemos();
            }
        }
        setIsLoading(false);
    };
    const handleDeleteMemo = async (memoId)=>{
        if (!window.confirm('このメモを削除しますか？')) return;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_memos').delete().eq('id', memoId);
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('削除に失敗しました');
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('メモを削除しました');
            if (editingMemoId === memoId) {
                setMemoInput('');
                setEditingMemoId(null);
            }
            fetchMemos();
        }
    };
    const handleStartEdit = (memo)=>{
        setEditingMemoId(memo.id);
        setMemoInput(memo.content);
    };
    const handleCancelEdit = ()=>{
        setEditingMemoId(null);
        setMemoInput('');
    };
    const createCustomTag = async ()=>{
        if (!newTagName.trim()) return;
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_tags').insert({
            label: newTagName,
            color: newTagColor,
            is_system: false,
            city_code: cityCodeFilter
        });
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('タグ作成に失敗しました');
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success('独自タグを作成しました');
            setNewTagName('');
            fetchTags();
        }
    };
    if (!isOpen || !post) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#333'
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: 'white',
                width: '900px',
                maxWidth: '95%',
                height: '85vh',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '15px 20px',
                        borderBottom: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#f8f9fa'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '12px',
                                        color: '#444',
                                        background: '#e0e0e0',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        fontWeight: 'bold'
                                    },
                                    children: [
                                        "ID: ",
                                        post.id
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                    lineNumber: 226,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        marginLeft: '10px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        color: '#111'
                                    },
                                    children: post.reason
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                    lineNumber: 238,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                            lineNumber: 225,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                border: 'none',
                                background: 'transparent',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#555'
                            },
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                            lineNumber: 240,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                    lineNumber: 215,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1,
                        display: 'flex',
                        overflow: 'hidden'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '40%',
                                padding: '20px',
                                borderRight: '1px solid #eee',
                                overflowY: 'auto',
                                background: '#fff'
                            },
                            children: [
                                post.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '15px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                color: '#555',
                                                marginBottom: '5px'
                                            },
                                            children: "現場写真"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 254,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: post.image_url,
                                            style: {
                                                width: '100%',
                                                borderRadius: '6px',
                                                border: '1px solid #ddd',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                            },
                                            alt: "投稿写真"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 255,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                    lineNumber: 253,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '15px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: '14px',
                                                color: '#555',
                                                marginBottom: '5px',
                                                fontWeight: 'bold'
                                            },
                                            children: "詳細"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 263,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '14px',
                                                margin: 0,
                                                color: '#222'
                                            },
                                            children: post.address || '住所情報なし'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 264,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '12px',
                                                color: '#444',
                                                marginTop: '5px'
                                            },
                                            children: [
                                                "投稿日時: ",
                                                new Date(post.created_at).toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 265,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                    lineNumber: 262,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '15px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: '14px',
                                                color: '#555',
                                                marginBottom: '5px',
                                                fontWeight: 'bold'
                                            },
                                            children: "ユーザー投稿タグ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 270,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '5px'
                                            },
                                            children: post.tags?.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '12px',
                                                        background: '#f0f2f5',
                                                        padding: '4px 8px',
                                                        borderRadius: '10px',
                                                        color: '#333',
                                                        border: '1px solid #e0e0e0'
                                                    },
                                                    children: t
                                                }, t, false, {
                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                    lineNumber: 273,
                                                    columnNumber: 37
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 271,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                    lineNumber: 269,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                            lineNumber: 251,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                background: '#fcfcfc',
                                overflow: 'hidden'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        borderBottom: '1px solid #ddd',
                                        flexShrink: 0
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            flex: 1,
                                            padding: '12px',
                                            background: 'white',
                                            border: 'none',
                                            borderBottom: '2px solid #3498db',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            color: '#333'
                                        },
                                        children: "🛠 管理・対応"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                        lineNumber: 296,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                    lineNumber: 295,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        padding: '20px',
                                        overflowY: 'hidden'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: '20px',
                                                flexShrink: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        marginBottom: '10px',
                                                        color: '#111'
                                                    },
                                                    children: "🏷 ステータス・タグ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                    lineNumber: 317,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: '8px',
                                                        marginBottom: '15px'
                                                    },
                                                    children: allTags.map((tag)=>{
                                                        const isActive = attachedTagIds.includes(tag.id);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>toggleTag(tag),
                                                            style: {
                                                                padding: '6px 12px',
                                                                borderRadius: '20px',
                                                                border: `1px solid ${tag.color}`,
                                                                background: isActive ? tag.color : 'white',
                                                                color: isActive ? 'white' : tag.color,
                                                                cursor: 'pointer',
                                                                fontSize: '13px',
                                                                fontWeight: 'bold'
                                                            },
                                                            children: [
                                                                isActive && '✔ ',
                                                                tag.label
                                                            ]
                                                        }, tag.id, true, {
                                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                            lineNumber: 322,
                                                            columnNumber: 45
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                                    style: {
                                                        fontSize: '13px',
                                                        color: '#444',
                                                        cursor: 'pointer'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                            children: "＋ 新しいタグを作成する"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                marginTop: '10px',
                                                                display: 'flex',
                                                                gap: '10px',
                                                                alignItems: 'center',
                                                                padding: '10px',
                                                                background: '#eee',
                                                                borderRadius: '6px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    placeholder: "タグ名 (例: 道路課)",
                                                                    value: newTagName,
                                                                    onChange: (e)=>setNewTagName(e.target.value),
                                                                    style: {
                                                                        padding: '6px',
                                                                        borderRadius: '4px',
                                                                        border: '1px solid #ccc',
                                                                        color: '#000',
                                                                        background: '#fff'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                    lineNumber: 355,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "color",
                                                                    value: newTagColor,
                                                                    onChange: (e)=>setNewTagColor(e.target.value),
                                                                    style: {
                                                                        width: '40px',
                                                                        height: '30px',
                                                                        border: 'none',
                                                                        background: 'transparent'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                    lineNumber: 368,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: createCustomTag,
                                                                    style: {
                                                                        padding: '6px 12px',
                                                                        background: '#333',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '4px',
                                                                        cursor: 'pointer'
                                                                    },
                                                                    children: "作成"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                    lineNumber: 374,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 316,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                background: 'white',
                                                overflow: 'hidden'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: '10px',
                                                        background: '#f8f9fa',
                                                        borderBottom: '1px solid #eee',
                                                        fontSize: '13px',
                                                        fontWeight: 'bold',
                                                        color: '#333',
                                                        flexShrink: 0
                                                    },
                                                    children: "📝 担当者メモ (履歴)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                    lineNumber: 404,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1,
                                                        overflowY: 'auto',
                                                        padding: '10px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '10px'
                                                    },
                                                    children: [
                                                        memos.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                textAlign: 'center',
                                                                color: '#666',
                                                                fontSize: '13px',
                                                                marginTop: '20px'
                                                            },
                                                            children: "メモはまだありません"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                            lineNumber: 421,
                                                            columnNumber: 41
                                                        }, this),
                                                        memos.map((memo)=>{
                                                            const isEditing = editingMemoId === memo.id;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    background: isEditing ? '#fff8e1' : '#f0f2f5',
                                                                    padding: '10px',
                                                                    borderRadius: '8px',
                                                                    fontSize: '13px',
                                                                    border: isEditing ? '2px solid #f1c40f' : '1px solid #e1e4e8',
                                                                    position: 'relative'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            justifyContent: 'space-between',
                                                                            marginBottom: '4px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: '11px',
                                                                                    color: '#555',
                                                                                    fontWeight: 'bold'
                                                                                },
                                                                                children: new Date(memo.created_at).toLocaleString()
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                                lineNumber: 440,
                                                                                columnNumber: 53
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                style: {
                                                                                    display: 'flex',
                                                                                    gap: '8px'
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>handleStartEdit(memo),
                                                                                        title: "編集",
                                                                                        style: {
                                                                                            border: 'none',
                                                                                            background: 'transparent',
                                                                                            cursor: 'pointer',
                                                                                            fontSize: '14px',
                                                                                            padding: 0
                                                                                        },
                                                                                        children: "✏️"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                                        lineNumber: 444,
                                                                                        columnNumber: 57
                                                                                    }, this),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                        onClick: ()=>handleDeleteMemo(memo.id),
                                                                                        title: "削除",
                                                                                        style: {
                                                                                            border: 'none',
                                                                                            background: 'transparent',
                                                                                            cursor: 'pointer',
                                                                                            fontSize: '14px',
                                                                                            padding: 0
                                                                                        },
                                                                                        children: "🗑️"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                                        lineNumber: 457,
                                                                                        columnNumber: 57
                                                                                    }, this)
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                                lineNumber: 443,
                                                                                columnNumber: 53
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                        lineNumber: 439,
                                                                        columnNumber: 49
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            whiteSpace: 'pre-wrap',
                                                                            lineHeight: '1.4',
                                                                            color: '#111'
                                                                        },
                                                                        children: renderContentWithLinks(memo.content)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                        lineNumber: 472,
                                                                        columnNumber: 49
                                                                    }, this)
                                                                ]
                                                            }, memo.id, true, {
                                                                fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                lineNumber: 428,
                                                                columnNumber: 45
                                                            }, this);
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: memoEndRef
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                            lineNumber: 478,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                    lineNumber: 419,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: '10px',
                                                        borderTop: '1px solid #eee',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '5px',
                                                        background: editingMemoId ? '#fffbe6' : 'white',
                                                        flexShrink: 0
                                                    },
                                                    children: [
                                                        editingMemoId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '11px',
                                                                color: '#d35400',
                                                                display: 'flex',
                                                                justifyContent: 'space-between'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "⚠️ メモを編集中です"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                    lineNumber: 495,
                                                                    columnNumber: 45
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleCancelEdit,
                                                                    style: {
                                                                        border: 'none',
                                                                        background: 'transparent',
                                                                        textDecoration: 'underline',
                                                                        cursor: 'pointer',
                                                                        color: '#888'
                                                                    },
                                                                    children: "キャンセル"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                    lineNumber: 496,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: '10px'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                                    value: memoInput,
                                                                    onChange: (e)=>setMemoInput(e.target.value),
                                                                    placeholder: "対応状況やメモを入力... (改行可能)",
                                                                    style: {
                                                                        flex: 1,
                                                                        height: '80px',
                                                                        padding: '8px',
                                                                        borderRadius: '4px',
                                                                        border: editingMemoId ? '2px solid #f1c40f' : '1px solid #ccc',
                                                                        resize: 'vertical',
                                                                        color: '#000',
                                                                        background: '#fff',
                                                                        fontFamily: 'inherit'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                    lineNumber: 511,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: handleSubmitMemo,
                                                                    disabled: isLoading || !memoInput.trim(),
                                                                    style: {
                                                                        width: '60px',
                                                                        background: editingMemoId ? '#f39c12' : '#3498db',
                                                                        color: 'white',
                                                                        border: 'none',
                                                                        borderRadius: '4px',
                                                                        cursor: 'pointer',
                                                                        fontWeight: 'bold',
                                                                        height: 'auto'
                                                                    },
                                                                    children: editingMemoId ? '更新' : '送信'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                                    lineNumber: 527,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                            lineNumber: 510,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                                    lineNumber: 482,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                            lineNumber: 393,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                                    lineNumber: 314,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                            lineNumber: 293,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminPostDetailModal.tsx",
                    lineNumber: 248,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AdminPostDetailModal.tsx",
            lineNumber: 200,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AdminPostDetailModal.tsx",
        lineNumber: 184,
        columnNumber: 9
    }, this);
}
}),
"[project]/src/components/AdminDashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/reasons.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/cities.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminPostDetailModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdminPostDetailModal.tsx [app-ssr] (ecmascript)");
;
'use client';
;
;
;
;
;
;
;
;
const HazardMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-10 text-center text-gray-500",
            children: "地図を読み込み中..."
        }, void 0, false, {
            fileName: "[project]/src/components/AdminDashboard.tsx",
            lineNumber: 13,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0)),
    ssr: false
});
const ADMIN_POS_KEY_PREFIX = 'hazard-map-admin-pos';
const ADMIN_SETTINGS_KEY = 'hazard-map-admin-settings';
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
function AdminDashboard({ fixedCityCode, allowFiltering = true }) {
    // Data States
    const [allPosts, setAllPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [filteredPosts, setFilteredPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [adminTagsMaster, setAdminTagsMaster] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // Filter States
    const [filterKeyword, setFilterKeyword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [filterHasPhoto, setFilterHasPhoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedReasons, setSelectedReasons] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAdminTagIds, setSelectedAdminTagIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedUserTags, setSelectedUserTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentCityKey, setCurrentCityKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Map & UI States
    const [center, setCenter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        lat: 35.85,
        lng: 139.5
    });
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(11);
    const [mapMode, setMapMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('standard');
    const [selectedPost, setSelectedPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isHeatmapMode, setIsHeatmapMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [heatmapRadius, setHeatmapRadius] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(50);
    const [previewImageUrl, setPreviewImageUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Pagination & Settings
    const [currentPage, setCurrentPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [itemsPerPage, setItemsPerPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(100);
    const [visibleColumns, setVisibleColumns] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(INITIAL_VISIBLE_COLUMNS);
    const [mapHeightRatio, setMapHeightRatio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0.5);
    const [isDragging, setIsDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSettings, setShowSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Sort
    const [sortKey, setSortKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('created_at');
    const [sortOrder, setSortOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('desc');
    // CSV Export States
    const [isCsvModalOpen, setIsCsvModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [csvStartDate, setCsvStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [csvEndDate, setCsvEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const storagePosKey = fixedCityCode ? `${ADMIN_POS_KEY_PREFIX}-${fixedCityCode}` : `${ADMIN_POS_KEY_PREFIX}-global`;
    // 1. 初期化・設定読み込み
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (fixedCityCode) {
            const entry = Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CITIES"]).find(([_, city])=>city.id === fixedCityCode);
            if (entry) {
                const [key, city] = entry;
                setCurrentCityKey(key);
                setCenter({
                    lat: city.lat,
                    lng: city.lng
                });
                setZoom(city.zoom);
            }
        }
        setSelectedReasons([
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["REASONS"]
        ]);
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
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        setCsvStartDate(firstDay.toISOString().split('T')[0]);
        setCsvEndDate(lastDay.toISOString().split('T')[0]);
    }, [
        fixedCityCode,
        storagePosKey
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const settings = {
            visibleColumns,
            itemsPerPage,
            mapHeightRatio
        };
        localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings));
    }, [
        visibleColumns,
        itemsPerPage,
        mapHeightRatio
    ]);
    // 2. データ取得
    const fetchPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const { data: postsData, error: postsError } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('hazard_posts').select('*').order('created_at', {
                ascending: false
            });
            if (postsError) {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('データの取得に失敗しました');
                return;
            }
            const { data: postTagsData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('post_tags').select('post_id, tag_id, created_at');
            const { data: adminTagsData } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('admin_tags').select('*').order('id');
            if (adminTagsData) setAdminTagsMaster(adminTagsData);
            const processedData = (postsData || []).map((post)=>{
                const myPostTags = (postTagsData || []).filter((pt)=>pt.post_id === post.id);
                const tagsWithDetails = myPostTags.map((pt)=>{
                    const tagDetail = (adminTagsData || []).find((at)=>at.id === pt.tag_id);
                    return {
                        ...pt,
                        admin_tags: tagDetail
                    };
                });
                tagsWithDetails.sort((a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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
            setFilteredPosts((prev)=>prev.length === 0 && processedData.length > 0 ? processedData : prev);
        } catch (e) {
            console.error(e);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('予期せぬエラーが発生しました');
        }
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchPosts();
    }, [
        fetchPosts
    ]);
    // 3. フィルタリング & ソートロジック
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (allPosts.length === 0) return;
        let temp = allPosts;
        if (fixedCityCode) {
            temp = temp.filter((p)=>p.city_code === fixedCityCode);
        } else if (currentCityKey) {
            // @ts-ignore
            const cityId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CITIES"][currentCityKey]?.id;
            if (cityId) temp = temp.filter((p)=>p.city_code === cityId);
        }
        if (filterKeyword.trim()) {
            const kw = filterKeyword.trim().toLowerCase();
            temp = temp.filter((p)=>p.address && p.address.toLowerCase().includes(kw) || p.reason && p.reason.toLowerCase().includes(kw) || p.tags && p.tags.some((t)=>t.toLowerCase().includes(kw)));
        }
        if (filterHasPhoto) temp = temp.filter((p)=>p.image_url);
        if (selectedReasons.length > 0) temp = temp.filter((p)=>selectedReasons.includes(p.reason));
        else temp = [];
        if (selectedAdminTagIds.length > 0) {
            const includeNoTag = selectedAdminTagIds.includes(-1);
            const targetIds = selectedAdminTagIds.filter((id)=>id !== -1);
            temp = temp.filter((p)=>{
                const hasTags = p.post_tags && p.post_tags.length > 0;
                if (includeNoTag && !hasTags) return true;
                if (hasTags && p.post_tags.some((pt)=>targetIds.includes(pt.tag_id))) return true;
                return false;
            });
        }
        if (selectedUserTags.length > 0) {
            temp = temp.filter((p)=>p.tags && p.tags.some((t)=>selectedUserTags.includes(t)));
        }
        temp = [
            ...temp
        ].sort((a, b)=>{
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
    const toggleReason = (reason)=>{
        setSelectedReasons((prev)=>prev.includes(reason) ? prev.filter((r)=>r !== reason) : [
                ...prev,
                reason
            ]);
    };
    const toggleAdminTag = (tagId)=>{
        setSelectedAdminTagIds((prev)=>prev.includes(tagId) ? prev.filter((id)=>id !== tagId) : [
                ...prev,
                tagId
            ]);
    };
    const toggleUserTag = (tag)=>{
        setSelectedUserTags((prev)=>prev.includes(tag) ? prev.filter((t)=>t !== tag) : [
                ...prev,
                tag
            ]);
    };
    const handleSort = (key)=>{
        if (sortKey === key) {
            setSortOrder((prev)=>prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc');
        }
    };
    const renderSortHeader = (label, key, align = 'left', minWidth)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            onClick: ()=>handleSort(key),
            style: {
                padding: '14px',
                textAlign: align,
                color: '#fff',
                fontWeight: '600',
                cursor: 'pointer',
                userSelect: 'none',
                minWidth: minWidth,
                whiteSpace: minWidth ? 'nowrap' : 'normal'
            },
            title: `${label}で並び替え`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: align === 'center' ? 'center' : 'flex-start',
                    gap: '4px'
                },
                children: [
                    label,
                    sortKey === key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '10px'
                        },
                        children: sortOrder === 'asc' ? '▲' : '▼'
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 303,
                        columnNumber: 37
                    }, this),
                    sortKey !== key && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: '10px',
                            opacity: 0.3
                        },
                        children: "▼"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 304,
                        columnNumber: 37
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 301,
                columnNumber: 13
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/AdminDashboard.tsx",
            lineNumber: 287,
            columnNumber: 9
        }, this);
    const handleDownloadCsv = async ()=>{
        if (!csvStartDate || !csvEndDate) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('期間を指定してください');
            return;
        }
        const start = new Date(csvStartDate);
        const end = new Date(csvEndDate);
        end.setHours(23, 59, 59, 999);
        let targetPosts = allPosts.filter((p)=>{
            const d = new Date(p.created_at);
            return d >= start && d <= end;
        });
        if (fixedCityCode) {
            targetPosts = targetPosts.filter((p)=>p.city_code === fixedCityCode);
        } else if (currentCityKey) {
            // @ts-ignore
            const cityId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CITIES"][currentCityKey]?.id;
            if (cityId) targetPosts = targetPosts.filter((p)=>p.city_code === cityId);
        }
        if (targetPosts.length === 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].error('指定期間にデータがありません');
            return;
        }
        const header = [
            'ID',
            '日時',
            '不安カテゴリ',
            '住所',
            '詳細タグ(ユーザー)',
            '管理ステータス',
            '同感数',
            '緯度',
            '経度',
            '画像URL'
        ];
        const rows = targetPosts.map((post)=>{
            const dateStr = new Date(post.created_at).toLocaleString('ja-JP');
            const userTagsStr = post.tags ? post.tags.join(' | ') : '';
            const adminTagsStr = post.post_tags ? post.post_tags.map((pt)=>pt.admin_tags?.label).join(' | ') : '未対応';
            const escape = (val)=>`"${String(val || '').replace(/"/g, '""')}"`;
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
        const blob = new Blob([
            csvContent
        ], {
            type: 'text/csv;charset=utf-8;'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `hazard_report_${csvStartDate}_${csvEndDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsCsvModalOpen(false);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].success(`${targetPosts.length}件を出力しました`);
    };
    const handleDragStart = (e)=>{
        e.preventDefault();
        setIsDragging(true);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleMouseMove = (e)=>{
            if (!isDragging || !containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const ratio = Math.max(0.1, Math.min(0.9, (e.clientY - rect.top) / rect.height));
            setMapHeightRatio(ratio);
        };
        const handleMouseUp = ()=>{
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
        return ()=>{
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [
        isDragging
    ]);
    const handleCityChange = (e)=>{
        const key = e.target.value;
        setCurrentCityKey(key);
        // @ts-ignore
        const city = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CITIES"][key];
        const target = city ? {
            lat: city.lat,
            lng: city.lng,
            zoom: city.zoom
        } : {
            lat: 35.85,
            lng: 139.5,
            zoom: 11
        };
        setCenter({
            lat: target.lat,
            lng: target.lng
        });
        setZoom(target.zoom);
        localStorage.setItem(storagePosKey, JSON.stringify(target));
    };
    const handleJumpToPost = (lat, lng)=>{
        setCenter({
            lat,
            lng
        });
        setZoom(16);
        localStorage.setItem(storagePosKey, JSON.stringify({
            lat,
            lng,
            zoom: 16
        }));
    };
    const handleMapChange = (lat, lng, z)=>{
        setCenter({
            lat,
            lng
        });
        setZoom(z);
        localStorage.setItem(storagePosKey, JSON.stringify({
            lat,
            lng,
            zoom: z
        }));
    };
    const handleShowPhoto = (url)=>{
        if (!url) return;
        setPreviewImageUrl(url);
    };
    const closePreview = ()=>setPreviewImageUrl(null);
    const handlePostUpdate = (id, count)=>setAllPosts((prev)=>prev.map((p)=>p.id === id ? {
                    ...p,
                    empathy_count: count
                } : p));
    const handleOpenDetail = (post)=>{
        setSelectedPost(post);
        setIsModalOpen(true);
    };
    const handleModalUpdate = ()=>fetchPosts();
    const handlePageChange = (p)=>setCurrentPage(p);
    const toggleColumn = (col)=>setVisibleColumns((prev)=>({
                ...prev,
                [col]: !prev[col]
            }));
    const handleItemsPerPageChange = (e)=>{
        const v = parseInt(e.target.value);
        if (v > 0) {
            setItemsPerPage(v);
            setCurrentPage(1);
        }
    };
    const displayCityName = fixedCityCode ? Object.values(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CITIES"]).find((c)=>c.id === fixedCityCode)?.name : currentCityKey ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CITIES"][currentCityKey]?.name : '全域';
    const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
    const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            fontFamily: 'sans-serif',
            overflow: 'hidden',
            color: '#333'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '15px 20px',
                            borderBottom: '1px solid #34495e'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                margin: 0,
                                fontSize: '16px',
                                fontWeight: 'bold'
                            },
                            children: fixedCityCode ? `${displayCityName} 管理画面` : '総合管理画面'
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 468,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 467,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: '15px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            overflowY: 'auto'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    background: 'white',
                                    padding: '10px',
                                    borderRadius: '6px',
                                    textAlign: 'center',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '11px',
                                            color: '#555',
                                            fontWeight: 'bold'
                                        },
                                        children: "現在の表示件数"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 484,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '24px',
                                            fontWeight: '800',
                                            color: '#2c3e50',
                                            lineHeight: '1.2'
                                        },
                                        children: [
                                            filteredPosts.length,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontSize: '12px',
                                                    marginLeft: '2px',
                                                    fontWeight: 'normal'
                                                },
                                                children: "件"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 487,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 485,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 475,
                                columnNumber: 21
                            }, this),
                            allowFiltering && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: {
                                            display: 'block',
                                            fontSize: '12px',
                                            color: '#bdc3c7',
                                            marginBottom: '5px'
                                        },
                                        children: "表示エリア"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 495,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: currentCityKey,
                                        onChange: handleCityChange,
                                        style: {
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            border: '1px solid #555',
                                            background: '#34495e',
                                            color: 'white',
                                            fontSize: '13px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "未選択（全域）"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 509,
                                                columnNumber: 33
                                            }, this),
                                            Object.entries(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CITIES"]).map(([key, city])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: key,
                                                    children: [
                                                        "埼玉県 ",
                                                        city.name
                                                    ]
                                                }, key, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 511,
                                                    columnNumber: 37
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 496,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 494,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                style: {
                                    border: 'none',
                                    borderTop: '1px solid #34495e',
                                    margin: '0'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 518,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                        style: {
                                            fontSize: '13px',
                                            color: '#ecf0f1',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            marginBottom: '8px'
                                        },
                                        children: "🗺️ 地図・表示設定"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 520,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            paddingLeft: '10px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setIsHeatmapMode(!isHeatmapMode),
                                                style: {
                                                    width: '100%',
                                                    padding: '8px',
                                                    background: isHeatmapMode ? '#e74c3c' : '#3498db',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                },
                                                children: isHeatmapMode ? '🔥 ヒートマップ中' : '📍 ピン表示中'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 524,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    gap: '5px'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setMapMode('standard'),
                                                        style: {
                                                            flex: 1,
                                                            padding: '6px',
                                                            border: 'none',
                                                            background: mapMode === 'standard' ? '#2980b9' : '#34495e',
                                                            color: 'white',
                                                            borderRadius: '4px',
                                                            fontSize: '11px',
                                                            cursor: 'pointer'
                                                        },
                                                        children: "標準"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 540,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setMapMode('simple'),
                                                        style: {
                                                            flex: 1,
                                                            padding: '6px',
                                                            border: 'none',
                                                            background: mapMode === 'simple' ? '#2980b9' : '#34495e',
                                                            color: 'white',
                                                            borderRadius: '4px',
                                                            fontSize: '11px',
                                                            cursor: 'pointer'
                                                        },
                                                        children: "白地図"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 555,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>setMapMode('satellite'),
                                                        style: {
                                                            flex: 1,
                                                            padding: '6px',
                                                            border: 'none',
                                                            background: mapMode === 'satellite' ? '#2980b9' : '#34495e',
                                                            color: 'white',
                                                            borderRadius: '4px',
                                                            fontSize: '11px',
                                                            cursor: 'pointer'
                                                        },
                                                        children: "航空"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 570,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 539,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 523,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 519,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                style: {
                                    border: 'none',
                                    borderTop: '1px solid #34495e',
                                    margin: '0'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 588,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                open: true,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                        style: {
                                            fontSize: '13px',
                                            color: '#ecf0f1',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            marginBottom: '8px'
                                        },
                                        children: "🏷️ 管理ステータス"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 590,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '6px',
                                            paddingLeft: '5px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '8px',
                                                    fontSize: '13px',
                                                    color: '#bdc3c7',
                                                    cursor: 'pointer'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: selectedAdminTagIds.includes(-1),
                                                        onChange: ()=>toggleAdminTag(-1),
                                                        style: {
                                                            accentColor: '#3498db'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 33
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            padding: '2px 6px',
                                                            borderRadius: '4px',
                                                            background: '#95a5a6',
                                                            color: 'white',
                                                            fontSize: '11px'
                                                        },
                                                        children: "未対応 (タグなし)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 603,
                                                        columnNumber: 33
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 594,
                                                columnNumber: 29
                                            }, this),
                                            adminTagsMaster.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        fontSize: '13px',
                                                        color: '#bdc3c7',
                                                        cursor: 'pointer'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: selectedAdminTagIds.includes(tag.id),
                                                            onChange: ()=>toggleAdminTag(tag.id),
                                                            style: {
                                                                accentColor: '#3498db'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 619,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                padding: '2px 6px',
                                                                borderRadius: '4px',
                                                                background: tag.color,
                                                                color: 'white',
                                                                fontSize: '11px'
                                                            },
                                                            children: tag.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 625,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, tag.id, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 33
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 593,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 589,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                style: {
                                    border: 'none',
                                    borderTop: '1px solid #34495e',
                                    margin: '0'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 634,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                            color: '#ecf0f1'
                                        },
                                        children: "⚠️ 不安カテゴリ・詳細"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 636,
                                        columnNumber: 25
                                    }, this),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["REASONS"].map((reason)=>{
                                        const isSelected = selectedReasons.includes(reason);
                                        const tags = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["REASON_TAGS"][reason] || [];
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                borderLeft: isSelected ? '3px solid #3498db' : '3px solid transparent',
                                                paddingLeft: '8px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                        fontSize: '13px',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        fontWeight: isSelected ? 'bold' : 'normal'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "checkbox",
                                                            checked: isSelected,
                                                            onChange: ()=>toggleReason(reason),
                                                            style: {
                                                                accentColor: '#3498db'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 656,
                                                            columnNumber: 41
                                                        }, this),
                                                        reason
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 645,
                                                    columnNumber: 37
                                                }, this),
                                                isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginTop: '5px',
                                                        paddingLeft: '20px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '4px'
                                                    },
                                                    children: tags.map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                fontSize: '12px',
                                                                color: '#bdc3c7',
                                                                cursor: 'pointer'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: selectedUserTags.includes(tag),
                                                                    onChange: ()=>toggleUserTag(tag),
                                                                    style: {
                                                                        accentColor: '#1abc9c'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 678,
                                                                    columnNumber: 53
                                                                }, this),
                                                                tag
                                                            ]
                                                        }, tag, true, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 49
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 665,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, reason, true, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 641,
                                            columnNumber: 33
                                        }, this);
                                    })
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 635,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: 'auto',
                                    paddingTop: '20px'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/",
                                    style: {
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
                                    },
                                    children: "← 一般ページへ戻る"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 694,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 693,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 473,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 455,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                style: {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    overflow: 'hidden'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: `${mapHeightRatio * 100}%`,
                            position: 'relative',
                            borderBottom: '1px solid #ddd',
                            minHeight: '100px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(HazardMap, {
                                posts: filteredPosts,
                                centerPos: center,
                                zoomLevel: zoom,
                                onMapChange: handleMapChange,
                                mapMode: mapMode,
                                // @ts-ignore
                                selectedCityId: fixedCityCode || (currentCityKey ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$cities$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CITIES"][currentCityKey]?.id : null),
                                isAdmin: true,
                                onPostUpdate: handlePostUpdate,
                                showHeatmap: isHeatmapMode,
                                heatmapRadius: heatmapRadius,
                                onAdminSelectPost: handleOpenDetail
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 718,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
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
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMapHeightRatio(0.25);
                                            setTimeout(()=>window.dispatchEvent(new Event('resize')), 100);
                                        },
                                        style: {
                                            fontSize: '11px',
                                            padding: '4px 8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '3px',
                                            background: mapHeightRatio === 0.25 ? '#3498db' : 'white',
                                            color: mapHeightRatio === 0.25 ? 'white' : '#333',
                                            cursor: 'pointer'
                                        },
                                        children: "小"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 746,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMapHeightRatio(0.5);
                                            setTimeout(()=>window.dispatchEvent(new Event('resize')), 100);
                                        },
                                        style: {
                                            fontSize: '11px',
                                            padding: '4px 8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '3px',
                                            background: mapHeightRatio === 0.5 ? '#3498db' : 'white',
                                            color: mapHeightRatio === 0.5 ? 'white' : '#333',
                                            cursor: 'pointer'
                                        },
                                        children: "中"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 763,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMapHeightRatio(0.75);
                                            setTimeout(()=>window.dispatchEvent(new Event('resize')), 100);
                                        },
                                        style: {
                                            fontSize: '11px',
                                            padding: '4px 8px',
                                            border: '1px solid #ccc',
                                            borderRadius: '3px',
                                            background: mapHeightRatio === 0.75 ? '#3498db' : 'white',
                                            color: mapHeightRatio === 0.75 ? 'white' : '#333',
                                            cursor: 'pointer'
                                        },
                                        children: "大"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 780,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                lineNumber: 732,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 717,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onMouseDown: handleDragStart,
                        style: {
                            height: '10px',
                            background: '#f0f2f5',
                            borderTop: '1px solid #ddd',
                            borderBottom: '1px solid #ddd',
                            cursor: 'row-resize',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '40px',
                                height: '4px',
                                background: '#ccc',
                                borderRadius: '2px'
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 813,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 799,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflowY: 'auto',
                            background: '#f0f2f5',
                            padding: '20px'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        padding: '15px 20px',
                                        borderBottom: '1px solid #eee',
                                        background: '#fff'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: '15px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '15px',
                                                        flexWrap: 'wrap'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                position: 'relative'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    value: filterKeyword,
                                                                    onChange: (e)=>setFilterKeyword(e.target.value),
                                                                    placeholder: "キーワード検索...",
                                                                    style: {
                                                                        padding: '8px 24px 8px 10px',
                                                                        borderRadius: '4px',
                                                                        border: '1px solid #ccc',
                                                                        background: '#fff',
                                                                        color: '#333',
                                                                        fontSize: '13px',
                                                                        width: '240px'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 835,
                                                                    columnNumber: 41
                                                                }, this),
                                                                filterKeyword && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setFilterKeyword(''),
                                                                    style: {
                                                                        position: 'absolute',
                                                                        right: '5px',
                                                                        top: '50%',
                                                                        transform: 'translateY(-50%)',
                                                                        background: 'transparent',
                                                                        border: 'none',
                                                                        color: '#999',
                                                                        cursor: 'pointer'
                                                                    },
                                                                    children: "×"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 851,
                                                                    columnNumber: 45
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 834,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            style: {
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px',
                                                                cursor: 'pointer',
                                                                color: '#333',
                                                                fontSize: '13px',
                                                                fontWeight: 'bold'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "checkbox",
                                                                    checked: filterHasPhoto,
                                                                    onChange: (e)=>setFilterHasPhoto(e.target.checked),
                                                                    style: {
                                                                        accentColor: '#3498db',
                                                                        width: '16px',
                                                                        height: '16px'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 881,
                                                                    columnNumber: 41
                                                                }, this),
                                                                "写真あり"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 870,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 832,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setShowSettings(!showSettings),
                                                            style: {
                                                                padding: '8px 14px',
                                                                background: '#34495e',
                                                                border: 'none',
                                                                borderRadius: '4px',
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer',
                                                                fontSize: '12px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px'
                                                            },
                                                            children: [
                                                                "表示オプション / カラム設定",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: {
                                                                        fontSize: '10px'
                                                                    },
                                                                    children: showSettings ? '▲' : '▼'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 911,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 894,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setIsCsvModalOpen(true),
                                                            style: {
                                                                padding: '8px 14px',
                                                                background: '#27ae60',
                                                                border: 'none',
                                                                borderRadius: '4px',
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                                cursor: 'pointer',
                                                                fontSize: '12px',
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: '6px'
                                                            },
                                                            children: "📥 CSV出力"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 915,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 892,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 830,
                                            columnNumber: 29
                                        }, this),
                                        showSettings && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: '15px',
                                                padding: '15px',
                                                background: '#f8f9fa',
                                                borderRadius: '6px',
                                                border: '1px solid #e9ecef'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        marginBottom: '15px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                marginBottom: '8px',
                                                                color: '#333'
                                                            },
                                                            children: "表示するカラム:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 948,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                display: 'flex',
                                                                gap: '15px',
                                                                flexWrap: 'wrap'
                                                            },
                                                            children: Object.keys(INITIAL_VISIBLE_COLUMNS).map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    style: {
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        gap: '5px',
                                                                        fontSize: '13px',
                                                                        cursor: 'pointer',
                                                                        color: '#333'
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            type: "checkbox",
                                                                            checked: visibleColumns[col],
                                                                            onChange: ()=>toggleColumn(col),
                                                                            style: {
                                                                                accentColor: '#34495e'
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                            lineNumber: 965,
                                                                            columnNumber: 53
                                                                        }, this),
                                                                        col === 'id' ? 'ID' : col === 'reason' ? '不安' : col === 'address' ? '住所' : col === 'userTags' ? 'ユーザータグ' : col === 'empathy' ? '同感' : col === 'date' ? '日時' : col === 'adminTags' ? '管理タグ' : '操作'
                                                                    ]
                                                                }, col, true, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 953,
                                                                    columnNumber: 49
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 951,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 947,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '10px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                fontSize: '13px',
                                                                color: '#333',
                                                                fontWeight: 'bold'
                                                            },
                                                            children: "ページあたりの表示数:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 991,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            min: "1",
                                                            value: itemsPerPage,
                                                            onChange: handleItemsPerPageChange,
                                                            style: {
                                                                width: '70px',
                                                                padding: '6px',
                                                                borderRadius: '4px',
                                                                border: '1px solid #ccc',
                                                                color: '#333',
                                                                background: '#fff'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 992,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 990,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 938,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 828,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        overflowX: 'auto'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        style: {
                                            width: '100%',
                                            borderCollapse: 'collapse',
                                            fontSize: '13px'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                style: {
                                                    background: '#34495e'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        visibleColumns.id && renderSortHeader('ID', 'id', 'left'),
                                                        visibleColumns.reason && renderSortHeader('不安', 'reason', 'left', '122px'),
                                                        visibleColumns.address && renderSortHeader('住所', 'address', 'left'),
                                                        visibleColumns.userTags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'left',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "タグ(ユーザー)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 1019,
                                                            columnNumber: 45
                                                        }, this),
                                                        visibleColumns.empathy && renderSortHeader('同感', 'empathy_count', 'center', '98px'),
                                                        visibleColumns.date && renderSortHeader('日時', 'created_at', 'center'),
                                                        visibleColumns.adminTags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'left',
                                                                color: '#fff',
                                                                fontWeight: '600',
                                                                minWidth: '83px',
                                                                whiteSpace: 'nowrap'
                                                            },
                                                            children: "管理タグ"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 1024,
                                                            columnNumber: 45
                                                        }, this),
                                                        visibleColumns.actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            style: {
                                                                padding: '14px',
                                                                textAlign: 'center',
                                                                color: '#fff',
                                                                fontWeight: '600'
                                                            },
                                                            children: "操作"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 1038,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                    lineNumber: 1014,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 1013,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: [
                                                    paginatedPosts.map((post, index)=>// ▼▼▼ ユーザー指定のHTMLコードを適用 ▼▼▼
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            style: {
                                                                borderBottom: '1px solid #eee',
                                                                background: index % 2 === 0 ? '#fff' : '#f9f9f9'
                                                            },
                                                            children: [
                                                                visibleColumns.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        color: '#333'
                                                                    },
                                                                    children: post.id
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 1049,
                                                                    columnNumber: 67
                                                                }, this),
                                                                visibleColumns.reason && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        fontWeight: 'bold',
                                                                        color: '#111'
                                                                    },
                                                                    children: post.reason
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 1051,
                                                                    columnNumber: 49
                                                                }, this),
                                                                visibleColumns.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
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
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 1054,
                                                                    columnNumber: 49
                                                                }, this),
                                                                visibleColumns.userTags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        color: '#333'
                                                                    },
                                                                    children: post.tags?.join(', ')
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 1068,
                                                                    columnNumber: 49
                                                                }, this),
                                                                visibleColumns.empathy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        textAlign: 'center',
                                                                        color: '#111',
                                                                        fontWeight: 'bold'
                                                                    },
                                                                    children: post.empathy_count
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 1071,
                                                                    columnNumber: 49
                                                                }, this),
                                                                visibleColumns.date && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        textAlign: 'center',
                                                                        color: '#444'
                                                                    },
                                                                    children: new Date(post.created_at).toLocaleString('ja-JP', {
                                                                        year: 'numeric',
                                                                        month: '2-digit',
                                                                        day: '2-digit',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 1076,
                                                                    columnNumber: 49
                                                                }, this),
                                                                visibleColumns.adminTags && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px'
                                                                    },
                                                                    children: post.post_tags && post.post_tags.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            flexWrap: 'wrap',
                                                                            gap: '4px'
                                                                        },
                                                                        children: post.post_tags.map((pt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                style: {
                                                                                    fontSize: '11px',
                                                                                    padding: '2px 6px',
                                                                                    borderRadius: '4px',
                                                                                    color: 'white',
                                                                                    background: pt.admin_tags?.color || '#999'
                                                                                },
                                                                                children: pt.admin_tags?.label
                                                                            }, pt.tag_id, false, {
                                                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                lineNumber: 1091,
                                                                                columnNumber: 65
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                        lineNumber: 1089,
                                                                        columnNumber: 57
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        style: {
                                                                            fontSize: '11px',
                                                                            color: '#999'
                                                                        },
                                                                        children: "未設定"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                        lineNumber: 1106,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 1087,
                                                                    columnNumber: 49
                                                                }, this),
                                                                visibleColumns.actions && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    style: {
                                                                        padding: '12px 14px',
                                                                        textAlign: 'center'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            gap: '8px'
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleJumpToPost(post.lat, post.lng),
                                                                                style: {
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
                                                                                },
                                                                                title: "地図へ",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    width: "16",
                                                                                    height: "16",
                                                                                    viewBox: "0 0 24 24",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2",
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                                            d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 0 18 0z"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                            lineNumber: 1139,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                            cx: "12",
                                                                                            cy: "10",
                                                                                            r: "3"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                            lineNumber: 1140,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                    lineNumber: 1129,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                lineNumber: 1113,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleShowPhoto(post.image_url),
                                                                                disabled: !post.image_url,
                                                                                style: {
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
                                                                                },
                                                                                title: "写真を見る",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                                    width: "16",
                                                                                    height: "16",
                                                                                    viewBox: "0 0 24 24",
                                                                                    fill: "none",
                                                                                    stroke: "currentColor",
                                                                                    strokeWidth: "2",
                                                                                    strokeLinecap: "round",
                                                                                    strokeLinejoin: "round",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                                                            x: "3",
                                                                                            y: "3",
                                                                                            width: "18",
                                                                                            height: "18",
                                                                                            rx: "2",
                                                                                            ry: "2"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                            lineNumber: 1170,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                                            cx: "8.5",
                                                                                            cy: "8.5",
                                                                                            r: "1.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                            lineNumber: 1171,
                                                                                            columnNumber: 65
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                                                            points: "21 15 16 10 5 21"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                            lineNumber: 1172,
                                                                                            columnNumber: 65
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                    lineNumber: 1160,
                                                                                    columnNumber: 61
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                lineNumber: 1143,
                                                                                columnNumber: 57
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>handleOpenDetail(post),
                                                                                style: {
                                                                                    padding: '6px 10px',
                                                                                    background: '#f0f2f5',
                                                                                    border: '1px solid #dce0e5',
                                                                                    color: '#2c3e50',
                                                                                    borderRadius: '4px',
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '12px'
                                                                                },
                                                                                title: "詳細",
                                                                                children: "🛠"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                                lineNumber: 1175,
                                                                                columnNumber: 57
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                        lineNumber: 1112,
                                                                        columnNumber: 53
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                                                    lineNumber: 1111,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, post.id, true, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 1045,
                                                            columnNumber: 41
                                                        }, this)),
                                                    filteredPosts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 10,
                                                            style: {
                                                                padding: '30px',
                                                                textAlign: 'center',
                                                                color: '#555'
                                                            },
                                                            children: "データがありません"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                                            lineNumber: 1197,
                                                            columnNumber: 45
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                                        lineNumber: 1196,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminDashboard.tsx",
                                                lineNumber: 1042,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminDashboard.tsx",
                                        lineNumber: 1012,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 1011,
                                    columnNumber: 25
                                }, this),
                                filteredPosts.length > itemsPerPage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1217,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                fontSize: '14px',
                                                color: '#333',
                                                fontWeight: 'bold'
                                            },
                                            children: [
                                                currentPage,
                                                " / ",
                                                totalPages,
                                                " ページ"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1231,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1234,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 1206,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 816,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 815,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 716,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminPostDetailModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                post: selectedPost,
                isOpen: isModalOpen,
                onClose: ()=>setIsModalOpen(false),
                onUpdate: handleModalUpdate,
                cityCodeFilter: fixedCityCode || null
            }, void 0, false, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 1254,
                columnNumber: 13
            }, this),
            isCsvModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
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
                },
                onClick: ()=>setIsCsvModalOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        width: '350px',
                        maxWidth: '90%',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            style: {
                                margin: '0 0 15px 0',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#2c3e50',
                                textAlign: 'center'
                            },
                            children: "CSV出力期間の設定"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 1288,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'block',
                                                fontSize: '12px',
                                                color: '#7f8c8d',
                                                marginBottom: '5px'
                                            },
                                            children: "開始日"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1293,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: csvStartDate,
                                            onChange: (e)=>setCsvStartDate(e.target.value),
                                            style: {
                                                width: '100%',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1294,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 1292,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'block',
                                                fontSize: '12px',
                                                color: '#7f8c8d',
                                                marginBottom: '5px'
                                            },
                                            children: "終了日"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1302,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "date",
                                            value: csvEndDate,
                                            onChange: (e)=>setCsvEndDate(e.target.value),
                                            style: {
                                                width: '100%',
                                                padding: '8px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1303,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 1301,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        gap: '10px',
                                        marginTop: '10px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsCsvModalOpen(false),
                                            style: {
                                                flex: 1,
                                                padding: '10px',
                                                background: '#ccc',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            },
                                            children: "キャンセル"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1311,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleDownloadCsv,
                                            style: {
                                                flex: 1,
                                                padding: '10px',
                                                background: '#27ae60',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold'
                                            },
                                            children: "ダウンロード"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminDashboard.tsx",
                                            lineNumber: 1325,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminDashboard.tsx",
                                    lineNumber: 1310,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminDashboard.tsx",
                            lineNumber: 1291,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminDashboard.tsx",
                    lineNumber: 1277,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 1262,
                columnNumber: 17
            }, this),
            previewImageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: previewImageUrl,
                        onClick: (e)=>e.stopPropagation(),
                        style: {
                            maxWidth: '90%',
                            maxHeight: '90%',
                            borderRadius: '4px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 1363,
                        columnNumber: 21
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: closePreview,
                        style: {
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '30px',
                            cursor: 'pointer'
                        },
                        children: "×"
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminDashboard.tsx",
                        lineNumber: 1368,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminDashboard.tsx",
                lineNumber: 1346,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdminDashboard.tsx",
        lineNumber: 454,
        columnNumber: 9
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8f95bc3b._.js.map