
const { createClient } = require('@supabase/supabase-js');

// Start of Selection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkCities() {
    const { count, error: countError } = await supabase
        .from('cities')
        .select('*', { count: 'exact', head: true });

    if (countError) {
        console.error('Error counting cities:', countError);
        return;
    }

    console.log(`Total cities count: ${count}`);

    const { data: first, error: firstError } = await supabase
        .from('cities')
        .select('id, name')
        .order('id', { ascending: true })
        .limit(5);

    const { data: last, error: lastError } = await supabase
        .from('cities')
        .select('id, name')
        .order('id', { ascending: false })
        .limit(5);

    if (first) console.log('First 5 cities:', first);
    if (last) console.log('Last 5 cities:', last);
}

checkCities();
