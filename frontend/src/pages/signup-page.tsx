import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { AlertCircle } from 'lucide-react'
import { AuthLayout } from '@/components/auth-layout'
import { FormField } from '@/components/form-field'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { signup } from '@/lib/api'
import { useAuth } from '@/lib/auth-context'
import { signupErrors, type FormErrors } from '@/lib/errors'

export function SignupPage() {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState<FormErrors>({ fields: {} })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Checked here instead of with maxLength, which would silently truncate pasted passwords.
    if (password.length < 8 || password.length > 32) {
      setErrors({ fields: { password: 'Debe tener entre 8 y 32 caracteres.' } })
      return
    }
    if (password !== passwordConfirmation) {
      setErrors({ fields: { passwordConfirmation: 'Las contraseñas no coinciden.' } })
      return
    }

    setSubmitting(true)
    setErrors({ fields: {} })
    try {
      const { token } = await signup({
        fullName: fullName.trim() || null,
        email,
        password,
        passwordConfirmation,
      })
      // The API returns a token on signup too, so the new user is logged in straight away.
      setToken(token)
      navigate('/profile', { replace: true })
    } catch (error) {
      setErrors(signupErrors(error))
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      title="Crear cuenta"
      description="Regístrate para empezar a usar FlowSync."
      footer={
        <p>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-medium text-foreground underline underline-offset-4">
            Inicia sesión
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        {errors.form && (
          <Alert variant="destructive">
            <AlertCircle />
            <AlertDescription>{errors.form}</AlertDescription>
          </Alert>
        )}
        <FormField
          id="fullName"
          label="Nombre (opcional)"
          autoComplete="name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          error={errors.fields.fullName}
        />
        <FormField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.fields.email}
        />
        <FormField
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Entre 8 y 32 caracteres"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={errors.fields.password}
        />
        <FormField
          id="passwordConfirmation"
          label="Repite la contraseña"
          type="password"
          autoComplete="new-password"
          required
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          error={errors.fields.passwordConfirmation}
        />
        <Button type="submit" disabled={submitting} className="w-full">
          {submitting ? 'Creando cuenta…' : 'Crear cuenta'}
        </Button>
      </form>
    </AuthLayout>
  )
}
