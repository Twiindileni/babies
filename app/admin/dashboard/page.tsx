'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import { AdminApplicationsTab } from '@/components/admin/AdminApplicationsTab'
import { AdminChildrenTab } from '@/components/admin/AdminChildrenTab'

type Counts = {
  parents: number
  children: number
  applications: number
  payments: number
}

type DashboardTab = 'overview' | 'applications' | 'children'

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Counts>({ parents: 0, children: 0, applications: 0, payments: 0 })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview')
  const [supabase] = useState(() => createSupabaseClient())

  useEffect(() => {
    const load = async () => {
      const [{ count: parents }, { count: children }, { count: applications }, { count: payments }] =
        await Promise.all([
          supabase.from('parents').select('*', { count: 'exact', head: true }),
          supabase.from('children').select('*', { count: 'exact', head: true }),
          supabase.from('enrollment_applications').select('*', { count: 'exact', head: true }),
          supabase.from('payments').select('*', { count: 'exact', head: true }),
        ])

      setCounts({
        parents: parents ?? 0,
        children: children ?? 0,
        applications: applications ?? 0,
        payments: payments ?? 0,
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
            <div className="row g-4 mb-5">
              <div className="col-md-3">
                <div 
                  className={`card border-0 shadow-sm rounded-3xl overflow-hidden transition-all cursor-pointer ${activeTab === 'overview' ? 'ring-2 ring-[#4E7B38]' : 'hover:shadow-md'}`}
                  onClick={() => setActiveTab('overview')}
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

              <div className="col-md-3">
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

              <div className="col-md-3">
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

              <div className="col-md-3">
                <div 
                  className="card border-0 shadow-sm rounded-3xl overflow-hidden transition-all cursor-pointer hover:shadow-md"
                >
                  <div className="card-body p-4 d-flex align-items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#FFE8E8] text-[#D64545] flex items-center justify-center shrink-0 fs-3">
                      <i className="fas fa-wallet"></i>
                    </div>
                    <div>
                      <h6 className="text-gray-500 font-bold text-uppercase tracking-wider fs-7 mb-1">Payments</h6>
                      <p className="display-6 font-black text-gray-800 mb-0">{counts.payments}</p>
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
                  <p className="text-gray-400">Click on the Children or Applications cards above to view and manage them directly!</p>
                </div>
              )}
              
              {activeTab === 'applications' && <AdminApplicationsTab />}
              
              {activeTab === 'children' && <AdminChildrenTab />}
            </div>
          </>
        )}
      </div>
    </>
  )
}
