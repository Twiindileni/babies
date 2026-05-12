export type AdminDashboardCounts = {
  parents: number
  children: number
  applications: number
  payments: number
  announcements: number
  messages: number
}

export async function fetchAdminDashboardCounts(): Promise<AdminDashboardCounts> {
  const res = await fetch('/api/admin/stats', { credentials: 'same-origin' })
  const json = (await res.json()) as {
    counts?: AdminDashboardCounts
    error?: string
  }

  if (!res.ok) {
    throw new Error(json.error || `Failed to load admin stats (${res.status})`)
  }

  if (!json.counts) {
    throw new Error('Invalid stats response')
  }

  return json.counts
}
