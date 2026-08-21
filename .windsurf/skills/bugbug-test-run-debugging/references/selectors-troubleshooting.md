# Selector Troubleshooting Reference

Playbook for repairing a step that failed because its selector no longer matches the target element
(`ELEMENT_DOES_NOT_EXIST`).

> Selectors live on **steps** (`selectorsPresets`), not on runs. The failed step run
> (`bugbug_get_failed_step_run_details`) surfaces the step's `selectorsPresets`, `stepName`, and
> `stepType` alongside the DOM snapshot / screenshots, so a single call is usually enough to see
> which selectors were in play. Use `bugbug_get_step` only when you need the full, authoritative
> step definition.
> Load `bugbug-selectors-authoring` and follow its selector guidance for every
> replacement.

## Required Inputs

- The failed `testRunId` and failed `stepRunId` (and the `stepId` behind it).
- The selector currently stored on the failed step.
- The run's DOM snapshot and screenshots (debug artifacts on the failed run).

## Flow

Work top to bottom. Stop as soon as a step yields a confirmed element, then jump to
**Regenerate stable selectors**.

### 1. Confirm the current/active selector is actually broken

- Check current failed step run by `stepRunId` — read the error code/message, the
  observed-vs-expected element info, and the step's `selectorsPresets` (tool:
  `bugbug_get_failed_step_run_details`). Note the **active** preset/group and every selector it
  carries. A step can hold multiple presets (alternatives); confirm which one is active and failing.
- If you need the full step definition beyond what the run details expose, fetch it by related
  `stepId` (tool: `bugbug_get_step`).
- `bugbug_query_dom_snapshot_element` with the failed run and the current selector — if it now
  resolves cleanly and uniquely, the problem is likely timing/data, not the selector: re-route to the
  matching failure category instead of rewriting the selector.
- Analyze the DOM snapshot and verify if the element is inside an iframe. If so, the step must switch context first (step type `switchContext`) before the selector can be used.
- Analyze the DOM snapshot and verify if the element is inside an Shadow DOM. If so, the step selectorPresets must include each shadow host in the path to the element (as selectors group), otherwise the selector will not resolve.

### 2. Compare against the last successful run

The point is to find out whether a *previously working* selector was changed or lost.

- Find the the most recent successful run of test with related `testId` (tool: `bugbug_list_test_runs`, filter by `status=passed`).
- Get the details of that passed run (tool: `bugbug_get_test_run`), then get details on the same step to read the
selector it used when the test last passed.
- If that last-passing selector differs from the current one and still resolves in the current DOM
  snapshot (verify with `bugbug_query_dom_snapshot_element`), switch the step back to it via
  `bugbug_update_steps` (set that preset/group active on the step), then go to
  **Regenerate stable selectors** to harden it.

### 3. Anchor from the screenshot + DOM snapshot

When there is no better prior selector, locate the element from scratch.

- Open the failed run's covering-element screenshot and identify the target visually: its text label,
  role, and nearby stable landmarks.
- Use that anchor (usually **visible text in the element**, or a stable parent) to find the element in
  the DOM snapshot: `bugbug_query_dom_snapshot_element` with candidate CSS/XPath until exactly one
  element matches and it is the intended target.

## Regenerate stable selectors

**Whenever an element is finally located by any of the steps above**, do not stop at the single
selector that happened to match. Produce a fresh, ordered list of **stable**
selectors for that element by following the `bugbug-selectors-authoring`
guidance.

Build **new active preset** as the preferred path, a keep old preset to easy rollback if the new selectors fail in the future. Then write the result with `bugbug_update_steps` on the failed step.

## Verify

- Run affected test and confirm the previously failing step now passes (tool: `bugbug_run_test`).
- If it still fails on the same step, return to step 3 with the new run's fresh DOM snapshot.

## Hard rules

- Do not update step until the replacement selector has been confirmed against the DOM
  snapshot (exactly one matching element, and it is the intended target).
- Do not invent attributes or text that are not present in the DOM snapshot.
- Only mutate the step when the user has asked for the specific repair — otherwise recommend the
  change and stop.
