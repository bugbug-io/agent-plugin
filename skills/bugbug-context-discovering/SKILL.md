---
name: bugbug-context-discovering
description: Discovers BugBug project, repository, and tested-application context. Always run this skill before any other BugBug skill, including test authoring, step authoring, selector authoring, test debugging, test refactoring, project reporting, or YAML work. Project list checks are exluded.
---

# BugBug Context Discovering

## Preflight

1. Resolve the target BugBug project before reading or mutating project data.
2. Capture repository state before relying on local source evidence or editing
   local files.
3. If the current repository appears to be the app under test, inspect the
   tested-application repository context before using source-code evidence.

## Inputs

- User request, current workspace, available BugBug session context, linked
  `bugbug.yaml`, and any project, test, suite, run, or URL identifiers.
- Optional tested-application source code when the current workspace is the app
  under test.

## Safety

- Do not mutate BugBug data while discovering context.
- Do not expose secrets from `bugbug.yaml`, environment files, credentials, or
  local configuration.
- Treat existing uncommitted changes as user-owned.
- Stop before platform mutation when the target project cannot be confirmed.

## Workflow

1. Read `references/project-context.md` to resolve or confirm the BugBug project.
2. Read `references/repository-state.md` to capture local Git state when a shell
   and repository are available. Skip this step on MCP-only clients.
3. Read `references/tested-app-repository-context.md` only when the current
   repository may be the tested application and source evidence would affect the
   work. Skip this step on MCP-only clients.
4. When the next skill will create, move, or organize tests or components,
   read the folder structure as described in `references/project-context.md`.
5. Carry the discovered project id, folder structure, repository state, and
   tested-app evidence into the next BugBug skill.

### MCP-Only Clients

When the client has no shell or filesystem, steps 2 and 3 do not apply. Resolve
the project from a caller-supplied id or `bugbug_list_projects`, then continue
to the next skill with the project id alone. Missing repository state is an
expected condition on these clients, not a blocker — do not stop the work for
it, and do not ask the user to create or link a `bugbug.yaml`.

### MCP Tool Choice

Use the typed `bugbug_*` MCP tools named in BugBug skills by default. Switch to
code mode (`bugbug_execute`, signatures via `bugbug_search_api`) only when it
clearly saves round-trips or context:

- one answer needs many reads in a row, such as paging run history or fetching
  details for every failed run;
- only a few fields of many large payloads are needed;
- no typed tool covers the read.

Return only what the next step needs from the script. Deletes, stopping runs,
unlinking, and baseline resolution are never available in code mode; use their
dedicated tools after user confirmation.

## Output

- Confirmed project id or the blocker preventing confirmation.
- Test and component folder paths with ids, when the work places or organizes
  tests or components.
- Relevant dirty repository files or statement that repository state could not
  be captured.
- Tested-app source evidence used, or confirmation that none was needed.
- Any context limits that affect authoring, debugging, refactoring, reporting, or
  YAML work.
- Preference of work type: directly on platform vs yaml in current linked repository

## Resources

Resolve bundled resource paths relative to this skill directory.

- `assets/bugbug-icon.svg` is the OpenAI UI icon for this skill.
- Read `references/project-context.md` to resolve the target BugBug project.
- Read `references/repository-state.md` before relying on local source evidence
  or editing local files.
- Read `references/tested-app-repository-context.md` before using the tested
  application's source code as evidence.
