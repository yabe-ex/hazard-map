import Link from 'next/link';

export default function WatchingHubPage() {
    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(rgba(26, 188, 156, 0.85), rgba(22, 160, 133, 0.85)), url("/images/watching_header_bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '100px 20px',
                textAlign: 'center',
                color: 'white'
            }}>
                <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>👀 ながら見守り</h1>
                <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                    日常の活動に「防犯」の視点をプラス。<br />
                    「ながら」でできる、無理のない街の安全活動プロジェクト。
                </p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '-40px auto 0', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                {/* Dog Card */}
                <Link href="/watching/dog" style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '40px 30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.2s', height: '100%' }}>
                        <div style={{ fontSize: '50px', marginBottom: '20px' }}>🐕</div>
                        <h2 style={{ color: '#e67e22', fontWeight: 'bold', fontSize: '22px', marginBottom: '15px' }}>わんわんパトロール</h2>
                        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>
                            いつもの愛犬との散歩が、街の安全を守るパトロールに。全国の自治体事例やお役立ち情報を発信。
                        </p>
                    </div>
                </Link>

                {/* Game Card */}
                <Link href="/watching/game" style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '40px 30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.2s', height: '100%' }}>
                        <div style={{ fontSize: '50px', marginBottom: '20px' }}>🎮</div>
                        <h2 style={{ color: '#9b59b6', fontWeight: 'bold', fontSize: '22px', marginBottom: '15px' }}>位置ゲー × 見守り</h2>
                        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>
                            「この街のガーディアン」は君だ。ゲームのための移動を、地域の安全確認に変える新しいプレイスタイル。
                        </p>
                    </div>
                </Link>

                {/* Walking Card */}
                <Link href="/watching/walking" style={{ textDecoration: 'none' }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '40px 30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', textAlign: 'center', transition: 'transform 0.2s', height: '100%' }}>
                        <div style={{ fontSize: '50px', marginBottom: '20px' }}>🚶</div>
                        <h2 style={{ color: '#3498db', fontWeight: 'bold', fontSize: '22px', marginBottom: '15px' }}>旅・ウォーキング</h2>
                        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>
                            その一歩が、誰かの安心に。観光地やウォーキングコースの「安全」をデータ化するプロジェクト。
                        </p>
                    </div>
                </Link>
            </div>

            {/* Introduction Section */}
            <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', color: '#2c3e50' }}>「ながら見守り」とは？</h3>
                <div style={{ textAlign: 'left', background: '#e8f6f3', padding: '30px', borderRadius: '12px' }}>
                    <p style={{ lineHeight: '1.8', marginBottom: '15px', color: '#16a085', fontWeight: 'bold' }}>
                        特別なことをする必要はありません。
                    </p>
                    <p style={{ lineHeight: '1.8', color: '#555' }}>
                        日常生活（散歩、買い物、通勤、ジョギングなど）を行いながら、地域の安全に目を配る活動のことです。
                        「防犯ベストを着てパトロール」といった従来の重厚な活動ではなく、
                        <span style={{ background: 'linear-gradient(transparent 60%, #ffff00 60%)' }}>「ついでに」「無理なく」</span>行うことで、
                        持続可能な防犯ネットワークを構築することを目指しています。
                    </p>
                    <p style={{ marginTop: '15px', fontSize: '12px', color: '#999', textAlign: 'right' }}>
                        出典：東京都「ながら見守り」ガイドブック
                    </p>
                </div>
            </div>
        </div>
    );
}
