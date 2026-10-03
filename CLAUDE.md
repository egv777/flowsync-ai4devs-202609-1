# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository overview

FlowSync is a course exercise repo (LIDR AI4Devs, cohort 202609-1). It is a TypeScript monorepo with two independent npm projects and no root `package.json`:

- `backend/` — AdonisJS 7 API (Lucid ORM on SQLite, VineJS validation, token auth). **Treat it as existing and read-only**: features are built in the frontend, consuming this API. Read the backend (especially validators) to learn what the API actually requires.
- `frontend/` — React 19 + Vite + TypeScript, still the bare Vite template. The course uses shadcn/ui (components copied into the repo, not installed as a dependency); it is not set up yet (no `components.json`, no `@/` path alias, no Tailwind).

`README.md` is a generated exercise lesson (do not hand-edit it). `prompts.md` is a template the student fills in with the prompts they ran.

Requires Node.js 24+ (older versions fail with `Unknown file extension ".ts"`).

## Commands

Backend (run from `backend/`):

```bash
npm install && cp .env.example .env && node ace generate:key   # first-time setup
node ace migration:run      # create/upgrade SQLite DB at backend/tmp/db.sqlite3; also regenerates database/schema.ts
npm run dev                 # dev server with HMR on http://localhost:3333
npm test                    # all Japa suites (node ace test)
node ace test unit          # a single suite (unit | functional)
node ace test --files=tests/functional/foo.spec.ts   # a single file
node ace test --tests="test title"                   # a single test by title
npm run lint / npm run typecheck / npm run format     # ESLint, tsc --noEmit, Prettier (@adonisjs/prettier-config)
```

Test suites are defined in `adonisrc.ts`: `tests/unit/**/*.spec.ts` and `tests/functional/**/*.spec.ts` (functional suite boots the HTTP server). No tests exist yet. `.env.test` sets `SESSION_DRIVER=memory`.

Frontend (run from `frontend/`):

```bash
npm install
npm run dev       # Vite on http://localhost:5173
npm run build     # tsc -b && vite build (this is the type-check)
npm run lint      # oxlint (.oxlintrc.json)
```

The frontend has no test runner. `tsconfig.app.json` enables `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax` (use `import type` for types) and `erasableSyntaxOnly` (no `enum`, no parameter properties).

## Backend architecture

Request flow: `start/routes.ts` → middleware (`start/kernel.ts`) → controller (`app/controllers`) → validator (`app/validators`) → model (`app/models`) → transformer (`app/transformers`) → `ctx.serialize(...)`.

- **Imports** use Node subpath aliases from `package.json` (`#controllers/*`, `#models/*`, `#validators/*`, `#transformers/*`, `#generated/*`, etc.), not relative paths.
- **Routes** reference controllers via the generated `controllers` object from `#generated/controllers` (`.adonisjs/server/controllers.ts`). The `.adonisjs/` directory, the Tuyau typed-client registry (`.adonisjs/client/`), and `database/schema.ts` are **generated** (by `adonisrc.ts` init hooks and by `migration:run`) — don't edit them by hand.
- **Models** extend generated schema classes (`User extends compose(UserSchema, withAuthFinder(hash))`), so columns come from migrations, not from the model file. Schema changes = new migration in `database/migrations/`, never editing existing ones.
- **Response envelope**: `providers/api_provider.ts` adds `ctx.serialize()`, which wraps payloads in `{ "data": ... }`. Transformers (`UserTransformer`) pick exactly which fields are exposed. Exception: `POST /account/logout` returns a bare `{ message }`, not wrapped.
- **Auth**: default guard is `api` (opaque access tokens stored in `auth_access_tokens`, values prefixed `oat_`), sent as `Authorization: Bearer <token>`. A `web` session guard is also configured but unused by routes. `force_json_response_middleware` makes all responses (including errors) JSON.
- **CORS**: in dev every origin is allowed (`config/cors.ts`), with credentials. There is no Vite proxy, so the frontend calls `http://localhost:3333` directly.

### API contract (all under `/api/v1`)

| Method | Path | Auth | Body / notes |
|---|---|---|---|
| POST | `/auth/signup` | – | `fullName` (string or `null`, key required), `email` (valid, max 254, unique), `password` (8–32 chars), `passwordConfirmation` (must match). Returns `{ data: { user, token } }` |
| POST | `/auth/login` | – | `email`, `password`. Returns `{ data: { user, token } }` |
| GET | `/account/profile` | Bearer | Returns `{ data: user }` |
| POST | `/account/logout` | Bearer | Revokes current token. Returns `{ message }` |

`user` = `{ id, fullName, email, createdAt, updatedAt, initials }`. The source of truth for request rules is `app/validators/user.ts`; validation failures come back as JSON error lists from VineJS (e.g. duplicate email on signup), and bad credentials as an auth error from `verifyCredentials`.

## Process rules

Follow these for every ticket or code change, in this order:

1. **New branch before touching code.** Before the first edit, create a branch from the current one (normally `harness-egv`) named `<tipo>/FLOW-<n>-<slug>`, e.g. `feat/FLOW-1-login-frontend`. Never commit to `main`, `s1/start` or `harness-egv` directly.
2. **On closing, `/commit`.** Stage the changes for the task and run the `/commit` skill (conventional commit, `Refs: FLOW-<n>`).
3. **Then the pull request with `gh pr create`.** Push the branch to `origin` and open the PR against **your fork**, never against the course repo (`upstream`, LIDR-academy): `gh pr create --repo egv777/flowsync-ai4devs-202609-1 --base <branch you started from> --title "<commit first line>" --body "<body>"`. The body lists the ticket key and its acceptance criteria.
4. **Then the `adversarial-reviewer` subagent on the pull request**, passing the PR URL. If it returns `BLOCK` or `CHANGES`, fix the findings on the same branch, `/commit` again, push, and run the reviewer again.
5. **In the chat, only the pull request URL.** When done, the final message is the PR URL and nothing else.
