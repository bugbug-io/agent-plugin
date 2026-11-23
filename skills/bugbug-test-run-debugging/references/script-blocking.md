# Script Blocking Reference

## Contents

- [Required Inputs](#required-inputs)
- [Flow](#flow)
- [Verify](#verify)
- [Output](#output)
- [Hard Rules](#hard-rules)

Playbook for a test that fails or flakes because a marketing widget, chat bubble,
cookie banner or other third-party popup covers the page. The goal is to find the
script that injects it, propose a narrow project blocking rule and verify that the
popup disappears while the tested feature keeps working.

For rule syntax, examples and limitations, see
[Blocking scripts](https://docs.bugbug.io/preventing-failed-tests/blocking-scripts).

## Required Inputs

- The affected `testRunId` and, when the run failed, the failed `stepRunId`.
- The screenshot or DOM snapshot showing the popup.
- Project settings from `bugbug_get_project_settings` (or `bugbug.project.getSettings()`
  in code mode): `blockedScriptUrls`, `runLogs`, `networkLogsPreset`,
  `networkLogsCategories` and `domSnapshot`. Save them before any change.

## Flow

### 1. Classify the popup

From the screenshot or DOM snapshot, establish whether the popup is an overlay, an
iframe or a new browser tab, and record its visible content and the step it blocks.

### 2. Make sure the run captured scripts

- Successful script requests are captured in the **Other** network category. Full
  capture includes it; custom capture must include `other`. Basic capture may omit
  successful marketing scripts, so an empty query is not proof that no script loaded.
- If capture was off or incomplete and the user asked for the diagnosis, enable it
  with `bugbug.project.updateSettings()` in code mode
  (`runLogs: "consoleLogs"`, `networkLogsPreset: "full"`, `domSnapshot: true`) and
  start a fresh run when authorized. Updating only `blockedScriptUrls` does not
  enable logs.
- DOM snapshots are captured on failed/error runs. Do not force a failure just to
  get one.
- If network artifacts stay unavailable, an authorized temporary `execute` step
  can log script sources (without query values) and widget state, read with
  `bugbug_query_console_logs`. Disable that step after verification.

### 3. Query network requests

- Query `bugbug_query_network_requests` with `mimeType: "javascript"` and without
  `failedOnly`; follow pagination. Marketing loaders usually succeed, so failed-only
  queries miss them.
- To inspect blocked requests, use `failedOnly: true` with `urlContains` and no MIME
  filter, and read `error` and `blockedReason`. `ERR_BLOCKED_BY_CLIENT` shows a
  browser-side block, not which extension or rule caused it.
- Script bodies are omitted. Work from URL, MIME type, timing, tab and DOM evidence.
  BugBug MCP does not inspect a live page; use a live-browser tool only when the
  agent has an authorized one.

### 4. Form a narrow hypothesis

- Tie a request to the popup through its content, iframe source, timing or a
  comparison with a run without the popup. A third-party host or a known vendor
  name alone does not prove causation.
- Prefer an exact host for a dedicated widget host, or a narrow URL pattern on a
  shared host.

### 5. Apply the rule

Apply only when the user asked to block the scripts or apply the fix; that request
is the authorization, do not ask again. Use `bugbug_update_script_blocking` or code
mode. `blockedScriptUrls` replaces the whole list, so re-read settings and keep
existing rules:

```js
const settings = await bugbug.project.getSettings();
const blockedScriptUrls = [...new Set([...settings.blockedScriptUrls, 'ads.example.com'])];
return await bugbug.project.updateSettings({ blockedScriptUrls });
```

## Verify

- Rules apply to a **new recording or playback session**; reloading an old session
  does not pick them up.
- In a fresh run, check that the popup is gone and the tested feature still works.
  One passing run does not prove causation for an intermittent popup.
- Blocking does not stop inline scripts, code that already ran, scripts served by a
  service worker or its CacheStorage, or the first scripts of a tab the site opens
  directly at a URL.
- Prefer an absence assertion on the observed widget element. A JavaScript
  assertion must return `true` on success, e.g.
  `return !Boolean(window.Intercom && window.Intercom.booted);`.
- Restore the saved diagnostic settings after collecting evidence.

## Output

- Candidate host or URL, with the run evidence that links it to the popup.
- Confidence and the proposed rule with its expected impact.
- Whether the rule was applied and the verification result, or what evidence is
  missing.

## Hard Rules

- Diagnosis alone is not a request to change project settings.
- Never clear or overwrite the user's existing rules; an empty list disables blocking.
- Do not block first-party bundles, authentication, payments or whole CDNs because a
  popup appeared.
- Do not stack broader rules after an unsuccessful attempt; revisit the hypothesis.
- Omit query values with user identifiers or tokens from the report.
- When rolling back an experiment, remove only the rules added for it.
