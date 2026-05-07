# How to Run the Database Migration in Supabase

## Step-by-Step Instructions

### 1. Open Supabase Dashboard
- Go to https://supabase.com
- Sign in to your account
- Open your project (or create a new one)

### 2. Open SQL Editor
- In the left sidebar, click **"SQL Editor"**
- Click **"New query"** button

### 3. Copy the Migration SQL
- Open this file: `react-app/supabase/migrations/001_initial_schema.sql`
- Select ALL the content (Ctrl+A)
- Copy it (Ctrl+C)

### 4. Paste and Run
- Paste the SQL into the Supabase SQL Editor
- Click the **"Run"** button (or press `Ctrl+Enter`)
- Wait for "Success. No rows returned" message

### 5. Verify Tables Were Created
- Go to **"Table Editor"** in the left sidebar
- You should see these tables:
  - ✅ users
  - ✅ parents
  - ✅ children
  - ✅ parent_child
  - ✅ enrollment_applications
  - ✅ payments
  - ✅ announcements
  - ✅ announcement_reads
  - ✅ contact_messages
  - ✅ admins

## ✅ Success!
If you see all the tables, the migration was successful!

## 🐛 Troubleshooting

**Error: "extension uuid-ossp does not exist"**
- This is normal on first run, Supabase will create it automatically
- Just run the SQL again

**Error: "relation already exists"**
- Some tables might already exist
- This is okay, the migration uses `CREATE TABLE IF NOT EXISTS`

**Error: "permission denied"**
- Make sure you're using the SQL Editor (not trying to run as a regular user)
- The SQL Editor has admin privileges

## Next Steps
After migration is successful:
1. Get your API keys from Settings → API
2. Create `.env.local` file with your credentials
3. Run `npm install` in the react-app folder
4. Run `npm run dev` to start the app
