'use client'

import { useState } from 'react'
import { Button, Input } from '@repo/ui'

const VerificationPage = () => {
  const [code, setCode] = useState('')

  const handleVerify = () => {
    console.log(code)
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col gap-4 w-[400px] rounded-xl border border-gray-300 p-3">
        <h1 className="mb-6 mt-6 text-center text-2xl font-bold">
          Verification
        </h1>
        <p className="text-center text-base">
          We&apos;ve sent a verification code to your email.
        </p>
        <Input
          type="number"
          value={code}
          onChangeText={setCode}
          placeholder="Enter the code"
          maxLength={6}
          id="code"
        />
        <Button
          variant="primary"
          type="button"
          onClick={handleVerify}
          disabled={!code}
        >
          Verify
        </Button>
      </div>
    </div>
  )
}

export default VerificationPage
