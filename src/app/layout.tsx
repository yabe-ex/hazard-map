import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1
};

export const metadata: Metadata = {
    title: 'みんなのマチレポ - 地域の危険箇所を共有する安全マップ',
    description: 'みんなのマチレポは、身近な危険箇所や気づきを投稿・共有できる地域安全マップです。暗い道、見通しの悪い交差点、不審者情報などをみんなでシェアして、地域の防犯・防災・安全な街づくりに役立てましょう。',
    verification: {
        google: 'zZEAMnnRR3ALFaktA0RrlMX6h2pzee7dd4T3ArZe6wY'
    }
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

                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-WYDVFJJ7B1"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-WYDVFJJ7B1');
                    `}
                </Script>
            </body>
        </html>
    );
}
