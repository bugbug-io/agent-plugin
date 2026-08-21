# Readability Rename

Use this when steps, groups, components, tests, or suites have unclear names.

Rules:

- Use action-oriented names: "Fill email", "Submit checkout", "Assert order
  confirmation".
- Do not use bare selectors as names.
- Keep domain terms aligned with the tested product and, when confirmed, the app
  repository language.
- Rename before component extraction so later findings are easier to review.

After renaming, run affected tests only when names are known to affect reporting,
debugging, or generated selectors in that workflow. Pure metadata renames can be
verified by reading the updated assets.
