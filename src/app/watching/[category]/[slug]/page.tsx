import { getArticleBySlug, getAllArticleSlugs } from '@/lib/cms';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '@/app/article.module.css';



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
        try {
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                article = await getArticleBySlug(category, slug, { includeDrafts: true, client: supabase });
            }
        } catch (e) {
            // Ignore error
        }
    }

    if (!article) {
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
        <div className={styles.pageContainer}>
            <div
                className={styles.themeHeader}
                style={{ '--theme-color': themeColor } as React.CSSProperties}
            >
                <Link href={`/watching/${category}`} className={styles.backLink}>
                    ← {getCategoryLabel(category)}TOPへ戻る
                </Link>
            </div>

            <article className={styles.articleCard}>
                <header className={styles.articleHeader}>
                    <div
                        className={styles.categoryBadge}
                        style={{ '--theme-color': themeColor } as React.CSSProperties}
                    >
                        {getCategoryLabel(category)}
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
