import { getArticleBySlug, getAllArticleSlugs } from '@/lib/cms';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';
import styles from '@/app/article.module.css';



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
        <div className={styles.pageContainer}>
            <div
                className={styles.themeHeader}
                style={{ '--theme-color': '#2c3e50' } as React.CSSProperties}
            >
                <a href="/lab" className={styles.backLink}>← 研究室TOPへ戻る</a>
            </div>

            <article className={styles.articleCard}>
                <header className={styles.articleHeader}>
                    <div
                        className={styles.categoryBadge}
                        style={{ '--theme-color': '#1565c0', background: '#e3f2fd', color: '#1565c0' } as React.CSSProperties}
                    >
                        マチレポ研究室レポート
                    </div>
                    <h1 className={styles.title}>{article.title}</h1>
                    <div className={styles.date}>
                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : ''}
                    </div>
                </header>

                {article.thumbnail_url && (
                    <div className={styles.thumbnail}>
                        <img src={article.thumbnail_url} alt={article.title} />
                    </div>
                )}

                <div className="article-content">
                    <MarkdownRenderer content={article.content || ''} />
                </div>
            </article>
        </div>
    );
}
