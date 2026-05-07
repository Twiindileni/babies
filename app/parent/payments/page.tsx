'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'

type Payment = Database['public']['Tables']['payments']['Row']

export default function ParentPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('payments').select('*').order('payment_date', { ascending: false })
      setPayments(data ?? [])
      setLoading(false)
    }
    load()
  }, [supabase])

  return (
    <>
      <PortalTabs type="parent" />
      <div className="container py-4">
        <h1 className="mb-4">Payment History</h1>
        {loading ? (
          <p>Loading payments...</p>
        ) : payments.length === 0 ? (
          <p>No payments found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.payment_date}</td>
                    <td>N$ {Number(payment.amount).toFixed(2)}</td>
                    <td>{payment.payment_type}</td>
                    <td>{payment.payment_method}</td>
                    <td>{payment.status}</td>
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
