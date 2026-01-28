'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Article, ArticleCategory, ArticleFormData, ArticleStatus } from '@/types/article';
// import { v4 as uuidv4 } from 'uuid'; -- Removed to avoid dependency

export default function CmsEditor({ articleId }: { articleId?: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<ArticleFormData>({
        title: '',
        slug: '',
        content: '',
        category: 'dog',
        status: 'draft',
        thumbnail_url: ''
    });

    const [publishedAt, setPublishedAt] = useState<string | null>(null);

    useEffect(() => {
        if (articleId) {
            fetchArticle(articleId);
        }
    }, [articleId]);

    const fetchArticle = async (id: string) => {
        setLoading(true);
        const { data, error } = await supabase
            .from('admin_articles')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            toast.error('記事の取得に失敗しました');
            router.push('/dashboard/cms');
        } else if (data) {
            setFormData({
                title: data.title,
                slug: data.slug,
                content: data.content || '',
                category: data.category as ArticleCategory,
                status: data.status as ArticleStatus,
                thumbnail_url: data.thumbnail_url || ''
            });
            setPublishedAt(data.published_at);
        }
        setLoading(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isThumbnail: boolean = false) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `cms/${fileName}`;

            // Changed bucket to 'cms-uploads' (User needs to create this)
            const BUCKET_NAME = 'cms-uploads';

            const { error: uploadError } = await supabase.storage
                .from(BUCKET_NAME)
                .upload(filePath, file);

            if (uploadError) {
                console.error('Upload Error Details:', uploadError);
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from(BUCKET_NAME)
                .getPublicUrl(filePath);

            if (isThumbnail) {
                setFormData(prev => ({ ...prev, thumbnail_url: publicUrl }));
            } else {
                // Inline image: append markdown to content
                const markdownImage = `\n![image](${publicUrl})\n`;
                setFormData(prev => ({ ...prev, content: prev.content + markdownImage }));
                toast.success('画像を本文に挿入しました');
            }
        } catch (error) {
            console.error(error);
            toast.error('画像のアップロードに失敗しました。「cms-uploads」バケットがあるか確認してください。');
        } finally {
            setUploading(false);
        }
    };

    const generateSlug = () => {
        // Simple auto-slug from title (alphanumeric only)
        // Just a helper, user can edit
        const slug = formData.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
        setFormData(prev => ({ ...prev, slug: slug || `post-${Date.now()}` }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.slug || !formData.category) {
            toast.error('必須項目を入力してください');
            return;
        }

        setLoading(true);
        try {
            // Determine published_at
            let newPublishedAt = publishedAt;
            if (formData.status === 'published' && !newPublishedAt) {
                newPublishedAt = new Date().toISOString();
            }
            // If reverting to draft, consider keeping it or clearing it. Usually keep history or clear. 
            // For simple CMS, let's keep it if check 'published' again. 
            // Better behavior: if status is draft, published_at doesn't really matter for display, 
            // but if we want to "Schedule" we need it. 
            // Let's stick to: "First time published -> set date". "Republish -> keep original date".

            const payload = {
                ...formData,
                published_at: newPublishedAt,
                updated_at: new Date().toISOString()
            };

            if (articleId) {
                const { error } = await supabase
                    .from('admin_articles')
                    .update(payload)
                    .eq('id', articleId);
                if (error) throw error;
                toast.success('更新しました');
            } else {
                const { error } = await supabase
                    .from('admin_articles')
                    .insert([payload]);
                if (error) throw error;
                toast.success('作成しました');
            }
            router.push('/dashboard/cms');
        } catch (error: any) {
            console.error(error);
            if (error.code === '23505') {
                toast.error('このスラッグは既に使われています（カテゴリ内で重複不可）');
            } else {
                toast.error('保存に失敗しました');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '20px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#333' }}>
                    {articleId ? '記事編集' : '新規記事作成'}
                </h2>
                {articleId && formData.slug && (
                    <a
                        href={`/${formData.category === 'lab' ? 'lab' : `watching/${formData.category}`}/${formData.slug}${formData.status === 'draft' ? '?preview=true' : ''}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '14px', color: '#3498db', textDecoration: 'none', fontWeight: 'bold' }}
                    >
                        記事ページを確認する {formData.status === 'draft' ? '(プレビュー)' : ''} ↗
                    </a>
                )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Title */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>タイトル *</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        onBlur={() => !formData.slug && generateSlug()}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', background: 'white', color: '#333' }}
                        required
                    />
                </div>

                {/* Slug */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                        URLスラッグ (英数字) * <span style={{ fontSize: '11px', color: '#666' }}>/watching/{formData.category}/[slug]</span>
                    </label>
                    <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'monospace', background: 'white', color: '#333' }}
                        required
                    />
                </div>

                {/* Category & Status */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>カテゴリ *</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', background: 'white', color: '#333' }}
                        >
                            <option value="dog">わんわんパトロール</option>
                            <option value="game">位置情報ゲーム</option>
                            <option value="walking">旅・ウォーキング</option>
                            <option value="lab">マチレポ研究室</option>
                            <option value="watching">ながら見守り総合</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>ステータス</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                background: formData.status === 'published' ? '#dff0d8' : 'white', // Light green if published
                                color: formData.status === 'published' ? '#3c763d' : '#333',
                                fontWeight: formData.status === 'published' ? 'bold' : 'normal'
                            }}
                        >
                            <option value="draft">下書き</option>
                            <option value="published">【公開】</option>
                        </select>
                    </div>
                </div>

                {/* Thumbnail */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>アイキャッチ画像</label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, true)}
                            disabled={uploading}
                            style={{ color: '#333' }}
                        />
                        {formData.thumbnail_url && (
                            <img src={formData.thumbnail_url} alt="Thumbnail" style={{ height: '50px', borderRadius: '4px' }} />
                        )}
                    </div>
                </div>

                {/* Content Editor */}
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
                        本文 (Markdown対応)
                        <span style={{ marginLeft: '10px', fontWeight: 'normal', fontSize: '12px' }}>
                            ※ 画像を挿入するには下のボタンを使用
                        </span>
                    </label>
                    {/* Inline Image Uploader Helper */}
                    <div style={{ marginBottom: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '4px', fontSize: '13px', border: '1px solid #eee' }}>
                        📸 画像を本文に挿入:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, false)}
                            disabled={uploading}
                            style={{ marginLeft: '10px', color: '#333' }}
                        />
                        {uploading && <span style={{ color: 'blue' }}>アップロード中...</span>}
                    </div>

                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={15}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontFamily: 'monospace',
                            lineHeight: '1.5',
                            fontSize: '14px',
                            background: 'white',
                            color: '#333'
                        }}
                        placeholder="# 見出し1
## 見出し2

本文をここに記述..."
                    />
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        style={{
                            flex: 1,
                            padding: '12px',
                            background: '#3498db',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? '保存中...' : (articleId ? '更新する' : '作成する')}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        style={{
                            padding: '12px 20px',
                            background: '#95a5a6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        キャンセル
                    </button>
                </div>
            </form>
        </div>
    );
}
