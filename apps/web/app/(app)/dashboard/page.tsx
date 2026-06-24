'use client'

import { useTranslation } from '@repo/ui/context/I18nContext'
import { usePetContext } from '@repo/ui/context/PetContext'
import { useAuth } from '@repo/ui/hooks/useAuth'
import { useDashboard } from '@repo/ui/hooks/useDashboard'
import { formatPetAge } from '@repo/ui/utils/petAge'
import type { Pet } from '@repo/ui/types/pet'
import Link from 'next/link'
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
  const { user } = useAuth()
  const { t, locale } = useTranslation()
  const { data, isLoading, errorMessage } = useDashboard()
  const { selectedPet } = usePetContext()

  const hasPets = (data?.pets.length ?? 0) > 0

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t('nav.dashboard')}
        </h1>
        {user && (
          <p className="mt-1 text-base text-gray-600">{user.email}</p>
        )}
        {selectedPet && (
          <p className="mt-1 text-sm text-indigo-600">
            {t('nav.selectPet')}: {selectedPet.name}
          </p>
        )}
      </div>

      {isLoading && (
        <p className="text-base text-gray-500">{t('dashboard.loading')}</p>
      )}

      {!isLoading && hasPets && (
        <div className="flex flex-col gap-4">
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
        <div className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-6 text-center">
          <h2 className="text-lg font-semibold">{t('dashboard.emptyTitle')}</h2>
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
    </div>
  )
}
