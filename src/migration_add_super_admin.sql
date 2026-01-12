-- Add super_admin role for specific user
-- Remove existing role first
DELETE FROM admin_roles WHERE user_id = '71012502-ef18-4033-8b02-950bed1cff5d';

-- Insert with city_code = 'ALL'
INSERT INTO admin_roles (user_id, role, city_code)
VALUES ('71012502-ef18-4033-8b02-950bed1cff5d', 'super_admin', 'ALL');
