'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'
import toast from 'react-hot-toast'

type PaymentRow = Database['public']['Tables']['payments']['Row']
type PaymentWithChild = PaymentRow & {
  child: { first_name: string; last_name: string } | null
}

export default function ParentPaymentsPage() {
  const [payments, setPayments] = useState<PaymentWithChild[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = useMemo(() => createSupabaseClient(), [])

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('payments')
        .select(
          `
          *,
          child:children(first_name, last_name)
        `
        )
        .order('payment_date', { ascending: false })

      if (error) {
        toast.error(error.message)
        setPayments([])
      } else {
        setPayments((data as PaymentWithChild[]) ?? [])
      }
      setLoading(false)
    }
    load()
  }, [supabase])

  return (
    <>
      <PortalTabs type="parent" />
      <div className="container py-4">
        <h1 className="mb-4">Payment history</h1>
        <p className="text-muted mb-4">
          Payments recorded by the center for your enrolled children appear below.
        </p>
        {loading ? (
          <p>Loading payments…</p>
        ) : payments.length === 0 ? (
          <div className="card border-0 shadow-sm">
            <div className="card-body py-5 text-center text-muted">
              <p className="mb-2">No payments on file yet.</p>
              <Link href="/parent/dashboard" className="btn btn-outline-primary btn-sm">
                Back to dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Child</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.payment_date}</td>
                    <td>
                      {payment.child
                        ? `${payment.child.first_name} ${payment.child.last_name}`
                        : '—'}
                    </td>
                    <td>N$ {Number(payment.amount).toFixed(2)}</td>
                    <td>{payment.payment_type}</td>
                    <td>{payment.payment_method}</td>
                    <td>{payment.status}</td>
                    <td className="small text-muted">{payment.notes ?? '—'}</td>
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
