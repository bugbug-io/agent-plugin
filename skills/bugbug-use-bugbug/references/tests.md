# bugbug.tests API

## Contents

- bugbug.tests
- Types

<!-- Generated from the code-mode bindings. Do not edit by hand: run `UPDATE_CODE_MODE_REFERENCE=1 npm run test:mcp -- reference` from public-tools/. -->

Tests, their runs, run artifacts, and starting runs.
Arguments are validated; unknown or misspelled option keys are rejected. Every function lists its permission (`read` or `write`), description, definition, input, and output. Optional parameters are marked `?`. Named types are defined in full in the `Types` section at the end of this file.

## bugbug.tests

### bugbug.tests.list

Permission: read

Description: List tests (one page). Pass `nextToken` back as `cursor` for the next page; the last page has `nextToken: null`. To read everything, loop `do { page = await bugbug.tests.list({ cursor, pageSize: 100 }); cursor = page.nextToken ?? undefined } while (cursor)` or call `tests.getAll`.

Definition:

```ts
bugbug.tests.list(options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; latestRun?: boolean; folderId?: string; noFolder?: boolean; cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: TestSummary[] }>
```

Input:

```ts
type Input = [options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; latestRun?: boolean; folderId?: string; noFolder?: boolean; cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: TestSummary[] };
```

### bugbug.tests.getAll

Permission: read

Description: Every test matching the filters, across all pages, in ONE call (use for project-wide scans instead of paging with list).

Definition:

```ts
bugbug.tests.getAll(options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; latestRun?: boolean; folderId?: string; noFolder?: boolean; pageSize?: number }): Promise<TestSummary[]>
```

Input:

```ts
type Input = [options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; latestRun?: boolean; folderId?: string; noFolder?: boolean; pageSize?: number }];
```

Output:

```ts
type Output = TestSummary[];
```

### bugbug.tests.get

Permission: read

Description: Get a test with its steps and groups.

Definition:

```ts
bugbug.tests.get(testId: string): Promise<Test>
```

Input:

```ts
type Input = [testId: string];
```

Output:

```ts
type Output = Test;
```

### bugbug.tests.listRuns

Permission: read

Description: List historical test runs, optionally filtered by test, status, or start time.

Definition:

```ts
bugbug.tests.listRuns(options?: { testId?: string; status?: RunStatus; ordering?: '-started' | 'started'; startedAfter?: string; startedBefore?: string; cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: TestRun[] }>
```

Input:

```ts
type Input = [options?: { testId?: string; status?: RunStatus; ordering?: '-started' | 'started'; startedAfter?: string; startedBefore?: string; cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: TestRun[] };
```

### bugbug.tests.getRecentRuns

Permission: read

Description: List test runs started within the last `hours` (default 24).

Definition:

```ts
bugbug.tests.getRecentRuns(options?: { hours?: number; pageSize?: number; ordering?: '-started' | 'started' }): Promise<{ count: number; nextToken: string | null; results: TestRun[] }>
```

Input:

```ts
type Input = [options?: { hours?: number; pageSize?: number; ordering?: '-started' | 'started' }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: TestRun[] };
```

### bugbug.tests.getRun

Permission: read

Description: Get a test run with its step runs (status, errorCode, stepRun IDs).

Definition:

```ts
bugbug.tests.getRun(runId: string): Promise<TestRun>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = TestRun;
```

### bugbug.tests.downloadRunWcagReport

Permission: read

Description: Download the JSON WCAG accessibility report for a test run. Requires a paid plan.

Definition:

```ts
bugbug.tests.downloadRunWcagReport(runId: string): Promise<WcagReport>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = WcagReport;
```

### bugbug.tests.getRunProgress

Permission: read

Description: Get the live status of a test run.

Definition:

```ts
bugbug.tests.getRunProgress(runId: string): Promise<TestRunState>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = TestRunState;
```

### bugbug.tests.getRunScreenshots

Permission: read

Description: Get screenshot URLs captured for each step run. URLs are temporary.

Definition:

```ts
bugbug.tests.getRunScreenshots(runId: string): Promise<StepRunScreenshot[]>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = StepRunScreenshot[];
```

### bugbug.tests.getRunLogs

Permission: read

Description: Get the plain-text execution log of a test run.

Definition:

```ts
bugbug.tests.getRunLogs(runId: string): Promise<string>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = string;
```

### bugbug.tests.listRunDebugArtifacts

Permission: read

Description: List debug artifacts (DOM snapshot, logs, network logs) of a test run.

Definition:

```ts
bugbug.tests.listRunDebugArtifacts(runId: string): Promise<DebugArtifact[]>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = DebugArtifact[];
```

### bugbug.tests.getRunDebugArtifact

Permission: read

Description: Get one debug artifact of a test run by type.

Definition:

```ts
bugbug.tests.getRunDebugArtifact(runId: string, type: 'network_logs' | 'logs' | 'dom_snapshot'): Promise<DebugArtifact>
```

Input:

```ts
type Input = [runId: string, type: 'network_logs' | 'logs' | 'dom_snapshot'];
```

Output:

```ts
type Output = DebugArtifact;
```

### bugbug.tests.create

Permission: write

Description: Create an empty test. Add groups with bugbug.groups.create and steps with bugbug.steps.create.

Definition:

```ts
bugbug.tests.create(test: { name: string; notes?: string; folderId?: string; screenSizeType?: "desktop" | "mobile" | "custom" }): Promise<Test>
```

Input:

```ts
type Input = [test: { name: string; notes?: string; folderId?: string; screenSizeType?: "desktop" | "mobile" | "custom" }];
```

Output:

```ts
type Output = Test;
```

### bugbug.tests.update

Permission: write

Description: Partially update a test; only the given fields change.

Definition:

```ts
bugbug.tests.update(testId: string, patch: { name?: string; notes?: string; folderId?: string | null; screenSizeType?: "desktop" | "mobile" | "custom" }): Promise<Test>
```

Input:

```ts
type Input = [testId: string, patch: { name?: string; notes?: string; folderId?: string | null; screenSizeType?: "desktop" | "mobile" | "custom" }];
```

Output:

```ts
type Output = Test;
```

### bugbug.tests.import

Permission: write

Description: Create a test from BugBug YAML (raw text) or a ZIP export (base64). Pass folderId to import into an existing test folder (default: project root). Read the bugbug-yaml-authoring skill for the YAML format.

Definition:

```ts
bugbug.tests.import(options: { format: "yaml" | "zip"; payload: string; folderId?: string }): Promise<TestSummary>
```

Input:

```ts
type Input = [options: { format: "yaml" | "zip"; payload: string; folderId?: string }];
```

Output:

```ts
type Output = TestSummary;
```

### bugbug.tests.updateStepPosition

Permission: write

Description: Move a step to a zero-based position, optionally into another test group (test.groups[].id) or an if-condition block (blockId; null moves it out).

Definition:

```ts
bugbug.tests.updateStepPosition(testId: string, move: { stepId: string; atIndex: number; groupId?: string; blockId?: string | null }): Promise<void>
```

Input:

```ts
type Input = [testId: string, move: { stepId: string; atIndex: number; groupId?: string; blockId?: string | null }];
```

Output:

```ts
type Output = void;
```

### bugbug.tests.updateGroupPosition

Permission: write

Description: Move a group or component to a zero-based position within a test. groupId is the test-group relation id (test.groups[].id); an atIndex past the end moves it last.

Definition:

```ts
bugbug.tests.updateGroupPosition(testId: string, move: { groupId: string; atIndex: number }): Promise<void>
```

Input:

```ts
type Input = [testId: string, move: { groupId: string; atIndex: number }];
```

Output:

```ts
type Output = void;
```

### bugbug.tests.insertGroup

Permission: write

Description: Link an existing plain group into a test at an optional position.

Definition:

```ts
bugbug.tests.insertGroup(testId: string, options: { groupId: string; atIndex?: number }): Promise<Test>
```

Input:

```ts
type Input = [testId: string, options: { groupId: string; atIndex?: number }];
```

Output:

```ts
type Output = Test;
```

### bugbug.tests.insertComponent

Permission: write

Description: Link a reusable component into a test at an optional position. Use the component id, not originGroupId.

Definition:

```ts
bugbug.tests.insertComponent(testId: string, options: { componentId: string; atIndex?: number }): Promise<Test>
```

Input:

```ts
type Input = [testId: string, options: { componentId: string; atIndex?: number }];
```

Output:

```ts
type Output = Test;
```

### bugbug.tests.startRun

Permission: write

Description: Start a cloud run of a test and return immediately with the run id and webappUrl. Wait for it with bugbug.runs.watch.

Definition:

```ts
bugbug.tests.startRun(testNameOrId: string, options?: { profileName?: string; variables?: { key: string; value?: string }[] }): Promise<TestRunState>
```

Input:

```ts
type Input = [testNameOrId: string, options?: { profileName?: string; variables?: { key: string; value?: string }[] }];
```

Output:

```ts
type Output = TestRunState;
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
type RunStatus = "recording" | "error" | "passed" | "failed" | "running" | "auto_retrying" | "stopped" | "queued" | "paused" | "skipped" | "initialized";
type StepRunScreenshot = {
  id: string;
  stepId: string | null;
  screenshotUrl: string;
};
type Test = {
  folderId?: string | null;
  id: string;
  name?: string;
  tags: {
    color: string;
    id: string;
    name: string;
  }[];
  groups: string;
  notes: string | null;
  screenSizeType: "desktop" | "mobile" | "custom";
  webappUrl: string;
  latestRun?: {
    id: string;
    status: string;
    webappUrl: string;
  } | null;
};
type TestRun = {
  browserName: string | null;
  browserHeight: number | null;
  browserVersion: string | null;
  browserWidth: number | null;
  duration: string | null;
  ended: string | null;
  errorCode: string | null;
  extensionVersion: string | null;
  id: string;
  isAutoRetried: boolean;
  name: string;
  notes: string | null;
  osName: string | null;
  profileId: string;
  profileName: string;
  queued: string | null;
  runMode: "server" | "local" | "recording";
  runProfileId: string | null;
  screenSizeType: "desktop" | "mobile" | "custom";
  section: "main" | "before_all" | "after_all";
  sequence: number | null;
  started: string | null;
  status: "recording" | "error" | "passed" | "failed" | "running" | "auto_retrying" | "stopped" | "queued" | "paused" | "skipped" | "initialized";
  stepsRuns: string;
  suiteRunId: string | null;
  tags: {
    id: string;
    name: string;
    color: string;
    inherited: boolean;
  }[];
  testId: string | null;
  triggeredBy: "user" | "api" | "webhook" | "scheduler" | "github" | "cli" | "agent" | "vercel";
  userId: string | null;
  webappUrl: string;
};
type TestRunState = {
  duration: string | null;
  finishedSteps: number;
  id: string;
  modified: string;
  status: "recording" | "error" | "passed" | "failed" | "running" | "auto_retrying" | "stopped" | "queued" | "paused" | "skipped" | "initialized";
  tags: {
    id: string;
    name: string;
    color: string;
    inherited: boolean;
  }[];
  totalSteps: number;
  webappUrl: string;
};
type TestSummary = {
  folderId?: string | null;
  id: string;
  name?: string;
  tags: {
    color: string;
    id: string;
    name: string;
  }[];
  latestRun?: {
    id: string;
    status: string;
    webappUrl: string;
  } | null;
};
type WcagReport = {
  name: string;
  run_name: string;
  sequence: string;
  run_type: "test_run" | "suite_run";
  run_id: string;
  project_name: string;
  status: string;
  started: string | null;
  finished: string | null;
  triggered_by: string;
  run_mode: string;
  screen_size_type: string | null;
  browser_width: number | null;
  browser_height: number | null;
  browser_name: string | null;
  browser_version: string | null;
  extension_version: string | null;
  os_name: string | null;
  webapp_url: string;
  pass_rate: number | null;
  checks_count: number;
  failed_checks_count: number;
  pages_count: number;
  passed_rules_count: number;
  failed_rules_count: number;
  pages: {
    url: string;
    pass_rate: number | null;
    checks_count: number;
    passed_rule_ids: string[];
    failed_rules: {
      rule_id: string;
      impact: string;
      help: string;
      help_url: string;
      description: string;
      wcag_tags: string[];
      nodes: {
        target: string;
        html: string;
        failure_summary: string;
        test_name: string;
      }[];
      nodes_count: number;
    }[];
    checks: {
      test_name: string;
      step_name: string;
      passed: boolean;
      pass_rate: number | null;
      passed_rules_count: number;
      failed_rules_count: number;
      critical_count: number;
      serious_count: number;
      moderate_count: number;
      minor_count: number;
      step_run_id: string;
      step_run_screenshot: string | null;
      scope: string;
      disabled_rules?: string[];
      scan_complete: boolean;
      skipped_frames?: {
        frame_id: number;
        reason: string;
      }[];
    }[];
  }[];
};
```
