import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1
};

export const metadata: Metadata = {
    title: 'みんなのマチレポ - 街の気づきを地図にする',
    description: 'みんなで作る地域の安全・安心マップ。身近な危険箇所や気づきを投稿してシェアしよう。'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // 開発環境かどうかを判定
    const isDev = process.env.NODE_ENV === 'development';

    return (
        <html lang="ja">
            <body className={inter.className}>
                {children}
                <Toaster position="top-center" />

                {/* ▼▼▼ 追加：開発環境のみ表示されるバッジ ▼▼▼ */}
                {isDev && (
                    <div
                        style={{
                            position: 'fixed',
                            bottom: '10px',
                            right: '10px',
                            background: '#ff9800', // オレンジ色で目立たせる
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            zIndex: 9999,
                            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                            pointerEvents: 'none' // クリックの邪魔にならないように
                        }}
                    >
                        🔧 開発環境 (Local)
                    </div>
                )}
                {/* ▲▲▲ 追加ここまで ▲▲▲ */}
            </body>
        </html>
    );
}
