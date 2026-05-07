# Quick Setup Instructions

## 📁 Folder Structure

Your React app is in the `react-app/` folder. This is the **standard Next.js structure** and it's perfect for:
- ✅ Easy deployment to Vercel
- ✅ Clear separation from PHP files
- ✅ Standard Next.js conventions

**You don't need to move anything!** The structure is correct.

## 🚀 Quick Start

### 1. Navigate to React App
```bash
cd react-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Supabase
1. Create account at https://supabase.com
2. Create new project
3. Run the SQL migration (see RUN_MIGRATION.md)
4. Get your API keys from Settings → API

### 4. Create Environment File
Create `react-app/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Copy Images
```bash
# From the babies folder root
cp -r assets/images react-app/public/assets/
```

### 6. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## 📂 Current Structure (This is Correct!)

```
babies/
├── react-app/          ← Your React/Next.js app (keep here!)
│   ├── app/           ← Pages
│   ├── components/    ← Components
│   ├── lib/           ← Utilities
│   └── package.json   ← Dependencies
│
├── admin/             ← PHP admin files (old)
├── assets/            ← Shared assets
├── config/            ← PHP config
└── index.php          ← PHP files (old)
```

**Why keep react-app separate?**
- ✅ Next.js standard structure
- ✅ Easy to deploy to Vercel
- ✅ Doesn't conflict with PHP files
- ✅ Clean separation of concerns

## 🎯 Working in the React App

**To work on React files:**
1. Open the `react-app` folder in Cursor
2. All your React files are there
3. Use `Ctrl+P` to quickly find files

**File locations:**
- Pages: `react-app/app/`
- Components: `react-app/components/`
- Config: `react-app/` (root)

## 💡 Tip

You can open just the `react-app` folder in Cursor:
- File → Open Folder → Select `react-app`
- Now you only see React files!
