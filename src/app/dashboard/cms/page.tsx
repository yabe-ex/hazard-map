'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Article, ArticleCategory } from '@/types/article';

export default function CmsListPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('admin_articles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setArticles(data || []);
        } catch (error: any) {
            console.error('Error fetching articles:', error);
            toast.error('記事一覧の取得に失敗しました');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('本当に削除しますか？')) return;

        try {
            const { error } = await supabase.from('admin_articles').delete().eq('id', id);
            if (error) throw error;
            toast.success('削除しました');
            setArticles(prev => prev.filter(article => article.id !== id));
        } catch (e) {
            toast.error('削除に失敗しました');
        }
    };

    const getCategoryLabel = (cat: ArticleCategory) => {
        switch (cat) {
            case 'dog': return 'わんわんパトロール';
            case 'game': return '位置情報ゲーム';
            case 'walking': return '旅・ウォーキング';
            case 'lab': return 'マチレポ研究室';
            default: return cat;
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#333', background: '#f8f9fa', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>マチレポCMS 記事管理</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                        onClick={() => router.push('/dashboard/cms/edit')}
                        style={{
                            padding: '8px 16px',
                            background: '#2ecc71',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        + 新規作成
                    </button>
                    <button
                        onClick={() => router.push('/dashboard')}
                        style={{
                            padding: '8px 16px',
                            background: '#7f8c8d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        ダッシュボードへ戻る
                    </button>
                </div>
            </div>

            {loading ? (
                <div>読み込み中...</div>
            ) : (
                <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                            <tr>
                                <th style={{ padding: '12px', textAlign: 'left' }}>タイトル</th>
                                <th style={{ padding: '12px', textAlign: 'left' }}>スラッグ</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>カテゴリ</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>ステータス</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>公開日</th>
                                <th style={{ padding: '12px', textAlign: 'center' }}>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article) => (
                                <tr key={article.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>
                                        <a
                                            href={`/${article.category === 'lab' ? 'lab' : `watching/${article.category}`}/${article.slug}${article.status === 'draft' ? '?preview=true' : ''}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', color: '#2980b9' }}
                                        >
                                            {article.title} <span style={{ fontSize: '10px' }}>↗</span>
                                        </a>
                                    </td>
                                    <td style={{ padding: '12px', fontFamily: 'monospace', color: '#666' }}>
                                        {article.slug}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            background: '#e0f7fa',
                                            color: '#006064'
                                        }}>
                                            {getCategoryLabel(article.category)}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        {article.status === 'published' ? (
                                            <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>公開中</span>
                                        ) : (
                                            <span style={{ color: '#f39c12', fontWeight: 'bold' }}>下書き</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px' }}>
                                        {article.published_at ? new Date(article.published_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td style={{ padding: '12px', textAlign: 'center' }}>
                                        <button
                                            onClick={() => router.push(`/dashboard/cms/edit?id=${article.id}`)}
                                            style={{
                                                padding: '4px 8px',
                                                marginRight: '8px',
                                                background: '#3498db',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            編集
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            style={{
                                                padding: '4px 8px',
                                                background: '#e74c3c',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            削除
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {articles.length === 0 && (
                                <tr>
                                    <td colSpan={6} style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                                        記事がまだありません
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
