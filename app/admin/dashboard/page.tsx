'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import { AdminApplicationsTab } from '@/components/admin/AdminApplicationsTab'
import { AdminChildrenTab } from '@/components/admin/AdminChildrenTab'

type Counts = {
  parents: number
  children: number
  applications: number
  payments: number
  announcements: number
}

type DashboardTab = 'overview' | 'parents' | 'applications' | 'children' | 'payments' | 'announcements'

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts>({ parents: 0, children: 0, applications: 0, payments: 0, announcements: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview')
  const [supabase] = useState(() => createSupabaseClient())

  useEffect(() => {
    const load = async () => {
      const [{ count: parents }, { count: children }, { count: applications }, { count: payments }, { count: announcements }] =
        await Promise.all([
          supabase.from('parents').select('*', { count: 'exact', head: true }),
          supabase.from('children').select('*', { count: 'exact', head: true }),
          supabase.from('enrollment_applications').select('*', { count: 'exact', head: true }),
          supabase.from('payments').select('*', { count: 'exact', head: true }),
          supabase.from('announcements').select('*', { count: 'exact', head: true }),
        ])

      setCounts({
        parents: parents ?? 0,
        children: children ?? 0,
        applications: applications ?? 0,
        payments: payments ?? 0,
        announcements: announcements ?? 0,
      })
      setLoading(false)
    }
    load()
  }, [supabase])

  return (
    <>
      <PortalTabs type="admin" />
      <div className="container py-5">
        <h1 className="display-6 font-extrabold text-[#1f2937] mb-5">Admin Dashboard</h1>
        
        {loading ? (
          <div className="text-center py-10">
            <div className="spinner-border text-[#4E7B38]" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-gray-500">Loading dashboard...</p>
          </div>
        ) : (
          <>
            {/* Stat Cards - Interactive */}
            <div className="row g-4 mb-4">
              <div className="col-md-4">
                <div 
                  className={`card border-0 shadow-sm rounded-3xl overflow-hidden transition-all cursor-pointer ${activeTab === 'parents' ? 'ring-2 ring-[#4E7B38]' : 'hover:shadow-md'}`}
                  onClick={() => setActiveTab('parents')}
                >
                  <div className="card-body p-4 d-flex align-items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#E8F5E4] text-[#4E7B38] flex items-center justify-center shrink-0 fs-3">
                      <i className="fas fa-users"></i>
                    </div>
                    <div>
                      <h6 className="text-gray-500 font-bold text-uppercase tracking-wider fs-7 mb-1">Parents</h6>
                      <p className="display-6 font-black text-gray-800 mb-0">{counts.parents}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div 
                  className={`card border-0 shadow-sm rounded-3xl overflow-hidden transition-all cursor-pointer ${activeTab === 'children' ? 'ring-2 ring-[#4E7B38]' : 'hover:shadow-md'}`}
                  onClick={() => setActiveTab('children')}
                >
                  <div className="card-body p-4 d-flex align-items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#FFF9C4] text-[#8B6E4E] flex items-center justify-center shrink-0 fs-3">
                      <i className="fas fa-child"></i>
                    </div>
                    <div>
                      <h6 className="text-gray-500 font-bold text-uppercase tracking-wider fs-7 mb-1">Children</h6>
                      <p className="display-6 font-black text-gray-800 mb-0">{counts.children}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div 
                  className={`card border-0 shadow-sm rounded-3xl overflow-hidden transition-all cursor-pointer ${activeTab === 'applications' ? 'ring-2 ring-[#4E7B38]' : 'hover:shadow-md'}`}
                  onClick={() => setActiveTab('applications')}
                >
                  <div className="card-body p-4 d-flex align-items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#E3F2FD] text-[#1565C0] flex items-center justify-center shrink-0 fs-3">
                      <i className="fas fa-file-signature"></i>
                    </div>
                    <div>
                      <h6 className="text-gray-500 font-bold text-uppercase tracking-wider fs-7 mb-1">Applications</h6>
                      <p className="display-6 font-black text-gray-800 mb-0">{counts.applications}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4 mb-5">
              <div className="col-md-6">
                <div 
                  className={`card border-0 shadow-sm rounded-3xl overflow-hidden transition-all cursor-pointer ${activeTab === 'payments' ? 'ring-2 ring-[#4E7B38]' : 'hover:shadow-md'}`}
                  onClick={() => setActiveTab('payments')}
                >
                  <div className="card-body p-4 d-flex align-items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0 fs-3">
                      <i className="fas fa-wallet"></i>
                    </div>
                    <div>
                      <h6 className="text-gray-500 font-bold text-uppercase tracking-wider fs-7 mb-1">Payments</h6>
                      <p className="display-6 font-black text-gray-800 mb-0">{counts.payments}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div 
                  className={`card border-0 shadow-sm rounded-3xl overflow-hidden transition-all cursor-pointer ${activeTab === 'announcements' ? 'ring-2 ring-[#4E7B38]' : 'hover:shadow-md'}`}
                  onClick={() => setActiveTab('announcements')}
                >
                  <div className="card-body p-4 d-flex align-items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#FFE8E8] text-[#D64545] flex items-center justify-center shrink-0 fs-3">
                      <i className="fas fa-bullhorn"></i>
                    </div>
                    <div>
                      <h6 className="text-gray-500 font-bold text-uppercase tracking-wider fs-7 mb-1">Announcements</h6>
                      <p className="display-6 font-black text-gray-800 mb-0">{counts.announcements}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs Content */}
            <div className="dashboard-content">
              {activeTab === 'overview' && (
                <div className="card border-0 shadow-sm rounded-3xl p-5 text-center bg-gray-50">
                  <i className="fas fa-chart-line fa-3x text-gray-300 mb-3"></i>
                  <h4 className="text-gray-500">Dashboard Overview</h4>
                  <p className="text-gray-400 mb-4">
                    Use the stat cards above to manage parents, children, applications, payments, and announcements.
                  </p>
                  <Link href="/admin/parents" className="btn btn-outline-primary">
                    <i className="fas fa-user-plus me-2"></i>
                    Add parent portal accounts
                  </Link>
                </div>
              )}

              {activeTab === 'parents' && (
                <div className="card border-0 shadow-sm rounded-3xl p-5 text-center bg-gray-50">
                  <i className="fas fa-users fa-3x text-[#4E7B38] mb-3"></i>
                  <h4 className="text-gray-700">Parents &amp; portal login</h4>
                  <p className="text-gray-500 mb-4">
                    Create Supabase logins and link them to parent records so families can sign in and use the
                    dashboard, payments, and messages.
                  </p>
                  <p className="small text-muted mb-4">
                    Needs <code className="bg-white px-1 rounded">SUPABASE_SERVICE_ROLE_KEY</code> in{' '}
                    <code className="bg-white px-1 rounded">.env.local</code> (never expose in the browser).
                  </p>
                  <button
                    type="button"
                    className="btn btn-link btn-sm text-muted mb-2 d-block mx-auto"
                    onClick={() => setActiveTab('overview')}
                  >
                    ← Back to overview
                  </button>
                  <Link href="/admin/parents" className="btn btn-primary">
                    Open parents management
                  </Link>
                </div>
              )}
              
              {activeTab === 'applications' && <AdminApplicationsTab />}
              
              {activeTab === 'children' && <AdminChildrenTab />}

              {activeTab === 'payments' && (
                <div className="card border-0 shadow-sm rounded-3xl p-5 text-center bg-gray-50">
                  <i className="fas fa-wallet fa-3x text-[#2E7D32] mb-3"></i>
                  <h4 className="text-gray-700">Payments</h4>
                  <p className="text-gray-500 mb-4">
                    Record tuition and fees, link them to a parent and child, and update balances.
                  </p>
                  <Link href="/admin/payments" className="btn btn-primary">
                    Open payments
                  </Link>
                </div>
              )}

              {activeTab === 'announcements' && (
                <div className="card border-0 shadow-sm rounded-3xl p-5 text-center bg-gray-50">
                  <i className="fas fa-bullhorn fa-3x text-[#D64545] mb-3"></i>
                  <h4 className="text-gray-700">Announcements</h4>
                  <p className="text-gray-500 mb-4">Create and manage updates for parents and staff.</p>
                  <Link href="/admin/announcements" className="btn btn-primary">
                    Open Announcements
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}
