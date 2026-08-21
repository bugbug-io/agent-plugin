# Assertion Troubleshooting Reference

Playbook for reviewing a step that failed because an assertion did not match the observed page state.

## Required Inputs

- The failed `testRunId` and failed `stepRunId`.
- The failed step run details (tool: `bugbug_get_failed_step_run_details` with the `stepRunId`).
- The failed run's screenshots and DOM snapshot links from the run payload.

## Visibility Assertions

When an `is visible` assertion fails, do not assume the selector is wrong or the element is missing.
First verify whether the element exists but is not visibly actionable in the captured page state.

- Inspect the failed step screenshot and check whether another element covers, overlaps, or obscures
  the asserted element.
- Inspect the DOM snapshot for the asserted element and nearby overlays, modals, sticky headers,
  cookie banners, loading masks, disabled layers, or other covering containers.
- If the element exists in the DOM snapshot but is covered in the screenshot, classify the failure as
  an assertion/product-state problem, not a selector problem.
- If the element is absent from the DOM snapshot, re-route to selector troubleshooting or product
  behavior analysis based on the surrounding evidence.

## Output

- State what the assertion expected.
- State what the screenshot and DOM snapshot showed.
- Call out explicitly whether the target was missing, present-but-covered, or present-and-visible.
- Recommend the smallest supported fix: wait for/remove the covering UI, adjust the product state,
  or change the assertion only if the expected behavior changed.
