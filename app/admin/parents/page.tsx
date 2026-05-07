'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'

type Parent = Database['public']['Tables']['parents']['Row']

export default function AdminParentsPage() {
  const [parents, setParents] = useState<Parent[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('parents').select('*').order('created_at', { ascending: false })
      setParents(data ?? [])
      setLoading(false)
    }
    load()
  }, [supabase])

  return (
    <>
      <PortalTabs type="admin" />
      <div className="container py-4">
        <h1 className="mb-4">Parents Management</h1>
        {loading ? (
          <p>Loading parents...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Owing</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((p) => (
                  <tr key={p.id}>
                    <td>{p.first_name} {p.last_name}</td>
                    <td>{p.email}</td>
                    <td>{p.phone ?? '-'}</td>
                    <td>{p.status ?? '-'}</td>
                    <td>{p.payment_status ?? '-'}</td>
                    <td>N$ {Number(p.owing_amount ?? 0).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
