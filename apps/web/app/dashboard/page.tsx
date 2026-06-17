'use client'

import { RequireAuth } from '@repo/ui/components/RequireAuth'
import { useAuth } from '@repo/ui/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()

  return (
    <RequireAuth onUnauthenticated={() => router.replace('/')}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {user && <p className="text-base text-gray-600">{user.email}</p>}
        <button
          type="button"
          className="text-base text-[#2e78b7] underline"
          onClick={() => {
            logout().then(() => router.replace('/'))
          }}
        >
          Log out
        </button>
      </div>
    </RequireAuth>
  )
}
