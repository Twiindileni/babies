# Quick Start Guide

Get your React + Supabase application running in minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Supabase account (free tier works)

## Step 1: Install Dependencies

```bash
cd react-app
npm install
```

## Step 2: Set Up Supabase

1. Go to https://supabase.com and create a new project
2. Wait for your project to be ready (takes ~2 minutes)
3. Go to SQL Editor in your Supabase dashboard
4. Copy the contents of `supabase/migrations/001_initial_schema.sql`
5. Paste and run it in the SQL Editor

## Step 3: Configure Environment Variables

1. In Supabase, go to Settings > API
2. Copy your Project URL and anon/public key
3. Create `.env.local` file in the `react-app` directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## Step 4: Copy Assets

Copy your images and assets from the PHP project:

```bash
# From the root of your PHP project
cp -r assets/images react-app/public/assets/
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## Step 6: Create First Admin User

1. Go to Supabase Dashboard > Authentication
2. Click "Add user" > "Create new user"
3. Enter email and password
4. Go to SQL Editor and run:

```sql
-- Replace 'user-email@example.com' with the email you just created
UPDATE auth.users 
SET email = 'user-email@example.com' 
WHERE email = 'user-email@example.com';

-- Create user record
INSERT INTO public.users (id, username, email, role)
SELECT id, email, email, 'admin'
FROM auth.users
WHERE email = 'user-email@example.com';
```

## Step 7: Test Login

1. Go to http://localhost:3000/login
2. Login with the admin credentials
3. You should be redirected to the dashboard

## Next Steps

- Complete the remaining page conversions
- Add more features
- Deploy to Vercel

## Troubleshooting

### "Invalid API key" error
- Make sure your `.env.local` file has the correct values
- Restart your dev server after changing env variables

### "Table does not exist" error
- Make sure you ran the migration SQL in Supabase
- Check that all tables were created in the Table Editor

### Images not loading
- Make sure you copied images to `public/assets/images/`
- Check image paths in your components

### Authentication not working
- Check Supabase Auth settings
- Make sure RLS policies are set up correctly
- Check browser console for errors

## Need Help?

- Check the [Migration Guide](./MIGRATION_GUIDE.md)
- Review [Supabase Docs](https://supabase.com/docs)
- Review [Next.js Docs](https://nextjs.org/docs)
