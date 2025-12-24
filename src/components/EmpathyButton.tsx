'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

type Props = {
    postId: number;
    initialCount: number;
    postUserId: string; // 投稿者のID（自演防止用）
    // currentUserId は削除（内部で取得するため）
};

export default function EmpathyButton({ postId, initialCount, postUserId }: Props) {
    const [count, setCount] = useState(initialCount);
    const [hasEmpathized, setHasEmpathized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [myUserId, setMyUserId] = useState<string | null>(null);

    // マウント時に現在の状態を確認
    useEffect(() => {
        const checkStatus = async () => {
            // 1. まず現在のユーザーを取得（セッションがあれば）
            const {
                data: { session }
            } = await supabase.auth.getSession();
            const userId = session?.user?.id;

            if (userId) {
                setMyUserId(userId);
                // 2. 既に同感済みかチェック
                const { data } = await supabase.from('hazard_empathies').select('id').eq('post_id', postId).eq('user_id', userId).maybeSingle();

                if (data) setHasEmpathized(true);
            }
        };
        checkStatus();
    }, [postId]);

    const handleClick = async () => {
        // 自分の投稿チェック（IDがまだロードされてない場合は後続処理でも弾くが、念のためUI側でもチェック）
        if (myUserId && myUserId === postUserId) {
            toast('自分の投稿には同感できません', { icon: '🙅‍♂️' });
            return;
        }

        setIsLoading(true);

        try {
            // ---------------------------------------------------------
            // 1. ユーザーIDの確保
            // ---------------------------------------------------------
            let targetUserId = myUserId;

            if (!targetUserId) {
                // IDがない＝まだ匿名ログインが完了していない or 初回
                // その場でログインを試みる
                const { data, error } = await supabase.auth.signInAnonymously();
                if (error || !data.user) {
                    throw new Error('認証に失敗しました');
                }
                targetUserId = data.user.id;
                setMyUserId(targetUserId); // ステートも更新
            }

            // 念押し：自分の投稿ならここでストップ
            if (targetUserId === postUserId) {
                toast('自分の投稿には同感できません', { icon: '🙅‍♂️' });
                setIsLoading(false);
                return;
            }

            // ---------------------------------------------------------
            // 2. 同感データの登録
            // ---------------------------------------------------------
            const { error } = await supabase.from('hazard_empathies').insert([{ post_id: postId, user_id: targetUserId }]);

            if (error) {
                // エラーコード 23505 = 一意制約違反（すでに登録済み）
                if (error.code === '23505') {
                    setHasEmpathized(true);
                    toast('既に同感済みです');
                } else {
                    console.error(error);
                    toast.error('通信エラーが発生しました');
                }
            } else {
                // 成功！
                setCount((prev) => prev + 1);
                setHasEmpathized(true);
                toast('同感しました！', { icon: '✋' });
            }
        } catch (err) {
            console.error(err);
            toast.error('処理に失敗しました');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #eee' }}>
            <button
                onClick={handleClick}
                disabled={hasEmpathized || myUserId === postUserId || isLoading}
                style={{
                    background: 'none',
                    border: '1px solid #ddd',
                    borderRadius: '20px',
                    padding: '4px 12px',
                    fontSize: '12px',
                    color: hasEmpathized ? '#0070f3' : '#555',
                    backgroundColor: hasEmpathized ? '#e6f7ff' : 'white',
                    borderColor: hasEmpathized ? '#0070f3' : '#ddd',
                    cursor: hasEmpathized || myUserId === postUserId ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'all 0.2s'
                }}
            >
                <span>{hasEmpathized ? '✋ 同感済み' : '✋ 同感'}</span>
                <span style={{ fontWeight: 'bold' }}>{count}</span>
            </button>

            {/* 自分の投稿の場合の補足 */}
            {myUserId && myUserId === postUserId && <span style={{ fontSize: '10px', color: '#999', marginLeft: '8px' }}>※自分の投稿</span>}
        </div>
    );
}
