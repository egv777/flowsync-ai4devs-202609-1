import { ApiError, NETWORK_ERROR_STATUS } from '@/lib/api'

const NETWORK_MESSAGE = 'No se pudo conectar con el servidor. Inténtalo de nuevo en unos segundos.'
const GENERIC_MESSAGE = 'Algo ha salido mal. Inténtalo de nuevo.'

/**
 * Clear Spanish messages for the VineJS rules the signup validator
 * (backend/app/validators/user.ts) can fail on.
 */
const RULE_MESSAGES: Record<string, string> = {
  'database.unique': 'Este email ya está registrado. Inicia sesión o usa otro email.',
  email: 'Introduce un email válido.',
  required: 'Este campo es obligatorio.',
  sameAs: 'Las contraseñas no coinciden.',
}

function ruleMessage(field: string, rule: string | undefined) {
  if (rule === 'minLength') {
    return field === 'email' ? 'Email demasiado corto.' : 'Debe tener al menos 8 caracteres.'
  }
  if (rule === 'maxLength') {
    return field === 'email' ? 'Máximo 254 caracteres.' : 'Debe tener como máximo 32 caracteres.'
  }
  return (rule && RULE_MESSAGES[rule]) ?? 'Revisa este campo.'
}

export type FormErrors = {
  /** Message shown above the form. */
  form?: string
  /** Messages shown under each field, keyed by API field name. */
  fields: Record<string, string>
}

export function loginErrors(error: unknown): FormErrors {
  if (!(error instanceof ApiError)) return { form: GENERIC_MESSAGE, fields: {} }
  if (error.status === NETWORK_ERROR_STATUS) return { form: NETWORK_MESSAGE, fields: {} }
  // verifyCredentials answers 400 "Invalid user credentials"; a malformed email gives 422.
  if (error.status === 400 || error.status === 401 || error.status === 422) {
    return { form: 'Email o contraseña incorrectos.', fields: {} }
  }
  return { form: GENERIC_MESSAGE, fields: {} }
}

export function signupErrors(error: unknown): FormErrors {
  if (!(error instanceof ApiError)) return { form: GENERIC_MESSAGE, fields: {} }
  if (error.status === NETWORK_ERROR_STATUS) return { form: NETWORK_MESSAGE, fields: {} }
  if (error.status === 422) {
    const fields: Record<string, string> = {}
    for (const [field, fieldError] of Object.entries(error.fieldErrors)) {
      fields[field] = ruleMessage(field, fieldError.rule)
    }
    return { form: 'Revisa los datos del formulario.', fields }
  }
  return { form: GENERIC_MESSAGE, fields: {} }
}
