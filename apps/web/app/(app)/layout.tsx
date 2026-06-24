'use client'

import { RequireAuth } from '@repo/ui/components/RequireAuth'
import { PetProvider } from '@repo/ui/context/PetContext'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { AppSidebar } from '@/components/navigation/AppSidebar'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter()

  return (
    <RequireAuth onUnauthenticated={() => router.replace('/')}>
      <PetProvider>
        <div className="flex min-h-screen bg-gray-50">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
        </div>
      </PetProvider>
    </RequireAuth>
  )
}
