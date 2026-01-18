
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Try to read .env.local from parent directory
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split('\n').forEach(line => {
            if (line && !line.startsWith('#')) {
                const [key, val] = line.split('=');
                if (key && val) process.env[key.trim()] = val.trim();
            }
        });
    }
} catch (e) {
    console.log('Could not load .env.local', e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function simulateGetAllCities() {
    console.log('Fetching all cities with range(0, 2000)...');

    // This matches the logic in cityParams.ts
    const { data, error } = await supabase
        .from('cities')
        .select('*')
        .range(0, 2000)
        .order('id');

    if (error) {
        console.error('Error fetching cities:', error);
        return;
    }

    if (!data) {
        console.error('No data returned');
        return;
    }

    console.log(`Returned cities count: ${data.length}`);

    if (data.length > 0) {
        console.log('Last city:', data[data.length - 1].name, data[data.length - 1].id);
    }
}

simulateGetAllCities();
