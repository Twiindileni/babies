'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'
import toast from 'react-hot-toast'

type Application = Database['public']['Tables']['enrollment_applications']['Row']

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)
  const [supabase] = useState(() => createSupabaseClient())

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('enrollment_applications')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        toast.error('Failed to load applications: ' + error.message)
      } else {
        setApplications(data ?? [])
      }
      setLoading(false)
    }
    load()
  }, [supabase])

  const updateStatus = async (id: string, newStatus: 'Approved' | 'Rejected') => {
    try {
      const { error } = await supabase
        .from('enrollment_applications')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error

      setApplications(apps => apps.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ))
      
      if (selectedApp?.id === id) {
        setSelectedApp({ ...selectedApp, status: newStatus })
      }
      
      toast.success(`Application ${newStatus.toLowerCase()} successfully`)
    } catch (error: any) {
      toast.error(error.message || 'Failed to update application status')
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'Approved': return 'bg-[#E8F5E4] text-[#4E7B38] border-[#4E7B38]/20'
      case 'Rejected': return 'bg-[#FFE8E8] text-[#D64545] border-[#D64545]/20'
      default: return 'bg-[#FFF9C4] text-[#8B6E4E] border-[#D4AF37]/20'
    }
  }

  return (
    <>
      <PortalTabs type="admin" />
      <div className="container py-5 relative">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h1 className="display-6 font-extrabold text-[#1f2937] mb-0">Enrollment Applications</h1>
          <div className="badge bg-white text-gray-600 border border-gray-200 px-4 py-2 rounded-full shadow-sm fs-6">
            Total: {applications.length}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="spinner-border text-[#4E7B38]" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-gray-500">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-3xl p-5 text-center bg-gray-50">
            <i className="fas fa-inbox fa-3x text-gray-300 mb-3"></i>
            <h4 className="text-gray-500">No applications found</h4>
            <p className="text-gray-400">When parents submit enrollment forms, they will appear here.</p>
          </div>
        ) : (
          <div className="card border-0 shadow-xl rounded-3xl overflow-hidden bg-white">
            <div className="table-responsive mb-0">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-gray-50 border-bottom border-gray-100">
                  <tr>
                    <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Child Details</th>
                    <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Parent Contact</th>
                    <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Date Submitted</th>
                    <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Status</th>
                    <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="py-4 px-4">
                        <div className="d-flex align-items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#E8F5E4] text-[#4E7B38] flex items-center justify-center shrink-0">
                            <i className="fas fa-child"></i>
                          </div>
                          <div>
                            <div className="font-bold text-gray-800">{app.child_full_name}</div>
                            <div className="text-sm text-gray-500">
                              DOB: {app.date_of_birth_day}/{app.date_of_birth_month}/{app.date_of_birth_year}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-gray-700">{app.parent1_name}</div>
                        <div className="text-sm text-gray-500">
                          <a href={`mailto:${app.parent1_email}`} className="text-[#4E7B38] hover:underline me-2">
                            <i className="fas fa-envelope me-1"></i> Email
                          </a>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-500 ms-2">
                            <i className="fas fa-phone me-1"></i> {app.parent1_cell_phone}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`badge border px-3 py-2 rounded-full fw-medium ${getStatusBadgeClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-end">
                        <button 
                          onClick={() => setSelectedApp(app)}
                          className="btn btn-sm btn-outline-secondary rounded-xl px-3 me-2"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden d-flex flex-column">
              <div className="p-6 border-bottom border-gray-100 d-flex justify-content-between align-items-center bg-gray-50">
                <h3 className="h4 font-bold text-gray-800 mb-0 d-flex align-items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#4E7B38]">
                    <i className="fas fa-file-signature"></i>
                  </div>
                  Application Details
                </h3>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="btn btn-sm btn-light rounded-circle w-10 h-10 d-flex align-items-center justify-content-center hover:bg-gray-200"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto flex-grow-1 custom-scrollbar">
                <div className="d-flex justify-content-between align-items-center mb-4 p-4 rounded-2xl bg-gray-50">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Current Status</div>
                    <span className={`badge border px-4 py-2 rounded-full fs-6 ${getStatusBadgeClass(selectedApp.status)}`}>
                      {selectedApp.status}
                    </span>
                  </div>
                  {selectedApp.status === 'Pending' && (
                    <div className="d-flex gap-3">
                      <button 
                        onClick={() => updateStatus(selectedApp.id, 'Rejected')}
                        className="btn bg-[#FFE8E8] text-[#D64545] hover:bg-[#D64545] hover:text-white transition-colors rounded-xl px-4 py-2 font-medium"
                      >
                        <i className="fas fa-times me-2"></i> Reject
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedApp.id, 'Approved')}
                        className="btn bg-[#E8F5E4] text-[#4E7B38] hover:bg-[#4E7B38] hover:text-white transition-colors rounded-xl px-4 py-2 font-medium"
                      >
                        <i className="fas fa-check me-2"></i> Approve
                      </button>
                    </div>
                  )}
                </div>

                <div className="row g-4">
                  {/* Child Info */}
                  <div className="col-md-6">
                    <div className="card h-100 border-gray-100 rounded-2xl shadow-sm">
                      <div className="card-body">
                        <h5 className="font-bold text-gray-800 mb-4 border-bottom pb-2">Child Information</h5>
                        <ul className="list-unstyled space-y-3 mb-0">
                          <li><span className="text-gray-500 d-inline-block w-32">Full Name:</span> <span className="font-medium">{selectedApp.child_full_name}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Preferred:</span> <span className="font-medium">{selectedApp.child_preferred_name || 'N/A'}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">DOB:</span> <span className="font-medium">{selectedApp.date_of_birth_day}/{selectedApp.date_of_birth_month}/{selectedApp.date_of_birth_year}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Address:</span> <span className="font-medium">{selectedApp.address}</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Medical Info */}
                  <div className="col-md-6">
                    <div className="card h-100 border-gray-100 rounded-2xl shadow-sm">
                      <div className="card-body">
                        <h5 className="font-bold text-gray-800 mb-4 border-bottom pb-2">Medical Information</h5>
                        <ul className="list-unstyled space-y-3 mb-0">
                          <li><span className="text-gray-500 d-inline-block w-32">Doctor:</span> <span className="font-medium">{selectedApp.doctor_name || 'N/A'}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Doctor Phone:</span> <span className="font-medium">{selectedApp.doctor_phone || 'N/A'}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Allergies:</span> <span className={`font-bold ${selectedApp.allergies === 'Yes' ? 'text-red-500' : 'text-green-500'}`}>{selectedApp.allergies || 'No'}</span></li>
                          {selectedApp.allergies_details && (
                            <li className="text-red-600 bg-red-50 p-2 rounded-lg text-sm mt-2">{selectedApp.allergies_details}</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Parent 1 */}
                  <div className="col-md-6">
                    <div className="card h-100 border-gray-100 rounded-2xl shadow-sm">
                      <div className="card-body">
                        <h5 className="font-bold text-gray-800 mb-4 border-bottom pb-2">Parent 1</h5>
                        <ul className="list-unstyled space-y-3 mb-0">
                          <li><span className="text-gray-500 d-inline-block w-32">Name:</span> <span className="font-medium">{selectedApp.parent1_name}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Email:</span> <a href={`mailto:${selectedApp.parent1_email}`} className="text-blue-600 hover:underline">{selectedApp.parent1_email}</a></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Cell Phone:</span> <span className="font-medium">{selectedApp.parent1_cell_phone}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Workplace:</span> <span className="font-medium">{selectedApp.parent1_workplace || 'N/A'}</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="col-md-6">
                    <div className="card h-100 border-gray-100 rounded-2xl shadow-sm bg-[#FFE8E8]/20">
                      <div className="card-body">
                        <h5 className="font-bold text-gray-800 mb-4 border-bottom pb-2">Emergency Contact</h5>
                        <ul className="list-unstyled space-y-3 mb-0">
                          <li><span className="text-gray-500 d-inline-block w-32">Name:</span> <span className="font-medium">{selectedApp.emergency_contact1_name}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Phone:</span> <span className="font-medium font-bold text-red-600">{selectedApp.emergency_contact1_home_phone}</span></li>
                          <li><span className="text-gray-500 d-inline-block w-32">Relationship:</span> <span className="font-medium">{selectedApp.emergency_contact1_relationship || 'N/A'}</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
