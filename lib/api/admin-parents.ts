import type { Database } from '@/lib/supabase/types'

export type AdminParentRow = Database['public']['Tables']['parents']['Row']

export async function fetchAdminParents(): Promise<AdminParentRow[]> {
  const res = await fetch('/api/admin/parents', { credentials: 'same-origin' })
  const json = (await res.json()) as { parents?: AdminParentRow[]; error?: string }
  if (!res.ok) {
    throw new Error(json.error || `Failed to load parents (${res.status})`)
  }
  return json.parents ?? []
}

export type CreateParentResult = {
  parent: AdminParentRow
  userId: string
}

export async function createAdminParent(input: {
  first_name: string
  last_name: string
  email: string
  password: string
  phone?: string
  address?: string
}): Promise<CreateParentResult> {
  const res = await fetch('/api/admin/parents', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  const json = (await res.json()) as { parent?: AdminParentRow; userId?: string; error?: string }
  if (!res.ok) {
    throw new Error(json.error || `Could not create parent (${res.status})`)
  }
  if (!json.parent || !json.userId) {
    throw new Error('Invalid server response')
  }
  return { parent: json.parent, userId: json.userId }
}
