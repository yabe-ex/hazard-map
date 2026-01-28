'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';
import { AdminTag, AdminMemo } from '@/types/admin';

type Props = {
    post: any;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: () => void;
    cityCodeFilter: string | null;
};

// URLを検出してリンク化するヘルパー関数
const renderContentWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
        if (part.match(urlRegex)) {
            return (
                <a
                    key={index}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#3498db', textDecoration: 'underline' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {part}
                </a>
            );
        }
        return part;
    });
};

export default function AdminPostDetailModal({ post, isOpen, onClose, onUpdate, cityCodeFilter }: Props) {
    const [allTags, setAllTags] = useState<AdminTag[]>([]);
    const [attachedTagIds, setAttachedTagIds] = useState<number[]>([]);
    const [memos, setMemos] = useState<AdminMemo[]>([]);

    const [memoInput, setMemoInput] = useState('');
    const [editingMemoId, setEditingMemoId] = useState<number | null>(null);

    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#2ecc71');
    const [isLoading, setIsLoading] = useState(false);

    const memoEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && post) {
            fetchTags();
            fetchAttachedTags();
            fetchMemos();
            setMemoInput('');
            setEditingMemoId(null);
        }
    }, [isOpen, post]);

    useEffect(() => {
        if (!editingMemoId) {
            memoEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [memos]);

    const fetchTags = async () => {
        let query = supabase.from('admin_tags').select('*').order('id', { ascending: true });
        if (cityCodeFilter) {
            query = query.or(`is_system.eq.true,city_code.eq.${cityCodeFilter}`);
        }
        const { data, error } = await query;
        if (!error && data) setAllTags(data);
    };

    const fetchAttachedTags = async () => {
        const { data, error } = await supabase.from('post_tags').select('tag_id').eq('post_id', post.id);
        if (!error && data) setAttachedTagIds(data.map((d: any) => d.tag_id));
    };

    const fetchMemos = async () => {
        const { data, error } = await supabase.from('admin_memos').select('*').eq('post_id', post.id).order('created_at', { ascending: true });
        if (!error && data) setMemos(data);
    };

    const toggleTag = async (tag: AdminTag) => {
        const isAttached = attachedTagIds.includes(tag.id);
        if (isAttached) {
            const { error } = await supabase.from('post_tags').delete().eq('post_id', post.id).eq('tag_id', tag.id);
            if (!error) {
                setAttachedTagIds((prev) => prev.filter((id) => id !== tag.id));
                toast.success('タグを外しました');
                onUpdate();
            }
        } else {
            const { error } = await supabase.from('post_tags').insert({ post_id: post.id, tag_id: tag.id });
            if (!error) {
                setAttachedTagIds((prev) => [...prev, tag.id]);
                toast.success('タグを付けました');
                onUpdate();
            }
        }
    };

    const handleSubmitMemo = async () => {
        if (!memoInput.trim()) return;
        setIsLoading(true);

        const {
            data: { user }
        } = await supabase.auth.getUser();
        if (!user) {
            toast.error('ログインが必要です');
            setIsLoading(false);
            return;
        }

        if (editingMemoId) {
            const { error } = await supabase.from('admin_memos').update({ content: memoInput }).eq('id', editingMemoId);
            if (error) {
                toast.error('メモの更新に失敗しました');
            } else {
                toast.success('メモを更新しました');
                setMemoInput('');
                setEditingMemoId(null);
                fetchMemos();
            }
        } else {
            const { error } = await supabase.from('admin_memos').insert({ post_id: post.id, user_id: user.id, content: memoInput });
            if (error) {
                toast.error('メモの送信に失敗しました');
            } else {
                toast.success('メモを保存しました');
                setMemoInput('');
                fetchMemos();
            }
        }
        setIsLoading(false);
    };

    const handleDeleteMemo = async (memoId: number) => {
        if (!window.confirm('このメモを削除しますか？')) return;
        const { error } = await supabase.from('admin_memos').delete().eq('id', memoId);
        if (error) {
            toast.error('削除に失敗しました');
        } else {
            toast.success('メモを削除しました');
            if (editingMemoId === memoId) {
                setMemoInput('');
                setEditingMemoId(null);
            }
            fetchMemos();
        }
    };

    const handleStartEdit = (memo: AdminMemo) => {
        setEditingMemoId(memo.id);
        setMemoInput(memo.content);
    };

    const handleCancelEdit = () => {
        setEditingMemoId(null);
        setMemoInput('');
    };

    const handleDeleteTag = async (tagId: number) => {
        if (!window.confirm('このタグを完全に削除しますか？\n使用されているすべての投稿からこのタグが外れます。')) return;

        // 1. Remove from all posts (post_tags)
        const { error: linkError } = await supabase.from('post_tags').delete().eq('tag_id', tagId);
        if (linkError) {
            toast.error('タグの関連付け解除に失敗しました');
            return;
        }

        // 2. Remove tag definition (admin_tags)
        const { error: tagError } = await supabase.from('admin_tags').delete().eq('id', tagId);
        if (tagError) {
            toast.error('タグの削除に失敗しました');
        } else {
            toast.success('タグを削除しました');
            fetchTags();
            setAttachedTagIds((prev) => prev.filter((id) => id !== tagId));
            onUpdate(); // Reflect changes in parent
        }
    };

    const createCustomTag = async () => {
        if (!newTagName.trim()) return;
        const { error } = await supabase
            .from('admin_tags')
            .insert({ label: newTagName, color: newTagColor, is_system: false, city_code: cityCodeFilter });
        if (error) {
            toast.error('タグ作成に失敗しました');
        } else {
            toast.success('独自タグを作成しました');
            setNewTagName('');
            fetchTags();
        }
    };

    const handleDeletePost = async () => {
        if (!window.confirm('本当にこの投稿を削除しますか？\n削除すると元に戻すことはできません。')) return;

        const { error } = await supabase.from('hazard_posts').delete().eq('id', post.id);

        if (error) {
            console.error(error);
            toast.error('投稿の削除に失敗しました');
        } else {
            toast.success('投稿を削除しました');
            onClose();
            onUpdate();
        }
    };

    if (!isOpen || !post) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.6)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#333'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: 'white',
                    width: '900px',
                    maxWidth: '95%',
                    height: '85vh',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* ヘッダー */}
                <div
                    style={{
                        padding: '15px 20px',
                        borderBottom: '1px solid #ddd',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#f8f9fa'
                    }}
                >
                    <div>
                        <span
                            style={{
                                fontSize: '12px',
                                color: '#444',
                                background: '#e0e0e0',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                fontWeight: 'bold'
                            }}
                        >
                            ID: {post.id}
                        </span>
                        <span style={{ marginLeft: '10px', fontWeight: 'bold', fontSize: '16px', color: '#111' }}>{post.reason}</span>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ border: 'none', background: 'transparent', fontSize: '24px', cursor: 'pointer', color: '#555' }}
                    >
                        ×
                    </button>
                </div>

                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    {/* ▼▼▼ 左カラム：写真・基本情報 ▼▼▼ */}
                    {/* width: 40% を維持し、写真があれば最上部に表示 */}
                    <div style={{ width: '40%', padding: '20px', borderRight: '1px solid #eee', overflowY: 'auto', background: '#fff' }}>
                        {post.image_url && (
                            <div style={{ marginBottom: '15px' }}>
                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>現場写真</div>
                                <img
                                    src={post.image_url}
                                    style={{ width: '100%', borderRadius: '6px', border: '1px solid #ddd', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                                    alt="投稿写真"
                                />
                                {post.photo_taken_at !== null && post.photo_taken_at !== undefined && (
                                    <div
                                        style={{
                                            marginTop: '8px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            color: post.photo_taken_at <= 300 ? '#27ae60' : '#c0392b',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <span style={{ fontSize: '14px' }}>{post.photo_taken_at <= 300 ? '✅' : '⚠️'}</span>
                                        撮影地点との距離: 約{Math.round(post.photo_taken_at)}m
                                        {post.photo_taken_at > 300 && ' (遠)'}
                                    </div>
                                )}
                            </div>
                        )}
                        <div style={{ marginBottom: '15px' }}>
                            <h4 style={{ fontSize: '14px', color: '#555', marginBottom: '5px', fontWeight: 'bold' }}>詳細</h4>
                            <p style={{ fontSize: '14px', margin: 0, color: '#222' }}>{post.address || '住所情報なし'}</p>
                            <p style={{ fontSize: '12px', color: '#444', marginTop: '5px' }}>
                                投稿日時: {new Date(post.created_at).toLocaleString()}
                            </p>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <h4 style={{ fontSize: '14px', color: '#555', marginBottom: '5px', fontWeight: 'bold' }}>ユーザー投稿タグ</h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {post.tags?.map((t: string) => (
                                    <span
                                        key={t}
                                        style={{
                                            fontSize: '12px',
                                            background: '#f0f2f5',
                                            padding: '4px 8px',
                                            borderRadius: '10px',
                                            color: '#333',
                                            border: '1px solid #e0e0e0'
                                        }}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {post.description && (
                            <div style={{ marginBottom: '15px' }}>
                                <h4 style={{ fontSize: '14px', color: '#555', marginBottom: '5px', fontWeight: 'bold' }}>一言コメント（非公開）</h4>
                                <div style={{
                                    fontSize: '13px',
                                    padding: '10px',
                                    background: '#fff3cd',
                                    border: '1px solid #ffeeba',
                                    borderRadius: '6px',
                                    color: '#856404',
                                    lineHeight: '1.5',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {post.description}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ▼▼▼ 右カラム：管理機能（メモ欄を拡大） ▼▼▼ */}
                    {/* flex: 1 で残りの幅を使用。内部も flex column にして高さをフル活用 */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fcfcfc', overflow: 'hidden' }}>
                        {/* タブヘッダー */}
                        <div style={{ display: 'flex', borderBottom: '1px solid #ddd', flexShrink: 0 }}>
                            <button
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    background: 'white',
                                    border: 'none',
                                    borderBottom: '2px solid #3498db',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    color: '#333'
                                }}
                            >
                                🛠 管理・対応
                            </button>
                        </div>

                        {/* コンテンツエリア (スクロール可) */}
                        {/* ここを flex column にして、下部のメモ欄を flex: 1 で伸ばす */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px', overflowY: 'hidden' }}>
                            {/* 1. タグ管理セクション (高さ自動) */}
                            <div style={{ marginBottom: '20px', flexShrink: 0 }}>
                                <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '10px', color: '#111' }}>🏷 ステータス・タグ</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' }}>
                                    {allTags.map((tag) => {
                                        const isActive = attachedTagIds.includes(tag.id);
                                        return (
                                            <div key={tag.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                                                <button
                                                    onClick={() => toggleTag(tag)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        border: `1px solid ${tag.color}`,
                                                        background: isActive ? tag.color : 'white',
                                                        color: isActive ? 'white' : tag.color,
                                                        cursor: 'pointer',
                                                        fontSize: '13px',
                                                        fontWeight: 'bold'
                                                    }}
                                                >
                                                    {isActive && '✔ '}
                                                    {tag.label}
                                                </button>
                                                {!tag.is_system && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeleteTag(tag.id);
                                                        }}
                                                        style={{
                                                            background: 'transparent',
                                                            border: 'none',
                                                            color: '#999',
                                                            cursor: 'pointer',
                                                            fontSize: '14px',
                                                            padding: '0 4px',
                                                            lineHeight: 1
                                                        }}
                                                        title="タグを削除"
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <details style={{ fontSize: '13px', color: '#444', cursor: 'pointer' }}>
                                    <summary>＋ 新しいタグを作成する</summary>
                                    <div
                                        style={{
                                            marginTop: '10px',
                                            display: 'flex',
                                            gap: '10px',
                                            alignItems: 'center',
                                            padding: '10px',
                                            background: '#eee',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        <input
                                            type="text"
                                            placeholder="タグ名 (例: 道路課)"
                                            value={newTagName}
                                            onChange={(e) => setNewTagName(e.target.value)}
                                            style={{
                                                padding: '6px',
                                                borderRadius: '4px',
                                                border: '1px solid #ccc',
                                                color: '#000',
                                                background: '#fff'
                                            }}
                                        />
                                        <input
                                            type="color"
                                            value={newTagColor}
                                            onChange={(e) => setNewTagColor(e.target.value)}
                                            style={{ width: '40px', height: '30px', border: 'none', background: 'transparent' }}
                                        />
                                        <button
                                            onClick={createCustomTag}
                                            style={{
                                                padding: '6px 12px',
                                                background: '#333',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            作成
                                        </button>
                                    </div>
                                </details>
                            </div>

                            {/* 2. メモ・チャットセクション (残り高さいっぱい) */}
                            {/* flex: 1 を指定して下まで伸ばす */}
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    background: 'white',
                                    overflow: 'hidden'
                                }}
                            >
                                <div
                                    style={{
                                        padding: '10px',
                                        background: '#f8f9fa',
                                        borderBottom: '1px solid #eee',
                                        fontSize: '13px',
                                        fontWeight: 'bold',
                                        color: '#333',
                                        flexShrink: 0
                                    }}
                                >
                                    📝 担当者メモ (履歴)
                                </div>

                                {/* ログ表示エリア (スクロール) */}
                                <div style={{ flex: 1, overflowY: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {memos.length === 0 && (
                                        <div style={{ textAlign: 'center', color: '#666', fontSize: '13px', marginTop: '20px' }}>
                                            メモはまだありません
                                        </div>
                                    )}
                                    {memos.map((memo) => {
                                        const isEditing = editingMemoId === memo.id;
                                        return (
                                            <div
                                                key={memo.id}
                                                style={{
                                                    background: isEditing ? '#fff8e1' : '#f0f2f5',
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    fontSize: '13px',
                                                    border: isEditing ? '2px solid #f1c40f' : '1px solid #e1e4e8',
                                                    position: 'relative'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                                    <span style={{ fontSize: '11px', color: '#555', fontWeight: 'bold' }}>
                                                        {new Date(memo.created_at).toLocaleString()}
                                                    </span>
                                                    <div style={{ display: 'flex', gap: '8px' }}>
                                                        <button
                                                            onClick={() => handleStartEdit(memo)}
                                                            title="編集"
                                                            style={{
                                                                border: 'none',
                                                                background: 'transparent',
                                                                cursor: 'pointer',
                                                                fontSize: '14px',
                                                                padding: 0
                                                            }}
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteMemo(memo.id)}
                                                            title="削除"
                                                            style={{
                                                                border: 'none',
                                                                background: 'transparent',
                                                                cursor: 'pointer',
                                                                fontSize: '14px',
                                                                padding: 0
                                                            }}
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </div>
                                                <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.4', color: '#111' }}>
                                                    {renderContentWithLinks(memo.content)}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    <div ref={memoEndRef} />
                                </div>

                                {/* 入力エリア (固定高さ) */}
                                <div
                                    style={{
                                        padding: '10px',
                                        borderTop: '1px solid #eee',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '5px',
                                        background: editingMemoId ? '#fffbe6' : 'white',
                                        flexShrink: 0
                                    }}
                                >
                                    {editingMemoId && (
                                        <div style={{ fontSize: '11px', color: '#d35400', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>⚠️ メモを編集中です</span>
                                            <button
                                                onClick={handleCancelEdit}
                                                style={{
                                                    border: 'none',
                                                    background: 'transparent',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                    color: '#888'
                                                }}
                                            >
                                                キャンセル
                                            </button>
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <textarea
                                            value={memoInput}
                                            onChange={(e) => setMemoInput(e.target.value)}
                                            placeholder="対応状況やメモを入力... (改行可能)"
                                            style={{
                                                flex: 1,
                                                height: '80px', // 入力欄の高さ
                                                padding: '8px',
                                                borderRadius: '4px',
                                                border: editingMemoId ? '2px solid #f1c40f' : '1px solid #ccc',
                                                resize: 'vertical',
                                                color: '#000',
                                                background: '#fff',
                                                fontFamily: 'inherit'
                                            }}
                                        />
                                        <button
                                            onClick={handleSubmitMemo}
                                            disabled={isLoading || !memoInput.trim()}
                                            style={{
                                                width: '60px',
                                                background: editingMemoId ? '#f39c12' : '#3498db',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                height: 'auto'
                                            }}
                                        >
                                            {editingMemoId ? '更新' : '送信'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 3. 削除セクション (危険エリア) */}
                            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                                <h3 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px', color: '#c0392b' }}>⚠️ 投稿の管理</h3>
                                <button
                                    onClick={handleDeletePost}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        background: '#fff0f0',
                                        color: '#c0392b',
                                        border: '1px solid #e74c3c',
                                        borderRadius: '6px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        fontSize: '13px'
                                    }}
                                >
                                    この投稿を削除する
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
