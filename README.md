# みんなのマチレポ - 開発者向けドキュメント (引き継ぎ資料)

市民参加型の地域安全マップアプリケーションです。
Next.js (App Router), Supabase, Leaflet を使用して開発されています。

## 1. プロジェクト概要

市民が生活の中で感じる「潜在的な危険（暗い、見通しが悪い等）」を地図上に投稿・共有・可視化する Web アプリケーション。
一般ユーザーによる情報収集機能と、行政・管理者による分析機能（ヒートマップ、ステータス管理等）を併せ持ちます。

---

## 2. システム構成・技術スタック

### フロントエンド

-   **Framework:** Next.js 15 (App Router)
-   **Language:** TypeScript
-   **UI Library:** React
-   **Map Engine:**
    -   `leaflet` / `react-leaflet` (地図描画)
    -   `react-leaflet-cluster` (マーカーのクラスタリング)
    -   `leaflet.heat` (ヒートマップ描画 / `src/components/HeatmapLayer.tsx`にてラップ)
-   **Image Processing:** `browser-image-compression` (クライアント側での画像圧縮・リサイズ)
-   **Notification:** `react-hot-toast` (トースト通知)
-   **Persistance:** `localStorage` (管理画面のレイアウト設定や表示オプションの保存)

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
    -   1 ユーザーにつき 1 投稿 1 回まで。ボタン押下時、即座に UI へ反映（Optimistic UI）。
4.  **マイページ**
    -   自身の投稿履歴および同感した投稿の一覧確認・削除が可能。

### B. 管理者ダッシュボード (`src/app/dashboard/`)

管理者権限を持つユーザーのみアクセス可能な管理画面です。`src/components/AdminDashboard.tsx` に主要ロジックが集約されています。

#### 1. ダッシュボード基本構成

-   **総合管理画面** (`/dashboard/page.tsx`): 全自治体のデータを横断して確認・管理。
-   **自治体別管理画面** (`/dashboard/[cityCode]/page.tsx`): URL パラメータで自治体を固定し、その地域専用の管理画面として動作。
-   **リサイズ可能なレイアウト**: 地図エリアとリストエリアの境界をドラッグして高さ比率を調整可能。設定はブラウザに保存されます。
    -   プリセットボタン（小:25% / 中:50% / 大:75%）によるワンタッチ切り替えも実装。

#### 2. 検索・絞り込み機能

サイドバーおよびリストヘッダーにて、多角的なデータ抽出が可能です。

-   **キーワード検索**: 住所、不安理由、ユーザータグを対象とした部分一致検索。
-   **写真フィルタ**: 「写真あり」の投稿のみを抽出。
-   **管理ステータス**: 「未対応」「対応中」などの管理タグによる絞り込み（OR 検索）。
-   **不安カテゴリ・詳細タグ**: カテゴリごとにアコーディオンで展開し、詳細なユーザータグ（例: 「街灯が少ない」）で絞り込みが可能。

#### 3. 高度なリスト表示機能

-   **カラムカスタマイズ**: ID、住所、ユーザータグ、管理タグ、日時などの表示/非表示を個別に切り替え可能（設定はブラウザ保存）。
-   **ソート機能**: ヘッダー（ID, 不安, 住所, 同感, 日時）クリックによる昇順・降順の並び替え。
-   **ページネーション**: 1 ページあたりの表示件数を変更可能（設定はブラウザ保存）。
-   **操作アクション**:
    -   🗺️ **地図移動**: 対象のピンへズームジャンプ。
    -   📷 **写真確認**: 投稿写真をモーダルで拡大表示。
    -   🛠 **管理詳細**: 詳細モーダルを開き、タグ付けやメモ入力を行う。

#### 4. CSV 出力機能

-   指定した期間（開始日〜終了日）に投稿されたデータを CSV 形式でダウンロード可能。
-   出力項目: ID, 日時, カテゴリ, 住所, 詳細タグ, 管理ステータス, 同感数, 緯度経度, 画像 URL。
-   日本語 Excel 対応（BOM 付き UTF-8）。

#### 5. 対応状況管理 (AdminPostDetailModal)

-   **管理タグ**: 「対応中」「確認済」「道路課」などのステータスタグを付与。
    -   システム標準タグ（削除不可）と、自治体独自タグ（作成可能）の 2 種類をサポート。
-   **メモ機能（チャット形式）**:
    -   管理者間で共有する対応履歴コメント。
    -   **編集・削除**: 投稿済みのメモを個別に修正・削除可能。
    -   **URL 自動リンク**: メモ内の URL は自動的にクリッカブルリンク（別タブ）として表示。
    -   入力エリアは複数行対応で、送信ボタン押下時のみ保存される安全仕様。

#### 6. 可視化モード

-   **通常表示**: ユーザー画面と同じピン色・アイコンで表示。
-   **ヒートマップ**: 投稿密度をサーモグラフィ状に可視化。半径（小・中・大）の調整が可能。

---

## 4. データベース設計 (Schema)

### 1. ユーザー投稿データ (`hazard_posts`)

投稿の基本情報を管理します。

| カラム名        | 型          | 説明         | 備考                                 |
| :-------------- | :---------- | :----------- | :----------------------------------- |
| `id`            | int8        | PK           |                                      |
| `user_id`       | uuid        | 投稿者 ID    | Supabase Auth の UID                 |
| `lat`           | float8      | 緯度         |                                      |
| `lng`           | float8      | 経度         |                                      |
| `reason`        | text        | 不安カテゴリ | '暗い', '見通しが悪い' 等            |
| `tags`          | text[]      | ユーザータグ | 配列型                               |
| `time_slot`     | text[]      | 時間帯       | 配列型 ('morning', 'night' 等)       |
| `empathy_count` | int4        | 同感数       | 表示高速化のためのキャッシュ的な役割 |
| `image_url`     | text        | 画像 URL     | Public URL                           |
| `city_code`     | text        | 自治体コード | フィルタリング用 (例: 11201)         |
| `address`       | text        | 住所         | 管理者のみ閲覧推奨                   |
| `created_at`    | timestamptz | 作成日時     |                                      |

### 2. 同感リアクション (`hazard_empathies`)

同感アクションの重複管理用。

| カラム名     | 型          | 説明        | 備考                                    |
| :----------- | :---------- | :---------- | :-------------------------------------- |
| `id`         | int8        | PK          |                                         |
| `post_id`    | int8        | FK          | `hazard_posts.id`                       |
| `user_id`    | uuid        | ユーザー ID |                                         |
| `created_at` | timestamptz | 作成日時    | Unique Constraint: `(post_id, user_id)` |

### 3. 管理者用タグマスタ (`admin_tags`)

管理画面で使用するステータスや部署タグの定義。

| カラム名     | 型          | 説明               | 備考                                          |
| :----------- | :---------- | :----------------- | :-------------------------------------------- |
| `id`         | int8        | PK                 |                                               |
| `label`      | text        | タグ名             | "対応中", "道路課" 等                         |
| `color`      | text        | 色コード           | "#ff0000" 等                                  |
| `is_system`  | boolean     | システム標準フラグ | true の場合、削除不可                         |
| `city_code`  | text        | 自治体コード       | NULL なら全域共通、指定があればその自治体専用 |
| `created_at` | timestamptz | 作成日時           |                                               |

### 4. 投稿-管理タグ紐付け (`post_tags`)

投稿と管理タグの中間テーブル（多対多）。

| カラム名     | 型          | 説明     | 備考              |
| :----------- | :---------- | :------- | :---------------- |
| `id`         | int8        | PK       |                   |
| `post_id`    | int8        | FK       | `hazard_posts.id` |
| `tag_id`     | int8        | FK       | `admin_tags.id`   |
| `created_at` | timestamptz | 付与日時 |                   |

### 5. 管理者用メモ/対応履歴 (`admin_memos`)

投稿に対する管理者間のコメント履歴。

| カラム名     | 型          | 説明      | 備考              |
| :----------- | :---------- | :-------- | :---------------- |
| `id`         | int8        | PK        |                   |
| `post_id`    | int8        | FK        | `hazard_posts.id` |
| `user_id`    | uuid        | 管理者 ID | 記入者            |
| `content`    | text        | メモ内容  |                   |
| `created_at` | timestamptz | 記入日時  |                   |

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
│   ├── (user)/           # 一般ユーザー向けページ
│   │    └── page.tsx     # メイン地図画面
│   ├── dashboard/        # 管理者ダッシュボード
│   │    ├── [cityCode]/  # 自治体別ページ (例: /dashboard/11201)
│   │    └── page.tsx     # 総合管理ページ
│   ├── mypage/           # マイページ
│   ├── api/              # API Routes
│   └── layout.tsx        # 全体レイアウト
│
├── components/
│   ├── AdminDashboard.tsx       # 管理画面の共通ロジック・UI・リスト表示
│   ├── AdminPostDetailModal.tsx # 管理詳細モーダル (タグ・メモ操作)
│   ├── HazardMap.tsx            # 地図コンポーネント (ピン/クラスター/ヒートマップ)
│   ├── HeatmapLayer.tsx         # ヒートマップ描画ラッパー
│   ├── EmpathyButton.tsx        # 同感ボタン
│   └── AuthModal.tsx            # ログインモーダル
│
├── constants/
│   ├── cities.ts              # 自治体定義（座標・初期ズーム・ID）
│   └── reasons.ts             # 不安カテゴリ・タグ定義マスタ
│
├── lib/
│   └── supabaseClient.ts      # Supabaseクライアント初期化
│
└── types/
    └── admin.ts               # 管理機能用型定義
```
