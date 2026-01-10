// 管理機能に関連する型定義

export type AdminTag = {
    id: number;
    label: string;
    color: string;
    is_system: boolean;
    city_code: string | null;
    created_at?: string;
};

export type AdminMemo = {
    id: number;
    post_id: number;
    user_id: string;
    content: string;
    created_at: string;
    // UI表示用に拡張（ユーザー情報などが必要な場合に使用）
    user_email?: string;
};

// 投稿に紐付いたタグ情報（中間テーブル取得用）
export type PostTagRelation = {
    post_id: number;
    tag_id: number;
    created_at: string; // 付与日時
    admin_tags: AdminTag; // Joinして取得されるタグ本体
};
