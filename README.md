# みんなのマチレポ - 開発者向けドキュメント (引き継ぎ資料)

市民参加型の地域安全マップアプリケーションです。

Next.js (App Router), Supabase, Leaflet を使用して開発されています。

## 1. プロジェクト概要

市民が生活の中で感じる「潜在的な危険（暗い、見通しが悪い等）」を地図上に投稿・共有・可視化する Web アプリケーション。

一般ユーザーによる情報収集機能と、行政・管理者による分析機能（ヒートマップ、ステータス管理等）を併せ持ちます。

本システムは、**SEO（検索エンジン最適化）** を考慮した静的生成（SSG）による地域別ランディングページ機能を有しています。

---

## 2. システム構成・技術スタック

### フロントエンド

-   **Framework:** Next.js 15+ (App Router)
-   **Deployment:** Static Export (`output: 'export'`)
-   **Language:** TypeScript
-   **UI Library:** React
-   **Map Engine:**
    -   `leaflet` / `react-leaflet` (地図描画)
    -   `react-leaflet-cluster` (マーカーのクラスタリング)
    -   `leaflet.heat` (ヒートマップ描画 / `src/components/HeatmapLayer.tsx`にてラップ)
-   **Image Processing:** `browser-image-compression` (クライアント側での画像圧縮・リサイズ)
-   **Notification:** `react-hot-toast` (トースト通知)
-   **Persistance:** `localStorage` (位置情報、管理画面のレイアウト設定等の保存)

### バックエンド / インフラ (Supabase)

-   **Database:** PostgreSQL
-   **Authentication:** Supabase Auth (Anonymous Login 対応)
-   **Storage:** Supabase Storage (画像保存用)
-   **API:** PostgREST (Supabase Client 経由でアクセス)
-   **Serverless Functions:** **Supabase Edge Functions (Deno)**
    -   静的ホスティング環境（X サーバー等）における管理者機能（ユーザー招待・権限付与など）のバックエンドロジックとして使用。

---

## 3. 重要: 自治体設定の管理 (`src/constants/cities.ts`)

本システムでは、対応する自治体の情報を 1 つの設定ファイル (src/constants/cities.ts) で一元管理しています。

このファイルを編集するだけで、以下の機能が自動的に連携して動作します。

1. **一般公開ページの生成**: `/[city_slug]` の静的パス生成
2. **投稿時のエリア判定**: 座標から自治体コードへの変換
3. **管理者ダッシュボード**: 地域別管理画面の生成

**設定例:**

TypeScript

`export const CITIES: Record<string, CityData> = {
    kawagoe: {
        id: '11201',      // 総務省自治体コード (DBフィルタリング用)
        name: '川越市',    // 表示名
        slug: 'kawagoe',  // URL用スラッグ (例: /kawagoe)
        lat: 35.9251,     // 初期表示の中心緯度
        lng: 139.4858,    // 初期表示の中心経度
        zoom: 13          // 初期ズームレベル
    },
    tokorozawa: {
        id: '11208',
        name: '所沢市',
        slug: 'tokorozawa',
        lat: 35.7994,
        lng: 139.4687,
        zoom: 13
    },
    // ... 他の自治体も同様に追加
};`

---

## 4. 機能要件と実装詳細

### A. 一般ユーザー画面 (`src/app/page.tsx`, `src/app/[cityCode]/page.tsx`)

### 1. 地図表示・地域別ランディングページ

`src/components/HazardMap.tsx` および `src/components/ClientMapPage.tsx` がメインコンポーネントです。

-   **全域マップ**:
    -   ルート URL (`/`) でアクセス。
    -   特定の自治体に限定せず、全エリアの情報を閲覧可能。
-   **地域別ページ (SSG)**:
    -   `/[city_slug]` (例: `/kawagoe`, `/tokorozawa`) でアクセス可能。
    -   `cities.ts` の定義に基づき、ビルド時に静的ページ (`generateStaticParams`) を生成します。
    -   アクセス時、その自治体の中心座標・ズームレベルで初期表示され、画面上部に「〇〇市の情報を表示しています」とアナウンスバーを表示します。
    -   **SEO 対策**: ページタイトルやメタ情報に地域名が含まれるよう設計されています。
-   **ベースマップ切り替え**:
    -   3 種類（標準 OSM, シンプル白地図, 航空写真）を切り替え可能。
-   **マーカー表示**:
    -   不安カテゴリ（暗い、見通しが悪い等）に応じてピンの色を変更。
    -   同感バッジ: 1 件以上の同感がある場合、ピン右上に件数を赤丸で表示。

### 2. 最新レポート一覧機能

地図上にオーバーレイする形で、直近の投稿リストを表示します。

-   **ハイブリッド取得アーキテクチャ**:
    -   **Server Side (Build Time)**: ビルド時にサーバーサイドで最新データを取得し、初期 HTML に埋め込みます。これにより、検索エンジンが投稿テキスト（「〇〇に『暗い』が登録」等）をインデックス可能にします。
    -   **Client Side (Run Time)**: ページ表示後、クライアントサイド (`useEffect`) で即座に Supabase から最新データを再取得します。これにより、ビルド後に投稿されたデータもリアルタイムでリストに反映されます。
-   **インタラクション**:
    -   リスト内の項目をクリックすると、地図がその投稿場所にズーム移動し、該当するピンをハイライトします。
    -   リストは開閉可能で、スマホ表示時には高さを自動調整します。

### 3. 投稿機能

-   **現在地取得**: ブラウザの Geolocation API を使用。
-   **住所自動取得**: OpenStreetMap Nominatim API を使用して逆ジオコーディングを行い、住所文字列と自治体コードを保存。
-   **重複投稿防止ロジック**:
    -   投稿地点から半径 50m 以内に、同一カテゴリの投稿がある場合、新規投稿をブロック。
    -   代わりに「同感」を促すモーダルを表示し、無駄なピンの乱立を防ぎます。
-   **画像アップロード**:
    -   `browser-image-compression` を使用。
    -   クライアント側で最大幅 1200px / 1MB 以下に圧縮してから Supabase Storage に送信するため、通信量とストレージ容量を節約します。

### 4. 同感（Empathy）機能

-   `src/components/EmpathyButton.tsx`
-   1 ユーザーにつき 1 投稿 1 回まで。
-   **Optimistic UI**: ボタン押下時、API レスポンスを待たずに即座に UI のカウントを増やし、快適な操作感を提供します。

### 5. マイページ

-   自身の投稿履歴および同感した投稿の一覧確認が可能。
-   自身の投稿に限り、削除操作が可能です。

---

### B. 管理者ダッシュボード (`src/app/dashboard/`)

管理者権限を持つユーザーのみアクセス可能な管理画面です。`src/components/AdminDashboard.tsx` に主要ロジックが集約されています。

### 1. ダッシュボード基本構成・ルーティング

-   **総合管理画面** (`/dashboard/page.tsx`):
    -   全自治体のデータを横断して確認・管理できます。
    -   **アクセス制限**: `super_admin` ロールを持つユーザーのみアクセス可能。
-   **自治体別管理画面** (`/dashboard/[cityCode]/page.tsx`):
    -   **URL パターン**: `/dashboard/kawagoe` (スラッグ) または `/dashboard/11201` (ID) の両方に対応。
    -   URL で指定された自治体のデータのみを自動的にフィルタリングして表示します。
    -   **アクセス制限**: `super_admin` または、その自治体担当の `city_manager` / `city_staff` のみアクセス可能。権限外のページへアクセスした場合は、自動的に自身の担当ページへリダイレクトされます。

### 2. UI レイアウト機能

-   **リサイズ可能なペイン**:
    -   地図エリアとリストエリアの境界をドラッグして高さ比率を調整可能。
    -   設定比率は `localStorage` に保存され、次回アクセス時に復元されます。
    -   プリセットボタン（小:25% / 中:50% / 大:75%）によるワンタッチ切り替えも実装。

### 3. 検索・絞り込み機能

サイドバーおよびリストヘッダーにて、多角的なデータ抽出が可能です。

-   **キーワード検索**: 住所、不安理由、ユーザータグを対象とした部分一致検索。
-   **写真フィルタ**: 「写真あり」の投稿のみを抽出。
-   **管理ステータス**: 「未対応」「対応中」などの管理タグによる絞り込み（OR 検索）。
-   **不安カテゴリ・詳細タグ**: カテゴリごとにアコーディオンで展開し、詳細なユーザータグ（例: 「街灯が少ない」）で絞り込みが可能。
-   **エリア絞り込み**: （総合管理画面の場合のみ）プルダウンで対象自治体を絞り込み。

### 4. 高度なリスト表示機能

-   **カラムカスタマイズ**:
    -   ID、住所、ユーザータグ、管理タグ、日時などの表示/非表示を個別に切り替え可能（ブラウザ保存）。
-   **ソート機能**: ヘッダー（ID, 不安, 住所, 同感, 日時）クリックによる昇順・降順の並び替え。
-   **ページネーション**: 1 ページあたりの表示件数を変更可能（ブラウザ保存）。
-   **操作アクション**: 地図移動、写真確認、詳細編集。

### 5. CSV 出力機能

-   指定した期間（開始日〜終了日）に投稿されたデータを CSV 形式でダウンロード可能。
-   日本語 Excel 対応（BOM 付き UTF-8）。

### 6. 対応状況管理 (AdminPostDetailModal)

-   **管理タグ**: 「対応中」「確認済」「道路課」などのステータスタグを付与。システム標準タグと自治体独自タグをサポート。
-   **メモ機能（チャット形式）**: 管理者間で共有する対応履歴コメント。URL 自動リンク対応。

### 7. 可視化モード

-   **通常表示**: ピン表示。
-   **ヒートマップ**: 投稿密度をサーモグラフィ状に可視化。

### 8. 権限管理・チームマネジメント (`src/app/dashboard/team/`)

役割（ロール）に基づいた階層的なアクセス管理機能です。

-   **役割定義**:
    -   👑 **Super Admin**: 全自治体の閲覧・編集、全自治体の代表者（Manager）任命権限。
    -   👤 **City Manager**: 担当自治体の閲覧・編集、同自治体の職員（Staff）追加・削除権限。
    -   🙂 **City Staff**: 担当自治体の閲覧・編集のみ。
-   **運用フロー**:
    1. Super Admin が各自治体の代表者 (Manager) のメールアドレスを指定して任命。
    2. 各自治体の Manager が、実務担当者 (Staff) のメールアドレスを指定してチームに追加。
-   **実装技術**:
    -   `admin_roles` テーブルによる権限管理。
    -   **PostgreSQL Database Functions (RPC)** を採用。`SECURITY DEFINER` オプション付きのデータベース関数 (`add_team_member_by_email`) を定義し、DB 内部で安全にメールアドレス検索と権限付与を実行します（Edge Functions は不使用）。

---

データベース設計 (Schema)

1. ユーザー投稿データ (hazard_posts)

2. 同感リアクション (hazard_empathies)

3. 管理者用タグマスタ (admin_tags)

4. 投稿-管理タグ紐付け (post_tags)

5. 管理者用メモ/対応履歴 (admin_memos)

6. ストレージ設定

## 5. データベース設計 (Schema)

### 1. ユーザー投稿データ (`hazard_posts`)

投稿の基本情報を管理します。

カラム名 型 説明 備考
id int8 PK
user_id uuid 投稿者 ID Supabase Auth の UID
lat float8 緯度
lng float8 経度
reason text 不安カテゴリ '暗い', '見通しが悪い' 等
tags text[] ユーザータグ 配列型
time_slot text[] 時間帯 配列型 ('morning', 'night' 等)
empathy_count int4 同感数 表示高速化のためのキャッシュ的な役割
image_url text 画像 URL Public URL
city_code text 自治体コード 重要: 地域別ページの抽出キー
address text 住所 管理者のみ閲覧推奨
created_at timestamptz 作成日時

### 2. 同感リアクション (`hazard_empathies`)

同感アクションの重複管理用。

カラム名 型 説明 備考
id int8 PK
post_id int8 FK hazard_posts.id
user_id uuid ユーザー ID
created_at timestamptz 作成日時 Unique Constraint: (post_id, user_id)

### 3. 管理者用タグマスタ (`admin_tags`)

管理画面で使用するステータスや部署タグの定義。

カラム名 型 説明 備考
id int8 PK
label text タグ名 "対応中", "道路課" 等
color text 色コード "#ff0000" 等
is_system boolean システム標準フラグ true の場合、削除不可
city_code text 自治体コード NULL なら全域共通、指定があればその自治体専用
created_at timestamptz 作成日時

### 4. 投稿-管理タグ紐付け (`post_tags`)

投稿と管理タグの中間テーブル（多対多）。

カラム名 型 説明 備考
id int8 PK
post_id int8 FK hazard_posts.id
tag_id int8 FK admin_tags.id
created_at timestamptz 付与日時

### 5. 管理者用メモ/対応履歴 (`admin_memos`)

投稿に対する管理者間のコメント履歴。

カラム名 型 説明 備考
id int8 PK
post_id int8 FK hazard_posts.id
user_id uuid 管理者 ID 記入者
content text メモ内容
created_at timestamptz 記入日時

### 6. 管理者権限テーブル (`admin_roles`)

ダッシュボードへのアクセス権限を管理します。Supabase Auth とは分離してアプリ固有の権限を定義。

| **カラム名** | **型**      | **説明**    | **備考**                                          |
| ------------ | ----------- | ----------- | ------------------------------------------------- |
| `id`         | int8        | PK          |                                                   |
| `user_id`    | uuid        | ユーザー ID | `auth.users.id` FK                                |
| `role`       | text        | 役割        | `'super_admin'`, `'city_manager'`, `'city_staff'` |
| `city_code`  | text        | 担当自治体  | `'11201'` 等。Super Admin は任意値                |
| `created_at` | timestamptz | 作成日時    | Unique Constraint: `(user_id, city_code)`         |

---

## 6. ストレージ設定 (Supabase Storage)

-   **Bucket Name:** `hazard-photos`
-   **Access:** Public

---

## 7. ディレクトリ構成

主要なファイル構成のみ抜粋します。

Plaintext

`src/
├── app/
│ ├── (user)/ # 一般ユーザー向けページ
│ ├── [cityCode]/ # ★ 地域別ランディングページ (SSG)
│ ├── dashboard/ # 管理者ダッシュボード
│ │ ├── [cityCode]/ # ★ 自治体別管理画面 (SSG)
│ │ ├── team/ # ★ チーム・権限管理画面 (SuperAdmin/Manager 用)
│ │ └── page.tsx # 総合管理ページ
│ ├── mypage/ # マイページ
│ └── ...
│
├── components/
│ ├── AdminDashboard.tsx # 管理画面コア
│ ├── ...
│
├── constants/
│ ├── cities.ts # ★ 自治体定義マスタ
│ └── ...
│
└── ...

supabase/
└── functions/
└── admin-actions/ # ★ 管理者機能用 Edge Function (Deno)
└── index.ts # ユーザー検索・権限付与ロジック`

---

## 8. ビルドとデプロイ手順

本プロジェクトは X サーバー等の静的ホスティング環境で動作させるため、`output: 'export'` モードを使用しています。

### フロントエンド (Next.js)

`./deploy.sh`

1. `npm run build` を実行。
2. `out` ディレクトリに出力されたファイルをサーバーへアップロード。

### バックエンド (Supabase Edge Functions)

管理者機能（チーム管理）のロジックを変更した場合は、Edge Function のデプロイが必要です。

Bash

`npx supabase functions deploy admin-actions --no-verify-jwt`

環境変数の設定:

Edge Function が動作するには、Supabase の Secrets に以下の環境変数が設定されている必要があります。

Bash

`npx supabase secrets set --env-file .env.local

# または

npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...`

### 注意事項

動的ルート（/[cityCode] 等）はビルド時に静的生成されます。`src/constants/cities.ts` を変更した際は必ず再ビルドを行ってください。
