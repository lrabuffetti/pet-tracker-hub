'use client'

import { useState } from 'react'
import { Button } from '@repo/ui'

const SignupPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const regexPassword = /^.{6,}$/

  const isFormValid = regexEmail.test(email) && regexPassword.test(password)

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSignup = async () => {
    setIsSubmitting(true)
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    alert('Signup successful!')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm border-2 border-solid border-gray-300">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button
          type="button"
          onClick={handleSignup}
          disabled={isSubmitting || !isFormValid}
          appName="web"
          className="w-1/2 h-10 border-2 border-solid border-gray-300 rounded hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  )
}

export default SignupPage
