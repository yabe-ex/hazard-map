# みんなのハザードマップ - 開発者向けドキュメント (引き継ぎ資料)

## 1. プロジェクト概要

市民が生活の中で感じる「潜在的な危険（暗い、見通しが悪い等）」を地図上に投稿・共有・可視化する Web アプリケーション。
Next.js (App Router) と Supabase を基盤とし、地図描画には Leaflet を採用。
一般ユーザーによる情報収集機能と、行政・管理者による分析機能（ヒートマップ等）を併せ持つ。

---

## 2. システム構成・技術スタック

### フロントエンド

-   **Framework:** Next.js 14+ (App Router)
-   **Language:** TypeScript
-   **UI Library:** React
-   **Map Engine:**
    -   `leaflet` / `react-leaflet` (地図描画)
    -   `react-leaflet-cluster` (マーカーのクラスタリング)
    -   `leaflet.heat` (ヒートマップ描画 / `src/components/HeatmapLayer.tsx`にてラップ)
-   **Image Processing:** `browser-image-compression` (クライアント側での画像圧縮・リサイズ)
-   **Notification:** `react-hot-toast` (トースト通知)

### バックエンド / インフラ (Supabase)

-   **Database:** PostgreSQL
-   **Authentication:** Supabase Auth (Anonymous Login 対応)
-   **Storage:** Supabase Storage (画像保存用)
-   **API:** PostgREST (Supabase Client 経由でアクセス)

---

## 3. 機能要件と実装詳細

### A. 一般ユーザー画面 (`src/app/page.tsx`)

1.  **地図表示**
    -   `src/components/HazardMap.tsx` がメインコンポーネント。
    -   3 種類のベースマップ切り替え（標準 OSM, Positron, 航空写真）。
    -   **マーカー色分け:** 不安カテゴリ（暗い、見通しが悪い等）に応じてピンの色を変更。
    -   **同感バッジ:** 1 件以上の同感がある場合、ピン右上に件数を赤丸で表示。
2.  **投稿機能**
    -   **現在地取得:** ブラウザの Geolocation API を使用。
    -   **住所自動取得:** OpenStreetMap Nominatim API を使用して逆ジオコーディング。
    -   **重複投稿防止:** 投稿地点から半径 50m 以内に、同一カテゴリの投稿がある場合、新規投稿をブロックし「同感」を促すモーダルを表示。
    -   **画像アップロード:** `browser-image-compression` を使用し、最大幅 1200px / 1MB 以下に圧縮してから Storage に送信。
3.  **同感（Empathy）機能**
    -   `src/components/EmpathyButton.tsx`
    -   1 ユーザーにつき 1 投稿 1 回まで。ボタン押下時、即座に UI へ反映（Optimistic UI 的挙動）。

### B. 管理者ダッシュボード (`src/app/admin/page.tsx`)

1.  **データ閲覧・フィルタリング**
    -   **全件取得:** Supabase の API 制限（デフォルト 1000 件）を回避するため、`.range(0, 10000)` を指定して全データを取得。
    -   **フィルタ:** 自治体（`city_code`）および不安カテゴリによるクライアントサイドフィルタリング。
2.  **リスト表示（ページネーション）**
    -   地図上には全件表示するが、リスト表示（テーブル）はブラウザ負荷軽減のため **1 ページ 100 件** のページネーションを実装。
3.  **可視化モード（ヒートマップ）**
    -   通常ピン表示とヒートマップ表示を切り替え可能。
    -   **動的レンダリング:** ズームレベルに応じて「描画半径」と「ぼかし量」を自動計算し、拡大しても四角くならず、自然なグラデーションを維持するロジックを実装済み。
    -   **強度調整:** 管理画面 UI からヒートマップの基準半径（小・中・大）を変更可能。

---

## 4. データベース設計 (Schema)

### テーブル: `hazard_posts`

投稿データを管理する。

| カラム名        | 型          | 説明         | 備考                                 |
| :-------------- | :---------- | :----------- | :----------------------------------- |
| `id`            | int8        | PK           |                                      |
| `user_id`       | uuid        | 投稿者 ID    | Supabase Auth の UID                 |
| `lat`           | float8      | 緯度         |                                      |
| `lng`           | float8      | 経度         |                                      |
| `reason`        | text        | 不安カテゴリ | '暗い', '見通しが悪い' 等            |
| `tags`          | text[]      | 詳細タグ     | 配列型                               |
| `time_slot`     | text[]      | 時間帯       | 配列型 ('morning', 'night' 等)       |
| `empathy_count` | int4        | 同感数       | 表示高速化のためのキャッシュ的な役割 |
| `image_url`     | text        | 画像 URL     | Public URL                           |
| `city_code`     | text        | 自治体コード | フィルタリング用                     |
| `address`       | text        | 住所         | 管理者のみ閲覧推奨                   |
| `created_at`    | timestamptz | 作成日時     |                                      |

### テーブル: `hazard_empathies`

同感アクションの重複管理用。

| カラム名     | 型          | 説明        | 備考              |
| :----------- | :---------- | :---------- | :---------------- |
| `id`         | int8        | PK          |                   |
| `post_id`    | int8        | FK          | `hazard_posts.id` |
| `user_id`    | uuid        | ユーザー ID |                   |
| `created_at` | timestamptz | 作成日時    |                   |

> **Unique Constraint:** `(post_id, user_id)` により、同一ユーザーの重複いいねを DB レベルで防止。

---

## 5. ストレージ設定 (Supabase Storage)

-   **Bucket Name:** `hazard-photos`
-   **Access:** Public
-   **Policy:**
    -   SELECT: 全員許可
    -   INSERT: 認証済みユーザーのみ許可
    -   UPDATE/DELETE: 所有者のみ許可

---

## 6. ディレクトリ構成

```text
src/
├── app/
│   ├── page.tsx               # [一般] メイン画面（地図・投稿・重複チェック）
│   ├── layout.tsx             # 全体レイアウト（Toaster設置）
│   └── admin/
│       └── page.tsx           # [管理] ダッシュボード（ヒートマップ・リスト・ページネーション）
│
├── components/
│   ├── HazardMap.tsx          # 地図コンポーネント本体（ピン/クラスター/ヒートマップ切替）
│   ├── HeatmapLayer.tsx       # ヒートマップ描画ロジック（leaflet.heatラッパー）
│   ├── EmpathyButton.tsx      # 同感ボタンコンポーネント
│   └── AuthModal.tsx          # ログインモーダル
│
├── constants/
│   ├── cities.ts              # 自治体定義（座標・初期ズーム・ID）
│   └── reasons.ts             # カテゴリ・タグ定義マスタ
│
└── lib/
    └── supabaseClient.ts      # Supabaseクライアント初期化
```
