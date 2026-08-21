# Project Analysis

Use one project export snapshot for broad analysis:

1. Run `npx bugbug project export` or `sdk.project.export()`.
2. Extract the ZIP under `~/.bugbug/tmp/<projectId>/<timestamp>/`.
3. Record the snapshot timestamp in your findings.
4. Inspect YAML selectively with grep and targeted reads. Do not page the whole
   project through MCP unless the client has no filesystem access.
5. Re-export after mutations if the snapshot may be stale.

Expected findings:

- Duplicated step sequences that should become components.
- Hardcoded values that should become variables.
- Weak or missing assertions.
- Vague step, group, component, test, or suite names.
- Suite drift, especially tests missing from smoke/regression/feature suites.
- Empty notes where operational context matters.

Output format:

- Severity: high, medium, or low.
- Evidence: exact file, test, group, component, suite, or step name/ID.
- Recommendation: the smallest useful action.
- Next action: analyze-only, rename, extract component, suite cleanup, or verify.

Filesystem-less fallback:

Use `bugbug_list_tests`, `bugbug_get_test`, `bugbug_list_groups`,
`bugbug_list_components`, and suite tools with pagination. Keep page windows small and stop when the evidence is enough for a recommendation.
