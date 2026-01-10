// src/components/StaticPageHeader.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function StaticPageHeader() {
    const router = useRouter();

    return (
        <header
            style={{
                background: '#fff',
                padding: '16px 20px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                position: 'sticky',
                top: 0,
                width: '100%',
                zIndex: 100
            }}
        >
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>みんなのマチレポ</div>
                <button
                    onClick={() => router.back()}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#0070f3',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    type="button"
                >
                    ← 地図に戻る
                </button>
            </div>
        </header>
    );
}
