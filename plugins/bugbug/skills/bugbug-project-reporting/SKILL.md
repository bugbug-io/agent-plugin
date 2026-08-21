---
name: bugbug-project-reporting
description: Creates read-only BugBug project health reports for PM and QA audiences using run-history aggregates and optional export-based inventory analysis. Use for project health, trends, release risk, flakiness, stale tests, or coverage reporting. Run bugbug-context-discovering first.
---

# BugBug Project Reporting

## Preflight

1. Run `bugbug-context-discovering` without changing platform state.
2. Determine whether the audience is PM, QA, or both.
3. Confirm the reporting window and project scope.

## Inputs

- Target BugBug project.
- Reporting audience: PM, QA, or both.
- Reporting window. Default to 30 days and keep it at or below 90 days.
- Optional project export when inventory, coverage, suite organization, or
  maintenance-debt context is needed.

## Safety

- Use read-only actions. Never mutate BugBug data.
- Stop before any cleanup, rename, delete, run, or suite change; reporting
  findings do not authorize platform mutations.
- Use existing run-list tools for run history; run history is not part of project
  export snapshots.
- Use project export only for inventory, coverage, suite organization, and
  maintenance-debt context.

## Workflow

1. Page `bugbug_list_test_runs` and `bugbug_list_suite_runs` across the bounded
   reporting window.
2. Export the project once when inventory, suite, component, or coverage context
   is required.
3. Aggregate pass rate, failures, flakiness, staleness, and maintenance signals
   supported by the available evidence.
4. Produce the audience-specific report.
5. If evidence is insufficient to support a trend, coverage claim, or failure
   class, state the limitation instead of filling the gap with inference.

Until backend aggregation endpoints exist, aggregate bounded run-list pages in
the skill workflow and return summary data only.

## Output

### PM report

- Executive summary.
- Feature or flow coverage gaps.
- Trend versus the previous period when available.
- Risks affecting release confidence.
- Recommended actions in product language.

### QA report

- Pass rate, top failing tests, flaky tests, and stale tests.
- Suite health and maintenance debt.
- Failure classes when evidence is available.
- Verification and cleanup actions in execution order.

## Resources

- Load `bugbug-context-discovering` during Preflight.
