'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'
import toast from 'react-hot-toast'

type PaymentRow = Database['public']['Tables']['payments']['Row']
type ParentRow = Database['public']['Tables']['parents']['Row']
type ChildRow = Pick<
  Database['public']['Tables']['children']['Row'],
  'id' | 'first_name' | 'last_name'
>

type PaymentWithRelations = PaymentRow & {
  parent: Pick<ParentRow, 'first_name' | 'last_name' | 'email'> | null
  child: Pick<ChildRow, 'first_name' | 'last_name'> | null
}

const PAYMENT_TYPES = ['Tuition', 'Registration', 'Late fee', 'Other'] as const
const PAYMENT_METHODS = ['Cash', 'Card', 'Bank transfer', 'EFT'] as const
const STATUSES = ['Paid', 'Pending', 'Late'] as const

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentWithRelations[]>([])
  const [parents, setParents] = useState<ParentRow[]>([])
  const [childOptions, setChildOptions] = useState<ChildRow[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [parentId, setParentId] = useState('')
  const [childId, setChildId] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentDate, setPaymentDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  )
  const [paymentType, setPaymentType] = useState<string>(PAYMENT_TYPES[0])
  const [paymentMethod, setPaymentMethod] = useState<string>(PAYMENT_METHODS[0])
  const [status, setStatus] = useState<string>('Paid')
  const [notes, setNotes] = useState('')

  const supabase = useMemo(() => createSupabaseClient(), [])

  const loadPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select(
        `
        *,
        parent:parents(first_name, last_name, email),
        child:children(first_name, last_name)
      `
      )
      .order('payment_date', { ascending: false })

    if (error) {
      toast.error(error.message)
      setPayments([])
      return
    }
    setPayments((data as PaymentWithRelations[]) ?? [])
  }

  const loadParents = async () => {
    const { data, error } = await supabase
      .from('parents')
      .select('*')
      .order('last_name', { ascending: true })
    if (error) {
      toast.error(error.message)
      return
    }
    setParents(data ?? [])
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await Promise.all([loadPayments(), loadParents()])
      setLoading(false)
    }
    init()
  }, [supabase])

  useEffect(() => {
    const loadChildrenForParent = async () => {
      if (!parentId) {
        setChildOptions([])
        setChildId('')
        return
      }
      const { data, error } = await supabase
        .from('parent_child')
        .select('child_id, child:children(id, first_name, last_name)')
        .eq('parent_id', parentId)

      if (error) {
        toast.error(error.message)
        setChildOptions([])
        return
      }

      const rows = (data ?? []) as {
        child_id: string
        child: ChildRow | null
      }[]
      const kids = rows
        .map((r) => r.child)
        .filter((c): c is ChildRow => Boolean(c))
      setChildOptions(kids)
      if (kids.length === 1) {
        setChildId(kids[0].id)
      } else {
        setChildId('')
      }
    }
    loadChildrenForParent()
  }, [parentId, supabase])

  const selectedParent = parents.find((p) => p.id === parentId)

  const handleRecordPayment = async (e: FormEvent) => {
    e.preventDefault()
    if (!parentId || !childId) {
      toast.error('Choose a parent and a child.')
      return
    }
    const numAmount = Number(amount)
    if (!Number.isFinite(numAmount) || numAmount <= 0) {
      toast.error('Enter a valid amount greater than zero.')
      return
    }

    setSubmitting(true)
    try {
      const { error: insertError } = await supabase.from('payments').insert([
        {
          parent_id: parentId,
          child_id: childId,
          amount: numAmount,
          payment_date: paymentDate,
          payment_type: paymentType,
          payment_method: paymentMethod,
          status: status as Database['public']['Tables']['payments']['Row']['status'],
          notes: notes.trim() || null,
        },
      ])

      if (insertError) throw insertError

      if (selectedParent) {
        const currentOwing = Number(selectedParent.owing_amount ?? 0)
        if (Number.isFinite(currentOwing) && currentOwing > 0 && status === 'Paid') {
          const newOwing = Math.max(0, currentOwing - numAmount)
          const nextPaymentStatus: ParentRow['payment_status'] =
            newOwing <= 0 ? 'Current' : selectedParent.payment_status ?? 'Pending'

          const { error: parentErr } = await supabase
            .from('parents')
            .update({
              owing_amount: newOwing,
              payment_status: nextPaymentStatus,
            })
            .eq('id', parentId)

          if (parentErr) {
            toast.error(`Payment saved, but balance update failed: ${parentErr.message}`)
          } else {
            setParents((prev) =>
              prev.map((p) =>
                p.id === parentId
                  ? { ...p, owing_amount: newOwing, payment_status: nextPaymentStatus }
                  : p
              )
            )
          }
        }
      }

      toast.success('Payment recorded.')
      setAmount('')
      setNotes('')
      setPaymentDate(new Date().toISOString().slice(0, 10))
      await loadPayments()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Could not record payment.'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PortalTabs type="admin" />
      <div className="container py-4">
        <h1 className="mb-4">Payments</h1>

        <div className="card shadow-sm border-0 mb-5">
          <div className="card-body p-4">
            <h2 className="h5 mb-3">Record a payment</h2>
            <p className="text-muted small mb-4">
              When status is <strong>Paid</strong>, the parent&apos;s owing balance is reduced
              if they have an amount set.
            </p>
            <form onSubmit={handleRecordPayment} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Parent *</label>
                <select
                  className="form-select"
                  required
                  value={parentId}
                  onChange={(e) => setParentId(e.target.value)}
                >
                  <option value="">Select parent…</option>
                  {parents.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.last_name}, {p.first_name} — {p.email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Child *</label>
                <select
                  className="form-select"
                  required
                  value={childId}
                  onChange={(e) => setChildId(e.target.value)}
                  disabled={!parentId || childOptions.length === 0}
                >
                  <option value="">
                    {!parentId
                      ? 'Select a parent first'
                      : childOptions.length === 0
                        ? 'No linked children'
                        : 'Select child…'}
                  </option>
                  {childOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.first_name} {c.last_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Amount (N$) *</label>
                <input
                  type="number"
                  className="form-control"
                  min="0.01"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Payment date *</label>
                <input
                  type="date"
                  className="form-control"
                  required
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Status *</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Type</label>
                <select
                  className="form-select"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                >
                  {PAYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Method</label>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Notes</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional reference or comment"
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving…' : 'Record payment'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <h2 className="h5 mb-3">Payment history</h2>
        {loading ? (
          <p>Loading payments…</p>
        ) : payments.length === 0 ? (
          <p className="text-muted">No payments yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Parent</th>
                  <th>Child</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const parentLabel = payment.parent
                    ? `${payment.parent.last_name}, ${payment.parent.first_name}`
                    : '—'
                  const childLabel = payment.child
                    ? `${payment.child.first_name} ${payment.child.last_name}`
                    : '—'
                  return (
                    <tr key={payment.id}>
                      <td>{payment.payment_date}</td>
                      <td>{parentLabel}</td>
                      <td>{childLabel}</td>
                      <td>N$ {Number(payment.amount).toFixed(2)}</td>
                      <td>{payment.payment_type}</td>
                      <td>{payment.payment_method}</td>
                      <td>{payment.status}</td>
                      <td className="small text-muted">{payment.notes ?? '—'}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
