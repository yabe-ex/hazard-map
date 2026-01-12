-- 自治体別投稿数ランキングを取得する関数
-- 戻り値: city_code, name (自治体名), prefecture_code, count (投稿数)

CREATE OR REPLACE FUNCTION get_municipality_ranking(limit_count INT DEFAULT 5)
RETURNS TABLE (
    city_code TEXT,
    city_name TEXT,
    prefecture_code TEXT,
    post_count BIGINT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id AS city_code,
        c.name AS city_name,
        c.prefecture_code,
        COUNT(p.id) AS post_count
    FROM 
        cities c
    JOIN 
        hazard_posts p ON c.id = p.city_code
    GROUP BY 
        c.id, c.name, c.prefecture_code
    ORDER BY 
        post_count DESC
    LIMIT 
        limit_count;
END;
$$;
