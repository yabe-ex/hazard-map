'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import toast from 'react-hot-toast';

type Props = {
    postId: number;
    initialCount: number;
    postUserId: string;
    onEmpathy?: (newCount: number) => void;
};

export default function EmpathyButton({ postId, initialCount, postUserId, onEmpathy }: Props) {
    const [count, setCount] = useState(initialCount);
    const [hasEmpathized, setHasEmpathized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [myUserId, setMyUserId] = useState<string | null>(null);

    // ▼▼▼ 追加: 親データ(initialCount)が更新されたら、表示(count)も同期する ▼▼▼
    useEffect(() => {
        setCount(initialCount);
    }, [initialCount]);
    // ▲▲▲ 追加ここまで ▲▲▲

    useEffect(() => {
        const checkStatus = async () => {
            const {
                data: { session }
            } = await supabase.auth.getSession();
            const userId = session?.user?.id;

            if (userId) {
                setMyUserId(userId);
                const { data } = await supabase.from('hazard_empathies').select('id').eq('post_id', postId).eq('user_id', userId).maybeSingle();

                if (data) setHasEmpathized(true);
            }
        };
        checkStatus();
    }, [postId]);

    const handleClick = async () => {
        if (myUserId && myUserId === postUserId) {
            toast('自分の投稿には同感できません', { icon: '🙅‍♂️' });
            return;
        }

        setIsLoading(true);

        try {
            let targetUserId = myUserId;

            if (!targetUserId) {
                const { data, error } = await supabase.auth.signInAnonymously();
                if (error || !data.user) {
                    throw new Error('認証に失敗しました');
                }
                targetUserId = data.user.id;
                setMyUserId(targetUserId);
            }

            if (targetUserId === postUserId) {
                toast('自分の投稿には同感できません', { icon: '🙅‍♂️' });
                setIsLoading(false);
                return;
            }

            const { error } = await supabase.from('hazard_empathies').insert([{ post_id: postId, user_id: targetUserId }]);

            if (error) {
                if (error.code === '23505') {
                    setHasEmpathized(true);
                    toast('既に同感済みです');
                } else {
                    console.error(error);
                    toast.error('通信エラーが発生しました');
                }
            } else {
                const newCount = count + 1;
                setCount(newCount);
                if (onEmpathy) {
                    onEmpathy(newCount);
                }
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
                {/* もし数字を消したい場合は、下の行を削除すればOKです */}
                <span style={{ fontWeight: 'bold' }}>{count}</span>
            </button>

            {myUserId && myUserId === postUserId && <span style={{ fontSize: '10px', color: '#999', marginLeft: '8px' }}>※自分の投稿</span>}
        </div>
    );
}
