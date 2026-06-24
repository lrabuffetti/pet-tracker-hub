'use client'

import { useTranslation } from '@repo/ui/context/I18nContext'
import { usePetContext } from '@repo/ui/context/PetContext'

export default function MapPage() {
  const { t } = useTranslation()
  const { selectedPet } = usePetContext()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">{t('nav.map')}</h1>
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-4xl" aria-hidden>
          📍
        </p>
        <p className="mt-4 text-lg font-medium text-gray-900">
          {t('nav.comingSoon')}
        </p>
        {selectedPet && (
          <p className="mt-2 text-sm text-gray-600">
            {selectedPet.name} — live tracking
          </p>
        )}
      </div>
    </div>
  )
}
