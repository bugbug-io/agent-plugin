# bugbug.runs, bugbug.debug, and bugbug.stepRuns API

## Contents

- bugbug.runs
- bugbug.debug
- bugbug.stepRuns
- Types

<!-- Generated from the code-mode bindings. Do not edit by hand: run `UPDATE_CODE_MODE_REFERENCE=1 npm run test:mcp -- reference` from public-tools/. -->

Waiting for runs and inspecting failures: logs, network, DOM snapshots, and step runs.
Arguments are validated; unknown or misspelled option keys are rejected. Every function lists its permission (`read` or `write`), description, definition, input, and output. Optional parameters are marked `?`. Named types are defined in full in the `Types` section at the end of this file.

## bugbug.runs

### bugbug.runs.watch

Permission: read

Description: Wait until a run reaches a terminal status, streaming progress to the client. Default timeout 5 min (test) / 10 min (suite), max 10 min. On timeout returns timedOut: true with the last status; call again to keep waiting.

Definition:

```ts
bugbug.runs.watch(options: { runType: "test" | "suite"; runId: string; timeoutMs?: number }): Promise<{ runId; runType; status; progress?: { finished; total; unit }; webappUrl?; timedOut: boolean }>
```

Input:

```ts
type Input = [options: { runType: "test" | "suite"; runId: string; timeoutMs?: number }];
```

Output:

```ts
type Output = { runId; runType; status; progress?: { finished; total; unit }; webappUrl?; timedOut: boolean };
```

## bugbug.debug

### bugbug.debug.diagnoseTestRun

Permission: read

Description: List which evidence (DOM snapshot, logs, screenshots) exists for a test run before fetching it.

Definition:

```ts
bugbug.debug.diagnoseTestRun(runId: string): Promise<{ artifacts: DebugArtifact[]; diagnosticSources: { kind: string; available: boolean; description: string }[] }>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = { artifacts: DebugArtifact[]; diagnosticSources: { kind: string; available: boolean; description: string }[] };
```

### bugbug.debug.failedStepRun

Permission: read

Description: Get failure-focused details of a step run together with its step definition. Start here for a failed step; errorDocUri is a readable MCP resource explaining the error code. Screenshot URLs are temporary.

Definition:

```ts
bugbug.debug.failedStepRun(stepRunId: string): Promise<{ stepName; stepType; selectorsPresets; errorCode; errorMessage; errorDocUri; screenshots; expectedValue; observedValue; observedDiff; maxDiff }>
```

Input:

```ts
type Input = [stepRunId: string];
```

Output:

```ts
type Output = { stepName; stepType; selectorsPresets; errorCode; errorMessage; errorDocUri; screenshots; expectedValue; observedValue; observedDiff; maxDiff };
```

### bugbug.debug.queryConsoleLogs

Permission: read

Description: Query a test run's console output. Defaults to the tested page's own console (source 'website'); filter by levels (e.g. ['error']), text, tab and time. Page with limit (default 50, max 200) and cursor = previous nextToken. Needs run logs enabled in the project settings.

Definition:

```ts
bugbug.debug.queryConsoleLogs(options: { runId: string; source?: 'website' | 'bugbug' | 'all'; levels?: string[]; text?: string; tabId?: string; after?: string; before?: string; limit?: number; cursor?: string }): Promise<{ entries: { timestamp: string; tab: string; source: string; level: string | null; message: string; truncated?: boolean }[]; total: number; nextToken: string | null; partial: boolean }>
```

Input:

```ts
type Input = [options: { runId: string; source?: 'website' | 'bugbug' | 'all'; levels?: string[]; text?: string; tabId?: string; after?: string; before?: string; limit?: number; cursor?: string }];
```

Output:

```ts
type Output = { entries: { timestamp: string; tab: string; source: string; level: string | null; message: string; truncated?: boolean }[]; total: number; nextToken: string | null; partial: boolean };
```

### bugbug.debug.queryNetworkRequests

Permission: read

Description: Query a test run's network requests (HAR). Includes error and blockedReason when recorded, also in compact results; these do not identify the blocking extension or rule. Filter by urlContains, method, status, failedOnly, mimeType, tabId. includeDetails adds redacted headers and truncated bodies. Page with limit (default 50, max 200) and cursor = previous nextToken. Requires a network_logs artifact; network capture is independent of console logs.

Definition:

```ts
bugbug.debug.queryNetworkRequests(options: { runId: string; urlContains?: string; method?: string; status?: number; failedOnly?: boolean; mimeType?: string; tabId?: string; includeDetails?: boolean; limit?: number; cursor?: string }): Promise<{ entries: { startedDateTime: string; method: string; url: string; status: number; error?: string; blockedReason?: string; mimeType: string | null; durationMs: number | null; responseSizeBytes: number | null; tabId: string | null; requestHeaders?; responseHeaders?; requestBody?; responseBody?; truncated?: boolean }[]; total: number; nextToken: string | null }>
```

Input:

```ts
type Input = [options: { runId: string; urlContains?: string; method?: string; status?: number; failedOnly?: boolean; mimeType?: string; tabId?: string; includeDetails?: boolean; limit?: number; cursor?: string }];
```

Output:

```ts
type Output = { entries: { startedDateTime: string; method: string; url: string; status: number; error?: string; blockedReason?: string; mimeType: string | null; durationMs: number | null; responseSizeBytes: number | null; tabId: string | null; requestHeaders?; responseHeaders?; requestBody?; responseBody?; truncated?: boolean }[]; total: number; nextToken: string | null };
```

### bugbug.debug.queryDomSnapshot

Permission: read

Description: Query a run's DOM snapshot (or inline HTML) by CSS selector or XPath. Returns the first match's HTML (attribute/text XPath returns the value); raise `limit` for more matches.

Definition:

```ts
bugbug.debug.queryDomSnapshot(options: { runId?: string; html?: string; selector: string; selectorType?: 'css' | 'xpath'; limit?: number }): Promise<{ domSnapshotAvailable: boolean; exists: boolean | null; matchCount: number | null; html: string | null; matches?: string[] }>
```

Input:

```ts
type Input = [options: { runId?: string; html?: string; selector: string; selectorType?: 'css' | 'xpath'; limit?: number }];
```

Output:

```ts
type Output = { domSnapshotAvailable: boolean; exists: boolean | null; matchCount: number | null; html: string | null; matches?: string[] };
```

## bugbug.stepRuns

### bugbug.stepRuns.get

Permission: read

Description: Get the raw result of one step execution.

Definition:

```ts
bugbug.stepRuns.get(stepRunId: string): Promise<StepRunDetails>
```

Input:

```ts
type Input = [stepRunId: string];
```

Output:

```ts
type Output = StepRunDetails;
```

## Types

Exact definitions of the named types used by the functions above.

```ts
type DebugArtifact = {
  id: string;
  kind: "logs_partial" | "logs" | "cloud_logs" | "container_stats" | "chrome_debug_logs" | "dom_snapshot" | "network_logs";
  file: string;
  fileExtension: string | null;
  contentType: string | null;
  expirationTime: string | null;
};
type StepRunDetails = {
  id: string;
  stepId: string;
  testRunId: string;
  type: string;
  status?: "recording" | "error" | "passed" | "failed" | "running" | "auto_retrying" | "stopped" | "queued" | "paused" | "skipped" | "initialized";
  error?: string | null;
  errorCode?: string | null;
  warning?: boolean;
  forceFailed?: boolean;
  ignoredFailed?: boolean;
  executed?: boolean | null;
  elementExists?: boolean | null;
  timeout?: boolean | null;
  executionUrl?: string | null;
  started?: string | null;
  ended?: string | null;
  duration?: string | null;
  runTimeout?: number | null;
  sleep?: number | null;
  screenshotUrl: string;
  coveringElementScreenshot: string;
  assertionExpectedValue?: string | null;
  assertionCurrentValue?: string | null;
  assertionType: string;
  assertionProperty: string;
  assertionAttributeName: string;
  tabNo: number;
  computedValue?: string | null;
  computedUrl?: string | null;
  computedUsername?: string | null;
  computedPassword?: string | null;
  computedFrameLocation?: string | null;
  computedAssertionExpectedValue?: string | null;
  computedSelector?: string | null;
  selector?: string | null;
  interactionPositionX?: number | null;
  interactionPositionY?: number | null;
  scrollX?: number | null;
  scrollY?: number | null;
  windowInnerWidth?: number | null;
  windowInnerHeight?: number | null;
  waitingConditions: {
    type: "documentComplete" | "elementIsVisible" | "elementIsNotCovered" | "elementIsNotAnimating" | "elementIsNotDisabled" | "elementHasFocus" | "networkIdle" | "pageNavigationAfterExecution" | "elementHasAttribute";
    isSuccess: boolean;
    isSoftSuccess?: boolean;
    isIgnored?: boolean;
    expected?: string | null;
    current?: string | null;
  }[];
  visualRegressionRefScreenshotSourceId: string | null;
  visualRegressionCompareResult: {
    refScreenshotUrl: string | null;
    observedScreenshotUrl: string | null;
    diffScreenshotUrl: string | null;
    maxDiff: number;
    observedDiff: number | null;
    executionTime?: number | null;
    browserName?: string | null;
    osName?: string | null;
    screenSizeType?: "" | "desktop" | "mobile" | "custom" | null;
    runMode?: "" | "server" | "local" | "recording" | null;
    profileName: string;
  };
};
```
