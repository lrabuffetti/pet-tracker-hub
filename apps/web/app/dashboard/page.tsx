'use client'

import { RequireAuth } from '@repo/ui/components/RequireAuth'
import { useTranslation } from '@repo/ui/context/I18nContext'
import { useAuth } from '@repo/ui/hooks/useAuth'
import { useDashboard } from '@repo/ui/hooks/useDashboard'
import { formatPetAge } from '@repo/ui/utils/petAge'
import type { Pet } from '@repo/ui/types/pet'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

function PetCard({
  pet,
  ageLabel,
  typeLabel,
}: {
  pet: Pet
  ageLabel: string
  typeLabel: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
      {pet.avatarUrl ? (
        <Image
          src={pet.avatarUrl}
          alt={pet.name}
          className="h-16 w-16 rounded-full object-cover"
          width={64}
          height={64}
        />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-2xl">
          🐾
        </div>
      )}
      <div className="text-left">
        <p className="text-lg font-semibold">{pet.name}</p>
        <p className="text-sm text-gray-600">
          {typeLabel} · {ageLabel}
        </p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { t, locale } = useTranslation()
  const { data, isLoading, errorMessage } = useDashboard()

  const hasPets = (data?.pets.length ?? 0) > 0

  return (
    <RequireAuth onUnauthenticated={() => router.replace('/')}>
      <div className="flex min-h-screen flex-col items-center gap-4 px-6 py-10">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {user && <p className="text-base text-gray-600">{user.email}</p>}

        {isLoading && (
          <p className="text-base text-gray-500">{t('dashboard.loading')}</p>
        )}

        {!isLoading && hasPets && (
          <div className="flex w-full max-w-md flex-col gap-4">
            <h2 className="text-lg font-semibold">{t('dashboard.yourPets')}</h2>
            {data!.pets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                typeLabel={t(`petType.${pet.type}`)}
                ageLabel={formatPetAge(pet.birthdate, locale)}
              />
            ))}
            <Link
              href="/pets/new"
              className="w-full rounded-xl border-2 border-indigo-600 py-3 text-center text-lg font-semibold text-indigo-600"
            >
              {t('dashboard.addAnotherPet')}
            </Link>
          </div>
        )}

        {!isLoading && !hasPets && !errorMessage && (
          <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-gray-200 p-6 text-center">
            <h2 className="text-lg font-semibold">
              {t('dashboard.emptyTitle')}
            </h2>
            <p className="text-base text-gray-600">
              {t('dashboard.emptySubtitle')}
            </p>
            <Link
              href="/pets/new"
              className="w-full rounded-xl bg-indigo-600 py-3 text-center text-lg font-bold text-white"
            >
              {t('dashboard.addPet')}
            </Link>
          </div>
        )}

        {errorMessage && (
          <p className="text-center text-base text-red-500">{errorMessage}</p>
        )}

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
