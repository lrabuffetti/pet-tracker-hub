'use client'

import { useTranslation } from '@repo/ui/context/I18nContext'

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
      <h1 className="text-2xl font-bold text-gray-900">{t('nav.settings')}</h1>
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-4xl" aria-hidden>
          ⚙️
        </p>
        <p className="mt-4 text-lg font-medium text-gray-900">
          {t('nav.comingSoon')}
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Dispositivos, geocercas y perfil
        </p>
      </div>
    </div>
  )
}
