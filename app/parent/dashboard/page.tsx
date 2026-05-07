'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'

type Counts = {
  children: number
  payments: number
  announcements: number
}

export default function ParentDashboardPage() {
  const [counts, setCounts] = useState<Counts>({ children: 0, payments: 0, announcements: 0 })
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    const load = async () => {
      try {
        const [{ count: children }, { count: payments }, { count: announcements }] = await Promise.all([
          supabase.from('children').select('*', { count: 'exact', head: true }),
          supabase.from('payments').select('*', { count: 'exact', head: true }),
          supabase
            .from('announcements')
            .select('*', { count: 'exact', head: true })
            .eq('is_active', true)
            .in('target_audience', ['all', 'parents']),
        ])

        setCounts({
          children: children ?? 0,
          payments: payments ?? 0,
          announcements: announcements ?? 0,
        })
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [supabase])

  return (
    <>
      <PortalTabs type="parent" />
      <div className="container py-4">
        <h1 className="mb-4">Parent Dashboard</h1>
        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <div className="row g-3">
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Children</h5>
                  <p className="display-6 mb-0">{counts.children}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Payment Records</h5>
                  <p className="display-6 mb-0">{counts.payments}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Active Announcements</h5>
                  <p className="display-6 mb-0">{counts.announcements}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
