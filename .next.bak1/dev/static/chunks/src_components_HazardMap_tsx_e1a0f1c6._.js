(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/HazardMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPostDetailModal
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
function AdminPostDetailModal({ post, isOpen, onClose, onUpdate, cityCodeFilter }) {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('manage');
    const [allTags, setAllTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [attachedTagIds, setAttachedTagIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [memos, setMemos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newMemo, setNewMemo] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newTagName, setNewTagName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newTagColor, setNewTagColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#2ecc71');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // スクロール用
    const memoEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPostDetailModal.useEffect": ()=>{
            if (isOpen && post) {
                fetchTags();
                fetchAttachedTags();
                fetchMemos();
            }
        }
    }["AdminPostDetailModal.useEffect"], [
        isOpen,
        post
    ]);
    // メモが更新されたら最下部へスクロール
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPostDetailModal.useEffect": ()=>{
            memoEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["AdminPostDetailModal.useEffect"], [
        memos,
        activeTab
    ]);
    const fetchTags = async ()=>{
        // システムタグ または この自治体のタグを取得
        let query = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_tags').select('*').order('id', {
            ascending: true
        });
        if (cityCodeFilter) {
            query = query.or(`is_system.eq.true,city_code.eq.${cityCodeFilter}`);
        } else {
        // 全権管理者の場合はとりあえず全部見せるか、システムタグだけ見せるか
        // ここでは全部見せる
        }
        const { data, error } = await query;
        if (!error && data) {
            setAllTags(data);
        }
    };
    const fetchAttachedTags = async ()=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_tags').select('tag_id').eq('post_id', post.id);
        if (!error && data) {
            setAttachedTagIds(data.map((d)=>d.tag_id));
        }
    };
    const fetchMemos = async ()=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_memos').select('*').eq('post_id', post.id).order('created_at', {
            ascending: true
        });
        if (!error && data) {
            setMemos(data);
        }
    };
    const toggleTag = async (tag)=>{
        const isAttached = attachedTagIds.includes(tag.id);
        if (isAttached) {
            // 解除
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_tags').delete().eq('post_id', post.id).eq('tag_id', tag.id);
            if (!error) {
                setAttachedTagIds((prev)=>prev.filter((id)=>id !== tag.id));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('タグを外しました');
                onUpdate();
            }
        } else {
            // 付与
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_tags').insert({
                post_id: post.id,
                tag_id: tag.id
            });
            if (!error) {
                setAttachedTagIds((prev)=>[
                        ...prev,
                        tag.id
                    ]);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('タグを付けました');
                onUpdate();
            }
        }
    };
    const sendMemo = async ()=>{
        if (!newMemo.trim()) return;
        setIsLoading(true);
        const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        if (!user) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('ログインが必要です');
            setIsLoading(false);
            return;
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_memos').insert({
            post_id: post.id,
            user_id: user.id,
            content: newMemo
        });
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('メモの送信に失敗しました');
        } else {
            setNewMemo('');
            fetchMemos();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('メモを保存しました');
        }
        setIsLoading(false);
    };
    const createCustomTag = async ()=>{
        if (!newTagName.trim()) return;
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_tags').insert({
            label: newTagName,
            color: newTagColor,
            is_system: false,
            city_code: cityCodeFilter
        }).select();
        if (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('タグ作成に失敗しました');
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('独自タグを作成しました');
            setNewTagName('');
            fetchTags();
        }
    };
    if (!isOpen || !post) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            justifyContent: 'center'
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: '15px 20px',
                        borderBottom: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#f8f9fa'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: '12px',
                                        color: '#666',
                                        background: '#eee',
                                        padding: '2px 6px',
                                        borderRadius: '4px'
                                    },
                                    children: [
                                        "ID: ",
                                        post.id
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 193,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        marginLeft: '10px',
                                        fontWeight: 'bold',
                                        fontSize: '16px'
                                    },
                                    children: post.reason
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 196,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 192,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                border: 'none',
                                background: 'transparent',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: '#666'
                            },
                            children: "×"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 198,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HazardMap.tsx",
                    lineNumber: 182,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        flex: 1,
                        display: 'flex',
                        overflow: 'hidden'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                width: '40%',
                                padding: '20px',
                                borderRight: '1px solid #eee',
                                overflowY: 'auto',
                                background: '#fff'
                            },
                            children: [
                                post.image_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: post.image_url,
                                    style: {
                                        width: '100%',
                                        borderRadius: '6px',
                                        marginBottom: '15px',
                                        border: '1px solid #ddd'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 210,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '15px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: '14px',
                                                color: '#888',
                                                marginBottom: '5px'
                                            },
                                            children: "詳細"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 216,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '14px',
                                                margin: 0
                                            },
                                            children: post.address || '住所情報なし'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 217,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                fontSize: '12px',
                                                color: '#666',
                                                marginTop: '5px'
                                            },
                                            children: new Date(post.created_at).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 218,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 215,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '15px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            style: {
                                                fontSize: '14px',
                                                color: '#888',
                                                marginBottom: '5px'
                                            },
                                            children: "ユーザー投稿タグ"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 221,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '5px'
                                            },
                                            children: post.tags?.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '12px',
                                                        background: '#f0f2f5',
                                                        padding: '4px 8px',
                                                        borderRadius: '10px'
                                                    },
                                                    children: t
                                                }, t, false, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 37
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 222,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 220,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 208,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                background: '#fcfcfc'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: 'flex',
                                        borderBottom: '1px solid #ddd'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab('manage'),
                                        style: {
                                            flex: 1,
                                            padding: '12px',
                                            background: activeTab === 'manage' ? 'white' : '#f0f0f0',
                                            border: 'none',
                                            borderBottom: activeTab === 'manage' ? '2px solid #3498db' : 'none',
                                            fontWeight: 'bold',
                                            cursor: 'pointer'
                                        },
                                        children: "🛠 管理・対応"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 236,
                                        columnNumber: 29
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 235,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        overflowY: 'auto',
                                        padding: '20px'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: '30px'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontSize: '15px',
                                                        fontWeight: 'bold',
                                                        marginBottom: '10px',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    },
                                                    children: "🏷 ステータス・タグ"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        gap: '8px',
                                                        marginBottom: '15px'
                                                    },
                                                    children: allTags.map((tag)=>{
                                                        const isActive = attachedTagIds.includes(tag.id);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>toggleTag(tag),
                                                            style: {
                                                                padding: '6px 12px',
                                                                borderRadius: '20px',
                                                                border: `1px solid ${tag.color}`,
                                                                background: isActive ? tag.color : 'white',
                                                                color: isActive ? 'white' : tag.color,
                                                                cursor: 'pointer',
                                                                fontSize: '13px',
                                                                fontWeight: 'bold',
                                                                transition: 'all 0.2s',
                                                                boxShadow: isActive ? '0 2px 5px rgba(0,0,0,0.1)' : 'none'
                                                            },
                                                            children: [
                                                                isActive && '✔ ',
                                                                tag.label
                                                            ]
                                                        }, tag.id, true, {
                                                            fileName: "[project]/src/components/HazardMap.tsx",
                                                            lineNumber: 262,
                                                            columnNumber: 45
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 258,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                                    style: {
                                                        fontSize: '13px',
                                                        color: '#666',
                                                        cursor: 'pointer'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                                            children: "＋ 新しいタグを作成する"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HazardMap.tsx",
                                                            lineNumber: 287,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    type: "text",
                                                                    placeholder: "タグ名 (例: 道路課)",
                                                                    value: newTagName,
                                                                    onChange: (e)=>setNewTagName(e.target.value),
                                                                    style: {
                                                                        padding: '6px',
                                                                        borderRadius: '4px',
                                                                        border: '1px solid #ccc'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                                    lineNumber: 299,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                                    lineNumber: 306,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                                    lineNumber: 312,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/HazardMap.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 286,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 254,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                display: 'flex',
                                                flexDirection: 'column',
                                                height: '300px',
                                                border: '1px solid #ddd',
                                                borderRadius: '8px',
                                                background: 'white'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: '10px',
                                                        background: '#f8f9fa',
                                                        borderBottom: '1px solid #eee',
                                                        fontSize: '13px',
                                                        fontWeight: 'bold',
                                                        color: '#555'
                                                    },
                                                    children: "📝 担当者メモ (履歴)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1,
                                                        overflowY: 'auto',
                                                        padding: '10px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        gap: '10px'
                                                    },
                                                    children: [
                                                        memos.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                textAlign: 'center',
                                                                color: '#aaa',
                                                                fontSize: '13px',
                                                                marginTop: '20px'
                                                            },
                                                            children: "メモはまだありません"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HazardMap.tsx",
                                                            lineNumber: 354,
                                                            columnNumber: 41
                                                        }, this),
                                                        memos.map((memo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    background: '#f0f2f5',
                                                                    padding: '10px',
                                                                    borderRadius: '8px',
                                                                    fontSize: '13px'
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: '11px',
                                                                            color: '#888',
                                                                            marginBottom: '4px'
                                                                        },
                                                                        children: new Date(memo.created_at).toLocaleString()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/HazardMap.tsx",
                                                                        lineNumber: 360,
                                                                        columnNumber: 45
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            whiteSpace: 'pre-wrap',
                                                                            lineHeight: '1.4'
                                                                        },
                                                                        children: memo.content
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/HazardMap.tsx",
                                                                        lineNumber: 363,
                                                                        columnNumber: 45
                                                                    }, this)
                                                                ]
                                                            }, memo.id, true, {
                                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 41
                                                            }, this)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            ref: memoEndRef
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HazardMap.tsx",
                                                            lineNumber: 366,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 352,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        padding: '10px',
                                                        borderTop: '1px solid #eee',
                                                        display: 'flex',
                                                        gap: '10px'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            value: newMemo,
                                                            onChange: (e)=>setNewMemo(e.target.value),
                                                            placeholder: "対応状況やメモを入力...",
                                                            style: {
                                                                flex: 1,
                                                                height: '40px',
                                                                padding: '8px',
                                                                borderRadius: '4px',
                                                                border: '1px solid #ccc',
                                                                resize: 'none',
                                                                fontFamily: 'inherit'
                                                            },
                                                            onKeyDown: (e)=>{
                                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                                    e.preventDefault();
                                                                    sendMemo();
                                                                }
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HazardMap.tsx",
                                                            lineNumber: 369,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: sendMemo,
                                                            disabled: isLoading || !newMemo.trim(),
                                                            style: {
                                                                width: '60px',
                                                                background: '#3498db',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: '4px',
                                                                cursor: 'pointer',
                                                                fontWeight: 'bold'
                                                            },
                                                            children: "送信"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/HazardMap.tsx",
                                                            lineNumber: 389,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 368,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 330,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 252,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 233,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/HazardMap.tsx",
                    lineNumber: 206,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/HazardMap.tsx",
            lineNumber: 167,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/HazardMap.tsx",
        lineNumber: 152,
        columnNumber: 9
    }, this);
}
_s(AdminPostDetailModal, "OG8W1QU1f5u5+6OFqWF2YBeb4FA=");
_c = AdminPostDetailModal;
var _c;
__turbopack_context__.k.register(_c, "AdminPostDetailModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/HazardMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_HazardMap_tsx_e1a0f1c6._.js.map