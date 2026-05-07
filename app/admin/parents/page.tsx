'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'
import { createAdminParent, fetchAdminParents } from '@/lib/api/admin-parents'
import toast from 'react-hot-toast'

type Parent = Database['public']['Tables']['parents']['Row']

export default function AdminParentsPage() {
  const [parents, setParents] = useState<Parent[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  })

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchAdminParents()
      setParents(data)
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Failed to load parents')
      setParents([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const handleCreateParent = async (e: FormEvent) => {
    e.preventDefault()
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return
    }
    setSubmitting(true)
    try {
      await createAdminParent({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        email: form.email.trim(),
        password: form.password,
        phone: form.phone.trim() || undefined,
        address: form.address.trim() || undefined,
      })
      toast.success('Parent account created. They can sign in with the email and password you set.')
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
      })
      await load()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Could not create parent')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PortalTabs type="admin" />
      <div className="container py-4">
        <h1 className="mb-4">Parents management</h1>

        <div className="card shadow-sm border-0 mb-5">
          <div className="card-body p-4">
            <h2 className="h5 mb-3">Add parent portal access</h2>
            <p className="text-muted small mb-3">
              Creates a Supabase login and links it to a parent record so they can sign in at{' '}
              <strong>/login</strong> and open the parent dashboard. If this email already exists as a
              parent without portal access, their row is updated and login is attached—no duplicate.
            </p>
            <form onSubmit={handleCreateParent} className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First name *</label>
                <input
                  className="form-control"
                  required
                  value={form.first_name}
                  onChange={(e) => setForm((f) => ({ ...f, first_name: e.target.value }))}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Last name *</label>
                <input
                  className="form-control"
                  required
                  value={form.last_name}
                  onChange={(e) => setForm((f) => ({ ...f, last_name: e.target.value }))}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email (login) *</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Temporary password *</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                />
                <div className="form-text">Minimum 6 characters. Ask the parent to change it after first login.</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                />
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Creating…' : 'Create parent account'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h5 mb-0">All parents</h2>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => void load()}>
            Refresh list
          </button>
        </div>
        {loading ? (
          <p>Loading parents…</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Portal</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Owing</th>
                </tr>
              </thead>
              <tbody>
                {parents.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.first_name} {p.last_name}
                    </td>
                    <td>{p.email}</td>
                    <td>{p.phone ?? '—'}</td>
                    <td>
                      {p.user_id ? (
                        <span className="badge text-bg-success">Linked</span>
                      ) : (
                        <span className="badge text-bg-secondary">No login</span>
                      )}
                    </td>
                    <td>{p.status ?? '—'}</td>
                    <td>{p.payment_status ?? '—'}</td>
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
