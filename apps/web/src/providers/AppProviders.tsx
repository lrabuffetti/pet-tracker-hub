'use client'

import { AuthProvider } from '@repo/ui/context/AuthContext'
import { I18nProvider } from '@repo/ui/context/I18nContext'
import { ThemeProvider } from '@/src/context/themeContext'
import { webTokenStorage } from '@/src/lib/tokenStorage'
import type { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider tokenStorage={webTokenStorage}>{children}</AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
