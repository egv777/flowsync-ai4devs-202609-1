import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ApiError, getProfile, logout, type User } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'

type ProfileState =
  { status: 'loading' } | { status: 'ready'; user: User } | { status: 'error'; message: string }

const dateFormatter = new Intl.DateTimeFormat('es-ES', { dateStyle: 'long' })

export function ProfilePage() {
  const { token, clearToken } = useAuth()
  const navigate = useNavigate()
  const [state, setState] = useState<ProfileState>({ status: 'loading' })
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    if (!token) return
    let cancelled = false
    getProfile(token)
      .then((user) => {
        if (!cancelled) setState({ status: 'ready', user })
      })
      .catch((error: unknown) => {
        if (cancelled) return
        if (error instanceof ApiError && error.status === 401) {
          // Token revoked or invalid: drop it, RequireAuth sends the user to /login.
          clearToken()
          return
        }
        setState({ status: 'error', message: 'No se pudo cargar tu perfil. Recarga la página.' })
      })
    return () => {
      cancelled = true
    }
  }, [token, clearToken])

  async function handleLogout() {
    setLoggingOut(true)
    try {
      if (token) await logout(token)
    } catch {
      // Even if revoking fails server-side, the user is logged out locally.
    }
    clearToken()
    navigate('/login', { replace: true })
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-muted/40 px-4 py-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">Tu perfil</CardTitle>
          <CardDescription>Datos de tu cuenta de FlowSync.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          {state.status === 'loading' && <p className="text-sm text-muted-foreground">Cargando…</p>}
          {state.status === 'error' && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          {state.status === 'ready' && (
            <div className="flex items-center gap-4">
              <div
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground"
              >
                {state.user.initials}
              </div>
              <dl className="grid gap-1 text-sm">
                <dt className="sr-only">Nombre</dt>
                <dd className="text-base font-medium">{state.user.fullName ?? 'Sin nombre'}</dd>
                <dt className="sr-only">Email</dt>
                <dd className="text-muted-foreground">{state.user.email}</dd>
                <dt className="sr-only">Miembro desde</dt>
                <dd className="text-muted-foreground">
                  Miembro desde {dateFormatter.format(new Date(state.user.createdAt))}
                </dd>
              </dl>
            </div>
          )}
          <Button variant="outline" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Cerrando sesión…' : 'Cerrar sesión'}
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
