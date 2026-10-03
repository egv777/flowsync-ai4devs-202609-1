# Comparación: FLOW-1 con harness y sin harness

Ticket: **FLOW-1 — Implementar login en el frontend** (registro, login y perfil protegido con shadcn/ui).

- **Con harness**: ficheros del PR #1 (`feat/FLOW-1-login-frontend`), mergeado en `9e51793aa891793df8cb06b7b96c554da7502a86`. Estado: `A` añadido, `M` modificado, `D` eliminado.
- **Sin harness**: ficheros previstos en el plan generado sin harness (`plan/plan-withou-harness.md`).

Todas las rutas son relativas a `frontend/`. Cada fila agrupa los ficheros que cumplen el mismo papel; `—` indica que esa versión no tiene equivalente.

## Ficheros

| Con harness | Sin harness |
|---|---|
| **Configuración y dependencias** | |
| `A components.json` | `components.json` (nuevo) |
| `M package.json`, `M package-lock.json` — `react-router`, `tailwindcss`, `@tailwindcss/vite`, `radix-ui`, `class-variance-authority`, `lucide-react`, `shadcn`, `tw-animate-css` | `package.json`, `package-lock.json` (modificados) — `react-router`, `tailwindcss`, `@tailwindcss/vite`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, Radix |
| `M vite.config.ts` — plugin de Tailwind y alias `@` | `vite.config.ts` (modificado) — plugin de Tailwind, alias `@` y **proxy `/api` → `localhost:3333`** |
| `M tsconfig.json`, `M tsconfig.app.json` — alias `@/*` | `tsconfig.json`, `tsconfig.app.json` (modificados) — alias `@/*` |
| `M index.html` — `lang="es"` y título `FlowSync` | — |
| `M src/index.css` — Tailwind + tema de shadcn | `src/index.css` (modificado) — Tailwind + tema de shadcn |
| **Arranque y rutas** | |
| `M src/main.tsx` — envuelve la app en `AuthProvider` | `src/main.tsx` (modificado) — `BrowserRouter` + `AuthProvider` |
| `M src/App.tsx` — tabla de rutas | `src/App.tsx` (modificado) — tabla de rutas |
| **Cliente de la API y errores** | |
| `A src/lib/api.ts` — URL base `VITE_API_URL` o `http://localhost:3333` | `src/lib/api.ts` (nuevo) — rutas relativas `/api/v1` vía proxy |
| `A src/lib/errors.ts` — traducción de errores de la API a mensajes | — (dentro de las páginas) |
| `A src/lib/utils.ts` — `cn()` | `src/lib/utils.ts` (nuevo) — `cn()` |
| **Estado de autenticación** | |
| `A src/lib/auth-context.ts` — contexto y hook `useAuth` | `src/lib/auth.tsx` (nuevo) — `AuthProvider`, `useAuth()` y `RequireAuth` en un solo fichero |
| `A src/components/auth-provider.tsx` — token en `localStorage`, sincronización entre pestañas, aviso de sesión caducada | ↑ incluido en `src/lib/auth.tsx` |
| `A src/components/require-auth.tsx` — protege rutas privadas | ↑ incluido en `src/lib/auth.tsx` |
| `A src/components/guest-only.tsx` — redirige `/login` y `/signup` al perfil si hay sesión | — (redirección prevista en `App.tsx`) |
| **Componentes compartidos** | |
| `A src/components/auth-layout.tsx` — layout común de las pantallas de auth | — |
| `A src/components/form-field.tsx` — campo con label y error | — |
| `A src/components/ui/alert.tsx`, `button.tsx`, `card.tsx`, `input.tsx`, `label.tsx` | `src/components/ui/{alert,button,card,input,label}.tsx` (nuevos) |
| **Páginas** | |
| `A src/pages/login-page.tsx` | `src/pages/LoginPage.tsx` (nuevo) |
| `A src/pages/signup-page.tsx` | `src/pages/SignupPage.tsx` (nuevo) |
| `A src/pages/profile-page.tsx` | `src/pages/ProfilePage.tsx` (nuevo) |
| **Ficheros del template eliminados** | |
| `D src/App.css` | `src/App.css` (eliminado) |
| `D src/assets/hero.png`, `D src/assets/react.svg`, `D src/assets/vite.svg` | `src/assets/hero.png`, `react.svg`, `vite.svg` (eliminados) |

## Diferencias de proceso

| Con harness | Sin harness |
|---|---|
| Rama propia `feat/FLOW-1-login-frontend`, PR a `harness-egv` en el fork | Sin rama ni PR definidos |
| 4 commits convencionales con `Refs: FLOW-1` (skill `/commit`) | Sin convención de commits |
| Revisión del PR con el subagente `adversarial-reviewer`; el PR incluye 3 commits de corrección (contraseñas truncadas por `maxLength`, sesión caducada con 401, redirección de invitados, sincronización entre pestañas) | Verificación manual en el navegador al final |
| Nombres de fichero en kebab-case y lógica repartida en ficheros pequeños (`errors.ts`, `auth-context.ts`, `form-field.tsx`, `auth-layout.tsx`) | Nombres en PascalCase y la lógica de auth concentrada en `auth.tsx` |
| Llamadas directas a `http://localhost:3333` (CORS abierto en dev), configurable con `VITE_API_URL` | Proxy de Vite `/api` → `localhost:3333` |
