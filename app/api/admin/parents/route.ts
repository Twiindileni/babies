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
  return { supabase, user }
}

/** List all parents (admin/staff) — uses service role so the list works even if client RLS is misconfigured. */
export async function GET() {
  const gate = await requireAdminStaff()
  if ('error' in gate) return gate.error

  try {
    const admin = createServiceRoleClient()
    const { data, error } = await admin
      .from('parents')
      .select('*')
      .order('last_name', { ascending: true })
      .order('first_name', { ascending: true })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ parents: data ?? [] })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Server error'
    if (msg.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      return NextResponse.json(
        {
          error:
            'Server missing SUPABASE_SERVICE_ROLE_KEY. Add it in .env.local and Vercel for admin parent creation.',
        },
        { status: 500 }
      )
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

type CreateParentBody = {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
  address?: string
}

/** Create auth user + public.users + parents row (admin/staff only). */
export async function POST(request: Request) {
  const gate = await requireAdminStaff()
  if ('error' in gate) return gate.error

  let body: CreateParentBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const first_name = (body.first_name || '').trim()
  const last_name = (body.last_name || '').trim()
  const email = (body.email || '').trim().toLowerCase()
  const password = body.password || ''
  const phone = (body.phone || '').trim() || null
  const address = (body.address || '').trim() || null

  if (!first_name || !last_name || !email || password.length < 6) {
    return NextResponse.json(
      { error: 'First name, last name, email, and password (min 6 chars) are required.' },
      { status: 400 }
    )
  }

  const admin = createServiceRoleClient()
  let newUserId: string | null = null

  try {
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (createErr || !created.user) {
      return NextResponse.json(
        { error: createErr?.message || 'Could not create login for this email.' },
        { status: 400 }
      )
    }

    newUserId = created.user.id
    const username = `parent_${newUserId.replace(/-/g, '').slice(0, 12)}`

    const { error: usersErr } = await admin.from('users').insert({
      id: newUserId,
      username,
      email,
      role: 'parent',
    })

    if (usersErr) {
      await admin.auth.admin.deleteUser(newUserId)
      return NextResponse.json({ error: usersErr.message }, { status: 400 })
    }

    const { data: parentRow, error: parentErr } = await admin
      .from('parents')
      .insert({
        first_name,
        last_name,
        email,
        phone,
        address,
        user_id: newUserId,
        status: 'Active',
      })
      .select()
      .single()

    if (parentErr) {
      await admin.from('users').delete().eq('id', newUserId)
      await admin.auth.admin.deleteUser(newUserId)
      return NextResponse.json({ error: parentErr.message }, { status: 400 })
    }

    return NextResponse.json({ parent: parentRow, userId: newUserId })
  } catch (e: unknown) {
    if (newUserId) {
      try {
        await admin.from('users').delete().eq('id', newUserId)
        await admin.auth.admin.deleteUser(newUserId)
      } catch {
        // best effort cleanup
      }
    }
    const msg = e instanceof Error ? e.message : 'Server error'
    if (msg.includes('SUPABASE_SERVICE_ROLE_KEY')) {
      return NextResponse.json(
        {
          error:
            'Server missing SUPABASE_SERVICE_ROLE_KEY. Add it in .env.local and Vercel for admin parent creation.',
        },
        { status: 500 }
      )
    }
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
