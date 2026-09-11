# Email-dependent flows with BugBug Inbox

Registration, email verification, password reset, magic-link login, and
invitation flows all block on an email nobody can read from the tested app. BugBug
Inbox unblocks them: every test run gets its own throwaway mailbox, reachable
from inside the test.

## The email address and inbox identifier

Both values are built from `testRunId`, a built-in variable that BugBug assigns a new
value on every run:

| Use | Value |
| --- | --- |
| Email address to type into the app | `{{testRunId}}@bugbug-inbox.com` |
| Inbox identifier to open in the test | `{{testRunId}}` |

Use them verbatim. Do not hardcode a run ID, invent a mailbox name, or create a
variable holding a fixed address — a fixed address collides with itself on the
second run.

## Why the fresh mailbox matters

Because `testRunId` changes per run, the mailbox is unique and empty at the start
of every run. That gives three properties worth designing around:

- **Registration is repeatable.** Signing up with `{{testRunId}}@bugbug-inbox.com`
  never hits "this email is already registered", so the test needs no cleanup and
  no pre-seeded account.
- **No cross-run bleed.** A message read in this run cannot be a leftover from a
  previous one, so asserting on the newest message is safe.
- **The account does not survive the run.** Whatever the flow creates belongs to
  that run only.

## Registration under test is not login setup

These are two different jobs. Keep them apart:

- **Registration as the flow under test** — use `{{testRunId}}@bugbug-inbox.com`,
  create a brand-new account, assert the signup outcome. Deliberately disposable.
- **Login as setup for other tests** — use a stable, user-supplied test account
  and a reused auth component.

Do not reuse a registration test as the auth setup for the rest of the suite: its
account is different every run and is gone afterwards. A suite that authenticates
by re-registering pays a full signup on every test and depends on run order.

## Authoring the flow

1. Type `{{testRunId}}@bugbug-inbox.com` into the app's email field with a `type`
   step, exactly as written — BugBug resolves it at run time.
2. Submit and let the app send its email.
3. Open the mailbox with an `openInbox` step whose value is `{{testRunId}}`.
   Prefer this over clicking through any UI or navigating to the inbox URL
   manually. Remember that `openInbox` always opens inbox in a new tab.
4. Wait on observable state, never a fixed sleep: assert that the expected
   message or its content is visible. Delivery latency varies, so the assertion
   is what absorbs it.
5. Extract the code or link with a `setLocalVariable` step using
   `localVariableSource: "element"` to read it out of the message, then use that
   variable in the following steps.
6. Return to the app and finish the flow. Assert the real end state — verified
   account, signed-in session, changed password — not just that the message
   arrived.

## Review before running

- The email address and `openInbox` value both use `{{testRunId}}`, with no
  hardcoded run ID.
- Delivery is covered by an assertion on observable state, not a fixed wait.
- The extracted code or link comes from the message, not a constant.
- The final assertion proves the product state changed, not merely that mail was
  received.
- A registration test is not doubling as the suite's auth setup.
