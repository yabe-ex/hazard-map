(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AuthModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
// ローカルストレージのキー
const EMAIL_STORAGE_KEY = 'hazard-map-email';
function AuthModal({ isOpen, onClose }) {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSent, setIsSent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // 初回表示時に、保存されたメールアドレスがあればセットする
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthModal.useEffect": ()=>{
            if (isOpen) {
                const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
                if (savedEmail) {
                    setEmail(savedEmail);
                }
            }
        }
    }["AuthModal.useEffect"], [
        isOpen
    ]);
    // メール（マジックリンク）ログイン
    const handleEmailLogin = async (e)=>{
        e.preventDefault();
        setLoading(true);
        const redirectTo = ("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable";
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: redirectTo
            }
        });
        setLoading(false);
        if (error) {
            alert('エラー: ' + error.message);
        } else {
            localStorage.setItem(EMAIL_STORAGE_KEY, email);
            setIsSent(true);
        }
    };
    // Googleログイン
    const handleGoogleLogin = async ()=>{
        setLoading(true);
        const redirectTo = ("TURBOPACK compile-time truthy", 1) ? window.location.origin : "TURBOPACK unreachable";
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent'
                }
            }
        });
        if (error) {
            setLoading(false);
            alert('エラー: ' + error.message);
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                background: 'white',
                padding: '30px',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '350px',
                position: 'relative'
            },
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onClose,
                    style: {
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#999'
                    },
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/src/components/AuthModal.tsx",
                    lineNumber: 104,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    style: {
                        marginTop: 0,
                        textAlign: 'center',
                        fontSize: '20px',
                        color: '#333'
                    },
                    children: "ログイン / 登録"
                }, void 0, false, {
                    fileName: "[project]/src/components/AuthModal.tsx",
                    lineNumber: 120,
                    columnNumber: 17
                }, this),
                isSent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        textAlign: 'center',
                        color: '#2e7d32',
                        background: '#e8f5e9',
                        padding: '20px',
                        borderRadius: '8px',
                        marginTop: '10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontWeight: 'bold',
                                fontSize: '16px',
                                margin: '0 0 10px 0'
                            },
                            children: "確認メールを送信しました！"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthModal.tsx",
                            lineNumber: 134,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '13px',
                                color: '#333',
                                marginBottom: '20px',
                                lineHeight: '1.6'
                            },
                            children: [
                                "メール内のリンクをクリックして",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/components/AuthModal.tsx",
                                    lineNumber: 137,
                                    columnNumber: 29
                                }, this),
                                "ログインを完了してください。"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthModal.tsx",
                            lineNumber: 135,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            style: {
                                padding: '10px 24px',
                                background: '#fff',
                                color: '#333',
                                border: '1px solid #ccc',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            },
                            children: "閉じる"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthModal.tsx",
                            lineNumber: 140,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AuthModal.tsx",
                    lineNumber: 124,
                    columnNumber: 21
                }, this) : /* 入力画面 */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontSize: '13px',
                                color: '#666',
                                marginBottom: '24px',
                                textAlign: 'center',
                                lineHeight: '1.5'
                            },
                            children: "ログインすると、自分の投稿履歴の確認や削除ができるようになります。"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AuthModal.tsx",
                            lineNumber: 159,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleGoogleLogin,
                            disabled: loading,
                            style: {
                                width: '100%',
                                padding: '12px',
                                marginBottom: '20px',
                                background: '#4285F4',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                transition: 'opacity 0.2s'
                            },
                            onMouseOver: (e)=>e.currentTarget.style.opacity = '0.9',
                            onMouseOut: (e)=>e.currentTarget.style.opacity = '1',
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "18",
                                    height: "18",
                                    viewBox: "0 0 18 18",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#fff",
                                            d: "M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModal.tsx",
                                            lineNumber: 188,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#fff",
                                            d: "M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModal.tsx",
                                            lineNumber: 192,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#fff",
                                            d: "M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModal.tsx",
                                            lineNumber: 196,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            fill: "#fff",
                                            d: "M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.271C4.672 5.14 6.656 3.58 9 3.58z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AuthModal.tsx",
                                            lineNumber: 200,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AuthModal.tsx",
                                    lineNumber: 187,
                                    columnNumber: 29
                                }, this),
                                "Googleでログイン"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthModal.tsx",
                            lineNumber: 164,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                margin: '20px 0',
                                color: '#999'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        height: '1px',
                                        background: '#eee'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModal.tsx",
                                    lineNumber: 209,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        padding: '0 10px',
                                        fontSize: '12px'
                                    },
                                    children: "またはメールで"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModal.tsx",
                                    lineNumber: 210,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        height: '1px',
                                        background: '#eee'
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModal.tsx",
                                    lineNumber: 211,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthModal.tsx",
                            lineNumber: 208,
                            columnNumber: 25
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleEmailLogin,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: '15px'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "email",
                                        name: "email",
                                        autoComplete: "email",
                                        placeholder: "メールアドレス",
                                        value: email,
                                        onChange: (e)=>setEmail(e.target.value),
                                        required: true,
                                        style: {
                                            width: '100%',
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            borderRadius: '6px',
                                            boxSizing: 'border-box',
                                            fontSize: '16px',
                                            // ↓ ここで背景色と文字色を強制的に指定
                                            backgroundColor: '#ffffff',
                                            color: '#000000',
                                            appearance: 'none' // iPhone等でのデフォルトスタイル除去
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AuthModal.tsx",
                                        lineNumber: 217,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModal.tsx",
                                    lineNumber: 216,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: loading,
                                    style: {
                                        width: '100%',
                                        padding: '12px',
                                        background: '#333',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        transition: 'background 0.2s'
                                    },
                                    onMouseOver: (e)=>e.currentTarget.style.background = '#000',
                                    onMouseOut: (e)=>e.currentTarget.style.background = '#333',
                                    children: loading ? '送信中...' : 'ログインリンクを送信'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AuthModal.tsx",
                                    lineNumber: 239,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AuthModal.tsx",
                            lineNumber: 215,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/AuthModal.tsx",
            lineNumber: 92,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/AuthModal.tsx",
        lineNumber: 77,
        columnNumber: 9
    }, this);
}
_s(AuthModal, "1wcuQ6DUDO4GItkHt+01DtwH1a8=");
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HazardMap.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabaseClient.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AuthModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/constants/reasons.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hot-toast/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
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
            fileName: "[project]/src/components/HazardMap.tsx",
            lineNumber: 13,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0)),
    ssr: false
});
_c = HazardMap;
const STORAGE_KEY = 'hazard-map-pos';
const TIME_OPTIONS = [
    {
        value: 'morning',
        label: '🌅 朝'
    },
    {
        value: 'day',
        label: '☀️ 昼'
    },
    {
        value: 'evening',
        label: '🌆 夕方'
    },
    {
        value: 'night',
        label: '🌃 夜'
    }
];
const CITIES_DATA = [
    {
        id: '11201',
        lat: 35.9251,
        lng: 139.4858,
        radius: 7000
    },
    {
        id: '11208',
        lat: 35.7994,
        lng: 139.4687,
        radius: 7000
    } // 所沢市
];
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function determineCityCode(lat, lng) {
    for (const city of CITIES_DATA){
        const dist = calculateDistance(lat, lng, city.lat, city.lng);
        if (dist <= city.radius) return city.id;
    }
    return null;
}
function MapControllerLogic({ setCenter, setZoom }) {
    _s();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapControllerLogic.useEffect": ()=>{
            const latParam = searchParams.get('lat');
            const lngParam = searchParams.get('lng');
            const zoomParam = searchParams.get('zoom');
            if (latParam && lngParam) {
                const lat = parseFloat(latParam);
                const lng = parseFloat(lngParam);
                if (!isNaN(lat) && !isNaN(lng)) {
                    setCenter({
                        lat,
                        lng
                    });
                    if (zoomParam) {
                        const z = parseInt(zoomParam, 10);
                        if (!isNaN(z)) setZoom(z);
                    }
                }
            }
        }
    }["MapControllerLogic.useEffect"], [
        searchParams,
        setCenter,
        setZoom
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapControllerLogic.useEffect": ()=>{
            const currentParams = new URLSearchParams(window.location.search);
            if (currentParams.has('lat') && currentParams.has('lng')) return;
            const savedPos = localStorage.getItem(STORAGE_KEY);
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
    }["MapControllerLogic.useEffect"], []);
    return null;
}
_s(MapControllerLogic, "5lZyAi+OTh9gFoTtyBds1xi/Q3U=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c1 = MapControllerLogic;
function Home() {
    _s1();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [center, setCenter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        lat: 35.9251,
        lng: 139.4858
    });
    const [zoom, setZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(14);
    // 地図モード管理（標準: standard, シンプル: simple, 航空写真: satellite）
    const [mapMode, setMapMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('standard');
    const [isMapMenuOpen, setIsMapMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isModalOpen, setIsModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formReason, setFormReason] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('暗い');
    const [formTags, setFormTags] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [formTimes, setFormTimes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [duplicatePost, setDuplicatePost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSelfDuplicate, setIsSelfDuplicate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoadingGPS, setIsLoadingGPS] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "Home.useEffect": ({ data: { session } })=>{
                    if (session?.user) setUser(session.user);
                    else signInAnonymously();
                }
            }["Home.useEffect"]);
            const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "Home.useEffect": (_event, session)=>{
                    setUser(session?.user ?? null);
                }
            }["Home.useEffect"]);
            return ({
                "Home.useEffect": ()=>subscription.unsubscribe()
            })["Home.useEffect"];
        }
    }["Home.useEffect"], []);
    const signInAnonymously = async ()=>{
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signInAnonymously();
        if (error) console.error('Anonymous auth error:', error);
    };
    const fetchPosts = async ()=>{
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('hazard_posts').select('*').order('created_at', {
            ascending: false
        });
        if (error) console.error('Error:', error);
        else setPosts(data || []);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            fetchPosts();
        }
    }["Home.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            setDuplicatePost(null);
            setIsSelfDuplicate(false);
            setFormTags([]);
        }
    }["Home.useEffect"], [
        formReason,
        isModalOpen
    ]);
    const handleMapChange = (lat, lng, newZoom)=>{
        setCenter({
            lat,
            lng
        });
        setZoom(newZoom);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            lat,
            lng,
            zoom: newZoom
        }));
    };
    const handleCurrentLocation = ()=>{
        if (!navigator.geolocation) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('お使いのブラウザでは現在地機能が使えません');
            return;
        }
        setIsLoadingGPS(true);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].loading('現在地を取得中...', {
            id: 'gps'
        });
        navigator.geolocation.getCurrentPosition((position)=>{
            const { latitude, longitude } = position.coords;
            const dist = Math.abs(center.lat - latitude) + Math.abs(center.lng - longitude);
            if (dist > 0.00005 || zoom !== 16) {
                setCenter({
                    lat: latitude,
                    lng: longitude
                });
                setZoom(16);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({
                    lat: latitude,
                    lng: longitude,
                    zoom: 16
                }));
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('現在地に移動しました', {
                    id: 'gps'
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].dismiss('gps');
            }
            setIsLoadingGPS(false);
        }, (error)=>{
            console.error(error);
            setIsLoadingGPS(false);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('現在地を取得できませんでした', {
                id: 'gps'
            });
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    };
    const toggleTag = (tag)=>setFormTags((p)=>p.includes(tag) ? p.filter((t)=>t !== tag) : [
                ...p,
                tag
            ]);
    const toggleTime = (time)=>setFormTimes((p)=>p.includes(time) ? p.filter((t)=>t !== time) : [
                ...p,
                time
            ]);
    const handleCheckDuplicate = async (e)=>{
        e.preventDefault();
        const DUPLICATE_DISTANCE_THRESHOLD = 50;
        const nearPosts = posts.filter((post)=>{
            if (post.reason !== formReason) return false;
            const dist = calculateDistance(center.lat, center.lng, post.lat, post.lng);
            return dist <= DUPLICATE_DISTANCE_THRESHOLD;
        });
        if (nearPosts.length > 0) {
            nearPosts.sort((a, b)=>{
                const distA = calculateDistance(center.lat, center.lng, a.lat, a.lng);
                const distB = calculateDistance(center.lat, center.lng, b.lat, b.lng);
                return distA - distB;
            });
            const closest = nearPosts[0];
            if (user && closest.user_id === user.id) setIsSelfDuplicate(true);
            else setIsSelfDuplicate(false);
            setDuplicatePost(closest);
            return;
        }
        await submitNewPost();
    };
    const submitNewPost = async ()=>{
        if (!user) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('認証情報の取得中です');
            return;
        }
        setIsSubmitting(true);
        const toastId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].loading('送信中...');
        const cityCode = determineCityCode(center.lat, center.lng);
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('hazard_posts').insert([
            {
                lat: center.lat,
                lng: center.lng,
                reason: formReason,
                tags: formTags,
                time_slot: formTimes,
                user_id: user.id,
                city_code: cityCode
            }
        ]);
        setIsSubmitting(false);
        if (error) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error(`エラー: ${error.message}`, {
            id: toastId
        });
        else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('投稿しました！', {
                id: toastId
            });
            setIsModalOpen(false);
            setFormTags([]);
            setFormTimes([]);
            setDuplicatePost(null);
            fetchPosts();
        }
    };
    const handleAgreeToExisting = async ()=>{
        if (!duplicatePost || !user) return;
        setIsSubmitting(true);
        const toastId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].loading('処理中...');
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('hazard_empathies').insert([
            {
                post_id: duplicatePost.id,
                user_id: user.id
            }
        ]);
        setIsSubmitting(false);
        if (error) {
            if (error.code === '23505') __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('既に同感済みでした', {
                id: toastId
            });
            else __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].error('エラーが発生しました', {
                id: toastId
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hot$2d$toast$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].success('同感しました！', {
                id: toastId
            });
            setPosts((prev)=>prev.map((p)=>p.id === duplicatePost.id ? {
                        ...p,
                        empathy_count: (p.empathy_count || 0) + 1
                    } : p));
        }
        setIsModalOpen(false);
        setFormTags([]);
        setFormTimes([]);
        setDuplicatePost(null);
        fetchPosts();
    };
    const handleLogout = async ()=>{
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        window.location.reload();
    };
    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#333',
        fontSize: '15px'
    };
    const sectionStyle = {
        marginBottom: '28px'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        style: {
            width: '100%',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                fallback: null,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapControllerLogic, {
                    setCenter: setCenter,
                    setZoom: setZoom
                }, void 0, false, {
                    fileName: "[project]/src/components/HazardMap.tsx",
                    lineNumber: 267,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HazardMap.tsx",
                lineNumber: 266,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                style: {
                    padding: '12px 16px',
                    background: '#222',
                    color: '#fff',
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        style: {
                            margin: 0,
                            fontSize: '16px',
                            fontWeight: '600',
                            whiteSpace: 'nowrap'
                        },
                        children: "みんなのハザードマップ"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 283,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: user && !user.is_anonymous ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>router.push('/mypage'),
                                    style: {
                                        width: '36px',
                                        height: '36px',
                                        background: '#0070f3',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 303,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                cx: "12",
                                                cy: "7",
                                                r: "4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 304,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 302,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 287,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleLogout,
                                    style: {
                                        width: '36px',
                                        height: '36px',
                                        background: '#444',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "20",
                                        height: "20",
                                        viewBox: "0 0 24 24",
                                        fill: "none",
                                        stroke: "currentColor",
                                        strokeWidth: "2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 323,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                points: "16 17 21 12 16 7"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 324,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                x1: "21",
                                                y1: "12",
                                                x2: "9",
                                                y2: "12"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/HazardMap.tsx",
                                                lineNumber: 325,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 322,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 307,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 286,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setIsAuthModalOpen(true),
                            style: {
                                fontSize: '12px',
                                padding: '8px 14px',
                                background: '#0070f3',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            },
                            children: "ログイン"
                        }, void 0, false, {
                            fileName: "[project]/src/components/HazardMap.tsx",
                            lineNumber: 330,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 284,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HazardMap.tsx",
                lineNumber: 270,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HazardMap, {
                        posts: posts,
                        centerPos: center,
                        zoomLevel: zoom,
                        onMapChange: handleMapChange,
                        mapMode: mapMode
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 350,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            zIndex: 1000,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setIsMapMenuOpen(!isMapMenuOpen),
                                style: {
                                    width: '44px',
                                    height: '44px',
                                    background: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#333'
                                },
                                "aria-label": "地図切り替え",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "24",
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    strokeWidth: "2",
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                                            points: "12 2 2 7 12 12 22 7 12 2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 392,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                            points: "2 17 12 22 22 17"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 393,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                            points: "2 12 12 17 22 12"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 394,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 382,
                                    columnNumber: 25
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/HazardMap.tsx",
                                lineNumber: 364,
                                columnNumber: 21
                            }, this),
                            isMapMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: '8px',
                                    background: 'white',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    minWidth: '120px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMapMode('standard');
                                            setIsMapMenuOpen(false);
                                        },
                                        style: {
                                            padding: '10px 15px',
                                            border: 'none',
                                            background: mapMode === 'standard' ? '#e6f7ff' : 'white',
                                            color: mapMode === 'standard' ? '#0070f3' : '#333',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontSize: '13px'
                                        },
                                        children: "標準"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 411,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMapMode('simple');
                                            setIsMapMenuOpen(false);
                                        },
                                        style: {
                                            padding: '10px 15px',
                                            border: 'none',
                                            background: mapMode === 'simple' ? '#e6f7ff' : 'white',
                                            color: mapMode === 'simple' ? '#0070f3' : '#333',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            borderTop: '1px solid #eee'
                                        },
                                        children: "シンプル"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 428,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setMapMode('satellite');
                                            setIsMapMenuOpen(false);
                                        },
                                        style: {
                                            padding: '10px 15px',
                                            border: 'none',
                                            background: mapMode === 'satellite' ? '#e6f7ff' : 'white',
                                            color: mapMode === 'satellite' ? '#0070f3' : '#333',
                                            textAlign: 'left',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            borderTop: '1px solid #eee'
                                        },
                                        children: "航空写真"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 446,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HazardMap.tsx",
                                lineNumber: 399,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 353,
                        columnNumber: 17
                    }, this),
                    !isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleCurrentLocation,
                        disabled: isLoadingGPS,
                        style: {
                            position: 'absolute',
                            bottom: '100px',
                            right: '20px',
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'white',
                            color: '#333',
                            fontSize: '24px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            zIndex: 1001,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: isLoadingGPS ? '...' : '📍'
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 469,
                        columnNumber: 21
                    }, this),
                    !isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsModalOpen(true),
                        style: {
                            position: 'absolute',
                            bottom: '30px',
                            right: '20px',
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: '#ff4d4f',
                            color: 'white',
                            fontSize: '32px',
                            border: 'none',
                            boxShadow: '0 4px 12px rgba(255, 77, 79, 0.4)',
                            cursor: 'pointer',
                            zIndex: 1001,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        children: "＋"
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 495,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HazardMap.tsx",
                lineNumber: 349,
                columnNumber: 13
            }, this),
            isModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 2000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                },
                onClick: ()=>setIsModalOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'white',
                        padding: '24px',
                        borderRadius: '16px',
                        width: '100%',
                        maxWidth: '420px',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        color: '#333'
                    },
                    onClick: (e)=>e.stopPropagation(),
                    children: duplicatePost ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: isSelfDuplicate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: '18px',
                                        color: '#d32f2f',
                                        textAlign: 'center'
                                    },
                                    children: "既に投稿済みです"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 556,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '20px 0',
                                        color: '#666',
                                        fontSize: '14px'
                                    },
                                    children: "この場所には既にあなたが同じ投稿をしています。"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 557,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsModalOpen(false),
                                    style: {
                                        width: '100%',
                                        padding: '12px',
                                        background: '#f0f0f0',
                                        border: 'none',
                                        borderRadius: '8px'
                                    },
                                    children: "閉じる"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 560,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: '18px',
                                        textAlign: 'center'
                                    },
                                    children: "近くに似た投稿があります"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 569,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        margin: '10px 0',
                                        fontSize: '14px'
                                    },
                                    children: duplicatePost.reason
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 570,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAgreeToExisting,
                                    style: {
                                        width: '100%',
                                        padding: '12px',
                                        background: '#0070f3',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px'
                                    },
                                    children: "✋ 同感する"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 571,
                                    columnNumber: 41
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: submitNewPost,
                                    style: {
                                        width: '100%',
                                        marginTop: '10px',
                                        padding: '12px',
                                        background: 'none',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px'
                                    },
                                    children: "いいえ、新しく投稿する"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/HazardMap.tsx",
                                    lineNumber: 584,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 553,
                        columnNumber: 29
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleCheckDuplicate,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    fontSize: '20px',
                                    textAlign: 'center',
                                    marginBottom: '20px'
                                },
                                children: "不安を投稿する"
                            }, void 0, false, {
                                fileName: "[project]/src/components/HazardMap.tsx",
                                lineNumber: 602,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: sectionStyle,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        style: labelStyle,
                                        children: "何が一番不安ですか？"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 604,
                                        columnNumber: 37
                                    }, this),
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$constants$2f$reasons$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REASONS"].map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: 'flex',
                                                padding: '10px',
                                                borderBottom: '1px solid #eee'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "radio",
                                                    name: "reason",
                                                    value: r,
                                                    checked: formReason === r,
                                                    onChange: ()=>setFormReason(r)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 607,
                                                    columnNumber: 45
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        marginLeft: '10px'
                                                    },
                                                    children: r
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/HazardMap.tsx",
                                                    lineNumber: 614,
                                                    columnNumber: 45
                                                }, this)
                                            ]
                                        }, r, true, {
                                            fileName: "[project]/src/components/HazardMap.tsx",
                                            lineNumber: 606,
                                            columnNumber: 41
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HazardMap.tsx",
                                lineNumber: 603,
                                columnNumber: 33
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: '10px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setIsModalOpen(false),
                                        style: {
                                            flex: 1,
                                            padding: '12px',
                                            background: '#eee',
                                            border: 'none',
                                            borderRadius: '8px'
                                        },
                                        children: "キャンセル"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 619,
                                        columnNumber: 37
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isSubmitting,
                                        style: {
                                            flex: 1,
                                            padding: '12px',
                                            background: '#ff4d4f',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px'
                                        },
                                        children: "次へ"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/HazardMap.tsx",
                                        lineNumber: 626,
                                        columnNumber: 37
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/HazardMap.tsx",
                                lineNumber: 618,
                                columnNumber: 33
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HazardMap.tsx",
                        lineNumber: 601,
                        columnNumber: 29
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HazardMap.tsx",
                    lineNumber: 538,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HazardMap.tsx",
                lineNumber: 522,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AuthModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isAuthModalOpen,
                onClose: ()=>setIsAuthModalOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/HazardMap.tsx",
                lineNumber: 646,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HazardMap.tsx",
        lineNumber: 265,
        columnNumber: 9
    }, this);
}
_s1(Home, "LsM9ff2R75j1kId0xMbfC+ChAks=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c2 = Home;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "HazardMap");
__turbopack_context__.k.register(_c1, "MapControllerLogic");
__turbopack_context__.k.register(_c2, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HazardMap.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/HazardMap.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_7a5c97b8._.js.map