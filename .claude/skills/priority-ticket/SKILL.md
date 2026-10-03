---
name: priority-ticket
description: Fetch the highest-priority ticket assigned to me in TO-DO on the Jira project FLOW, summarise its acceptance criteria, plan its implementation in plan mode, and move it to En curso (In Progress column) once the plan is approved.
disable-model-invocation: true
---

# /priority-ticket

Pick up the next ticket from Jira and plan it. Uses the Atlassian MCP server configured in `.mcp.json`.

## The Jira board

- **Project:** `FLOW`. Only work with tickets from this project.
- **Issue types:** `Epic`, `Historia`, `Error`, `Tarea`. Do not use or create any other type.
- **Kanban columns → Jira status names** (JQL and transitions use the status name, not the column name):

  | Column | Status |
  |---|---|
  | TO-DO | `TO-DO` |
  | In Progress | `En curso` |
  | Done | `Finalizada` |

## 1. Find the ticket

1. Get the `cloudId` with `getAccessibleAtlassianResources` (if there is more than one site, ask which one).
2. Search with `searchJiraIssuesUsingJql`:

   ```
   project = FLOW AND assignee = currentUser() AND status = "TO-DO" AND issuetype in (Epic, Historia, Error, Tarea) ORDER BY priority DESC, created ASC
   ```

   Take the first result. If there are none, say so and stop: do not pick a ticket from another project, status or assignee.
3. Read it in full with `getJiraIssue` (description included).

## 2. Summarise it

Show, briefly:

- Key, type, title and priority.
- The acceptance criteria as a checklist, exactly as written in the ticket (do not reword or add to them).
- **Gaps**: what the ticket does not specify but the code requires. For tickets that consume the API, read `backend/app/validators/` and the controllers (the backend is read-only) and list every field or rule the ticket leaves out.

## 3. Plan in plan mode

Enter plan mode (`EnterPlanMode`) and explore the code needed to plan. The plan must include:

- The files to create or modify, with paths.
- How each acceptance criterion is covered, and how each gap from step 2 is resolved.
- How to verify it (commands from `CLAUDE.md`, and what to check by hand).

Present it with `ExitPlanMode`. Do not implement anything before it is approved.

## 4. On approval, move it to En curso

Only once the plan is approved:

1. `getTransitionsForJiraIssue` and pick the transition whose target status (`to.name`) is `En curso`.
2. Apply it with `transitionJiraIssue`.
3. Confirm the new status in one line.

If the plan is rejected, the ticket stays in `TO-DO`. If there is no transition to `En curso`, say so and do not use another one. Never move a ticket to `Finalizada` from this skill.
