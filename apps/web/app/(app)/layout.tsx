'use client'

import { RequireAuth } from '@repo/ui/components/RequireAuth'
import { PetProvider } from '@repo/ui/context/PetContext'
import { APP_NAME } from '@repo/ui/navigation/config'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { AppSidebar } from '@/components/navigation/AppSidebar'

type AppLayoutProps = {
  children: ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <RequireAuth onUnauthenticated={() => router.replace('/')}>
      <PetProvider>
        <div className="flex min-h-screen bg-gray-50">
          <AppSidebar className="hidden lg:flex" />

          {isSidebarOpen && (
            <>
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                onClick={closeSidebar}
              />
              <AppSidebar
                className="fixed inset-y-0 left-0 z-50 lg:hidden"
                onNavigate={closeSidebar}
              />
            </>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
              <button
                type="button"
                aria-label="Open menu"
                className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden
                >
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </button>
              <Link
                href="/dashboard"
                className="flex items-center gap-2"
                onClick={closeSidebar}
              >
                <span className="text-xl" aria-hidden>
                  🐾
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {APP_NAME}
                </span>
              </Link>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </PetProvider>
    </RequireAuth>
  )
}
