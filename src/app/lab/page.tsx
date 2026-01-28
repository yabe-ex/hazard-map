import { getArticlesByCategory } from '@/lib/cms';
import Link from 'next/link';



export default async function LabTopPage() {
    const articles = await getArticlesByCategory('lab');

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh' }}>
            {/* Header / Hero */}
            <div style={{ background: '#2c3e50', padding: '60px 20px', color: 'white', textAlign: 'center' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>🧪 マチレポ研究室</h1>
                <p style={{ fontSize: '16px', opacity: 0.8 }}>科学的根拠に基づく防犯ノウハウとデータを集積</p>
            </div>

            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
                {/* Introduction / Concept */}
                <section style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', borderLeft: '5px solid #3498db', paddingLeft: '15px' }}>
                        研究室の目的
                    </h2>
                    <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
                        マチレポ研究室では、「科学が支える子どもの被害防止」や「環境犯罪学」の知見に基づき、
                        自治体や防犯ボランティアの皆様に役立つエビデンス（科学的根拠）を提供します。
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        <div style={{ padding: '20px', background: '#f0f4f8', borderRadius: '8px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#2c3e50' }}>1. 科学的防犯の解説</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>「聞き書きマップ」や統計分析に基づく最新の防犯理論を解説します。</p>
                        </div>
                        <div style={{ padding: '20px', background: '#f0f4f8', borderRadius: '8px' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '10px', color: '#2c3e50' }}>2. 公的資料の要約</h3>
                            <p style={{ fontSize: '14px', color: '#666' }}>国交省や警視庁が発表する膨大な資料から、現場で使える要素を抜粋・要約します。</p>
                        </div>
                    </div>
                </section>

                {/* Article List */}
                <section>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        📝 最新の研究レポート
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {articles.map((article) => (
                            <Link href={`/lab/${article.slug}`} key={article.id} style={{ textDecoration: 'none', color: 'inherit' }}>
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
                                            <span style={{ color: '#3498db' }}>#Research</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {articles.length === 0 && (
                        <p style={{ textAlign: 'center', padding: '40px', color: '#999' }}>まだ記事がありません。</p>
                    )}
                </section>
            </div>
        </div>
    );
}
