'use client'

import { Button, Input } from '@repo/ui'
import { useSignUp } from '@repo/ui/hooks/useSignUp'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const SignupPage = () => {
  const router = useRouter()
  const {
    isSubmitting,
    email,
    password,
    confirmPassword,
    errorMessage,
    successMessage,
    isFormValid,
    handleSignup,
    setEmail,
    setPassword,
    setConfirmPassword,
    showEmailError,
    showPasswordError,
    showConfirmPasswordError,
  } = useSignUp({
    onSuccessRedirect: (signedUpEmail) =>
      router.push(
        `/verification?email=${encodeURIComponent(signedUpEmail)}`,
      ),
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex w-[500px] flex-col gap-3 rounded-xl border border-gray-300 p-3">
        <h1 className="mb-6 mt-6 text-center text-2xl font-bold">
          Create an account
        </h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        {showEmailError && (
          <p className="ml-3 text-base text-red-500">Invalid email</p>
        )}
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        {showPasswordError && (
          <p className="ml-3 text-base text-red-500">Invalid password</p>
        )}
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {showConfirmPasswordError && (
          <p className="ml-3 text-base text-red-500">Passwords do not match</p>
        )}
        <Button
          variant="primary"
          type="button"
          onClick={handleSignup}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
        <p className="mt-6 text-center text-base">
          Already have an account?{' '}
          <Link href="/" className="text-[#2e78b7] underline">
            Login
          </Link>
        </p>
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

export default SignupPage
