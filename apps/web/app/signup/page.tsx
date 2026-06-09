'use client'

import { Button } from '@repo/ui'
import { useSignUp } from '@repo/ui/hooks/useSignUp'
import Link from 'next/link'

const SignupPage = () => {
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
  } = useSignUp()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex w-[500px] flex-col gap-3 rounded-xl border border-gray-300 p-3">
        <h1 className="mb-6 mt-6 text-center text-2xl font-bold">
          Create an account
        </h1>
        <input
          type="email"
          className="mb-3 w-full rounded-xl border border-gray-300 p-3 focus:outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {showEmailError && (
          <p className="ml-3 text-base text-red-500">Invalid email</p>
        )}
        <input
          type="password"
          className="mb-3 w-full rounded-xl border border-gray-300 p-3 focus:outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showPasswordError && (
          <p className="ml-3 text-base text-red-500">Invalid password</p>
        )}
        <input
          type="password"
          className="mb-3 w-full rounded-xl border border-gray-300 p-3 focus:outline-none"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {showConfirmPasswordError && (
          <p className="ml-3 text-base text-red-500">Passwords do not match</p>
        )}
        <Button
          type="button"
          onClick={handleSignup}
          disabled={isSubmitting || !isFormValid}
          className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
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
