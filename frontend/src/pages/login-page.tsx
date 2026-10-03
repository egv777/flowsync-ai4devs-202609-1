import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { AlertCircle } from 'lucide-react'
import { AuthLayout } from '@/components/auth-layout'
import { FormField } from '@/components/form-field'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { login } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { loginErrors, type FormErrors } from '@/lib/errors'

export function LoginPage() {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const sessionExpired = Boolean(
    (useLocation().state as { sessionExpired?: boolean } | null)?.sessionExpired,
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({ fields: {} })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setErrors({ fields: {} })
    try {
      const { token } = await login({ email, password })
      setToken(token)
      navigate('/profile', { replace: true })
    } catch (error) {
      setErrors(loginErrors(error))
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Iniciar sesión"
      description="Accede a tu cuenta de FlowSync."
      footer={
        <p>
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="font-medium text-foreground underline underline-offset-4">
            Regístrate
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        {sessionExpired && !errors.form && (
          <Alert>
            <AlertCircle />
            <AlertDescription>Tu sesión ha caducado. Vuelve a iniciar sesión.</AlertDescription>
          </Alert>
        )}
        {errors.form && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertDescription>{errors.form}</AlertDescription>
          </Alert>
        )}
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? 'Entrando…' : 'Entrar'}
        </Button>
      </form>
    </AuthLayout>
  )
}
