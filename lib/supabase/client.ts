import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from './env'

let browserClient: ReturnType<typeof createClientComponentClient> | null = null

export const createSupabaseClient = () => {
  const supabaseUrl = getSupabaseUrl()
  const supabaseAnonKey = getSupabaseAnonKey()

  if (!isSupabaseConfigured()) {
    console.warn(
      '⚠️ Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY).'
    )
    return createClient(
      supabaseUrl || 'https://placeholder.supabase.co',
      supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTIwMDAsImV4cCI6MTk2MDc2ODAwMH0.placeholder'
    ) as ReturnType<typeof createClientComponentClient>
  }

  // Pass explicit URL/key so publishable-key-only deploys work with auth-helpers.
  if (!browserClient) {
    browserClient = createClientComponentClient({
      supabaseUrl,
      supabaseKey: supabaseAnonKey,
    })
  }

  return browserClient
}

// For server-side usage
export const createSupabaseServerClient = () => {
  const url = getSupabaseUrl()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || getSupabaseAnonKey()
  return createClient(url, key)
}
