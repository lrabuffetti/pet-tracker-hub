'use client'

import { Button, Input } from '@repo/ui'
import { useLogin } from '@repo/ui/hooks/useLogin'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter()
  const {
    email,
    password,
    isSubmitting,
    errorMessage,
    isFormValid,
    showEmailError,
    showPasswordError,
    handleLogin,
    setEmail,
    setPassword,
  } = useLogin({
    onSuccessRedirect: () => router.push('/dashboard'),
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6">
      <div className="flex w-full max-w-[500px] flex-col gap-3 rounded-xl border border-gray-300 p-4">
        <h1 className="mb-6 mt-6 text-center text-2xl font-bold">Login</h1>
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
        <Button
          variant="primary"
          type="button"
          onClick={handleLogin}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </Button>
        <p className="mt-6 text-center text-base">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#2e78b7] underline">
            Sign up
          </Link>
        </p>
      </div>
      {errorMessage && (
        <p className="mt-6 text-center text-base text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default LoginPage
