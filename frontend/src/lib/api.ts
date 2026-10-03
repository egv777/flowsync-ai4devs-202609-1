const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

export type User = {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string
  initials: string
}

export type AuthResponse = {
  user: User
  token: string
}

export type SignupInput = {
  fullName: string | null
  email: string
  password: string
  passwordConfirmation: string
}

export type LoginInput = {
  email: string
  password: string
}

/**
 * One entry of the `errors` array the backend returns on failure
 * (VineJS validation errors carry `field` and `rule`).
 */
type BackendError = {
  message: string
  field?: string
  rule?: string
}

export class ApiError extends Error {
  status: number
  errors: BackendError[]

  constructor(status: number, errors: BackendError[]) {
    super(errors[0]?.message ?? `HTTP ${status}`)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  /** Field name → first error for that field. */
  get fieldErrors(): Record<string, BackendError> {
    const result: Record<string, BackendError> = {}
    for (const error of this.errors) {
      if (error.field && !result[error.field]) result[error.field] = error
    }
    return result
  }
}

/** Status 0 = the request never reached the server. */
export const NETWORK_ERROR_STATUS = 0

async function request<T>(path: string, init: RequestInit & { token?: string | null } = {}) {
  const { token, ...rest } = init
  const headers = new Headers(rest.headers)
  headers.set('Accept', 'application/json')
  if (rest.body) headers.set('Content-Type', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)

  let response: Response
  try {
    response = await fetch(`${API_URL}/api/v1${path}`, { ...rest, headers })
  } catch {
    throw new ApiError(NETWORK_ERROR_STATUS, [])
  }

  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const errors = Array.isArray(body?.errors) ? (body.errors as BackendError[]) : []
    throw new ApiError(response.status, errors)
  }
  return body as T
}

export async function signup(input: SignupInput) {
  const body = await request<{ data: AuthResponse }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return body.data
}

export async function login(input: LoginInput) {
  const body = await request<{ data: AuthResponse }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(input),
  })
  return body.data
}

export async function getProfile(token: string) {
  const body = await request<{ data: User }>('/account/profile', { token })
  return body.data
}

export async function logout(token: string) {
  await request<{ message: string }>('/account/logout', { method: 'POST', token })
}
