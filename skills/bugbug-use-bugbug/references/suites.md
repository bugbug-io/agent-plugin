# bugbug.suites API

## Contents

- bugbug.suites
- Types

<!-- Generated from the code-mode bindings. Do not edit by hand: run `UPDATE_CODE_MODE_REFERENCE=1 npm run test:mcp -- reference` from public-tools/. -->

Suites, their runs, and starting suite runs.
Arguments are validated; unknown or misspelled option keys are rejected. Every function lists its permission (`read` or `write`), description, definition, input, and output. Optional parameters are marked `?`. Named types are defined in full in the `Types` section at the end of this file.

## bugbug.suites

### bugbug.suites.list

Permission: read

Description: List suites (one page).

Definition:

```ts
bugbug.suites.list(options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; latestRun?: boolean; cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: SuiteSummary[] }>
```

Input:

```ts
type Input = [options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; latestRun?: boolean; cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: SuiteSummary[] };
```

### bugbug.suites.getAll

Permission: read

Description: Every suite matching the filters, across all pages, in ONE call.

Definition:

```ts
bugbug.suites.getAll(options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; latestRun?: boolean; pageSize?: number }): Promise<SuiteSummary[]>
```

Input:

```ts
type Input = [options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; latestRun?: boolean; pageSize?: number }];
```

Output:

```ts
type Output = SuiteSummary[];
```

### bugbug.suites.get

Permission: read

Description: Get a suite with its test IDs and run settings.

Definition:

```ts
bugbug.suites.get(suiteId: string): Promise<Suite>
```

Input:

```ts
type Input = [suiteId: string];
```

Output:

```ts
type Output = Suite;
```

### bugbug.suites.listRuns

Permission: read

Description: List historical suite runs.

Definition:

```ts
bugbug.suites.listRuns(options?: { suiteId?: string; status?: RunStatus; ordering?: '-started' | 'started'; startedAfter?: string; startedBefore?: string; cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: SuiteRun[] }>
```

Input:

```ts
type Input = [options?: { suiteId?: string; status?: RunStatus; ordering?: '-started' | 'started'; startedAfter?: string; startedBefore?: string; cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: SuiteRun[] };
```

### bugbug.suites.getRecentRuns

Permission: read

Description: List suite runs started within the last `hours` (default 24).

Definition:

```ts
bugbug.suites.getRecentRuns(options?: { hours?: number; pageSize?: number; ordering?: '-started' | 'started' }): Promise<{ count: number; nextToken: string | null; results: SuiteRun[] }>
```

Input:

```ts
type Input = [options?: { hours?: number; pageSize?: number; ordering?: '-started' | 'started' }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: SuiteRun[] };
```

### bugbug.suites.getRunSummary

Permission: read

Description: Compact suite run: status, totals per status and only failed tests with their failing step; passed tests and full step runs are left out. Prefer over getRun for large suites.

Definition:

```ts
bugbug.suites.getRunSummary(runId: string): Promise<SuiteRunSummary>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = SuiteRunSummary;
```

### bugbug.suites.getRun

Permission: read

Description: Get the full suite run with every test run (several MB for large suites; prefer getRunSummary).

Definition:

```ts
bugbug.suites.getRun(runId: string): Promise<SuiteRun>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = SuiteRun;
```

### bugbug.suites.downloadRunWcagReport

Permission: read

Description: Download the JSON WCAG accessibility report for a suite run. Requires a paid plan.

Definition:

```ts
bugbug.suites.downloadRunWcagReport(runId: string): Promise<WcagReport>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = WcagReport;
```

### bugbug.suites.getRunProgress

Permission: read

Description: Get the live status of a suite run.

Definition:

```ts
bugbug.suites.getRunProgress(runId: string): Promise<SuiteRunState>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = SuiteRunState;
```

### bugbug.suites.getRunScreenshots

Permission: read

Description: Get screenshot URLs captured during a suite run. URLs are temporary.

Definition:

```ts
bugbug.suites.getRunScreenshots(runId: string): Promise<unknown>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = unknown;
```

### bugbug.suites.listRunDebugArtifacts

Permission: read

Description: List debug artifacts of a suite run.

Definition:

```ts
bugbug.suites.listRunDebugArtifacts(runId: string): Promise<DebugArtifact[]>
```

Input:

```ts
type Input = [runId: string];
```

Output:

```ts
type Output = DebugArtifact[];
```

### bugbug.suites.create

Permission: write

Description: Create a suite. Get a runProfileId from bugbug.profiles.list.

Definition:

```ts
bugbug.suites.create(suite: { runProfileId: string; name?: string; notes?: string; autoAddNewTests?: boolean; autoRetry?: number; runInParallel?: boolean; tests?: string[]; beforeAfterAllEnabled?: boolean; beforeAll?: string[]; afterAll?: string[]; browserStateSourceTestId?: string | null }): Promise<Suite>
```

Input:

```ts
type Input = [suite: { runProfileId: string; name?: string; notes?: string; autoAddNewTests?: boolean; autoRetry?: number; runInParallel?: boolean; tests?: string[]; beforeAfterAllEnabled?: boolean; beforeAll?: string[]; afterAll?: string[]; browserStateSourceTestId?: string | null }];
```

Output:

```ts
type Output = Suite;
```

### bugbug.suites.update

Permission: write

Description: Partially update a suite. `tests` replaces the whole list of test IDs.

Definition:

```ts
bugbug.suites.update(suiteId: string, patch: { runProfileId?: string; name?: string; notes?: string; autoAddNewTests?: boolean; autoRetry?: number; runInParallel?: boolean; tests?: string[]; beforeAfterAllEnabled?: boolean; beforeAll?: string[]; afterAll?: string[]; browserStateSourceTestId?: string | null }): Promise<Suite>
```

Input:

```ts
type Input = [suiteId: string, patch: { runProfileId?: string; name?: string; notes?: string; autoAddNewTests?: boolean; autoRetry?: number; runInParallel?: boolean; tests?: string[]; beforeAfterAllEnabled?: boolean; beforeAll?: string[]; afterAll?: string[]; browserStateSourceTestId?: string | null }];
```

Output:

```ts
type Output = Suite;
```

### bugbug.suites.setTestActive

Permission: write

Description: Activate or deactivate one test in a suite without removing it or touching the other tests. Inactive tests stay in the suite but are skipped by suite runs. Find testId in suite.tests, beforeAll or afterAll; isActive is shown there. The suite's browserStateSourceTestId test cannot be deactivated.

Definition:

```ts
bugbug.suites.setTestActive(suiteId: string, testId: string, isActive: boolean): Promise<Suite>
```

Input:

```ts
type Input = [suiteId: string, testId: string, isActive: boolean];
```

Output:

```ts
type Output = Suite;
```

### bugbug.suites.startRun

Permission: write

Description: Start a suite run and return immediately with the run id and webappUrl. Wait for it with bugbug.runs.watch.

Definition:

```ts
bugbug.suites.startRun(suiteId: string, options?: { profileName?: string; variables?: { key: string; value?: string }[] }): Promise<SuiteRunState>
```

Input:

```ts
type Input = [suiteId: string, options?: { profileName?: string; variables?: { key: string; value?: string }[] }];
```

Output:

```ts
type Output = SuiteRunState;
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
type Suite = {
  id: string;
  name: string | null;
  tags: {
    color: string;
    id: string;
    name: string;
  }[];
  notes: string | null;
  webappUrl: string;
  afterAll: {
    [key: string]: unknown;
  }[];
  autoAddNewTests: boolean;
  autoRetry: number;
  beforeAfterAllEnabled: boolean;
  beforeAll: {
    [key: string]: unknown;
  }[];
  browserStateSourceTestId: string | null;
  runInParallel: boolean;
  runProfileId: string | null;
  tests: {
    [key: string]: unknown;
  }[];
  testsCount: number;
  latestRun?: {
    id: string;
    status: string;
    webappUrl: string;
  } | null;
};
type SuiteRun = {
  beforeAfterAllEnabled: boolean;
  duration: string | null;
  ended: string | null;
  errorCode: string | null;
  id: string;
  name: string;
  notes: string | null;
  parallelRun: boolean | null;
  parallelSlots: number | null;
  profileId: string;
  profileName: string;
  queued: string | null;
  runMode: "server" | "local" | "recording";
  sequence: number | null;
  started: string | null;
  status: "recording" | "error" | "passed" | "failed" | "running" | "auto_retrying" | "stopped" | "queued" | "paused" | "skipped" | "initialized";
  suiteId: string | null;
  tags: {
    id: string;
    name: string;
    color: string;
    inherited: boolean;
  }[];
  testRuns: {
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
  }[];
  triggeredBy: string;
  userId: string | null;
  webappUrl: string;
};
type SuiteRunState = {
  duration: string | null;
  finishedTests: number;
  id: string;
  modified: string;
  status: "recording" | "error" | "passed" | "failed" | "running" | "auto_retrying" | "stopped" | "queued" | "paused" | "skipped" | "initialized";
  tags: {
    id: string;
    name: string;
    color: string;
    inherited: boolean;
  }[];
  totalTests: number;
  webappUrl: string;
};
type SuiteRunSummary = {
  id: string;
  name: string;
  status: string;
  suiteId: string | null;
  errorCode: string | null;
  started: string | null;
  ended: string | null;
  duration: string | null;
  webappUrl: string;
  totals: {
    total: number;
    byStatus: {
      [key: string]: number;
    };
  };
  failedTestsCount: number;
  failedTests: {
    testRunId: string;
    testId: string | null;
    name: string;
    status: string;
    errorCode: string | null;
    isAutoRetried: boolean;
    webappUrl?: string;
    failingStep: {
      stepRunId: string;
      stepId: string | null;
      stepType: string | null;
      status: string | null;
      errorCode: string | null;
      error: string | null;
    } | null;
  }[];
};
type SuiteSummary = {
  id: string;
  name: string | null;
  tags: {
    color: string;
    id: string;
    name: string;
  }[];
  notes: string | null;
  afterAll: {
    [key: string]: unknown;
  }[];
  autoAddNewTests: boolean;
  autoRetry: number;
  beforeAfterAllEnabled: boolean;
  beforeAll: {
    [key: string]: unknown;
  }[];
  browserStateSourceTestId: string | null;
  runInParallel: boolean;
  runProfileId: string | null;
  tests: {
    [key: string]: unknown;
  }[];
  testsCount: number;
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
