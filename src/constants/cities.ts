// 自治体データ定義
// IDは総務省の全国地方公共団体コードを使用
// GeoJSONの取得や、投稿時の自動判定に使用します

export type CityData = {
    id: string; // 自治体コード (例: 11201)
    name: string; // 表示名 (例: 川越市)
    lat: number; // 中心緯度
    lng: number; // 中心経度
    zoom: number; // 地図ズームレベル
};

export const CITIES: Record<string, CityData> = {
    kawagoe: {
        id: '11201',
        name: '川越市',
        lat: 35.9251,
        lng: 139.4858,
        zoom: 13
    },
    tokorozawa: {
        id: '11208',
        name: '所沢市',
        lat: 35.7994,
        lng: 139.4687,
        zoom: 13
    },
    sayama: {
        id: '11215',
        name: '狭山市',
        lat: 35.8533,
        lng: 139.4122,
        zoom: 13
    },
    fujimino: {
        id: '11245',
        name: 'ふじみ野市',
        lat: 35.8794,
        lng: 139.5197,
        zoom: 13
    }
};

// 住所文字列からcity_codeを判定するためのマッピング
// APIから返ってくる "川越市" などの文字列をキーにする
export const CITY_NAME_TO_CODE: Record<string, string> = {
    川越市: '11201',
    所沢市: '11208',
    狭山市: '11215',
    ふじみ野市: '11245'
};
