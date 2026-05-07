'use client'

import { useEffect, useState, FormEvent } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'
import toast from 'react-hot-toast'

type Child = Database['public']['Tables']['children']['Row']

export function AdminChildrenTab() {
  const [children, setChildren] = useState<Child[]>([])
  const [loading, setLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [supabase] = useState(() => createSupabaseClient())

  useEffect(() => {
    loadChildren()
  }, [supabase])

  const loadChildren = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('children').select('*').order('created_at', { ascending: false })
    if (error) {
      toast.error('Failed to load children')
    } else {
      setChildren(data ?? [])
    }
    setLoading(false)
  }

  const handleAddChild = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      const payload = {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        date_of_birth: formData.get('date_of_birth') as string,
        gender: formData.get('gender') as 'M' | 'F' | 'Other',
        enrollment_date: formData.get('enrollment_date') as string,
        program_type: formData.get('program_type') as 'infant' | 'toddler' | 'preschool',
        status: formData.get('status') as 'Active' | 'Inactive' | 'Waitlisted',
      }

      const { error } = await supabase.from('children').insert([payload])
      
      if (error) throw error

      toast.success('Child added successfully!')
      setIsAdding(false)
      loadChildren() // Reload the list
    } catch (error: any) {
      toast.error(error.message || 'Error adding child')
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return 'bg-[#E8F5E4] text-[#4E7B38]'
      case 'Waitlisted': return 'bg-[#FFF9C4] text-[#8B6E4E]'
      case 'Inactive': return 'bg-gray-100 text-gray-600'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 font-bold text-gray-800 mb-0">Active Children</h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="btn btn-primary d-flex align-items-center gap-2 rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition-all"
        >
          <i className="fas fa-plus"></i> Add Child
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-[#4E7B38]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : children.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-3xl p-5 text-center bg-gray-50">
          <i className="fas fa-child fa-3x text-gray-300 mb-3"></i>
          <h4 className="text-gray-500">No children found</h4>
          <p className="text-gray-400">Click the "Add Child" button to manually insert a child.</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-3xl overflow-hidden bg-white">
          <div className="table-responsive mb-0">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-gray-50 border-bottom border-gray-100">
                <tr>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Name</th>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Date of Birth</th>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Program</th>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {children.map((child) => (
                  <tr key={child.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-800">{child.first_name} {child.last_name}</div>
                      <div className="text-sm text-gray-500">Gender: {child.gender}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{child.date_of_birth}</td>
                    <td className="py-4 px-4 text-gray-600 text-capitalize">{child.program_type}</td>
                    <td className="py-4 px-4">
                      <span className={`badge px-3 py-2 rounded-full fw-medium ${getStatusBadge(child.status)}`}>
                        {child.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Child Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden d-flex flex-column">
            <div className="p-6 border-bottom border-gray-100 d-flex justify-content-between align-items-center bg-gray-50">
              <h3 className="h4 font-bold text-gray-800 mb-0 d-flex align-items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#4E7B38]">
                  <i className="fas fa-user-plus"></i>
                </div>
                Add New Child
              </h3>
              <button 
                onClick={() => setIsAdding(false)}
                className="btn btn-sm btn-light rounded-circle w-10 h-10 d-flex align-items-center justify-content-center hover:bg-gray-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow-1 custom-scrollbar">
              <form onSubmit={handleAddChild}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label font-medium text-gray-700">First Name *</label>
                    <input type="text" name="first_name" className="form-control rounded-xl" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label font-medium text-gray-700">Last Name *</label>
                    <input type="text" name="last_name" className="form-control rounded-xl" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label font-medium text-gray-700">Date of Birth *</label>
                    <input type="date" name="date_of_birth" className="form-control rounded-xl" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label font-medium text-gray-700">Gender *</label>
                    <select name="gender" className="form-select rounded-xl" required>
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label font-medium text-gray-700">Enrollment Date *</label>
                    <input type="date" name="enrollment_date" className="form-control rounded-xl" required />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label font-medium text-gray-700">Program Type *</label>
                    <select name="program_type" className="form-select rounded-xl" required>
                      <option value="">Select Program</option>
                      <option value="infant">Infant</option>
                      <option value="toddler">Toddler</option>
                      <option value="preschool">Preschool</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label font-medium text-gray-700">Status *</label>
                    <select name="status" className="form-select rounded-xl" defaultValue="Active" required>
                      <option value="Active">Active</option>
                      <option value="Waitlisted">Waitlisted</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-top border-gray-100 d-flex justify-content-end gap-3">
                  <button type="button" onClick={() => setIsAdding(false)} className="btn btn-light rounded-xl px-4">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="btn btn-primary rounded-xl px-4">
                    {submitting ? 'Saving...' : 'Save Child'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
