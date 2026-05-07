import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  
  // Skip auth check if Supabase is not configured yet
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url_here') {
    return res
  }

  const supabase = createMiddlewareClient({ req, res })
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Protect /parent and /admin routes
    if (req.nextUrl.pathname.startsWith('/parent') || req.nextUrl.pathname.startsWith('/admin')) {
      if (!session) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/login'
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Redirect /parent exactly to /parent/dashboard
    if (req.nextUrl.pathname === '/parent') {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/parent/dashboard'
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect /admin exactly to /admin/dashboard
    if (req.nextUrl.pathname === '/admin') {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/admin/dashboard'
      return NextResponse.redirect(redirectUrl)
    }

  } catch (error) {
    console.debug('Supabase auth middleware error:', error)
  }

  return res
}

export const config = {
  matcher: ['/parent/:path*', '/admin/:path*'],
}
