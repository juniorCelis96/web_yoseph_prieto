-- Admin User Setup Script for Yoseph Prieto Website
-- Run this SQL in your Supabase SQL Editor
-- 
-- IMPORTANT: This script creates helper functions for admin user management.
-- The actual admin user must be created using one of these methods:
--
-- METHOD 1: Via Supabase Dashboard (Easiest)
-- 1. Go to Authentication > Users in your Supabase Dashboard
-- 2. Click "Add User" > "Create new user"
-- 3. Enter the email from ADMIN_EMAIL env variable (e.g., admin@yosephprieto.com)
-- 4. Set a secure password
-- 5. Click "Create user"
-- 6. After creation, click on the user and add to "User Metadata":
--    Key: role, Value: admin
--
-- METHOD 2: Via Node.js Script (Recommended for automation)
-- Run: node create-admin-user.js
-- This script uses the Supabase Management API to create the user programmatically.
--
-- METHOD 3: Via Supabase CLI
-- supabase auth users create admin@yosephprieto.com --password your-password --metadata '{"role":"admin"}'

-- Helper function to check if a user is an admin
-- This function checks the user_metadata for the 'role' field
CREATE OR REPLACE FUNCTION is_admin(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM auth.users 
    WHERE email = user_email 
    AND (raw_user_meta_data->>'role')::text = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION is_admin(TEXT) TO authenticated;

-- Optional: Create a view to easily see admin users
CREATE OR REPLACE VIEW admin_users AS
SELECT 
  id,
  email,
  created_at,
  updated_at,
  raw_user_meta_data->>'role' as role,
  raw_user_meta_data->>'name' as name
FROM auth.users
WHERE (raw_user_meta_data->>'role')::text = 'admin';

-- Grant select permission on the view
GRANT SELECT ON admin_users TO authenticated;

-- Note: After creating the admin user, make sure to:
-- 1. Set ADMIN_EMAIL in your .env.local file to match the email used
-- 2. Test login at: /login/24f901ff-e665-44d4-9d9f-28c8ee059501
