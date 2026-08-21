# BugBug Project Context

Resolve the target BugBug project before creating, editing, running, debugging,
refactoring, importing, or reporting on project data.

## Resolution Order

Start at step 1 when a shell or filesystem is available. When the client is
MCP-only, skip to step 3 — steps 1 and 2 cannot be performed without file
access, and their absence is not a blocker.

1. Check for `bugbug.yaml` in the current working directory or the nearest
   parent.
2. If found, read only the top-level `projectId` from that file and treat the
   local directory as linked to that BugBug project. Do not expose tokens or
   other secret values from the file.
3. If no linked file exists, use the project id explicitly supplied by the
   caller — a prompt argument, tool argument, or an id stated in the request.
4. If the user provided a project name, call `bugbug_list_projects` and match by
   name. Ask the user to choose when more than one project matches.
5. If no project can be resolved, call `bugbug_list_projects` and ask the user to
   select one before any platform mutation or run. Elicit the choice when the
   client supports elicitation; otherwise present the names and stop.

## MCP-Only Clients

A client with no shell has no `bugbug.yaml` and no Git state. That is an
expected configuration, not missing evidence:

- Resolve the project from the caller-supplied id, or from
  `bugbug_list_projects` plus a user choice.
- Never invent a project id, and never proceed to a mutation with an
  unconfirmed project.
- Do not ask the user to create or link a `bugbug.yaml`; it is not reachable.
- Skip repository state and tested-app source evidence entirely, and record
  that the work is platform-direct rather than YAML-in-repository.

## Rules

- Do not create local YAML files as a fallback for missing project context.
- Do not skip this check because the session already contains repository or
  workspace metadata.
- Do not guess between projects with similar names.
- Read-only reporting may continue only when the selected project is explicit.
- Platform mutations require a confirmed project id.
