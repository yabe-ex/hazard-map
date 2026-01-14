# みんなのマチレポ - 開発者向けドキュメント (引き継ぎ資料)

市民参加型の地域安全マップアプリケーションです。
Next.js (App Router), Supabase, Leaflet を使用して開発されています。

## 1. プロジェクト概要

市民が生活の中で感じる「潜在的な危険（暗い、見通しが悪い等）」を地図上に投稿・共有・可視化する Web アプリケーション。
一般ユーザーによる情報収集機能と、行政・管理者による分析機能（ヒートマップ、ステータス管理等）を併せ持ちます。

本システムは、当初は静的生成（SSG）で設計されましたが、機能拡張（APIルート、SSR）に伴い、現在は **Node.js サーバー (v24)** として運用されています。

---

## 2. システム構成・技術スタック

### フロントエンド

-   **Framework:** Next.js 15+ (App Router)
-   **Deployment:** Node.js Server (`npm start` via PM2)
-   **Language:** TypeScript
-   **UI Library:** React, Vanilla CSS (Modules)
-   **Map Engine:**
    -   `leaflet` / `react-leaflet` (地図描画)
    -   `react-leaflet-cluster` (マーカーのクラスタリング)
    -   `leaflet.heat` (ヒートマップ描画 / `src/components/HeatmapLayer.tsx`にてラップ)
-   **Image Processing:**
    -   `browser-image-compression` (クライアント側での画像圧縮・リサイズ)
    -   `heic2any` (iPhone写真のJPEG変換・アップロード対応)
    -   `exif-js` (撮影位置情報の抽出)
-   **Notification:** `react-hot-toast` (トースト通知)
-   **Persistance:** `localStorage` (位置情報、管理画面のレイアウト設定等の保存)

### バックエンド / インフラ (Supabase)

-   **Database:** PostgreSQL (Supabase)
-   **Authentication:** Supabase Auth (Anonymous Login 対応)
-   **Storage:** Supabase Storage (画像保存用 `hazard-photos`)
-   **API:** PostgREST (Supabase Client 経由でアクセス)
-   **Backend Logic:** **Database Functions (RPC)**
    -   管理者機能（チームメンバー追加、メール重複チェック等）は、セキュリティ性の高い `SECURITY DEFINER` 関数のRPCとして実装されています。
    -   Edge Functionsは現在使用していませんが、将来的な拡張ポイントとして予約されています。

---

## 3. 重要: 自治体設定の管理 (`cities` テーブル)

初期開発では `src/constants/cities.ts` で管理していましたが、現在は **データベース (`cities` テーブル)** がマスターデータとなっています。
これにより、アプリケーションの再デプロイなしで新規自治体の追加が可能になっています。

**主要な連携機能:**
1. **一般公開ページの生成**: `/[slug]` (例: `/kawagoe`) アクセス時にDBから情報を取得し、動的にページをレンダリングします。
2. **投稿時のエリア判定**: 投稿された緯度経度から、DB上の自治体ID (`city_code`) を自動判定・付与します。
3. **管理者ダッシュボード**: DBに登録された自治体が、Super Adminの管理画面リストに自動的に反映されます。
4. **親子関係**: 政令指定都市（親）と行政区（子）の関係もDBカラム (`parent_city_id`) で管理されます。

---

## 4. 機能要件と実装詳細

### A. 一般ユーザー画面 (`src/app/page.tsx`, `src/app/[cityCode]/page.tsx`)

### 1. 地図表示・地域別ランディングページ

`src/components/HazardMap.tsx` および `src/components/ClientMapPage.tsx` がメインコンポーネントです。

-   **全域マップ**:
    -   ルート URL (`/`) でアクセス。特定の自治体に限定せず、全エリアの情報を閲覧可能。
-   **地域別ページ**:
    -   `/[city_slug]` (例: `/kawagoe`, `/tokorozawa`) でアクセス可能。
    -   アクセス時、その自治体の中心座標・ズームレベルで初期表示され、画面上部に「〇〇市の情報を表示しています」とアナウンスバーを表示（現在はデザイン調整によりバー自体は削除、ヘッダーに統合）。
-   **ハイブリッドGeoJSON読み込み**:
    -   自治体境界データは `public/geojson/{prefCode}/{cityCode}.json` (ローカルファイル) を優先的に読み込みます。
    -   ローカルにない場合のみ、外部API等へのフォールバックを想定した構造になっています。
-   **マーカー表示**:
    -   不安カテゴリ（暗い、見通しが悪い等）に応じてピンの色を変更。
    -   **解決済みピン**: 問題が解消された投稿は、緑色のチェックマーク付きピンに変更されます。

### 2. 最新レポート一覧機能

地図上にオーバーレイする形で、直近の投稿リストを表示します。

-   **ハイブリッド取得アーキテクチャ**:
    -   **Server Side**: ページアクセス時 (`src/app/page.tsx`) にサーバーサイドで最新データを取得し、初期プロパティとして渡します。これによりSEO（検索エンジンインデックス）を強化します。
    -   **Client Side**: ページ表示後、`useEffect` で即座に Supabase から最新データを再取得します。これにより、ユーザー滞在中に投稿されたデータもリアルタイムに近い形で反映されます。

### 3. 投稿機能

-   **現在地取得**: ブラウザの Geolocation API を使用。
-   **住所自動取得**: Nominatim API (OSM) を使用して逆ジオコーディングを行い、住所文字列と自治体コードを保存。
-   **重複投稿防止ロジック**:
    -   投稿地点から半径 50m 以内に、同一カテゴリの投稿がある場合、新規投稿をブロック。
    -   代わりに「同感」を促すモーダルを表示し、無駄なピンの乱立を防ぎます。
-   **画像アップロード & 高度な処理**:
    -   **HEIC変換**: `heic2any` を使用し、iPhone写真 (.heic) を自動的にJPEGに変換。
    -   **画像圧縮**: `browser-image-compression` を使用し、最大幅1200px / 1MB以下に圧縮してアップロード。
    -   **EXIF位置情報活用**: `exif-js` を使用して撮影時の位置情報を取得。現在地（GPS）と撮影地（EXIF）の距離を計算し、乖離が大きい（500m以上など）場合は警告を表示する「位置情報信頼性チェック」機能を実装。

### 4. 同感（Empathy）機能 & 解決済みステータス

-   **同感**: `src/components/EmpathyButton.tsx`。1ユーザー1投稿につき1回まで。Optimistic UIにより即座にカウントアップします。
-   **解決済み (Resolved)**:
    -   投稿者本人または管理者（City Staff以上）が、投稿詳細モーダルから「解決済みにする」を実行可能。
    -   解決済みになると、ピンのデザインが変わり、一覧でも✔️マークが表示されます。

### 5. ゲーミフィケーション (MyPage)

-   **貢献スコア**:
    -   投稿: +30pt
    -   同感承認（一定数以上）: +50pt
    -   解決済み: 別途ボーナス
    -   位置情報の正確な写真付き投稿: ボーナス付与
-   **ダッシュボード**: マイページにて現在のランクと獲得ポイントを確認可能。

---

### B. 管理者ダッシュボード (`src/app/dashboard/`)

管理者権限を持つユーザーのみアクセス可能な管理画面です。`src/components/AdminDashboard.tsx` に主要ロジックが集約されています。

### 1. ダッシュボード基本構成・ルーティング

-   **総合管理画面** (`/dashboard/page.tsx`): 全自治体を横断管理（Super Admin用）。
-   **自治体別管理画面** (`/dashboard/[cityCode]/page.tsx`):
    -   URLで指定された自治体のデータのみをフィルタリング表示。
    -   **アクセス制限**: 担当の `city_manager` / `city_staff` のみアクセス可能（DB上の `admin_roles` テーブルで制御）。

### 2. UI レイアウト機能

-   **リサイズ可能なペイン**: 地図エリアとリストエリアの比率をドラッグ調整可能（`localStorage` 保存）。
-   **公開マップ連携**: 画面右上のアイコンから、現在表示中の自治体の「一般公開用ページ」へ直接遷移できます。

### 3. 検索・絞り込み機能

-   **キーワード検索**: 住所、不安理由、ユーザータグを対象とした部分一致検索。
-   **写真フィルター**: 「写真あり」のみ抽出。さらに「撮影距離（EXIF乖離）」による色分け表示（赤: 遠い/不明, 緑: 正確）が可能。
-   **詳細タグ絞り込み**: カテゴリごとにアコーディオン展開し、詳細タグ（例: 「街灯が少ない」）で絞り込み。

### 4. 高度なリスト表示機能

-   **ユーザー一覧機能**: 投稿者ごとの投稿数や信頼度を確認できるユーザーリストタブを実装。
-   **ソート機能**: 各カラムヘッダーによる昇順・降順並び替え。
-   **CSV出力**: 期間指定（BOM付きUTF-8）ダウンロード対応。

### 5. 権限管理・チームマネジメント (`src/app/dashboard/team/`)

役割（ロール）に基づいた階層的なアクセス管理機能です。

-   **役割定義**:
    -   👑 **Super Admin**: 全権限。
    -   👤 **City Manager**: 担当自治体の閲覧・編集、メンバー追加権限。
    -   🙂 **City Staff**: 担当自治体の閲覧・編集のみ。
-   **実装技術**:
    -   `admin_roles` テーブルによる管理。
    -   **RPC (`add_team_member_by_email`)**: メールアドレスを入力するだけで、既存の `auth.users` IDを検索し、安全に権限を付与するロジックをDB側で実装済み。

---

## 5. データベース設計 (Schema)

### 1. `cities` (自治体マスタ)

初期の`constants/cities.ts`を置き換えるマスターテーブルです。

| カラム名 | 型 | 説明 | 備考 |
| --- | --- | --- | --- |
| `id` | text | 全国地方公共団体コード (例: 11201) | PK |
| `name` | text | 自治体名 | |
| `slug` | text | URLスラッグ (例: kawagoe) | Unique |
| `prefecture_code` | text | 都道府県コード | |
| `lat` | float8 | 中心緯度 | |
| `lng` | float8 | 中心経度 | |
| `zoom` | int4 | デフォルトズーム | |
| `parent_city_id` | text | 親自治体ID (例: さいたま市のID) | 政令指定都市の区の場合に使用 |
| `is_designated` | bool | 政令指定都市フラグ | 親都市はtrue |

### 2. `hazard_posts` (投稿データ)

メインの投稿コンテンツを管理します。

| カラム名 | 型 | 説明 | 備考 |
| --- | --- | --- | --- |
| `id` | int8 | 投稿ID | PK, Auto Increment |
| `user_id` | uuid | 投稿者ID | FK: auth.users |
| `reason` | text | 不安カテゴリ | '暗い', '見通しが悪い' 等 |
| `image_url` | text | 写真画像のPublic URL | |
| `city_code` | text | 対象自治体コード | FK: cities.id |
| `lat` | float8 | 緯度 | |
| `lng` | float8 | 経度 | |
| `tags` | text[] | ユーザー入力タグ | |
| `is_resolved` | bool | 解決済みステータス | Phase 2追加 |
| `resolved_at` | timestamptz | 解決日時 | Phase 2追加 |
| `photo_taken_at` | int4 | 撮影地点と投稿地点の距離(m) | EXIF解析結果 |
| `is_location_verified` | bool | 位置情報信頼性フラグ | photo_taken_at < 500m 等で判定 |

### 3. `admin_roles` (管理者権限)

Supabase Authとは独立して、アプリケーション固有の管理者権限を管理します。

| カラム名 | 型 | 説明 | 備考 |
| --- | --- | --- | --- |
| `id` | int8 | ID | PK |
| `user_id` | uuid | 対象ユーザーID | FK: auth.users |
| `role` | text | 役割 | 'super_admin', 'city_manager', 'city_staff' |
| `city_code` | text | 担当自治体 | NULLの場合は全権限(Super Admin向け) |
| `created_at` | timestamptz | 付与日時 | |

### 4. `admin_tags` (管理用タグマスタ)

管理画面で使用するステータスや部署タグの定義。

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| `id` | int8 | PK |
| `label` | text | タグ名 ("対応中", "道路課" 等) |
| `color` | text | 色コード |
| `is_system` | bool | システム標準フラグ |

### 5. `post_tags` (投稿-管理タグ紐付け)

投稿と管理タグの中間テーブル。

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| `post_id` | int8 | FK: hazard_posts.id |
| `tag_id` | int8 | FK: admin_tags.id |

### 6. `admin_memos` (対応履歴メモ)

投稿に対する管理者間のコメント履歴。

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| `post_id` | int8 | FK: hazard_posts.id |
| `user_id` | uuid | 記入者ID |
| `content` | text | メモ内容 |

---

## 6. デプロイ・運用手順 (Xserver / Node.js)

本環境は **Node.js (v24.12.0) + PM2** で動作しています。

### ディレクトリ構成 (サーバー)
- `~/hazard-map-src/` : ソースコード (Gitリポジトリ)
- `~/public_html/` : 公開ディレクトリ (**`.htaccess` のみ配置**)

### デプロイコマンド
プロジェクトルートの `deploy.sh` を使用するか、以下の手順を実行します。

```bash
# 1. コード更新 & ビルド
git pull origin main
npm install
npm run build

# 2. プロセスリロード (PM2)
pm2 reload hazard-map
```

### .htaccess設定 (リバースプロキシ)
ApacheへのリクエストをローカルのNode.jsサーバー (`http://127.0.0.1:3000`) へ転送しています。
静的ファイルのエクスポート (`output: export`) は行っていません。

---
(C) 2026 Machi-Repo Project
