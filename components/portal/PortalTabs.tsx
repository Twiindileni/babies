'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type PortalType = 'parent' | 'admin'

const parentTabs = [
  { href: '/parent/dashboard', label: 'Dashboard' },
  { href: '/parent/children', label: 'Children' },
  { href: '/parent/payments', label: 'Payments' },
  { href: '/parent/announcements', label: 'Announcements' },
  { href: '/parent/messages', label: 'Messages' },
]

const adminTabs = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/parents', label: 'Parents' },
  { href: '/admin/children', label: 'Children' },
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/payments', label: 'Payments' },
  { href: '/admin/announcements', label: 'Announcements' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/settings', label: 'Settings' },
]

export function PortalTabs({ type }: { type: PortalType }) {
  const pathname = usePathname()
  const tabs = type === 'admin' ? adminTabs : parentTabs

  return (
    <div className="mb-4 border-bottom">
      <div className="container py-2 d-flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-secondary'}`}
            >
              {tab.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
