'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'

type Child = Database['public']['Tables']['children']['Row']

export default function ParentChildrenPage() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('children').select('*').order('created_at', { ascending: false })
      setChildren(data ?? [])
      setLoading(false)
    }
    load()
  }, [supabase])

  return (
    <>
      <PortalTabs type="parent" />
      <div className="container py-4">
        <h1 className="mb-4">My Children</h1>
        {loading ? (
          <p>Loading children...</p>
        ) : children.length === 0 ? (
          <p>No children records yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date of Birth</th>
                  <th>Program</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {children.map((child) => (
                  <tr key={child.id}>
                    <td>{child.first_name} {child.last_name}</td>
                    <td>{child.date_of_birth}</td>
                    <td className="text-capitalize">{child.program_type}</td>
                    <td>{child.status}</td>
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
