# Code mode runtime

## Contents

- Execution model
- Limits
- Pagination
- Project scope
- Errors
- Value conventions
- Not available in scripts

## Execution model

- `code` is the body of an async function running in an isolated JavaScript
  sandbox on the BugBug MCP server. Only the `bugbug` global and standard
  language built-ins are available.
- No network, filesystem, or timers. Only `bugbug.*` calls are asynchronous.
- `console.log` output is returned next to the result.
- The value you `return` must be JSON-serializable. Returning `undefined` yields
  no result.
- Only the returned value reaches the conversation, so filter and summarize
  inside the script.

## Limits

- Per script: 1000 read-only calls and 50 mutating calls, counted separately.
- Returned JSON is capped at about 100 KB. A larger result is truncated and the
  response says so; return less.
- The API allows about 100 requests per minute. Parallel reads (`Promise.all`)
  queue for up to 30 seconds instead of failing. A scan that needs more requests
  than that must be split into several scripts that return processed ids or a
  cursor.
- CPU time inside the script is limited (about 2 s of guest computation); waiting
  on `bugbug.*` calls does not count. Do not run heavy loops.
- `bugbug.runs.watch` extends the deadline up to its own timeout (default 5 min
  for tests, 10 min for suites, max 10 min).

## Pagination

List functions return one page:
`{ count, nextToken, results }`. Pass `nextToken` back as `cursor`; the last page
has `nextToken: null`.

```js
const all = [];
let cursor;
do {
  const page = await bugbug.tests.list({ cursor, pageSize: 100 });
  all.push(...page.results.map((test) => ({ id: test.id, name: test.name })));
  cursor = page.nextToken ?? undefined;
} while (cursor);
return all;
```

`bugbug.tests.getAll`, `bugbug.suites.getAll`, and `bugbug.groups.getAll` read
every page in one call. `bugbug.files.list` is page-number based
(`page`, `pageSize`) and returns `{ count, results }`. Debug queries
(`queryConsoleLogs`, `queryNetworkRequests`) take `limit` and `cursor`.

## Project scope

Pass `projectId` on the tool call. Project tokens already imply a project. With
user or organization tokens, calls fail with `missing_project_context` until a
project is given, except `bugbug.projects.list()` and `bugbug.docs.ask()`. Never
guess a project id before a mutation: list projects and ask the user.

`bugbug.files.upload` and `bugbug.projectArtifacts.upload` always need the
`projectId` argument of the tool call.

## Errors

A failed script returns a tool error with a `script_*` code:

| Code                       | Meaning                                  | Fix                                                |
| -------------------------- | ---------------------------------------- | -------------------------------------------------- |
| `script_syntax`            | The code does not parse                  | Fix the syntax                                     |
| `script_runtime`           | An exception or failed API call          | Read the message; correct arguments or ids         |
| `script_invalid_arguments` | Arguments rejected before the API call   | Compare with the signature in the API references |
| `script_timeout`           | CPU or wall-clock limit                  | Do less per script; split the work                 |
| `script_memory`            | Memory limit                             | Return and keep less data                          |
| `script_host_call_limit`   | Too many `bugbug.*` calls                | Split into several scripts with cursors            |
| `script_deadlock`          | Promises never settled                   | Await every `bugbug.*` call                        |

API errors (not found, forbidden, plan limits) surface the same way with their
message. Calls made before the failure already ran.

Argument objects are strict: unknown keys are rejected rather than ignored, and
ids must be UUIDs.

## Value conventions

- Ids are UUID strings. Timestamps are ISO 8601 strings.
- `webappUrl` links to the BugBug webapp; include it when pointing the user at an
  entity.
- Screenshot and artifact URLs are temporary; do not store them.
- Run `status` values: `initialized`, `queued`, `running`, `paused`,
  `auto_retrying`, `passed`, `failed`, `error`, `stopped`, `skipped`,
  `recording`. Terminal statuses:
  `passed`, `failed`, `error`, `stopped`, `skipped`.
- Position moves (`updateStepPosition`, `updateGroupPosition`) return nothing;
  re-read the test to confirm.
- `variables.create` also returns `webappUrl`, where the user sets secret values.

## Not available in scripts

Destructive and approval-gated operations are not bound. Use the dedicated MCP
tools after explicit user confirmation:

- delete: `bugbug_delete_test`, `bugbug_delete_suite`, `bugbug_delete_group`,
  `bugbug_delete_steps`
- components: `bugbug_remove_component_from_test`,
  `bugbug_detach_component_from_test`
- visual regression: `bugbug_delete_visual_regression_reference_screenshot`,
  `bugbug_resolve_visual_regression_review`
- runs: `bugbug_stop_run`

Operations without a binding (tags, folders, inbox messages, file deletion, and
others) also stay typed `bugbug_*` tools.
