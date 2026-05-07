'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'

type Announcement = Database['public']['Tables']['announcements']['Row']

export default function ParentAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .eq('is_active', true)
        .in('target_audience', ['all', 'parents'])
        .order('created_at', { ascending: false })

      setAnnouncements(data ?? [])
      setLoading(false)
    }
    load()
  }, [supabase])

  return (
    <>
      <PortalTabs type="parent" />
      <div className="container py-4">
        <h1 className="mb-4">Announcements</h1>
        {loading ? (
          <p>Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <p>No announcements available.</p>
        ) : (
          <div className="row g-3">
            {announcements.map((item) => (
              <div key={item.id} className="col-12">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title mb-1">{item.title}</h5>
                    <p className="text-muted mb-2">
                      {item.type} | priority: {item.priority}
                    </p>
                    <p className="mb-0">{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
