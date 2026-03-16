# Authentication Migration Guide: NextAuth Credentials → Supabase Auth

This guide explains how to migrate from NextAuth with credentials to Supabase Auth while maintaining UUID validation.

## Overview

The authentication system has been migrated from NextAuth Credentials Provider to Supabase Auth, while keeping:
- UUID validation in the URL (`/login/[uuid]`)
- Same UI/UX
- NextAuth session management (for compatibility with existing code)

## Migration Steps

### 1. Environment Variables

Update your `.env.local` file with the following variables:

```env
# Supabase Configuration (required)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Admin Authentication
ADMIN_UUID=24f901ff-e665-44d4-9d9f-28c8ee059501
ADMIN_EMAIL=admin@yosephprieto.com  # Must match the email in Supabase Auth

# NextAuth Configuration (still required)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here
```

**Note:** Remove `ADMIN_USERNAME` and `ADMIN_PASSWORD` as they are no longer needed.

### 2. Create Admin User in Supabase

You have three options to create the admin user:

#### Option A: Via Supabase Dashboard (Recommended for first-time setup)

1. Go to your Supabase Dashboard → Authentication → Users
2. Click "Add User" → "Create new user"
3. Enter the email from `ADMIN_EMAIL` (e.g., `admin@yosephprieto.com`)
4. Set a secure password
5. Click "Create user"
6. After creation, click on the user to edit
7. In "User Metadata", add:
   - Key: `role`
   - Value: `admin`

#### Option B: Via Node.js Script (Recommended for automation)

1. Make sure you have `dotenv` installed: `npm install dotenv`
2. Set `ADMIN_PASSWORD` in your `.env.local` file temporarily
3. Run: `node create-admin-user.js`
4. Remove `ADMIN_PASSWORD` from `.env.local` after user creation

#### Option C: Via Supabase SQL Editor

Run the SQL script `supabase-admin-setup.sql` in your Supabase SQL Editor. This creates helper functions but **does not create the user**. You still need to create the user via Dashboard or the Node.js script.

### 3. Update Database Schema (if needed)

If you haven't already, run `supabase-migration.sql` to set up the events table with proper RLS policies.

### 4. Test the Migration

1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:3000/login/24f901ff-e665-44d4-9d9f-28c8ee059501`
3. Login with:
   - Email: The email you set in `ADMIN_EMAIL`
   - Password: The password you set when creating the user in Supabase
4. You should be redirected to `/admin` after successful login

## How It Works

### Authentication Flow

1. User navigates to `/login/[uuid]` with the correct UUID
2. Login page validates UUID matches `ADMIN_UUID`
3. User enters email and password
4. NextAuth Credentials Provider calls Supabase Auth API
5. Supabase validates credentials and returns user data
6. System checks if user email matches `ADMIN_EMAIL` and has admin role
7. NextAuth creates a JWT session
8. User is redirected to `/admin`

### Security Layers

1. **UUID Validation**: URL must contain the correct UUID
2. **Email Validation**: Email must match `ADMIN_EMAIL` env variable
3. **Supabase Auth**: Password is validated by Supabase Auth
4. **Role Check**: User metadata must have `role: 'admin'`
5. **Session Management**: NextAuth manages JWT sessions

## Files Changed

- `src/lib/auth.ts` - Updated to use Supabase Auth with NextAuth
- `src/app/login/[uuid]/page.tsx` - Changed from username to email field
- `.env.example` - Updated with `ADMIN_EMAIL` instead of `ADMIN_USERNAME`/`ADMIN_PASSWORD`

## Files Created

- `supabase-admin-setup.sql` - SQL helper functions for admin management
- `create-admin-user.js` - Node.js script to create admin user programmatically
- `AUTH_MIGRATION.md` - This migration guide

## Troubleshooting

### "Supabase no está configurado correctamente"
- Check that `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set in `.env.local`

### "Credenciales inválidas"
- Verify the email matches `ADMIN_EMAIL` in `.env.local`
- Verify the password is correct in Supabase Auth
- Check that the user has `role: 'admin'` in user metadata

### "Ruta de acceso inválida"
- Verify the UUID in the URL matches `ADMIN_UUID` in `.env.local`

### User not found in Supabase
- Make sure you created the user in Supabase Auth (not just in the database)
- Verify the email matches exactly (case-sensitive)

## Rollback

If you need to rollback to the previous authentication system:

1. Restore `src/lib/auth.ts` from git history
2. Restore `src/app/login/[uuid]/page.tsx` from git history
3. Restore `.env.example` from git history
4. Add back `ADMIN_USERNAME` and `ADMIN_PASSWORD` to `.env.local`

## Additional Notes

- The UUID validation remains as an additional security layer
- NextAuth sessions are still used for compatibility with existing admin pages
- Supabase Auth handles password hashing and validation
- User passwords are stored securely in Supabase Auth (not in your codebase)
