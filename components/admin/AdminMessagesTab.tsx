'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'
import toast from 'react-hot-toast'

type ContactMessage = Database['public']['Tables']['contact_messages']['Row']

export function AdminMessagesTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null)
  const [supabase] = useState(() => createSupabaseClient())

  useEffect(() => {
    loadMessages()
  }, [supabase])

  const loadMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      toast.error('Failed to load messages: ' + error.message)
    } else {
      setMessages(data ?? [])
    }
    setLoading(false)
  }

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status: 'Read' })
      .eq('id', id)
    
    if (error) {
      toast.error('Failed to update status')
    } else {
      setMessages(msgs => msgs.map(m => m.id === id ? { ...m, status: 'Read' } : m))
      if (selectedMsg?.id === id) {
        setSelectedMsg({ ...selectedMsg, status: 'Read' })
      }
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)
    
    if (error) {
      toast.error('Failed to delete message')
    } else {
      toast.success('Message deleted')
      setMessages(msgs => msgs.filter(m => m.id !== id))
      if (selectedMsg?.id === id) setSelectedMsg(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Unread': return 'bg-[#FFE8E8] text-[#D64545] border-[#D64545]/20'
      case 'Read': return 'bg-[#E8F5E4] text-[#4E7B38] border-[#4E7B38]/20'
      case 'Replied': return 'bg-[#E3F2FD] text-[#1565C0] border-[#1565C0]/20'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="relative">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h4 font-bold text-gray-800 mb-0">Contact Messages</h2>
        <div className="badge bg-gray-100 text-gray-600 px-3 py-2 rounded-full fs-6">
          {messages.filter(m => m.status === 'Unread').length} New
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <div className="spinner-border text-[#4E7B38]" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : messages.length === 0 ? (
        <div className="card border-0 shadow-sm rounded-3xl p-5 text-center bg-gray-50">
          <i className="fas fa-envelope-open fa-3x text-gray-300 mb-3"></i>
          <h4 className="text-gray-500">No messages yet</h4>
          <p className="text-gray-400">When someone fills out the contact form, their message will appear here.</p>
        </div>
      ) : (
        <div className="card border-0 shadow-sm rounded-3xl overflow-hidden bg-white">
          <div className="table-responsive mb-0">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-gray-50 border-bottom border-gray-100">
                <tr>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Sender</th>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Subject</th>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Date</th>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7">Status</th>
                  <th className="py-4 px-4 font-bold text-gray-600 text-uppercase tracking-wider fs-7 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr 
                    key={msg.id} 
                    className={`transition-colors cursor-pointer ${msg.status === 'Unread' ? 'bg-[#FFF9C4]/10 hover:bg-[#FFF9C4]/20' : 'hover:bg-gray-50/50'}`}
                    onClick={() => {
                      setSelectedMsg(msg)
                      if (msg.status === 'Unread') markAsRead(msg.id)
                    }}
                  >
                    <td className="py-4 px-4">
                      <div className="font-bold text-gray-800">{msg.name}</div>
                      <div className="text-sm text-gray-500">{msg.email}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-700 font-medium">
                      {msg.subject}
                    </td>
                    <td className="py-4 px-4 text-gray-500 text-sm">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`badge border px-3 py-2 rounded-full fw-medium ${getStatusBadge(msg.status)}`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-end">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteMessage(msg.id)
                        }}
                        className="btn btn-sm btn-outline-danger rounded-xl px-3"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Detail Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden d-flex flex-column">
            <div className="p-6 border-bottom border-gray-100 d-flex justify-content-between align-items-center bg-gray-50">
              <h3 className="h4 font-bold text-gray-800 mb-0 d-flex align-items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#4E7B38]">
                  <i className="fas fa-envelope"></i>
                </div>
                Message from {selectedMsg.name}
              </h3>
              <button 
                onClick={() => setSelectedMsg(null)}
                className="btn btn-sm btn-light rounded-circle w-10 h-10 d-flex align-items-center justify-content-center hover:bg-gray-200"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow-1 custom-scrollbar">
              <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label className="text-sm text-gray-500 block">From</label>
                    <span className="font-bold text-gray-800">{selectedMsg.name}</span>
                    <br />
                    <a href={`mailto:${selectedMsg.email}`} className="text-[#4E7B38] hover:underline text-sm">{selectedMsg.email}</a>
                  </div>
                  <div className="col-sm-6 text-sm-end">
                    <label className="text-sm text-gray-500 block">Sent On</label>
                    <span className="font-medium text-gray-700">
                      {new Date(selectedMsg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="col-12">
                    <label className="text-sm text-gray-500 block">Subject</label>
                    <span className="font-bold text-lg text-gray-900">{selectedMsg.subject}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-100 min-h-[200px]">
                <label className="text-sm text-gray-400 block mb-3 text-uppercase tracking-widest font-bold">Message Content</label>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selectedMsg.message}
                </p>
              </div>
            </div>

            <div className="p-6 border-top border-gray-100 d-flex justify-content-end gap-3 bg-gray-50">
              <button 
                onClick={() => setSelectedMsg(null)} 
                className="btn btn-light rounded-xl px-4"
              >
                Close
              </button>
              <a 
                href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                className="btn btn-primary rounded-xl px-4 d-flex align-items-center gap-2"
              >
                <i className="fas fa-reply"></i> Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
