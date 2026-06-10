'use client'

import { useState } from 'react'
import { Button, Input } from '@repo/ui'
import { REGEX_EMAIL, REGEX_PASSWORD } from '@repo/ui/validation'
import Link from 'next/link'

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isFormValid = REGEX_EMAIL.test(email) && REGEX_PASSWORD.test(password)

  const handleLogin = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert('Login successful!')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="flex w-[500px] flex-col gap-3 rounded-xl border border-gray-300 p-3">
        <h1 className="mb-6 mt-6 text-center text-2xl font-bold">Login</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
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
    </div>
  )
}

export default LoginPage
