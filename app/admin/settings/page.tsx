'use client'

import { PortalTabs } from '@/components/portal/PortalTabs'

export default function AdminSettingsPage() {
  return (
    <>
      <PortalTabs type="admin" />
      <div className="container py-4">
        <h1 className="mb-4">Settings</h1>
        <div className="card p-4">
          <h5>System Settings</h5>
          <p className="mb-1">This page is ready for:</p>
          <ul className="mb-0">
            <li>Admin profile/password updates</li>
            <li>School information updates</li>
            <li>Notification preferences</li>
          </ul>
        </div>
      </div>
    </>
  )
}
