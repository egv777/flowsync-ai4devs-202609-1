import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { AuthContext } from '@/lib/auth-context'

const STORAGE_KEY = 'flowsync.token'

function readStoredToken() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStoredToken(token: string | null) {
  try {
    if (token) localStorage.setItem(STORAGE_KEY, token)
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage unavailable (private mode, blocked): the token lives in memory only.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState(readStoredToken)
  const [sessionExpired, setSessionExpired] = useState(false)

  // Keep tabs in sync: logging in or out in one tab updates the others.
  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY || event.key === null) setTokenState(readStoredToken())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const setToken = useCallback((value: string) => {
    writeStoredToken(value)
    setTokenState(value)
    setSessionExpired(false)
  }, [])

  const clearToken = useCallback(() => {
    writeStoredToken(null)
    setTokenState(null)
    setSessionExpired(false)
  }, [])

  const expireSession = useCallback(() => {
    writeStoredToken(null)
    setTokenState(null)
    setSessionExpired(true)
  }, [])

  const value = useMemo(
    () => ({ token, setToken, clearToken, sessionExpired, expireSession }),
    [token, setToken, clearToken, sessionExpired, expireSession],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
