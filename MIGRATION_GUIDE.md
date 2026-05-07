# Migration Guide: PHP to React + Supabase

This guide documents the conversion of the Babies & Todd's Daycare PHP application to a modern React + Next.js application with Supabase backend.

## ✅ Completed

1. **Project Setup**
   - Next.js 14 with TypeScript
   - Tailwind CSS configuration
   - Supabase client setup
   - React Query for data fetching
   - Project structure

2. **Database Schema**
   - Converted MySQL schema to Supabase PostgreSQL
   - Created migration file with all tables
   - Set up Row Level Security (RLS) policies
   - Added triggers for updated_at timestamps

3. **Core Components**
   - Navbar component
   - Footer component
   - Home page (converted)

## 📋 Remaining Work

### Public Pages (Priority 1)
- [ ] `/programs` - Programs page
- [ ] `/games` - Games page  
- [ ] `/about` - About Us page
- [ ] `/contact` - Contact page
- [ ] `/enroll` - Enrollment form

### Authentication (Priority 2)
- [ ] `/login` - Login page
- [ ] `/signup` - Parent signup page
- [ ] `/reset-password` - Password reset
- [ ] Auth middleware and protected routes

### Parent Portal (Priority 3)
- [ ] `/parent/dashboard` - Parent dashboard
- [ ] `/parent/children` - View children
- [ ] `/parent/payments` - Payment history
- [ ] `/parent/announcements` - View announcements
- [ ] `/parent/messages` - Messages

### Admin Portal (Priority 4)
- [ ] `/admin/dashboard` - Admin dashboard with charts
- [ ] `/admin/parents` - Parent management
- [ ] `/admin/children` - Children management
- [ ] `/admin/applications` - Enrollment applications
- [ ] `/admin/payments` - Payment management
- [ ] `/admin/announcements` - Announcement management
- [ ] `/admin/messages` - Contact messages
- [ ] `/admin/settings` - Settings

### API Routes (Priority 5)
- [ ] `/api/enroll` - Enrollment submission
- [ ] `/api/contact` - Contact form submission
- [ ] `/api/payments` - Payment operations
- [ ] `/api/announcements` - Announcement CRUD

## 🔄 Conversion Pattern

### PHP to React Component Example

**Before (PHP):**
```php
<?php
$stmt = $pdo->prepare("SELECT * FROM parents");
$parents = $stmt->fetchAll();
?>
<div>
  <?php foreach ($parents as $parent): ?>
    <p><?php echo $parent['name']; ?></p>
  <?php endforeach; ?>
</div>
```

**After (React):**
```tsx
'use client'
import { useQuery } from '@tanstack/react-query'
import { createSupabaseClient } from '@/lib/supabase/client'

export function ParentsList() {
  const supabase = createSupabaseClient()
  const { data: parents } = useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const { data } = await supabase.from('parents').select('*')
      return data
    }
  })

  return (
    <div>
      {parents?.map(parent => (
        <p key={parent.id}>{parent.name}</p>
      ))}
    </div>
  )
}
```

## 🗄️ Database Migration Steps

1. **Create Supabase Project**
   - Go to https://supabase.com
   - Create new project
   - Wait for project to be ready

2. **Run Migration**
   - Go to SQL Editor in Supabase dashboard
   - Copy contents of `supabase/migrations/001_initial_schema.sql`
   - Paste and run in SQL Editor

3. **Migrate Data (Optional)**
   - Export data from MySQL
   - Convert to PostgreSQL format
   - Import into Supabase

4. **Set Environment Variables**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## 🚀 Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial React conversion"
   git remote add origin your_repo_url
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables
   - Deploy!

3. **Configure Supabase**
   - Add Vercel URL to Supabase allowed origins
   - Update RLS policies if needed

## 📝 Key Differences

### Authentication
- **PHP**: Session-based with `$_SESSION`
- **React**: Supabase Auth with JWT tokens

### Database Queries
- **PHP**: PDO prepared statements
- **React**: Supabase client with TypeScript types

### File Uploads
- **PHP**: Direct file system
- **React**: Supabase Storage

### Routing
- **PHP**: File-based routing
- **React**: Next.js App Router

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query/latest)

## ⚠️ Important Notes

1. **Images**: Copy all images from `assets/images/` to `public/assets/images/`
2. **CSS**: Some Bootstrap classes may need Tailwind equivalents
3. **Forms**: Use `react-hook-form` for form handling
4. **Validation**: Add client-side and server-side validation
5. **Error Handling**: Implement proper error boundaries

## 🎯 Next Steps

1. Complete public pages conversion
2. Implement authentication
3. Convert parent dashboard
4. Convert admin dashboard
5. Test all functionality
6. Deploy to Vercel
