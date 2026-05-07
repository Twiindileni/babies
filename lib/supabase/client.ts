import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import {
  BrowserCookieAuthStorageAdapter,
  DEFAULT_COOKIE_OPTIONS,
} from '@supabase/auth-helpers-shared'
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseConfigured } from './env'

/**
 * Avoid Navigator LockManager (locks.js) — concurrent Strict Mode / multi-component
 * auth calls can hit the acquire timeout and throw AbortError.
 */
async function authLockNoOp<T>(
  _name: string,
  _acquireTimeout: number,
  fn: () => Promise<T>
): Promise<T> {
  return await fn()
}

let browserClient: SupabaseClient | null = null

function createBrowserCookieClient(url: string, key: string): SupabaseClient {
  const isBrowser = typeof window !== 'undefined'
  return createClient(url, key, {
    auth: {
      flowType: 'pkce',
      autoRefreshToken: isBrowser,
      detectSessionInUrl: isBrowser,
      persistSession: true,
      storage: new BrowserCookieAuthStorageAdapter({
        ...DEFAULT_COOKIE_OPTIONS,
      }),
      lock: authLockNoOp,
    },
  })
}

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
    )
  }

  if (!browserClient) {
    browserClient = createBrowserCookieClient(supabaseUrl, supabaseAnonKey)
  }

  return browserClient
}

// For server-side usage
export const createSupabaseServerClient = () => {
  const url = getSupabaseUrl()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || getSupabaseAnonKey()
  return createClient(url, key)
}
