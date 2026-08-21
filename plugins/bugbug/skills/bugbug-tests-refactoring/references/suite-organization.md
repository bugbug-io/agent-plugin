# Suite Organization

Use this when suites are missing, stale, duplicated, or poorly named.

Conventions:

- Smoke: small, high-signal checks for deploy confidence.
- Regression: broader coverage for critical flows.
- Feature suites: focused areas owned by a product or QA team.

Workflow:

1. Analyze current suites from export YAML or suite list/get tools.
2. Identify tests missing from expected suites and tests in stale suites.
3. Propose the smallest suite change set first.
4. Create / update / delete suites only after explicit user approval.
5. Run changed suites or representative tests when a live environment is
   available.

Deleting suites is destructive organization cleanup. Confirm the target suite ID
and explain that tests are not deleted before starting the process.
