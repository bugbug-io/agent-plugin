# Variables Troubleshooting Reference

## Contents

- [Required Inputs](#required-inputs)
- [Flow](#flow)
- [Symptom Routing](#symptom-routing)
- [Repair Guidance](#repair-guidance)
- [Output](#output)
- [Hard Rules](#hard-rules)

Playbook for reviewing a step that failed because a variable resolved to the wrong value, an
empty value, or did not resolve at all.

A variable failure rarely produces its own error code. It usually surfaces as a *downstream*
failure: a login step that types nothing, a `goto` that opens a literal `{{host}}` URL, an
assertion comparing against a blank string, or an element that never appears because the record
it depends on was never created. Classify the failure by the evidence below before repairing the
step that visibly failed — the visible failure is often not where the fix belongs.

## Required Inputs

- The failed `testRunId` and failed `stepRunId`.
- Failed step run details from `bugbug_get_failed_step_run_details` — especially `stepName`,
  `stepType`, `errorCode`, and `selectorsPresets`.
- The project's variables from `bugbug_get_variables_list` (returns each variable's `key`, `type`,
  `isBuiltIn`, and `description`).
- The run's profile, and its variable set from `bugbug_list_profiles` / `bugbug_get_profile`, when
  the suspect variable is profile-scoped.
- The failed-step screenshot when the suspect value is typed or displayed in the UI.

## Flow

Work top to bottom. The goal is to prove which variable was involved and whether it was
unresolved, empty, or simply wrong.

### 1. Identify the suspect variable

- Read the failed step's `stepName` and action details for `{{...}}` tokens. Record every
  variable key the step depends on.
- If the failed step has no tokens, walk backwards: the value it consumed was probably produced by
  an earlier `setLocalVariable` step. Find that step and treat it as the real subject of the
  investigation.
- Confirm the key exists in the project with `bugbug_get_variables_list`. A key that is absent
  from that list and is not `isBuiltIn` is an unresolved-variable failure, not a step failure.

### 2. Classify the resolution state

Decide which of the three states the evidence supports. Do not proceed until one is confirmed.

- **Unresolved**: the literal token survived into the run. The screenshot shows `{{host}}` typed
  into a field, or the error message/URL contains braces. The key is missing, misspelled, or
  scoped to a profile the run did not use.
- **Empty**: the token disappeared but nothing replaced it. A field was typed as blank, a URL
  collapsed to `https:///login`, or an assertion compared against `""`. The variable exists but
  carries no value in this run's profile — common for secrets left at their placeholder.
- **Wrong**: the token resolved to a real but incorrect value — a staging host during a
  production run, a stale order ID, a tenant the account cannot access. The step mechanics are
  fine; the data is not.

### 3. Locate the source of the value

- **Profile variable**: confirm which profile the run used, then check that profile actually
  defines the key. A variable defined only in the default profile is not available to a run
  launched with another profile. This is the single most common cause of an empty value that
  "works locally".
- **Secret variable**: a secret created through `bugbug_create_new_variable` stores the
  placeholder `temporary-secret-value-change-me` until a human replaces it in the BugBug web app.
  If the run behaves as though the password is wrong, suspect the placeholder before suspecting
  the application.
- **Local variable**: find the `setLocalVariable` step that produced it and check its
  `local_variable_source`:
  - `element` — the capture depends on a selector. If the selector matched nothing or matched an
    element whose text was empty, this is a **selector problem wearing a variable costume**.
    Re-route to `references/selectors-troubleshooting.md` and verify the selector against the DOM
    snapshot with `bugbug_query_dom_snapshot_element`.
  - `value` — the value is static. An unexpected result means the literal itself is wrong, or it
    embeds another `{{token}}` that failed to resolve.
  - `evaluate` — the value comes from executed code. Check whether the code ran against the right
    document (`is_target_document`) and whether it returned `undefined`/`null` rather than a
    string.
- **Built-in variable**: variables reported with `isBuiltIn` are runtime-provided. Do not attempt
  to create or override them; if one is empty, treat it as an environment problem.

### 4. Confirm before repairing

- Prove the variable was involved by citing concrete evidence: the token visible in a screenshot,
  the empty field, the mismatch between the profile's variable set and the key the step used.
- If nothing ties the failure to a variable, stop and re-route. An empty field can equally mean
  the previous step never focused the input.

## Symptom Routing

| Evidence | Classification | Route to |
|---|---|---|
| Literal `{{key}}` in screenshot, URL, or error | Unresolved variable | Repair Guidance below |
| Key absent from `bugbug_get_variables_list` | Unresolved variable | Repair Guidance below |
| Key exists, but not in the run's profile | Profile/config problem | Repair Guidance below |
| Secret still holds the temporary placeholder | Profile/config problem | Ask the user; never write the value |
| `setLocalVariable` with `source: element` captured nothing | Selector problem | `references/selectors-troubleshooting.md` |
| Value resolved but semantically wrong | Test data problem | Repair Guidance below |
| Element hidden/disabled because required data is missing | Waiting-condition or product state | `references/waiting-conditions-results-check.md` |
| Assertion compared against a resolved-but-stale value | Assertion problem | `references/assertion-troubleshooting.md` |

## Repair Guidance

Prefer the smallest evidence-backed change:

- Fix the key when the evidence shows a typo or a rename — correct the step, not the variable.
- Create the missing variable with `bugbug_create_new_variable` only when the user has asked for
  it and the intended value is known and non-secret.
- Escalate to the user for any missing or placeholder secret. Ask them to set the value in the
  BugBug web app; that is the only supported path.
- Fix the producing step when a local variable captured the wrong or empty value — usually a
  selector repair, not a variable repair.
- Change the run's profile, or add the key to the profile in use, when the variable exists but is
  out of scope for this run.
- Change the variable's stored value only when the evidence shows the data itself is stale and the
  user has authorized the change.

## Output

- Name the suspect variable key and where it was used.
- State the resolution state: unresolved, empty, or wrong — and the evidence that proves it.
- Name the source: profile variable, secret, local variable (with its `local_variable_source`), or
  built-in.
- Classify the issue as unresolved variable, profile/config, selector, test data, or product
  state.
- Recommend one smallest repair, and state explicitly when the fix requires the user because it
  involves a secret.

## Hard Rules

- Never print, echo, or log a resolved secret value into the report, a step, or a YAML file.
  Report only its state: resolved, empty, or placeholder.
- Never invent a value for a missing secret or credential. Ask the user.
- Do not create a variable to make a failure disappear before confirming the key is genuinely
  missing rather than misspelled in the step.
- Do not rewrite a selector on the failed step when the empty value came from an earlier
  `setLocalVariable` step — repair the producing step instead.
- Do not treat a built-in variable as a project variable; it cannot be created or overridden.
- Only mutate a variable, profile, or step when the user has asked for the specific repair —
  otherwise recommend the change and stop.
