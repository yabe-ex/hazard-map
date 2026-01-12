-- Secure RPC to get user list with statistics for Super Admins
DROP FUNCTION IF EXISTS admin_get_users(INTEGER, INTEGER, TEXT);

CREATE OR REPLACE FUNCTION admin_get_users(
    page_number INTEGER DEFAULT 1,
    page_size INTEGER DEFAULT 100,
    search_email TEXT DEFAULT ''
)
RETURNS TABLE (
    user_id UUID,
    email TEXT,
    created_at TIMESTAMPTZ,
    last_sign_in_at TIMESTAMPTZ,
    post_count BIGINT,
    photo_post_count BIGINT,
    last_active_at TIMESTAMPTZ,
    last_city_code TEXT,
    given_reactions BIGINT,
    received_reactions BIGINT,
    contribution_score INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    requesting_user_id UUID;
    is_super_admin BOOLEAN;
BEGIN
    -- 1. Check if the requesting user is a super_admin
    requesting_user_id := auth.uid();
    
    SELECT EXISTS (
        SELECT 1 FROM admin_roles 
        WHERE admin_roles.user_id = requesting_user_id 
        AND role = 'super_admin'
    ) INTO is_super_admin;

    IF NOT is_super_admin THEN
        RAISE EXCEPTION 'Access denied: User is not a super_admin';
    END IF;

    -- 2. Return users with stats
    RETURN QUERY
    WITH user_stats AS (
        SELECT 
            au.id as user_id,
            COUNT(DISTINCT hp.id) as total_posts,
            COUNT(DISTINCT CASE WHEN hp.image_url IS NOT NULL THEN hp.id END) as photo_posts,
            MAX(hp.created_at) as last_post_at,
            (
                SELECT hp2.city_code 
                FROM hazard_posts hp2 
                WHERE hp2.user_id = au.id 
                ORDER BY hp2.created_at DESC 
                LIMIT 1
            ) as last_city,
            (
                SELECT COUNT(*)
                FROM hazard_empathies he
                WHERE he.user_id = au.id
            ) as given_reaction_count,
            (
                SELECT COUNT(*)
                FROM hazard_empathies he
                JOIN hazard_posts hp_own ON he.post_id = hp_own.id
                WHERE hp_own.user_id = au.id
            ) as received_reaction_count
        FROM auth.users au
        LEFT JOIN hazard_posts hp ON au.id = hp.user_id
        GROUP BY au.id
    )
    SELECT 
        au.id,
        au.email::TEXT,
        au.created_at,
        au.last_sign_in_at,
        COALESCE(us.total_posts, 0) as post_count,
        COALESCE(us.photo_posts, 0) as photo_post_count,
        COALESCE(us.last_post_at, au.created_at) as last_active_at,
        us.last_city as last_city_code,
        COALESCE(us.given_reaction_count, 0) as given_reactions,
        COALESCE(us.received_reaction_count, 0) as received_reactions,
        COALESCE(p.contribution_score, 0) as contribution_score
    FROM auth.users au
    LEFT JOIN user_stats us ON au.id = us.user_id
    LEFT JOIN profiles p ON au.id = p.id
    WHERE 
        (search_email = '' OR au.email ILIKE '%' || search_email || '%')
        AND (
            (au.email IS NOT NULL AND au.email != '') 
            OR (COALESCE(us.total_posts, 0) > 0)
        )
    ORDER BY au.created_at DESC
    LIMIT page_size
    OFFSET (page_number - 1) * page_size;
END;
$$;
