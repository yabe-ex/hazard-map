# プロジェクト引き継ぎ資料 (2025-01-11版)

本資料は、直近の開発フェーズで実装された機能、データベース定義、およびデプロイ時の注意点をまとめたものです。

## 1. システム概要
本プロジェクトは、全国の自治体を対象としたハザードマップ投稿共有アプリケーションです。
Next.jsによる静的サイト生成(SSG)と、Supabase(PostgreSQL)をバックエンドとして採用しています。

## 2. 実装された主要機能
### 一般ユーザー向け
- **自治体別マップページ (`/[slug]`)**:
  - URLスラッグ（例: `/saitama-shi`）による動的な自治体ページの生成。
  - 投稿数ランキングウィジェットの表示（トップ画面/左上）。
  - 自治体境界データのローカルGeoJSON読み込み（1741自治体対応）。

### 管理者向け
- **管理ダッシュボード (`/dashboard/[cityCode]`)**:
  - 自治体ごとの投稿管理・閲覧機能。
  - 公開用ページへの遷移リンクを追加。
  - 親自治体（政令指定都市）と子自治体（区）のデータ連携表示。

## 3. データベース、データ定義

### テーブル定義: `cities` (自治体マスタ)
全国の自治体情報を管理するテーブルです。

| カラム名 | 型 | 説明 |
| --- | --- | --- |
| `id` | TEXT (PK) | 全国地方公共団体コード (例: '11201') |
| `name` | TEXT | 自治体名 (例: '川越市') |
| `slug` | TEXT (Unique) | URL用スラッグ (例: 'kawagoe') |
| `prefecture_code` | TEXT | 都道府県コード (例: '11') |
| `lat` | DOUBLE | 中心緯度 |
| `lng` | DOUBLE | 中心経度 |
| `zoom` | INT | デフォルトズームレベル |
| `is_designated` | BOOLEAN | 政令指定都市フラグ |
| `parent_city_id` | TEXT | 親自治体ID（区の場合に親市IDが入る） |

### RPC関数: `get_municipality_ranking`
投稿数の多い自治体ランキングを取得するためのストアドプロシージャです。

```sql
CREATE OR REPLACE FUNCTION get_municipality_ranking(limit_count INT DEFAULT 5)
RETURNS TABLE (
    city_code TEXT,
    city_name TEXT,
    prefecture_code TEXT,
    post_count BIGINT
)
```

## 4. デプロイ・ビルド仕様
### 静的サイト生成 (Static Export)
- `npm run build` により `out/` ディレクトリに静的ファイルが出力されます。
- Xserver等の静的ホスティング環境に `out/` の中身をアップロードして公開します。

### ビルド最適化
- **ページ数削減**: `/dashboard/[cityCode]` ルートにおいては、ビルド時間を短縮するため、**IDによるパスのみ**を生成しています（Slugによるパスは生成していません）。
- **CPU設定**: サーバー環境によっては `next.config.ts` (または.mjs/.js) 内の `cpus` 設定を調整することでビルド速度が向上する場合があります。

## 5. 外部ファイル・リソース
- **GeoJSON**: `public/geojson/{prefCode}/{cityCode}.json` に全自治体の境界データを配置しています。
- **Romaji/Slug変換**: Geoloniaの `latest.csv` を元に一意なスラッグを生成・管理しています。
