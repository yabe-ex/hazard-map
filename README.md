# データベース設計書 (Supabase / PostgreSQL)

## 1. ER 図・テーブル構成

プロジェクトは主に 2 つのテーブルと 1 つのストレージバケットで構成されています。

### 📊 テーブル: `hazard_posts`

投稿データを管理するメインテーブルです。

| カラム名        | データ型      | 制約 / デフォルト  | 説明                                  |
| :-------------- | :------------ | :----------------- | :------------------------------------ |
| `id`            | `int8`        | PK, Auto Increment | 投稿 ID                               |
| `user_id`       | `uuid`        | Not Null           | 投稿者の UID（Supabase Auth）         |
| `lat`           | `float8`      | Not Null           | 緯度                                  |
| `lng`           | `float8`      | Not Null           | 経度                                  |
| `reason`        | `text`        | Not Null           | 不安カテゴリ（暗い、見通しが悪い等）  |
| `tags`          | `text[]`      | Nullable           | 詳細タグの配列                        |
| `time_slot`     | `text[]`      | Nullable           | 時間帯タグの配列（morning, night 等） |
| `empathy_count` | `int4`        | Default: 0         | 同感数の合計（表示用キャッシュ）      |
| `image_url`     | `text`        | Nullable           | 添付画像の公開 URL                    |
| `city_code`     | `text`        | Nullable           | 自治体コード（フィルタリング用）      |
| `address`       | `text`        | Nullable           | 逆ジオコーディングで取得した住所      |
| `created_at`    | `timestamptz` | Default: now()     | 作成日時                              |

> **Note:** `empathy_count` は `hazard_empathies` テーブルへの INSERT トリガー、またはアプリケーションロジックによって更新されます。

### 🤝 テーブル: `hazard_empathies`

「同感（いいね）」アクションを管理し、重複投票を防止するためのテーブルです。

| カラム名     | データ型      | 制約 / デフォルト      | 説明                   |
| :----------- | :------------ | :--------------------- | :--------------------- |
| `id`         | `int8`        | PK, Auto Increment     | ID                     |
| `post_id`    | `int8`        | FK (`hazard_posts.id`) | 対象の投稿 ID          |
| `user_id`    | `uuid`        | Not Null               | 同感したユーザーの UID |
| `created_at` | `timestamptz` | Default: now()         | 作成日時               |

> **Unique Index:** `(post_id, user_id)`
> 同一ユーザーが同じ投稿に対して複数回「同感」できないように、複合ユニーク制約を設定しています。

---

## 2. ストレージ (Supabase Storage)

### バケット名: `hazard-photos`

ユーザーがアップロードした現場写真を保存します。

-   **Public Access:** Enabled
-   **ファイルサイズ制限:** クライアント側で 1MB 以下に圧縮してアップロード
-   **パス構造:** ルート直下に一意のファイル名で保存（ディレクトリ分けなし）

---

## 3. セキュリティ設定 (RLS & API)

### API 設定 (Global Limits)

大量のハザードマップデータを一度に取得するため、デフォルトの取得制限を変更しています。

-   **Max Rows:** `10000` (またはそれ以上)
    -   _Default:_ 1000
    -   _Reason:_ 管理画面等で全件データを可視化するため。

### RLS (Row Level Security) ポリシー方針

データの閲覧・追加に関する権限設定の指針です。

1.  **`hazard_posts`**

    -   **SELECT:** 全員許可（Anon 含む）。ただし、アプリケーション側で「住所」や「画像」の表示は投稿者本人および管理者に限定する制御を行っている。
    -   **INSERT:** 認証済みユーザーのみ許可（匿名ログイン含む）。
    -   **UPDATE/DELETE:** 投稿者本人のみ、または管理者のみ許可。

2.  **`hazard_empathies`**
    -   **SELECT:** 全員許可。
    -   **INSERT:** 認証済みユーザーのみ許可。
        -   自分の投稿 (`hazard_posts.user_id` が自分) には INSERT できない制御をアプリ側で実装済み。

---

## 4. 定数データの定義

アプリケーションコード内で管理している静的データ定義です。

### 不安カテゴリ (`reason`)

DB には以下の文字列が保存されます。

-   `暗い`
-   `見通しが悪い`
-   `人通りが少ない`
-   `歩道が狭い`

### 時間帯 (`time_slot`)

-   `morning` (朝)
-   `day` (昼)
-   `evening` (夕方)
-   `night` (夜)

### 自治体データ (`city_code`)

現在は埼玉県の一部に対応。

-   `11201`: 川越市
-   `11208`: 所沢市
-   `11215`: 狭山市
-   `11245`: ふじみ野市
