# Tested App Repository Context

Use this only when the agent is running inside or near the repository for the app
being tested.

## Detection First

Do not assume the current working directory is the tested app. Silently confirm it by
comparing BugBug URLs in `bugbug.yaml`, profiles, package metadata, router config,
or environment files. If evidence is weak, ask the user once.

## Authoring

- Grep targeted source paths for `data-testid`, `data-test`,
  `aria-label`, route definitions, and form field names.
- Prefer confirmed source-derived selectors over DOM-inferred selectors.
- Recommend adding stable test attributes when the app lacks reliable hooks.
- Analyze current unit test or e2e and suggest migration to BugBug Yaml format

## Debugging

- Map the failed element to the component that renders it.
- Use `git diff` and `git log` around the failure window to classify app change
  versus brittle test.
- Feed that evidence into the normal failure categories.

## Refactoring

- Align BugBug names with product and codebase domain language.
- Map shared UI components to reusable BugBug components when the relationship is
  clear.

## Reporting

- Compare route or feature inventory from source with tested flows to identify
  coverage gaps.

## Boundaries

The app repository is read-only unless the user explicitly asks for app source
changes. Use targeted greps and selective reads, never whole-codebase dumps.
