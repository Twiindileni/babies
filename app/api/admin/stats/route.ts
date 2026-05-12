import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createServiceRoleClient } from '@/lib/supabase/service-role'
import { getSupabaseAnonKey, getSupabaseUrl } from '@/lib/supabase/env'
import type { Database } from '@/lib/supabase/types'

export const dynamic = 'force-dynamic'

async function requireAdminStaff() {
  const supabase = createRouteHandlerClient<Database>(
    { cookies },
    {
      supabaseUrl: getSupabaseUrl(),
      supabaseKey: getSupabaseAnonKey(),
    }
  )
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser()

  if (userErr || !user) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
  }

  const { data: row, error: roleErr } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle()

  if (roleErr || !row || (row.role !== 'admin' && row.role !== 'staff')) {
    return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) }
  }

  return { user }
}

export async function GET() {
  const gate = await requireAdminStaff()
  if ('error' in gate) return gate.error

  try {
    const admin = createServiceRoleClient()
    const [
      { count: parents },
      { count: children },
      { count: applications },
      { count: payments },
      { count: announcements },
      { count: messages },
    ] =
      await Promise.all([
        admin.from('parents').select('*', { count: 'exact', head: true }),
        admin.from('children').select('*', { count: 'exact', head: true }),
        admin.from('enrollment_applications').select('*', { count: 'exact', head: true }),
        admin.from('payments').select('*', { count: 'exact', head: true }),
        admin.from('announcements').select('*', { count: 'exact', head: true }),
        admin.from('contact_messages').select('*', { count: 'exact', head: true }),
      ])

    return NextResponse.json({
      counts: {
        parents: parents ?? 0,
        children: children ?? 0,
        applications: applications ?? 0,
        payments: payments ?? 0,
        announcements: announcements ?? 0,
        messages: messages ?? 0,
      },
    })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error'
    if (msg.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      return NextResponse.json(
        {
          error:
            'Server missing SUPABASE_SERVICE_ROLE_KEY. Add it in your deployment environment for admin dashboard data.',
        },
        { status: 500 }
      )
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
