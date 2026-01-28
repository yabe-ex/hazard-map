import { getArticleBySlug, getAllArticleSlugs } from '@/lib/cms';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';



export async function generateStaticParams() {
    const articles = await getAllArticleSlugs();
    return articles
        .filter(a => ['dog', 'game', 'walking'].includes(a.category))
        .map((article) => ({
            category: article.category,
            slug: article.slug,
        }));
}

import { createClient } from '@/lib/supabaseServer';

export default async function WatchingArticlePage({
    params,
    searchParams
}: {
    params: Promise<{ category: string, slug: string }>,
    searchParams: Promise<{ preview?: string }>
}) {
    const { category, slug } = await params;
    const { preview } = await searchParams;
    let article = null;

    // 1. If not preview mode, try fetching published article (Public)
    if (preview !== 'true') {
        article = await getArticleBySlug(category, slug);
    }

    // 2. If not found or preview mode, check if it's a draft and user is admin (Private)
    if (!article) {
        console.log(`[Draft Check] Trying to fetch draft for ${category}/${slug}, preview=${preview}`);
        try {
            const supabase = await createClient();
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            console.log(`[Draft Check] User: ${user?.email}, AuthError: ${authError?.message}`);

            if (user) {
                article = await getArticleBySlug(category, slug, { includeDrafts: true, client: supabase });
                console.log(`[Draft Check] Draft fetch result: ${article ? 'Found' : 'Not Found'}`);
            }
        } catch (e) {
            console.error('[Draft Check] Error:', e);
        }
    }

    if (!article) {
        console.log(`[Draft Check] Article not found, returning 404`);
        notFound();
    }

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'dog': return '#e67e22';
            case 'game': return '#9b59b6';
            case 'walking': return '#3498db';
            default: return '#555';
        }
    };

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'dog': return 'わんわんパトロール';
            case 'game': return '位置ゲー';
            case 'walking': return '旅・ウォーキング';
            default: return 'カテゴリー';
        }
    };

    const themeColor = getCategoryColor(category);

    return (
        <div style={{ background: '#f8f9fa', minHeight: '100vh', paddingBottom: '60px' }}>
            <div style={{ background: themeColor, padding: '20px', color: 'white', textAlign: 'center' }}>
                <Link href={`/watching/${category}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                    ← {getCategoryLabel(category)}TOPへ戻る
                </Link>
            </div>

            <article style={{ maxWidth: '800px', margin: '40px auto', background: 'white', padding: '60px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <header style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', padding: '6px 12px', background: themeColor, color: 'white', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', marginBottom: '20px', opacity: 0.9 }}>
                        {getCategoryLabel(category)}
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
