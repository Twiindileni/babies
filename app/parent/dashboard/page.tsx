'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'

type Counts = {
  children: number
  payments: number
  announcements: number
}

export default function ParentDashboardPage() {
  const [counts, setCounts] = useState<Counts>({ children: 0, payments: 0, announcements: 0 })
  const [owing, setOwing] = useState<number | null>(null)
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = useMemo(() => createSupabaseClient(), [])

  useEffect(() => {
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        let parentOwing: number | null = null
        let parentPayStatus: string | null = null

        if (user) {
          const { data: parentRow } = await supabase
            .from('parents')
            .select('owing_amount, payment_status')
            .eq('user_id', user.id)
            .maybeSingle()
          if (parentRow) {
            parentOwing = parentRow.owing_amount != null ? Number(parentRow.owing_amount) : null
            parentPayStatus = parentRow.payment_status
          }
        }

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
        setOwing(parentOwing)
        setPaymentStatus(parentPayStatus)
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
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Children</h5>
                  <p className="display-6 mb-0">{counts.children}</p>
                  <Link href="/parent/children" className="btn btn-link px-0 small">
                    View children
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <Link href="/parent/payments" className="text-decoration-none text-reset">
                <div className="card shadow-sm h-100 border border-primary border-opacity-25 transition-shadow hover:shadow-md">
                  <div className="card-body">
                    <h5 className="card-title">Payments</h5>
                    <p className="display-6 mb-1">{counts.payments}</p>
                    {owing != null && owing > 0 && (
                      <p className="text-danger small mb-1">
                        Balance due: N$ {owing.toFixed(2)}
                        {paymentStatus ? ` · ${paymentStatus}` : ''}
                      </p>
                    )}
                    <span className="btn btn-link px-0 small">View payment history →</span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Active announcements</h5>
                  <p className="display-6 mb-0">{counts.announcements}</p>
                  <Link href="/parent/announcements" className="btn btn-link px-0 small">
                    Read announcements
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
