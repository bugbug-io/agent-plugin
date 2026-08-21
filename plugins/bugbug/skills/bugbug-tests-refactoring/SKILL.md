---
name: bugbug-tests-refactoring
description: Analyzes and refactors BugBug tests, groups, components, suites, names, and duplication. Use read-only analysis mode unless the user explicitly requests mutations. Run bugbug-context-discovering first.
---

# BugBug Tests Refactoring

## Preflight

1. Run `bugbug-context-discovering` before analysis or refactoring.
2. Load `bugbug-tests-authoring` before reviewing or changing tests.
3. Load `bugbug-steps-authoring` before reviewing or changing steps.
4. Load `bugbug-selectors-authoring` before reviewing or changing selectors.
5. Confirm explicit mutation authorization before applying refactors.

## Inputs

- Target project, test, suite, or bounded project scope.
- Requested analysis or refactoring outcome.
- Explicit mutation authorization when changes are requested.
- Optional project export and tested-application source context.

## Safety

- Start in read-only analysis mode. Requests to review, analyze, recommend, find
  improvements, or explain what should change do not authorize mutations.
- Mutate BugBug data only when the user explicitly requests execution.
- Never delete a group or suite until replacement behavior has been verified or
  the user explicitly accepts unverified cleanup.
- Stop before mutation when the target IDs, replacement behavior, or acceptance
  of unverified cleanup cannot be confirmed.

## Workflow

1. Prefer one project export snapshot for broad analysis. Use list or get MCP
   tools only for targeted details or filesystem-less clients.
2. Analyze naming, duplication, reusable components, selector quality, and suite
   organization within the requested scope.
3. Return recommendations when operating in read-only mode.
4. When mutations are authorized, apply them in this order:
   1. Rename for readability.
   2. Extract reusable components.
   3. Reorganize suites.
5. Run affected tests after each mutation batch when a live environment is
   available.
6. If verification fails, diagnose the failure before continuing with further
   refactors.

## Output

- Evidence-backed smells, duplication, and organizational findings.
- Ordered refactoring recommendations with affected tests and assets.
- When execution is authorized, a summary of mutations and verification results.
- Explicit unverified behavior, blockers, or cleanup requiring acceptance.

## Resources

Resolve bundled resource paths relative to this skill directory.

- Load `bugbug-context-discovering` during Preflight.
- Load `bugbug-selectors-authoring` before selector review or selector changes.
- Read `references/project-analysis.md` for export-based analysis and its smell
  catalog.
- Read `references/extract-component.md` before extracting a reusable component.
- Read `references/readability-rename.md` before bulk readability renames.
- Read `references/suite-organization.md` before restructuring suites.
