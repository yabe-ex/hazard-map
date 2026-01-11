import { supabase } from '@/lib/supabaseClient';
import { CITIES, CityData } from '@/constants/cities';

// 今後、CITIES定数は「フォールバック」や「型定義」として残しつつ、
// メインはDBから取得するようにします。

/**
 * スラッグから自治体情報を取得する (DB優先 -> 定数フォールバック)
 * @param slug kawagoe など
 */
export async function getCityBySlug(slug: string): Promise<CityData | null> {
    try {
        const { data, error } = await supabase
            .from('cities')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !data) {
            console.warn(`City not found in DB for slug: ${slug}. Falling back to constants.`);
            // 定数から探す (互換性維持)
            const city = Object.values(CITIES).find((c) => c.slug === slug);
            return city || null;
        }

        return data as CityData;
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * IDから自治体情報を取得する
 * @param id 11201 など
 */
export async function getCityById(id: string): Promise<CityData | null> {
    try {
        const { data, error } = await supabase
            .from('cities')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            // 定数フォールバック
            const city = Object.values(CITIES).find((c) => c.id === id);
            return city || null;
        }
        return data as CityData;
    } catch (e) {
        console.error(e);
        return null;
    }
}

/**
 * 全自治体リストを取得する
 */
export async function getAllCities(): Promise<CityData[]> {
    const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('id');

    if (error || !data || data.length === 0) {
        // 定数フォールバック
        return Object.values(CITIES);
    }

    return data as CityData[];
}
