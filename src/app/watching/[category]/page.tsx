import { getArticlesByCategory, getAllArticleSlugs } from '@/lib/cms';
import { ArticleCategory } from '@/types/article';
import Link from 'next/link';
import { notFound } from 'next/navigation';



export async function generateStaticParams() {
    return [
        { category: 'dog' },
        { category: 'game' },
        { category: 'walking' },
    ];
}

// Hardcoded content components
const DogHeader = () => (
    <div style={{ background: '#e67e22', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>🐕 わんわんパトロール</h1>
        <p>愛犬との散歩時間を、地域の安全活動に。</p>
    </div>
);

const GameHeader = () => (
    <div style={{ background: '#9b59b6', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>🎮 位置ゲー見守り</h1>
        <p>街を歩くゲーマーこそ、最強のガーディアン。</p>
    </div>
);

const WalkingHeader = () => (
    <div style={{ background: '#3498db', color: 'white', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>🚶 旅・ウォーキング見守り</h1>
        <p>歩いた距離＝街の安心。移動の価値を最大化する。</p>
    </div>
);

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category: categorySlug } = await params;
    const category = categorySlug as ArticleCategory;
    const validCategories = ['dog', 'game', 'walking'];

    if (!validCategories.includes(category)) {
        notFound();
    }

    const articles = await getArticlesByCategory(category);

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Conditional Header */}
            {category === 'dog' && <DogHeader />}
            {category === 'game' && <GameHeader />}
            {category === 'walking' && <WalkingHeader />}

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>

                {/* Specific Content Areas (Hardcoded placeholders per user request) */}
                {category === 'dog' && (
                    <div style={{ background: 'white', padding: '30px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2px solid #e67e22', paddingBottom: '10px' }}>
                            📢 自治体DB・お役立ち情報
                        </h2>
                        <p style={{ color: '#666' }}>※ ここに「わんわんパトロール導入自治体一覧」などのコンテンツが入ります。</p>
                    </div>
                )}
                {category === 'game' && (
                    <div style={{ background: 'white', padding: '30px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2px solid #9b59b6', paddingBottom: '10px' }}>
                            🏆 ガーディアンランキング / 協賛ブロガー
                        </h2>
                        <p style={{ color: '#666' }}>※ ここに「称号システム」や「協賛ブロガー」のリストが入ります。</p>
                    </div>
                )}
                {category === 'walking' && (
                    <div style={{ background: 'white', padding: '30px', borderRadius: '12px', marginBottom: '40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
                            📊 活動自治体ランキング
                        </h2>
                        <p style={{ color: '#666' }}>※ ここに「投稿実績のある自治体数ランキング」等が入ります。</p>
                    </div>
                )}

                {/* Article List */}
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>新着記事</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {articles.map((article) => (
                        <Link href={`/watching/${category}/${article.slug}`} key={article.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: '100%', transition: 'transform 0.2s' }}>
                                {article.thumbnail_url ? (
                                    <div style={{ height: '200px', overflow: 'hidden' }}>
                                        <img src={article.thumbnail_url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                ) : (
                                    <div style={{ height: '200px', background: '#ddd', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                                        No Image
                                    </div>
                                )}
                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '10px', lineHeight: '1.4' }}>{article.title}</h3>
                                    <div style={{ fontSize: '12px', color: '#999', display: 'flex', justifyContent: 'space-between' }}>
                                        <span>{article.published_at ? new Date(article.published_at).toLocaleDateString() : ''}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {articles.length === 0 && (
                    <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>まだ記事がありません。</p>
                )}
            </div>
        </div>
    );
}
