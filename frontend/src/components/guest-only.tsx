import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/lib/auth-context'

/** Login/signup screens: a logged-in user goes to the profile instead of replacing their token. */
export function GuestOnly({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  if (token) return <Navigate to="/profile" replace />
  return children
}
