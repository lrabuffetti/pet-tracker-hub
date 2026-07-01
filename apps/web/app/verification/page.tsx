'use client'

import { Button, Input } from '@repo/ui'
import { useVerify } from '@repo/ui/hooks/useVerify'
import { useRouter, useSearchParams } from 'next/navigation'

const VerificationPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailFromQuery = searchParams.get('email') ?? ''

  const {
    email,
    code,
    isSubmitting,
    errorMessage,
    successMessage,
    isFormValid,
    showEmailError,
    showCodeError,
    handleVerify,
    setEmail,
    setCode,
  } = useVerify(emailFromQuery, {
    onSuccessRedirect: () => router.push('/'),
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6">
      <div className="flex w-full max-w-[400px] flex-col gap-4 rounded-xl border border-gray-300 p-4">
        <h1 className="mb-6 mt-6 text-center text-2xl font-bold">
          Verification
        </h1>
        <p className="text-center text-base">
          We&apos;ve sent a verification code to your email.
        </p>
        <Input
          type="email"
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        {showEmailError && (
          <p className="ml-3 text-base text-red-500">Invalid email</p>
        )}
        <Input
          type="number"
          value={code}
          onChangeText={setCode}
          placeholder="Enter the code"
          maxLength={6}
        />
        {showCodeError && (
          <p className="ml-3 text-base text-red-500">
            Code must be 6 digits
          </p>
        )}
        <Button
          variant="primary"
          type="button"
          onClick={handleVerify}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? 'Verifying...' : 'Verify'}
        </Button>
      </div>
      {successMessage && (
        <p className="mt-6 text-center text-base text-green-500">
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="mt-6 text-center text-base text-red-500">
          {errorMessage}
        </p>
      )}
    </div>
  )
}

export default VerificationPage
