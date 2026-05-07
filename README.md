# Babies & Todd's Daycare - React + Supabase

Modern React application for daycare management system, deployed on Vercel with Supabase backend.

## Features

- ✅ Modern React with Next.js 14 (App Router)
- ✅ Supabase for database and authentication
- ✅ TypeScript for type safety
- ✅ Responsive design with Tailwind CSS
- ✅ Parent Dashboard
- ✅ Admin Dashboard
- ✅ Enrollment Management
- ✅ Payment Tracking
- ✅ Announcements System
- ✅ Messaging System

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new Supabase project at https://supabase.com
   - Run the SQL migration from `supabase/migrations/001_initial_schema.sql`
   - Copy your Supabase URL and anon key

3. **Configure Environment Variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Deployment to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Project Structure

```
react-app/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public pages
│   ├── (parent)/          # Parent portal
│   ├── (admin)/           # Admin portal
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities and Supabase client
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── supabase/              # Supabase migrations and types
```
