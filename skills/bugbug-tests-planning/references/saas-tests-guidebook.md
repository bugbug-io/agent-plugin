# Typical SaaS Scenarios

Use this as a scenario catalog. Start with `## Contents`, then read only the
sections that match the requested SaaS flow.

## Contents

- [1. Signup and account creation](#1-signup-and-account-creation)
- [2. First-time onboarding and activation](#2-first-time-onboarding-and-activation)
- [3. Login, session, and account recovery](#3-login-session-and-account-recovery)
- [4. Workspace and organization management](#4-workspace-and-organization-management)
- [5. Team invitations and membership](#5-team-invitations-and-membership)
- [6. Roles and permissions](#6-roles-and-permissions)
- [7. Core product workflow](#7-core-product-workflow)
- [8. Collaboration](#8-collaboration)
- [9. Search, filtering, and navigation](#9-search-filtering-and-navigation)
- [10. Data import](#10-data-import)
- [11. Data export](#11-data-export)
- [12. Integrations](#12-integrations)
- [13. Notifications](#13-notifications)
- [14. Plans, trials, and feature access](#14-plans-trials-and-feature-access)
- [15. Billing and subscriptions](#15-billing-and-subscriptions)
- [16. Usage-based billing](#16-usage-based-billing)
- [17. Admin and support scenarios](#17-admin-and-support-scenarios)
- [18. Audit logs and history](#18-audit-logs-and-history)
- [19. Security settings](#19-security-settings)
- [20. API key and developer workflows](#20-api-key-and-developer-workflows)
- [21. Account cancellation and data deletion](#21-account-cancellation-and-data-deletion)
- [22. Reliability and recovery](#22-reliability-and-recovery)
- [Recommended SaaS smoke suite](#recommended-saas-smoke-suite)
- [Critical regression suite](#critical-regression-suite)
- [Useful SaaS test matrix](#useful-saas-test-matrix)

For SaaS, organize E2E coverage around the **customer lifecycle**: discovery, signup, activation, daily use, collaboration, billing, support, and offboarding.

## 1. Signup and account creation

Typical paths:

* Marketing page → pricing → signup
* Free trial signup
* Paid signup
* Signup with email/password
* Signup with Google, Microsoft, Apple, or SSO
* Email verification
* Accept invitation to an existing workspace
* Resume an incomplete signup
* Existing user attempts to register again

Failure paths:

* Invalid or disposable email
* Weak password
* Verification link expired
* Social login cancelled
* Identity provider unavailable
* Duplicate workspace or company name
* Signup succeeds but onboarding fails

Key checks:

* Only one account is created
* User lands in the correct workspace
* Trial and plan are assigned correctly
* Confirmation and verification emails arrive
* Referral or campaign attribution is preserved

## 2. First-time onboarding and activation

Typical paths:

* Signup → welcome flow → first successful outcome
* Select use case or role
* Create or join a workspace
* Configure company profile
* Import data
* Connect an integration
* Invite teammates
* Complete product tour
* Skip onboarding and return later

Test:

* First-time user with no data
* User abandons onboarding halfway
* User refreshes or changes device
* Imported data is invalid or incomplete
* Integration authorization is denied
* Onboarding steps are completed out of order
* User reaches the product’s key activation event

The critical E2E question is not merely whether onboarding completes. It is whether the user can achieve their **first meaningful result**.

## 3. Login, session, and account recovery

Test:

* Login and logout
* Remember-me behavior
* Password reset
* Change password
* Email change
* Multi-factor authentication
* Backup or recovery codes
* Login from a new device
* Session expiry
* Multiple active sessions
* Force logout from all devices
* Locked, suspended, or deactivated account

For SSO:

* Service-provider-initiated login
* Identity-provider-initiated login
* User assigned and unassigned from the app
* Expired identity-provider session
* Incorrect organization or tenant
* Just-in-time user provisioning

## 4. Workspace and organization management

Most B2B SaaS products are workspace-based.

Test:

* Create workspace
* Rename workspace
* Switch between workspaces
* Join multiple workspaces
* Leave workspace
* Transfer ownership
* Archive or delete workspace
* Configure workspace defaults
* Restrict workspace access by domain

Failure and edge cases:

* Last owner attempts to leave
* Deleted workspace is opened from an old link
* User belongs to two organizations with different roles
* Workspace reaches member or usage limit
* User is removed while actively using the product

## 5. Team invitations and membership

Test:

* Invite one user
* Invite multiple users
* Invite by email
* Invite by shareable link
* Resend invitation
* Revoke invitation
* Accept invitation as a new user
* Accept invitation as an existing user
* Invitation expires
* Invited user uses a different email
* Add user directly through admin or SSO provisioning
* Remove or suspend member

Important checks:

* Correct workspace and role are assigned
* Duplicate membership is prevented
* Seat count updates correctly
* Removed users lose access immediately
* Their owned data is reassigned or preserved correctly

## 6. Roles and permissions

Typical roles:

* Owner
* Administrator
* Manager
* Member
* Viewer
* Billing administrator
* External guest
* Support agent

Test both allowed and forbidden actions:

* View records
* Create records
* Edit own records
* Edit others’ records
* Delete records
* Export data
* Invite users
* Change billing
* Manage integrations
* Access audit logs
* Change security settings

High-value negative tests:

* User changes an object ID in the URL
* Viewer calls a write API directly
* Removed user opens a previously copied link
* User accesses another tenant’s data
* Billing admin attempts product administration
* Guest accesses internal-only resources

## 7. Core product workflow

This is specific to the SaaS product, but the general structure is reusable:

* Create primary object
* Edit it
* Save draft
* Publish, submit, or activate it
* Share it
* Collaborate on it
* Archive it
* Restore it
* Delete it
* Duplicate it
* Export it

Examples of primary objects:

* Project
* Report
* Campaign
* Ticket
* Document
* Dashboard
* Workflow
* Invoice
* Dataset
* Design
* Task

Test:

* Empty state
* Normal data
* Large data
* Invalid input
* Concurrent editing
* Unsaved changes
* Browser refresh
* Network failure during save
* Duplicate submission
* Object deleted by another user

## 8. Collaboration

Test:

* Invite collaborator
* Mention user
* Add comment
* Reply to comment
* Resolve and reopen comment
* Assign task
* Share internal link
* Share public link
* Restrict access
* Revoke access
* Follow or subscribe to changes
* Receive notification
* Open notification and return to the correct context

Concurrent scenarios:

* Two users edit the same record
* One user deletes while another edits
* Permission changes during an active session
* User comments on an outdated version
* Conflicting updates are detected or resolved

## 9. Search, filtering, and navigation

Test:

* Global search
* Search within workspace or project
* Exact and partial queries
* Filters
* Sorting
* Saved views
* Pagination or infinite scroll
* Recent items
* Favorites
* Deep links
* Browser back and forward
* Empty and no-result states

Important expectations:

* Search respects permissions
* Filters remain after returning from details
* Shared URLs reproduce the same view
* Deleted or inaccessible items do not appear
* Results update after changes

## 10. Data import

Test:

* CSV or spreadsheet import
* File upload
* API import
* Integration-based import
* Field mapping
* Preview before import
* Partial validation errors
* Duplicate detection
* Large files
* Cancel and retry
* Import progress
* Import summary
* Rollback or correction

Failure cases:

* Unsupported format
* Malformed file
* Missing required columns
* Encoding issues
* Duplicate records
* Timeout
* Partial import
* User loses access during import

## 11. Data export

Test:

* Export current view
* Export selected records
* Full workspace export
* CSV, Excel, PDF, or JSON
* Large asynchronous export
* Download link via email
* Expired download link
* Permission-restricted export
* Export after filtering
* Export after deletion request

Check that exported data:

* Matches visible data
* Uses correct timezone and formatting
* Excludes unauthorized fields
* Handles special characters correctly
* Does not leak data from another tenant

## 12. Integrations

Typical path:

* Integrations page → select provider → authorize → configure → sync → use imported data

Test:

* Successful connection
* Authorization denied
* Wrong provider account
* Missing permissions or scopes
* Token expiry
* Reauthorization
* Disconnect and reconnect
* Initial sync
* Incremental sync
* Duplicate webhook delivery
* Provider outage
* Rate limit
* Data mapping failure
* Integration removed externally

Critical checks:

* Retries do not duplicate data
* Disconnecting stops future access
* Users see actionable error messages
* Sync status is accurate
* Permissions are enforced for who can connect integrations

## 13. Notifications

Cover:

* In-app notifications
* Email notifications
* Push notifications
* Slack or Teams notifications
* Digest emails

Test:

* Notification triggered by correct event
* Correct recipient
* No notification for unauthorized users
* Link opens correct workspace and object
* Read/unread state
* Mark all as read
* Notification preferences
* Unsubscribe
* Duplicate-event prevention
* Delayed or failed delivery

## 14. Plans, trials, and feature access

Test:

* Free plan
* Trial plan
* Paid plan
* Enterprise plan
* Trial start
* Trial extension
* Trial expiry
* Upgrade
* Downgrade
* Cancel scheduled downgrade
* Feature gating
* Usage limits
* Seat limits
* Storage limits
* Read-only state after limit or expiry

Important questions:

* What happens to existing data after downgrade?
* Can users still view or export it?
* Are premium features hidden, disabled, or blocked?
* Is the upgrade path clear?
* Are limits enforced consistently in the UI and API?

## 15. Billing and subscriptions

Test:

* Add payment method
* Start subscription
* Monthly and annual plans
* Upgrade immediately
* Downgrade at renewal
* Add or remove seats
* Proration
* Coupon or promotional credit
* Tax and VAT
* Billing address
* Invoice generation
* Download invoice
* Change payment method
* Cancel subscription
* Reactivate subscription

Payment failure paths:

* Initial payment declined
* Renewal payment fails
* Card expires
* Authentication required
* Retry succeeds
* Dunning emails
* Grace period
* Account restriction
* Subscription cancellation after repeated failure

Critical assertions:

* Charges match displayed amounts
* Seat count and plan update correctly
* Access changes at the correct time
* Duplicate subscriptions or charges are not created
* Invoices and tax information are accurate

## 16. Usage-based billing

For metered SaaS, test:

* Usage event creation
* Usage dashboard update
* Usage threshold warning
* Overage
* Delayed event processing
* Duplicate event
* Correct billing period
* Usage after plan change
* Usage across multiple workspaces
* Invoice reconciliation

Key risks:

* Double-counted usage
* Missing usage
* Incorrect tenant attribution
* Mismatch between product dashboard and invoice

## 17. Admin and support scenarios

Test:

* Admin searches for customer
* Views subscription and account status
* Suspends and restores account
* Resends invitation or verification
* Changes plan with audit trail
* Impersonates user, when supported
* Stops impersonation safely
* Issues credit or refund
* Reviews system events
* Handles support request

Security checks:

* Impersonation is clearly indicated
* Sensitive actions require permission
* All actions are audited
* Support staff cannot access restricted fields unnecessarily

## 18. Audit logs and history

Test:

* User login
* Role change
* Data creation, edit, and deletion
* Export
* Billing change
* Integration connection
* Security setting change
* Failed access attempt

Check:

* Correct actor
* Correct timestamp and timezone
* Correct workspace
* Before-and-after values where appropriate
* Search and filtering
* Export
* Retention period
* Logs cannot be modified by regular users

## 19. Security settings

User-facing E2E scenarios include:

* Enable MFA
* Disable MFA
* Regenerate recovery codes
* Configure SSO
* Require SSO
* Enforce MFA
* Configure session duration
* Restrict allowed domains
* Review active sessions
* Revoke API token
* Rotate API key

Test lockout and recovery carefully so administrators cannot accidentally make the organization inaccessible.

## 20. API key and developer workflows

For developer-facing SaaS:

* Create API key
* Name and scope key
* Copy key once
* Use key successfully
* Use insufficiently scoped key
* Rotate key
* Revoke key
* Use revoked key
* Reach rate limit
* Review API logs
* Create and verify webhook
* Retry failed webhook

## 21. Account cancellation and data deletion

Test:

* Cancel subscription but keep account
* Delete personal account
* Delete workspace
* Request data export before deletion
* Enter cancellation reason
* Confirm destructive action
* Grace period
* Undo deletion, where supported
* Data deletion confirmation
* Login after deletion
* Old shared links after deletion

For multi-user accounts:

* Owner attempts to delete organization
* Non-owner attempts deletion
* Ownership transfer
* Remaining users and data
* Active billing and integrations
* Retention and recovery rules

## 22. Reliability and recovery

Test realistic interruptions:

* Refresh during save
* Lose connection during upload
* Session expires during editing
* Background job fails
* Integration times out
* User submits twice
* Browser closes during payment
* User opens multiple tabs
* Service partially unavailable
* User retries after an error

Expected behavior should be:

* No duplicate data
* No lost work where avoidable
* Safe retry
* Clear status
* Accurate final state

## Recommended SaaS smoke suite

Run after every deployment:

1. Sign up and verify account.
2. Complete onboarding.
3. Create the primary product object.
4. Edit and save it.
5. Invite another user.
6. Accept invitation.
7. Verify role restrictions.
8. Complete the primary product workflow.
9. Upgrade or use a billing test path.
10. Log out and log back in.
11. Confirm notifications.
12. Delete or archive the created test data.

## Critical regression suite

Before major releases, include:

* Trial signup and expiry
* Password reset and MFA
* Workspace creation and switching
* Invitations and role changes
* Core workflow success and failure
* Concurrent editing
* Import and export
* Integration authorization and expiry
* Subscription upgrade and downgrade
* Renewal payment failure
* Seat changes and proration
* Account suspension and recovery
* Tenant isolation
* Account and workspace deletion

## Useful SaaS test matrix

| Dimension         | Examples                                    |
| ----------------- | ------------------------------------------- |
| User state        | New, active, invited, suspended, deleted    |
| Role              | Owner, admin, member, viewer, guest         |
| Plan              | Free, trial, paid, enterprise               |
| Workspace         | One workspace, multiple workspaces          |
| Authentication    | Password, social, MFA, SSO                  |
| Data state        | Empty, normal, large, archived              |
| Billing state     | Active, past due, cancelled                 |
| Integration state | Connected, expired, disconnected            |
| Device            | Desktop, mobile, tablet                     |
| Network           | Normal, slow, interrupted                   |
| Action outcome    | Success, validation failure, system failure |

The strongest SaaS E2E suites answer one main question: **Can a customer move from signup to recurring value, with the correct access and billing, without losing data or becoming trapped?**
