---
name: bugbug-use-bugbug
description: Explains how to call the BugBug API through the `bugbug_use_bugbug` MCP tool, which runs a short JavaScript function body against the global `bugbug` object. Use before the first `bugbug_use_bugbug` call, whenever a task needs several BugBug reads or writes in a row, only a few fields of large payloads, a project-wide scan, or no typed `bugbug_*` tool covers the operation.
---

# Use BugBug

## Preflight

1. Confirm the target BugBug project (see `bugbug-context-discovering`). User and
   organization tokens need `projectId` on every call, except for
   `bugbug.projects.list()` and `bugbug.docs.ask()`.
2. Look up every function you have not used yet in `references/`. Signatures,
   argument names, and return types are not discoverable at runtime; do not
   guess them.
3. Prefer a typed `bugbug_*` tool when one call does the job. Use
   `bugbug_use_bugbug` when the work needs several calls or only part of a large
   payload.

## Inputs

- `code` (required): the body of an async function. Use `await` and `return` a
  JSON-serializable value.
- `projectId` (optional): project UUID applied to every `bugbug.*` call in the
  script.
- Identifiers from the user or from earlier calls: test, suite, run, step, group,
  and component ids.

## Safety

- Mutations (`create`, `update`, `import`, `insert*`, `upload`, `startRun`) take
  effect immediately and can overwrite data. Run only what the user asked for.
- `startRun` drives a real browser against the tested application and can submit
  forms, send messages, or change data. Start runs only with user authorization
  for the test and target environment.
- Deletes, stopping runs, removing or detaching components, converting components
  to groups, and visual-regression baseline resolution are not available in a
  script. Use the dedicated tools after the user confirms: `bugbug_delete_test`,
  `bugbug_delete_suite`, `bugbug_delete_group`, `bugbug_delete_steps`,
  `bugbug_remove_component_from_test`, `bugbug_detach_component_from_test`,
  `bugbug_delete_visual_regression_reference_screenshot`,
  `bugbug_resolve_visual_regression_review`, `bugbug_stop_run`.
- An error mid-script does not undo earlier calls. Check what already happened
  before repeating a mutation.
- Never pass secret values to `bugbug.variables.*`; the user sets them in the
  BugBug webapp.
- Do not return raw payloads, credentials, or tokens; return the fields the next
  step needs.

## Workflow

1. Pick the namespaces you need and read their reference (see `Resources`).
2. Read `references/runtime.md` once per task for limits, pagination, value
   conventions, and error handling.
3. Write one script per logical step. Batch related reads with `Promise.all` and
   return a compact summary:

   ```js
   const { results } = await bugbug.tests.listRuns({ status: 'failed', pageSize: 10 });
   const runs = await Promise.all(results.map((run) => bugbug.tests.getRun(run.id)));
   return runs.map((run) => ({ id: run.id, name: run.name, errorCode: run.errorCode }));
   ```

4. For long collections use the list-all helpers (`bugbug.tests.getAll()`,
   `bugbug.suites.getAll()`, `bugbug.groups.getAll()`) or page with
   `cursor` / `nextToken`.
5. Use the exact input and output types in the references; each file ends with
   a `Types` section defining every named type. When a field is still unclear,
   run a small script that returns one trimmed item, then continue.
6. Read the result. On `script_*` errors fix the script following
   `references/runtime.md`; do not retry unchanged.

### Starting and watching a run

```js
const run = await bugbug.tests.startRun(testId, { profileName: 'Default' });
const finished = await bugbug.runs.watch({ runType: 'test', runId: run.id });
return { status: finished.status, timedOut: finished.timedOut, url: run.webappUrl };
```

`runs.watch` streams progress to the client. If it returns `timedOut: true`, call
it again to keep waiting. Then debug failures with the
`bugbug-test-run-debugging` skill.

## Output

- A short answer built from the script result, with BugBug links
  (`webappUrl`) when the result includes them.
- For mutations: what changed, with ids.
- Any limit hit, truncation, or error and the next step taken.

## Resources

Resolve bundled resource paths relative to this skill directory.

- Read `references/runtime.md` before the first script of a task: sandbox rules,
  limits, pagination, projectId, errors, and excluded operations.
- Read `references/tests.md` for `bugbug.tests.*`.
- Read `references/suites.md` for `bugbug.suites.*`.
- Read `references/runs-and-debugging.md` for `bugbug.runs.*`,
  `bugbug.debug.*`, and `bugbug.stepRuns.*`.
- Read `references/authoring.md` for `bugbug.groups.*`,
  `bugbug.components.*`, `bugbug.steps.*`, and `bugbug.variables.*`.
- Read `references/project.md` for `bugbug.projects.*`, `bugbug.project.*`,
  `bugbug.profiles.*`, `bugbug.files.*`, `bugbug.projectArtifacts.*`,
  `bugbug.visualRegression.*`, and `bugbug.docs.*`.
- `assets/bugbug-icon.png` is the OpenAI UI icon for this skill.
