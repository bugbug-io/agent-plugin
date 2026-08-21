# Repository State

Capture repository state before relying on local source evidence or editing local
files.

## Commands

- Run `git status --short` when a shell and Git repository are available.
- Use `git diff --stat` or a targeted `git diff -- <path>` only when the changed
  files are relevant to the task.
- Use `git log` around a failure window only when debugging whether application
  changes caused a test failure.

## Rules

- Treat existing uncommitted changes as user-owned.
- Do not revert, overwrite, stage, or commit changes unless the user explicitly
  asks for that operation.
- Mention relevant dirty files in the final answer when they affect the result,
  verification, or ability to compare integration changes.
- If there is no Git repository, state that repository state could not be
  captured instead of fabricating a clean state.
