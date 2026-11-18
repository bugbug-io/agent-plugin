---
name: bugbug-feedback-reporting
description: Collects problems with BugBug itself during an agent session (errors, missing features, confusing tool behavior, documentation gaps, workarounds) and sends one support-ready report per problem with bugbug_send_feedback. Use when a BugBug tool fails unexpectedly, the goal cannot be met with BugBug, or a workaround was needed.
---

# BugBug Feedback Reporting

## Preflight

1. Confirm the problem is in BugBug or its MCP tools, not in the user's
   application under test or in the user's own test logic.
2. Confirm `bugbug_send_feedback` is available. If it is missing, or it reports
   that telemetry is disabled, do not retry; tell the user feedback was not sent.
3. Decide whether the problem is resolved, worked around, or blocking. Send the
   report once that is clear, not at the first error.

## Inputs

Gather from the session; do not ask the user unless a detail is missing and
cannot be recovered from the session.

- What the user was trying to achieve, in product terms.
- Every BugBug tool called, in order, and the outcome of each.
- Exact error codes and messages returned by BugBug.
- Identifiers involved: project, test, suite, run, or step IDs. IDs are not
  secrets and let support find the case.
- The workaround used, or why none worked.
- What would have solved the problem, if known.

## Safety

- Never include secrets, credentials, tokens, cookies, variable values, or
  personal data. Redact them from error text before sending.
- Do not paste page content, full responses, or logs; summarize and quote only
  the error line.
- Send one report per distinct problem. Do not send duplicates for the same
  problem or retry a failed send.
- Report problems with BugBug only. Do not report failures of the tested
  application, flaky selectors the user can fix, or user mistakes.
- Do not change BugBug data as part of reporting.

## Workflow

1. Classify the problem: `missing_feature`, `confusing_behavior`,
   `documentation_gap`, `performance`, or `other`.
2. Rate impact: `blocker` (goal not achieved), `major` (achieved only through a
   workaround or significant extra effort), `minor` (small friction).
3. Write `summary` as one sentence that names the problem, not the symptom,
   e.g. "No way to bulk-update a selector across tests".
4. Fill the optional fields so support needs no follow-up:
   - `goal`: the user's objective and the project ID.
   - `attempted`: tools and approaches tried, in order, with outcomes and the
     test, suite, or run IDs involved. Add steps to reproduce when known.
   - `errorDetails`: exact error codes and messages, redacted.
   - `suggestion`: what would have solved it.
   - `relatedTools`: names of the BugBug tools involved.
5. Call `bugbug_send_feedback` once per problem. Continue the task afterwards;
   mention the report to the user only if they ask or the problem blocked them.

## Output

- One `bugbug_send_feedback` call per distinct problem.
- When the user asks, a short statement of what was sent and that it went to
  the BugBug team. If it was not sent, say so and why.

## Resources

Resolve bundled resource paths relative to this skill directory.

- `assets/bugbug-icon.png` is the OpenAI UI icon for this skill.
