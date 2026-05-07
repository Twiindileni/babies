'use client'

import { PortalTabs } from '@/components/portal/PortalTabs'

export default function ParentMessagesPage() {
  return (
    <>
      <PortalTabs type="parent" />
      <div className="container py-4">
        <h1 className="mb-3">Messages</h1>
        <div className="alert alert-info mb-0">
          Messaging UI has been scaffolded. Next step is wiring message threads/actions to your backend table or API.
        </div>
      </div>
    </>
  )
}
