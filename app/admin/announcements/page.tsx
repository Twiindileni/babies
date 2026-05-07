'use client'

import { FormEvent, useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { PortalTabs } from '@/components/portal/PortalTabs'
import type { Database } from '@/lib/supabase/types'
import toast from 'react-hot-toast'

type Announcement = Database['public']['Tables']['announcements']['Row']

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()

  const load = async () => {
    const { data } = await supabase.from('announcements').select('*').order('created_at', { ascending: false })
    setAnnouncements(data ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const title = (fd.get('title') || '').toString().trim()
    const content = (fd.get('content') || '').toString().trim()
    if (!title || !content) return

    const { error } = await supabase.from('announcements').insert([
      {
        title,
        content,
        type: 'general',
        priority: 'medium',
        target_audience: 'all',
        is_active: true,
        created_by: '00000000-0000-0000-0000-000000000000',
      },
    ])

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Announcement created')
    form.reset()
    load()
  }

  return (
    <>
      <PortalTabs type="admin" />
      <div className="container py-4">
        <h1 className="mb-4">Announcements</h1>

        <form className="card p-3 mb-4" onSubmit={onSubmit}>
          <div className="mb-2">
            <label className="form-label">Title</label>
            <input name="title" className="form-control" required />
          </div>
          <div className="mb-2">
            <label className="form-label">Content</label>
            <textarea name="content" className="form-control" rows={3} required></textarea>
          </div>
          <button className="btn btn-primary" type="submit">Create Announcement</button>
        </form>

        {loading ? (
          <p>Loading announcements...</p>
        ) : announcements.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          <div className="row g-3">
            {announcements.map((item) => (
              <div className="col-12" key={item.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="text-muted mb-2">{item.type} | {item.priority}</p>
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
