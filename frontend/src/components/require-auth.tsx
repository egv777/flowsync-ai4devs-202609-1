import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/lib/auth-context'

export function RequireAuth({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}
