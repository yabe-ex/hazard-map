export type ArticleCategory = 'dog' | 'game' | 'walking' | 'lab' | 'watching';
export type ArticleStatus = 'draft' | 'published';

export interface Article {
    id: string;
    slug: string;
    title: string;
    content: string | null;
    category: ArticleCategory;
    status: ArticleStatus;
    thumbnail_url: string | null;
    published_at: string | null;
    author_id: string | null;
    created_at: string;
    updated_at: string;
}

export interface ArticleFormData {
    slug: string;
    title: string;
    content: string;
    category: ArticleCategory;
    status: ArticleStatus;
    thumbnail_url: string;
}
