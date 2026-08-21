# Community best practices for writing fast, stable, and maintainable E2E tests

Speed is a feature. Slow suites get skipped, ignored, or run less often, which
defeats the point of automated testing. Apply these rules when creating or
modifying tests and steps so the suite stays fast and stable.

## 1. Measure before optimizing
- Find the slowest tests first instead of guessing. Optimize the steps and tests
  that actually dominate the run time, not the ones that are merely annoying.

## 2. Keep tests independent so they can run in parallel
- Each test must set up its own data and not depend on another test's state or
  execution order.
- Independent tests can run simultaneously across workers; shared state forces
  serial execution and slows everything down.

## 3. Reuse authentication instead of logging in every test
- Do not repeat UI login steps in every test. Authenticate once and reuse the
  saved session (e.g. via a setup test/profile and stored auth state).
- Repeated logins are pure overhead multiplied by the number of tests.

## 4. Never use artificial waits
- Do NOT add fixed delays (sleep / wait-for-timeout style steps) to "let the page
  settle". They make tests both slow and flaky.
- Wait on a real condition instead: assert that the expected element or text is
  visible, enabled, or has the expected value. Auto-waiting on a real signal is
  faster and more reliable than a hardcoded delay.

## 5. Prepare test data via API, not through the UI
- When a test needs preexisting data, create it through API calls and then
  navigate directly to the relevant page, rather than clicking through the UI to
  build that state.
- This skips irrelevant UI steps and isolates the feature actually under test.

## 6. Navigate directly instead of clicking through screens
- Use a 'goto' step straight to the target page when the intermediate navigation
  is not the thing being tested.
- Keep 'beforeEach'-style setup minimal: prefer reused auth, API data prep, and
  direct navigation over repeating UI actions before every test.

## 7. Keep tests small and focused
- Avoid one giant end-to-end scenario that covers login -> order -> payment ->
  cancellation. Split it into separate focused tests, one responsibility each.
- Smaller tests run faster, fail more clearly, and are easier to retry in
  isolation.

## 8. Use robust, semantic selectors
- Prefer role-, label-, text-, or test-id-based selectors over brittle positional
  CSS/XPath like 'div:nth-child(3) > button'.
- Good selectors are faster to resolve and far less likely to break or trigger
  retries, which keeps the suite fast over time.

## 9. Organize tests by priority and run subsets
- Tag or group tests (e.g. smoke vs. regression) so a fast critical-path subset
  can run for quick feedback, while the full suite runs less often (nightly /
  pre-release).

## 10. Limit broad cross-browser runs in fast pipelines
- For fast feedback, run a single primary browser. Reserve full multi-browser
  coverage for scheduled/regression runs, not every change.

## 11. Record diagnostics only when needed
- Capture video, traces, and screenshots conditionally (on failure / on retry),
  not on every run. Always-on recording adds significant overhead.

## 12. Set reasonable timeouts
- Use sane action, navigation, assertion, and overall test timeouts so a genuinely
  stuck step fails fast instead of hanging and masking the problem.

## 13. Test at the right layer
- Not everything needs an end-to-end UI test. Cover logic with unit/API/component
  checks and reserve full E2E tests for critical user journeys. Fewer redundant
  UI tests means a faster suite.