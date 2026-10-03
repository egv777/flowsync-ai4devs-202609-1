# Comparación: FLOW-1 con harness y sin harness

Ticket: **FLOW-1 — Implementar login en el frontend** (registro, login y perfil protegido con shadcn/ui).

- **Con harness**: ficheros del PR #1 (`feat/FLOW-1-login-frontend`), mergeado en `9e51793aa891793df8cb06b7b96c554da7502a86`. Estado: `A` añadido, `M` modificado, `D` eliminado.
- **Sin harness**: ficheros previstos en el plan que se generó sin harness para el mismo ticket. Ese plan no se versiona en el repo.

Todas las rutas son relativas a `frontend/`. Cada fila agrupa los ficheros que cumplen el mismo papel; `—` indica que esa versión no tiene equivalente.

# Parte A

## 1. Archivos que propone tocar

| Con harness | Sin harness |
|---|---|
| **Configuración y dependencias** | |
| `A components.json` | `components.json` (nuevo) |
| `M package.json`, `M package-lock.json` — `react-router`, `tailwindcss`, `@tailwindcss/vite`, `radix-ui`, `class-variance-authority`, `lucide-react`, `cn`, `shadcn`, `tw-animate-css` | `package.json`, `package-lock.json` (modificados) — `react-router`, `tailwindcss`, `@tailwindcss/vite`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, Radix |
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
| `A src/lib/utils.ts` — reexporta `cn()` del paquete npm `cn` | `src/lib/utils.ts` (nuevo) — `cn()` de shadcn con `clsx` + `tailwind-merge` |
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

## 2. Qué convenciones del proyecto respetó y cuáles no
| Con harness | Sin harness |
|---|---| 
|
| `Diria que todas` | `Ninguna. No tenia` |

## 3. Cuántas veces tuviste que intervenir
| Con harness | Sin harness |
|---|---| 
|
| `Una. Para lanzar /priority-ticket ` | `Ninguna. No he ejecutado el plan` |

## 4. Qué te tocaría arreglar a mano antes de enseñarle eso a alguien de tu equipo.
Tendría que revisar el código y React no controlo mucho, pero la pagina de login carga. Seguramente se pueda refactorizar algo pero en un principio tiene buena pinta.


## Diferencias de proceso

| Con harness | Sin harness |
|---|---|
| Rama propia `feat/FLOW-1-login-frontend`, PR a `harness-egv` en el fork | Sin rama ni PR definidos |
| 4 commits convencionales con `Refs: FLOW-1` (skill `/commit`) | Sin convención de commits |
| Revisión del PR con el subagente `adversarial-reviewer`; el PR incluye 3 commits de corrección (contraseñas truncadas por `maxLength`, sesión caducada con 401, redirección de invitados, sincronización entre pestañas) | Verificación al final: `npm run build`, `npm run lint`, recorrido manual en el navegador y `curl` a través del proxy |
| Nombres de fichero en kebab-case y lógica repartida en ficheros pequeños (`errors.ts`, `auth-context.ts`, `form-field.tsx`, `auth-layout.tsx`) | Nombres en PascalCase y la lógica de auth concentrada en `auth.tsx` |
| Llamadas directas a `http://localhost:3333` (CORS abierto en dev), configurable con `VITE_API_URL` | Proxy de Vite `/api` → `localhost:3333` |


# Parte B
## 1. Hasta qué pieza llegaste, y cuál te costó más de lo que esperabas. El número de la lista, y en qué se te fue el rato de verdad.
Creo que he llegado a todo, aunque le he dedicado mas de 45 min. Lo que más me ha costado ha sido entender bien como se debía de entregar, y encima lo he hecho mal. He mergeado la PR en mi rama harnes-egv y ahora cuando haga la PR desde mi fork van a ir también los cambios que he hecho.

## 2. La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla. Ojo, no cuál fue mejor: qué salió distinto, concretamente, y dónde estabas mirando cuando lo notaste. Si tuviste que abrir un archivo para verlo, dilo.
Me ha gustado mucho como se claude se ha ceñido perfectamente a seguir los pasos del harness sin salirse. Ha ejecutado exactamente los pasos indicados en `CLAUDE.md`.

## 3. Algo que dejaste escrito en el harness y que el agente no cumplió igualmente. El matiz es todo: no es lo que hizo mal la copia pelada. Es lo que tú habías dejado negro sobre blanco en el lado bueno y aun así no pasó.
Ha habido una cosa que no he terminado de comprender. En todo el proceso en el que ha estado trabajando, a la hora de hacer el `adversarial-reviewer` no he llegado a ver que es lo que le parecía mal. Lo ha corregido, y ha hecho el commit (3 para ser precisos). Le he preguntado porque había hecho commits, y me ha dicho que no lo ha hecho ese agente, sino el coordinador, y aqui es donde no lo he entendido bien a qué se ha referido con el coordinador. Si bien es verdad que en `CLAUDE.md`, en el ultimo apartado, Process rules, estan todos los pasos detallados, y precisamente en el paso 4 dice (lo he creado en inglés, estoy acostumbrada a hablar a claude en ingles, y por lo que veo, algunas cosas las crea en castellano otras en ingles). En fin, en este paso 4 que dice: 

4. **Then the `adversarial-reviewer` subagent on the pull request**, passing the PR URL. If it returns `BLOCK` or `CHANGES`, fix the findings on the same branch, `/commit` again, push, and run the reviewer again.

por lo que entiendo que el `adversarial-reviewer` solo devuelve un resultado (`BLOCK` or `CHANGES`) y el agente principal (que es el que ha hecho los cambios e invocado al `adversarial-reviewer`, es el que hace el  `/commit`. Pero sigo sin entenderlo muy bien.