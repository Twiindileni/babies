'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'

type ContactMessage = Database['public']['Tables']['contact_messages']['Row']

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
      setMessages(data ?? [])
      setLoading(false)
    }
    load()
  }, [supabase])

  return (
    <>
      <PortalTabs type="admin" />
      <div className="container py-4">
        <h1 className="mb-4">Messages</h1>
        {loading ? (
          <p>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <tr key={message.id}>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.subject}</td>
                    <td>{message.status}</td>
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
