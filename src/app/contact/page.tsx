'use client';

import { useState } from 'react';
import StaticPageHeader from '@/components/StaticPageHeader';
import toast from 'react-hot-toast';

export default function ContactPage() {
    const [isLoading, setIsLoading] = useState(false);

    // sendCopyを追加
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'ご意見・ご要望',
        locationInfo: '',
        message: '',
        sendCopy: true // デフォルトでチェックを入れておくのが親切です
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                toast.success('お問い合わせを送信しました');
                // フォームをリセット（sendCopyはtrueのままにする）
                setFormData({
                    name: '',
                    email: '',
                    type: 'ご意見・ご要望',
                    locationInfo: '',
                    message: '',
                    sendCopy: true
                });
            } else {
                toast.error('送信に失敗しました。時間をおいて再度お試しください。');
            }
        } catch (error) {
            console.error(error);
            toast.error('エラーが発生しました');
        } finally {
            setIsLoading(false);
        }
    };

    // 共通スタイル
    const labelStyle = { display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px', color: '#333' };
    const inputStyle = { width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', color: '#333' };

    return (
        <main style={{ fontFamily: 'sans-serif', background: '#f9f9f9', minHeight: '100vh' }}>
            <StaticPageHeader />
            <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px 60px' }}>
                <h1
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        marginBottom: '24px',
                        borderBottom: '2px solid #0070f3',
                        paddingBottom: '10px',
                        color: '#333'
                    }}
                >
                    お問い合わせ
                </h1>

                <form
                    onSubmit={handleSubmit}
                    style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                >
                    {/* お名前 */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>
                            お名前 <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} style={inputStyle} />
                    </div>

                    {/* メールアドレス */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>
                            メールアドレス <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} style={inputStyle} />
                    </div>

                    {/* 種別 */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>
                            お問い合わせ種別 <span style={{ color: 'red' }}>*</span>
                        </label>
                        <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
                            <option value="不適切な投稿の報告・削除依頼">不適切な投稿の報告・削除依頼</option>
                            <option value="不具合・バグの報告">不具合・バグの報告</option>
                            <option value="ご意見・ご要望">ご意見・ご要望</option>
                            <option value="自治体・企業様からのお問い合わせ">自治体・企業様からのお問い合わせ</option>
                            <option value="その他">その他</option>
                        </select>
                    </div>

                    {/* 対象箇所 */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={labelStyle}>
                            対象の投稿IDまたは場所 <span style={{ color: '#888', fontWeight: 'normal' }}>(任意)</span>
                        </label>
                        <input
                            type="text"
                            name="locationInfo"
                            value={formData.locationInfo}
                            onChange={handleChange}
                            placeholder="例: ID:1234、＊＊駅前の..."
                            style={inputStyle}
                        />
                    </div>

                    {/* 内容 */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={labelStyle}>
                            お問い合わせ内容 <span style={{ color: 'red' }}>*</span>
                        </label>
                        <textarea
                            name="message"
                            required
                            rows={6}
                            value={formData.message}
                            onChange={handleChange}
                            style={{ ...inputStyle, resize: 'vertical' }}
                        />
                    </div>

                    {/* ▼▼▼ 追加: 控えメール送信のチェックボックス ▼▼▼ */}
                    <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center' }}>
                        <input
                            type="checkbox"
                            name="sendCopy"
                            id="sendCopy"
                            checked={formData.sendCopy}
                            onChange={handleChange}
                            style={{
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                                accentColor: '#0070f3',
                                marginRight: '8px'
                            }}
                        />
                        <label htmlFor="sendCopy" style={{ cursor: 'pointer', fontSize: '14px', color: '#333', userSelect: 'none' }}>
                            このお問い合わせ内容のコピーを自分にも送信する
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: isLoading ? '#ccc' : '#0070f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? '送信中...' : '送信する'}
                    </button>
                </form>
            </div>
        </main>
    );
}
