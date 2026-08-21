# Waiting Conditions Results Check

## Contents

- [Required Inputs](#required-inputs)
- [Flow](#flow)
- [Repair Guidance](#repair-guidance)
- [Output](#output)
- [Hard Rules](#hard-rules)

Playbook for reviewing a step that failed with `FAILED_WAITING_CONDITIONS`.

This error means BugBug found the element for the step, but one or more active waiting
conditions did not resolve before the step timed out. Do not treat it as a selector
failure unless the evidence later shows the element resolved to the wrong target.

## Required Inputs

- The failed `testRunId` and failed `stepRunId`.
- Failed step run details from `bugbug_get_failed_step_run_details`.
- The run metadata from `bugbug_get_test_run`, especially `waitingConditions` and artifact links.
- Failed-step screenshot and DOM snapshot when the failed condition depends on page or element state.

## Flow

Work top to bottom. The goal is to identify the exact unresolved condition and decide
whether the fix belongs in the test, the application state, or the environment.

### 1. Confirm this is really a waiting-condition failure

- Check the failed step error code. Continue only when it is `FAILED_WAITING_CONDITIONS`.
- Confirm the step had an element target and that the runner found an element. In runner behavior,
  `FAILED_WAITING_CONDITIONS` is the potential timeout reason when `elementExists` is true and
  waiting conditions are rejected.
- If the element is absent from the DOM snapshot, re-route to selector troubleshooting instead.
- If the element exists but is clearly the wrong element, re-route to selector troubleshooting

### 2. Read the condition result, not only the error code

- Inspect `waitingConditions.failed` and `waitingConditions.skipped` from step-run payload.
- For every failed condition, record:
  - `type`
  - `expected`
  - `current`
  - whether the condition was failed or skipped
- If multiple conditions failed, start with the first hard condition relevant to the step type. A
  later condition can fail only because an earlier condition kept the page or element unusable.

### 3. Map condition type to likely evidence

- `elementIsVisible`: compare screenshot and DOM. The element may exist but be hidden, off-screen,
  collapsed, behind a route state that did not load, or present only in a different iframe/tab.
- `elementIsNotCovered`: inspect the screenshot for modals, cookie banners, loaders, sticky headers,
  tooltips, dropdowns, or overlays. Check whether the step's interaction point is covered, not just
  whether the target text is visible.
- `elementIsNotAnimating`: look for transitions, skeleton loaders, carousels, hover effects, or
  constantly changing layout. If the page never becomes still, prefer disabling this condition for
  that step over increasing timeout indefinitely.
- `elementIsNotDisabled`: check whether the control is intentionally disabled because required data,
  permissions, validation, or network state is missing.
- `elementHasFocus`: inspect whether the target is a real input/textarea and whether another element
  steals focus. Focus failures often follow visibility or coverage failures, so validate those first.
- `elementHasAttribute`: compare `expected` and `current`. If the attribute reflects async state,
  verify the previous step actually triggers that state.
- `documentComplete`: inspect page load behavior and console/network evidence. A page that never
  reaches ready state is usually an environment or product-load issue.
- `networkIdle`: inspect network logs or application behavior for long polling, analytics, streams,
  stuck requests, or intentionally persistent connections. If the app is expected to keep requests
  open, adjust or disable this condition rather than raising the timeout.
- `pageNavigationAfterExecution`: this condition is excluded from the pre-action condition check; if
  navigation is the real issue, inspect the step after execution and route to navigation/product
  behavior analysis.

### 4. Use artifacts to classify the cause

- Screenshot shows target absent or wrong page: classify as product state, test data, navigation, or
  previous-step issue. Do not modify waiting conditions first.
- Screenshot shows target visible but covered: classify as coverage/overlay. Fix by closing or
  waiting for the covering UI, changing the click target, or disabling `elementIsNotCovered` only
  when the cover is harmless and expected.
- DOM shows target exists with hidden/disabled attributes: classify as application state or missing
  precondition. Fix the setup or previous steps before changing the timeout.
- Network evidence shows pending requests that are expected and unrelated to the step: adjust
  `networkIdle` for this step/project.
- Only use timeout increase when evidence shows the condition eventually becomes true and the app is
  simply slower than the current limit.

## Repair Guidance

Prefer the smallest evidence-backed change:

- Fix previous steps when they fail to open the right page, tab, frame, modal, or application state.
- Fix test data or variables when the UI remains disabled or hidden because required data is absent.
- Add a targeted assertion or wait before this step when it clarifies the intended state transition.
- Disable a specific waiting condition on the step when it is not meaningful for this UI state.
- Increase `runTimeout` only when the condition is valid and routinely resolves slightly too late.
- Regenerate selectors only when the element is missing, wrong, or ambiguous in the DOM snapshot.
- Add extra steps for eg. closing cookie banners or popups if they are missing

## Output

- Name the failed condition types and their `expected` / `current` values.
- State what the screenshot, DOM snapshot, and network or console evidence showed.
- Classify the issue as selector, previous-step, product state, test data, environment, or waiting
  condition configuration.
- Recommend one smallest repair and explain why broader changes, such as increasing all timeouts or
  disabling all waiting conditions, are not supported by the evidence.

## Hard Rules

- Do not solve `FAILED_WAITING_CONDITIONS` by blindly increasing timeout.
- Do not disable all waiting conditions as a generic fix.
- Do not rewrite selectors unless the DOM evidence shows the element is absent, wrong, or ambiguous.
- Do not ignore failed `networkIdle` evidence when the app has known persistent requests; classify it
  as condition configuration, not product failure, when the requests are expected.
