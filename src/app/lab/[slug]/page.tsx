import { getArticleBySlug, getAllArticleSlugs } from '@/lib/cms';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';



export async function generateStaticParams() {
    const articles = await getAllArticleSlugs();
    return articles
        .filter(a => a.category === 'lab')
        .map((article) => ({
            slug: article.slug,
        }));
}

import { createClient } from '@/lib/supabaseServer';

export default async function LabArticlePage({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ preview?: string }>
}) {
    const { slug } = await params;
    const { preview } = await searchParams;
    let article = null;

    // 1. If not preview mode, try fetching published article (Public)
    if (preview !== 'true') {
        article = await getArticleBySlug('lab', slug);
    }

    // 2. If not found or preview mode, check if it's a draft and user is admin (Private)
    if (!article) {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            article = await getArticleBySlug('lab', slug, { includeDrafts: true, client: supabase });
        }
    }

    if (!article) {
        notFound();
    }

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '60px' }}>
            <div style={{ background: '#2c3e50', padding: '20px', color: 'white', textAlign: 'center' }}>
                <a href="/lab" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>← 研究室TOPへ戻る</a>
            </div>

            <article style={{ maxWidth: '800px', margin: '40px auto', background: 'white', padding: '60px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', padding: '6px 12px', background: '#e3f2fd', color: '#1565c0', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px' }}>
                        マチレポ研究室レポート
                    </div>
                    <h1 style={{ fontSize: '32px', fontWeight: 'bold', lineHeight: '1.4', marginBottom: '20px' }}>{article.title}</h1>
                    <div style={{ fontSize: '14px', color: '#888' }}>
                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : ''}
                    </div>
                </header>

                {article.thumbnail_url && (
                    <div style={{ marginBottom: '50px', borderRadius: '8px', overflow: 'hidden' }}>
                        <img src={article.thumbnail_url} alt={article.title} style={{ width: '100%', height: 'auto' }} />
                    </div>
                )}

                <div className="article-content">
                    <MarkdownRenderer content={article.content || ''} />
                </div>
            </article>
        </div>
    );
}
