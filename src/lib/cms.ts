import { supabase } from '@/lib/supabaseClient';
import { Article, ArticleCategory } from '@/types/article';
import { SupabaseClient } from '@supabase/supabase-js';

export async function getArticleBySlug(
    category: string,
    slug: string,
    options: { includeDrafts?: boolean, client?: SupabaseClient } = {}
): Promise<Article | null> {
    const client = options.client || supabase;
    let query = client
        .from('admin_articles')
        .select('*')
        .eq('category', category)
        .eq('slug', slug);

    if (!options.includeDrafts) {
        query = query.eq('status', 'published');
    }

    const { data, error } = await query.single();

    if (error || !data) return null;
    return data as Article;
}

export async function getArticlesByCategory(category: ArticleCategory, limit = 10): Promise<Article[]> {
    const { data, error } = await supabase
        .from('admin_articles')
        .select('*')
        .eq('status', 'published')
        .eq('category', category)
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) return [];
    return (data || []) as Article[];
}

export async function getAllLatestArticles(limit = 10): Promise<Article[]> {
    const { data, error } = await supabase
        .from('admin_articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(limit);

    if (error) return [];
    return (data || []) as Article[];
}

export async function getAllArticleSlugs(): Promise<{ slug: string, category: string }[]> {
    const { data, error } = await supabase
        .from('admin_articles')
        .select('slug, category')
        .eq('status', 'published');

    if (error) return [];
    return (data || []) as { slug: string, category: string }[];
}
