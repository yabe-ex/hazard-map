const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://raw.githubusercontent.com/niiyz/JapanCityGeoJson/master/geojson/prefectures/11';
// Switched to Geolonia for Tokyo as niiyz was missing files
const BASE_URL_TOKYO = 'https://geolonia.github.io/japanese-admins/13';

// Saitama
const SAITAMA_WARD_IDS = [
    '11101', '11102', '11103', '11104', '11105',
    '11106', '11107', '11108', '11109', '11110'
];
const KAWAGOE_ID = '11201';
const TOKOROZAWA_ID = '11208';

const OUTPUT_DIR_SAITAMA = path.join(__dirname, '../public/geojson/11');
const OUTPUT_DIR_TOKYO = path.join(__dirname, '../public/geojson/13');

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

async function downloadJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode !== 200) {
                // reject(new Error(`Failed to fetch ${url}: ${res.statusCode}`));
                resolve(null); // Return null instead of error to skip missing files
                return;
            }
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve(null);
                }
            });
        }).on('error', reject);
    });
}

function getTokyoIds() {
    const ids = [];
    // Wards (13101 - 13123)
    for (let i = 101; i <= 123; i++) ids.push(`13${i}`);
    // Cities (13201 - 13229)
    for (let i = 201; i <= 229; i++) ids.push(`13${i}`);
    // Towns/Villages (Specific IDs confirmed in DB)
    const extra = [
        '13303', '13305', '13307', '13308',
        '13361', '13363', '13364',
        '13381', '13382',
        '13401', '13402',
        '13421'
    ];
    return [...ids, ...extra];
}

async function main() {
    ensureDir(OUTPUT_DIR_SAITAMA);
    ensureDir(OUTPUT_DIR_TOKYO);

    // Saitama Downloads (Existing)
    console.log('--- Processing Saitama ---');
    // Ensure 11100 exists
    if (!fs.existsSync(path.join(OUTPUT_DIR_SAITAMA, '11100.json'))) {
        console.log('Generating 11100.json (Saitama City)...');
        const features = [];
        for (const id of SAITAMA_WARD_IDS) {
            const json = await downloadJson(`${BASE_URL}/${id}.json`);
            if (json) features.push(...json.features);
        }
        if (features.length > 0) {
            fs.writeFileSync(path.join(OUTPUT_DIR_SAITAMA, '11100.json'), JSON.stringify({ type: "FeatureCollection", features }));
            console.log('Saved 11100.json');
        }
    }
    // Also save individual wards if wanted, and other cities
    const saitamaIds = [...SAITAMA_WARD_IDS, KAWAGOE_ID, TOKOROZAWA_ID];
    for (const id of saitamaIds) {
        if (!fs.existsSync(path.join(OUTPUT_DIR_SAITAMA, `${id}.json`))) {
            const json = await downloadJson(`${BASE_URL}/${id}.json`);
            if (json) {
                fs.writeFileSync(path.join(OUTPUT_DIR_SAITAMA, `${id}.json`), JSON.stringify(json));
                console.log(`Saved ${id}.json`);
            }
        }
    }


    // Tokyo Downloads
    console.log('--- Processing Tokyo ---');
    const tokyoIds = getTokyoIds();
    for (const id of tokyoIds) {
        const dest = path.join(OUTPUT_DIR_TOKYO, `${id}.json`);
        if (fs.existsSync(dest)) continue;

        console.log(`Downloading ${id}...`);
        const json = await downloadJson(`${BASE_URL_TOKYO}/${id}.json`);
        if (json) {
            fs.writeFileSync(dest, JSON.stringify(json));
            console.log(`Saved ${id}.json`);
        } else {
            console.log(`Skipped ${id} (Not Found)`);
        }
    }
}

main();
