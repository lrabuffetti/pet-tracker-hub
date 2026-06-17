'use client'

import { AuthProvider } from '@repo/ui/context/AuthContext'
import { ThemeProvider } from '@/src/context/themeContext'
import { webTokenStorage } from '@/src/lib/tokenStorage'
import type { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <AuthProvider tokenStorage={webTokenStorage}>{children}</AuthProvider>
    </ThemeProvider>
  )
}
