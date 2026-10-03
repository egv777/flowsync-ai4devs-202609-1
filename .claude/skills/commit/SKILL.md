---
name: commit
description: Create a conventional commit (tipo(scope): descripción) from the staged changes only. Use when the user asks to commit, or when closing a task before opening the pull request.
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git branch:*), Bash(git commit:*)
---

# /commit

Write one conventional commit for what is **staged**. Nothing else.

## 1. Read the staged changes

```bash
git status --short
git diff --cached --stat
git diff --cached
git log --oneline -10    # match the existing style
```

- If nothing is staged, say so and stop. **Do not run `git add`**: deciding what goes in the commit is the user's call.
- If there are unstaged or untracked changes as well, ignore them and mention them in one line at the end.
- If the staged diff mixes unrelated changes (e.g. a feature and an unrelated harness tweak), say so and suggest splitting it; do not split it yourself.

## 2. Write the message

Format:

```
tipo(scope): descripción

[optional body]

[optional footer]
```

- **tipo**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`. Pick by what the change does, not by which files it touches (a new React screen is `feat`, not `chore`).
- **scope**: the area changed: `frontend`, `backend`, `harness` (anything under `.claude/`, `CLAUDE.md`, `.mcp.json`), or a narrower one if clearer (`auth`, `login`). Omit it only if the change spans the whole repo.
- **descripción**: in Spanish, like the existing history; lowercase, no trailing period, at most ~72 characters for the whole first line; says *what* changes, not how.
- **body** (only if the first line is not enough): *why* the change is made, wrapped at 72 characters.
- **footer**: if the branch name or the conversation ties the work to a Jira ticket (`FLOW-<n>`), add `Refs: FLOW-<n>`. Breaking changes go as `BREAKING CHANGE: ...`.

Examples:

```
feat(frontend): pantalla de login contra POST /api/v1/auth/login
fix(auth): muestra el error de credenciales inválidas en el formulario
chore(harness): skill /commit para commits convencionales
```

## 3. Commit

Commit with a heredoc so the formatting is preserved:

```bash
git commit -m "$(cat <<'EOF'
tipo(scope): descripción

body
EOF
)"
```

- Never use `--no-verify`, `--amend` or `git push` unless the user asks for it.
- If a hook fails, show the error, fix the cause if it is in the staged change, and create a **new** commit (do not amend).

Finish with the short hash and the first line of the commit, nothing more.
