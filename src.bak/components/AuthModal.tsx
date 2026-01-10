'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

// ローカルストレージのキー
const EMAIL_STORAGE_KEY = 'hazard-map-email';

export default function AuthModal({ isOpen, onClose }: Props) {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);
    const [loading, setLoading] = useState(false);

    // 初回表示時に、保存されたメールアドレスがあればセットする
    useEffect(() => {
        if (isOpen) {
            const savedEmail = localStorage.getItem(EMAIL_STORAGE_KEY);
            if (savedEmail) {
                setEmail(savedEmail);
            }
        }
    }, [isOpen]);

    // メール（マジックリンク）ログイン
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;

        const { error } = await supabase.auth.signInWithOtp({
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
    const handleGoogleLogin = async () => {
        setLoading(true);
        const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;

        const { error } = await supabase.auth.signInWithOAuth({
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

    return (
        <div
            style={{
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
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'white',
                    padding: '30px',
                    borderRadius: '12px',
                    width: '90%',
                    maxWidth: '350px',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* 閉じるボタン（右上） */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '24px',
                        cursor: 'pointer',
                        color: '#999'
                    }}
                >
                    ×
                </button>

                <h2 style={{ marginTop: 0, textAlign: 'center', fontSize: '20px', color: '#333' }}>ログイン / 登録</h2>

                {/* 送信完了画面 */}
                {isSent ? (
                    <div
                        style={{
                            textAlign: 'center',
                            color: '#2e7d32',
                            background: '#e8f5e9',
                            padding: '20px',
                            borderRadius: '8px',
                            marginTop: '10px'
                        }}
                    >
                        <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '0 0 10px 0' }}>確認メールを送信しました！</p>
                        <p style={{ fontSize: '13px', color: '#333', marginBottom: '20px', lineHeight: '1.6' }}>
                            メール内のリンクをクリックして
                            <br />
                            ログインを完了してください。
                        </p>
                        <button
                            onClick={onClose}
                            style={{
                                padding: '10px 24px',
                                background: '#fff',
                                color: '#333',
                                border: '1px solid #ccc',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 'bold'
                            }}
                        >
                            閉じる
                        </button>
                    </div>
                ) : (
                    /* 入力画面 */
                    <>
                        <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px', textAlign: 'center', lineHeight: '1.5' }}>
                            ログインすると、自分の投稿履歴の確認や削除ができるようになります。
                        </p>

                        {/* Google Login */}
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            style={{
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
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
                            onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path
                                    fill="#fff"
                                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                                />
                                <path
                                    fill="#fff"
                                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.715H.957v2.332A8.997 8.997 0 0 0 9 18z"
                                />
                                <path
                                    fill="#fff"
                                    d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                                />
                                <path
                                    fill="#fff"
                                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.271C4.672 5.14 6.656 3.58 9 3.58z"
                                />
                            </svg>
                            Googleでログイン
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', color: '#999' }}>
                            <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                            <span style={{ padding: '0 10px', fontSize: '12px' }}>またはメールで</span>
                            <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
                        </div>

                        {/* Email Login */}
                        <form onSubmit={handleEmailLogin}>
                            <div style={{ marginBottom: '15px' }}>
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="メールアドレス"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{
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
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{
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
                                }}
                                onMouseOver={(e) => (e.currentTarget.style.background = '#000')}
                                onMouseOut={(e) => (e.currentTarget.style.background = '#333')}
                            >
                                {loading ? '送信中...' : 'ログインリンクを送信'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
