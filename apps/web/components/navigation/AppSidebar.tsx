'use client'

import { PetSelector } from '@repo/ui/components/PetSelector'
import { useTranslation } from '@repo/ui/context/I18nContext'
import { usePetContext } from '@repo/ui/context/PetContext'
import { useAuth } from '@repo/ui/hooks/useAuth'
import { APP_NAME, NAV_ITEMS } from '@repo/ui/navigation/config'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@repo/ui'

const NAV_ICONS: Record<string, string> = {
  dashboard: '📊',
  map: '📍',
  medical: '📋',
  settings: '⚙️',
}

type AppSidebarProps = {
  className?: string
  onNavigate?: () => void
}

export const AppSidebar = ({ className = '', onNavigate }: AppSidebarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const { pets, selectedPetId, setSelectedPetId } = usePetContext()

  const handleLogout = async () => {
    await logout()
    onNavigate?.()
    router.replace('/')
  }

  return (
    <aside
      className={`flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white ${className}`}
    >
      <div className="border-b border-gray-200 px-5 py-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
          onClick={onNavigate}
        >
          <span className="text-2xl" aria-hidden>
            🐾
          </span>
          <span className="text-lg font-bold text-gray-900">{APP_NAME}</span>
        </Link>
      </div>

      <div className="border-b border-gray-200 px-5 py-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
          {t('nav.selectPet')}
        </p>
        <PetSelector
          pets={pets}
          selectedPetId={selectedPetId}
          onSelect={setSelectedPetId}
          emptyLabel={t('dashboard.emptyTitle')}
        />
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.webHref ||
              (item.id === 'dashboard' && pathname.startsWith('/pets'))

            return (
              <li key={item.id}>
                <Link
                  href={item.webHref}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span aria-hidden>{NAV_ICONS[item.id]}</span>
                  {t(item.labelKey)}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-gray-200 px-5 py-4">
        {user && (
          <p className="mb-3 truncate text-sm text-gray-600">{user.email}</p>
        )}
        <Button
          variant="link"
          type="button"
          className="!w-auto !p-0 !text-left"
          onClick={handleLogout}
        >
          {t('nav.logout')}
        </Button>
      </div>
    </aside>
  )
}
