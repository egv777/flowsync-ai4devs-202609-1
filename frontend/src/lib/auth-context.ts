import { createContext, useContext } from 'react'

export type AuthContextValue = {
  token: string | null
  setToken: (token: string) => void
  clearToken: () => void
  /** True after the API rejected the stored token; reset on the next login or logout. */
  sessionExpired: boolean
  /** Drops a token the API no longer accepts and flags it, so login can explain why. */
  expireSession: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
