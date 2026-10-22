# Project Analysis

Read the project through the BugBug MCP tools:

1. Page through `bugbug_list_tests`, `bugbug_list_groups`,
   `bugbug_list_components`, and `bugbug_list_suites`. Keep page windows small.
2. Read details with `bugbug_get_test`, `bugbug_get_group`, and
   `bugbug_get_suite` only for the tests, groups, and suites in scope. When many
   tests are in scope, one `bugbug_execute` script can read them with
   `bugbug.tests.get` and return only the compared fields.
3. Record when you read the data in your findings.
4. Stop when the evidence is enough for a recommendation.
5. Re-read affected tests after mutations; earlier reads may be stale.

Optional local export:

When the user has the `bugbug` CLI installed and asks for a broad, offline
analysis, ask before running `bugbug project export`. Extract the ZIP into a
directory the user approves, and inspect the YAML selectively instead of reading
the whole export.

Expected findings:

- Duplicated step sequences that should become components.
- Hardcoded values that should become variables.
- Weak or missing assertions.
- Vague step, group, component, test, or suite names.
- Suite drift, especially tests missing from smoke/regression/feature suites.
- Folder drift: tests or components left at the root next to a folder that fits
  them, near-duplicate folder names, or folders that hold one item. In an
  export, folders are the subdirectories of `tests/` and `components/`.
- Empty notes where operational context matters.

Output format:

- Severity: high, medium, or low.
- Evidence: exact test, group, component, suite, or step name/ID.
- Recommendation: the smallest useful action.
- Next action: analyze-only, rename, extract component, suite cleanup, folder cleanup, or verify.
