# Prompts

Aquí van **todos los prompts que lanzaste** para hacer el ejercicio, en el orden en que los
lanzaste, con el modelo y la herramienta de cada uno.

Esto no es papeleo. Lo que se revisa es **cómo pediste las cosas**, no solo lo que salió: un
resultado flojo con un prompt bueno y un resultado flojo con un prompt vago necesitan feedback
distinto, y sin este archivo no se distinguen.

## Cómo rellenarlo

- Un apartado `## Prompt N` por cada prompt.
- **Pega el prompt tal cual lo lanzaste**, dentro del bloque de código, aunque ocupe diez líneas
  y aunque tenga faltas. No lo reescribas para que quede bien: el que arreglaste mentalmente
  después no es el que lanzaste.
- Incluye también los que **no funcionaron**. Suelen ser los más útiles de leer.
- `Modelo` y `Herramienta` en todos. Si cambiaste de una a otra a mitad, se nota aquí.

Borra el ejemplo de abajo cuando escribas el primero.

---

## Prompt 1

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
in the @README.md there is an indication in Parte A, Section 2: Monta el harness en una sola de los dos, punto tres. Habla de una skill /priority-ticket, en el punto 4 de la skill /commit  and step 5, skill /adversarial-reviewer, but they don't exist. Also, in step 6 we need to install Prettier to format the code, but should be config as a hook. I understand I need to create those skill on the project.
```

**Qué salió:** confirmó que hay que crearlas y dónde va cada pieza; aclaró que el punto 5 es un subagente, no una skill, y avisó del choque entre el `CLAUDE.md` actual (`@AGENTS.md`) y el symlink del punto 8.

---

## Prompt 2

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
/init
```

**Qué salió:** como ya había un `CLAUDE.md` que solo importaba `@AGENTS.md`, lo sustituyó por un `CLAUDE.md` completo a partir de `AGENTS.md`, con algunos detalles añadidos tras leer el código (shadcn sin configurar, sin proxy de Vite, logout sin envoltorio `data`).

---

## Prompt 3

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
yes, go ahead with /priority-ticket
```

**Qué salió:** creó `.claude/skills/priority-ticket/SKILL.md` (JQL sobre «Por hacer», resumen de criterios y huecos frente al validador, plan mode, transición a «En curso» al aprobar).

---

## Prompt 4

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
Let's update the /priority-ticket skill. Add the Jira's name board, FLOW. Add also the type of tickets that can be created or manage: Epic, Historia, Error, Tarea. The kanban board has tree columns, TO-DO, In Progress and Done
```

**Qué salió:** actualizó la skill: JQL filtrado por proyecto `FLOW`, estado `TO-DO` y tipos `Epic, Historia, Error, Tarea`; transición a `In Progress` al aprobar el plan y nunca a `Done`.

---

## Prompt 5

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
yes, check the real status names in FLOW
```

**Qué salió:** consultó Jira por el MCP: las columnas «In Progress» y «Done» son en realidad los estados `En curso` y `Finalizada` (solo `TO-DO` coincidía). Corrigió la skill para usar los nombres de estado.

---

## Prompt 6

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
yes, go ahead with /commit
```

**Qué salió:** creó `.claude/skills/commit/SKILL.md`: commit convencional solo con lo preparado (no hace `git add`), tipos y scopes del repo, descripción en español como el historial, footer `Refs: FLOW-<n>` si aplica, sin push ni amend.

---

## Prompt 7

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
go on with the adversarial-reviewer
```

**Qué salió:** creó el subagente `.claude/agents/adversarial-reviewer.md`: solo lectura (Read, Grep, Glob y Bash para `gh pr diff`, build y lint), ataca el PR contra el contrato real del backend y los criterios del ticket, y devuelve veredicto BLOCK / CHANGES / NO DEFECTS FOUND con hallazgos `file:line`.

---

## Prompt 8

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
go on with step 6
```

**Qué salió:** instaló Prettier 3.9.9 en `frontend/` con `.prettierrc.json` (estilo del template: sin `;`, comillas simples) y script `format`; hook `PostToolUse` en `.claude/settings.json` que llama a `.claude/hooks/format-frontend.sh` y formatea solo archivos de `frontend/src/`. Probado con un archivo de prueba y con una ruta fuera de `frontend/src/`.

---

## Prompt 9

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
go on with step 7
```

**Qué salió:** añadió «Process rules» al final de `CLAUDE.md`: rama `<tipo>/FLOW-<n>-<slug>` antes de tocar código, `/commit`, `gh pr create` contra el fork (no contra upstream), subagente `adversarial-reviewer` sobre el PR y solo la URL del PR en el chat.

---

## Prompt 10

**Modelo:** Opus 5.5
**Herramienta:** Claude Code

```
go on with step 8
```

**Qué salió:** sustituyó `AGENTS.md` (que ya estaba todo en `CLAUDE.md`) por el enlace `ln -s CLAUDE.md AGENTS.md`.
