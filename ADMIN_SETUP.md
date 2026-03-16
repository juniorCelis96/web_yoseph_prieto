# Admin System Setup Guide

This guide will help you set up the admin system for managing events on the Yoseph Prieto website.

## Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- npm or yarn package manager

## Step 1: Install Dependencies

Run the following command to install the required packages:

```bash
npm install
```

This will install:
- `next-auth` - Authentication system
- `@supabase/supabase-js` - Supabase client library

## Step 2: Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project's SQL Editor
3. Run the SQL script from `supabase-migration.sql` to create the events table
4. Go to Project Settings > API to get your credentials:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon/public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - service_role key (SUPABASE_SERVICE_ROLE_KEY) - Keep this secret!

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the following variables in `.env.local`:

   ```env
   # NextAuth.js Configuration
   NEXTAUTH_URL=http://localhost:3000  # Change to your production URL when deploying
   NEXTAUTH_SECRET=your-secret-key-here  # Generate with: openssl rand -base64 32

   # Admin Authentication
   ADMIN_UUID=your-uuid-v4-here  # Generate a UUID v4 for admin access

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

### Generating Required Values

**NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**ADMIN_UUID:**
You can generate a UUID v4 using:
- Online: https://www.uuidgenerator.net/
- Node.js: `node -e "console.log(require('crypto').randomUUID())"`
- Or use any UUID v4 generator

## Step 4: Database Setup

The SQL migration file (`supabase-migration.sql`) creates:
- An `events` table with all necessary fields
- Indexes for performance
- Row Level Security (RLS) policies
- Automatic timestamp updates

Make sure to run this SQL in your Supabase SQL Editor.

## Step 5: Access the Admin Panel

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the login page:
   ```
   http://localhost:3000/login/[your-admin-uuid]
   ```
   Replace `[your-admin-uuid]` with the UUID you set in `ADMIN_UUID`

3. The UUID in the URL will be automatically validated against your `ADMIN_UUID` environment variable

4. After successful login, you'll be redirected to `/admin` dashboard

## Admin Features

### Dashboard (`/admin`)
- View all events
- Create new events
- Edit existing events
- Delete events
- Logout

### Event Management
- **Create**: `/admin/events/new`
- **Edit**: `/admin/events/[id]`
- **Delete**: Available from the dashboard

## API Routes

The system includes the following API routes:

- `GET /api/events` - Fetch all events (public)
- `POST /api/events` - Create new event (admin only)
- `GET /api/events/[id]` - Fetch single event (public)
- `PUT /api/events/[id]` - Update event (admin only)
- `DELETE /api/events/[id]` - Delete event (admin only)

## Security Notes

1. **Never commit `.env.local`** - It contains sensitive credentials
2. **Keep SUPABASE_SERVICE_ROLE_KEY secret** - This bypasses RLS
3. **Use strong NEXTAUTH_SECRET** - Required for JWT signing
4. **Keep ADMIN_UUID secret** - This is your admin access key
5. **Use environment variables in production** - Set them in your hosting platform

## Production Deployment

When deploying to production:

1. Update `NEXTAUTH_URL` to your production URL
2. Set all environment variables in your hosting platform (Vercel, Netlify, etc.)
3. Ensure your Supabase project allows connections from your production domain
4. Update CORS settings in Supabase if needed

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure all Supabase variables are set in `.env.local`
- Restart your dev server after adding environment variables

### "ADMIN_UUID not configured"
- Set `ADMIN_UUID` in your `.env.local` file
- Make sure the UUID in the URL matches exactly

### "Unauthorized" errors
- Check that you're logged in
- Verify your session hasn't expired
- Make sure `NEXTAUTH_SECRET` is set

### Database connection issues
- Verify your Supabase credentials are correct
- Check that your Supabase project is active
- Ensure RLS policies are set up correctly

## Support

For issues or questions, check:
- NextAuth.js docs: https://next-auth.js.org/
- Supabase docs: https://supabase.com/docs
