'use client'

import { Button, Input } from '@repo/ui'
import { useTranslation } from '@repo/ui/context/I18nContext'
import { useCreatePet } from '@repo/ui/hooks/useCreatePet'
import type { PetType } from '@repo/ui/types/pet'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

const PET_TYPES: PetType[] = ['DOG', 'CAT', 'OTHER']

export default function AddPetPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    name,
    setName,
    type,
    setType,
    ageMode,
    setAgeMode,
    birthdate,
    setBirthdate,
    ageYears,
    setAgeYears,
    ageMonths,
    setAgeMonths,
    avatarFile,
    setAvatarFile,
    isSubmitting,
    errorMessage,
    isFormValid,
    handleSubmit,
  } = useCreatePet({
    onSuccess: () => router.replace('/dashboard'),
  })

  return (
    <div className="mx-auto flex w-full max-w-[500px] flex-col gap-3 rounded-xl border border-gray-300 bg-white p-4">
      <h1 className="text-center text-2xl font-bold">{t('addPet.title')}</h1>
      <p className="text-center text-base text-gray-600">
        {t('addPet.subtitle')}
      </p>

      <label className="text-sm font-medium text-gray-700">
        {t('addPet.name')}
      </label>
      <Input
        type="text"
        placeholder={t('addPet.namePlaceholder')}
        value={name}
        onChangeText={setName}
      />

      <label className="text-sm font-medium text-gray-700">
        {t('addPet.type')}
      </label>
      <div className="mb-3 flex gap-2">
        {PET_TYPES.map((petType) => (
          <button
            key={petType}
            type="button"
            onClick={() => setType(petType)}
            className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${
              type === petType
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-300 bg-white text-gray-700'
            }`}
          >
            {t(`petType.${petType}`)}
          </button>
        ))}
      </div>

      <label className="text-sm font-medium text-gray-700">
        {t('addPet.age')}
      </label>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setAgeMode('approximate')}
          className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${
            ageMode === 'approximate'
              ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
              : 'border-gray-300 bg-white text-gray-700'
          }`}
        >
          {t('addPet.ageApproximate')}
        </button>
        <button
          type="button"
          onClick={() => setAgeMode('exact')}
          className={`flex-1 rounded-xl border px-3 py-2 text-sm font-semibold ${
            ageMode === 'exact'
              ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
              : 'border-gray-300 bg-white text-gray-700'
          }`}
        >
          {t('addPet.ageExact')}
        </button>
      </div>

      {ageMode === 'exact' ? (
        <input
          type="date"
          value={birthdate}
          onChange={(event) => setBirthdate(event.target.value)}
          className="mb-3 w-full rounded-xl border border-gray-300 p-3 text-base"
        />
      ) : (
        <div className="mb-3 flex gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-sm text-gray-600">
              {t('addPet.years')}
            </label>
            <Input type="number" value={ageYears} onChangeText={setAgeYears} />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-sm text-gray-600">
              {t('addPet.months')}
            </label>
            <Input
              type="number"
              value={ageMonths}
              onChangeText={setAgeMonths}
            />
          </div>
        </div>
      )}

      <label className="text-sm font-medium text-gray-700">
        {t('addPet.avatar')}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]

          if (!file) {
            setAvatarFile(null)
            return
          }

          setAvatarFile({
            uri: URL.createObjectURL(file),
            fileName: file.name,
            mimeType: file.type,
            blob: file,
          })
        }}
      />
      <Button
        variant="secondary"
        type="button"
        onClick={() => fileInputRef.current?.click()}
      >
        {avatarFile ? t('addPet.avatarSelected') : t('addPet.avatarHint')}
      </Button>

      {avatarFile && (
        <img
          src={avatarFile.uri}
          alt={name || t('addPet.avatar')}
          className="mx-auto h-32 w-32 rounded-full object-cover"
        />
      )}

      <Button
        variant="primary"
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting || !isFormValid}
      >
        {isSubmitting ? t('addPet.submitting') : t('addPet.submit')}
      </Button>

      <Button variant="link" type="button" onClick={() => router.back()}>
        {t('addPet.cancel')}
      </Button>

      {errorMessage && (
        <p className="text-center text-base text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}
