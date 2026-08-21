# Project Structure

Use this file when creating or editing related BugBug YAML documents, especially
imports that include tests, suites, components, profiles, or project settings.

## Contents

- [Directory Layout](#directory-layout)
- [Import Identity](#import-identity)
- [Cross-Object References](#cross-object-references)
- [File Relationships](#file-relationships)
- [Root Document Roles](#root-document-roles)
- [Test Groups](#test-groups)
- [Test Group Import Semantics](#test-group-import-semantics)
- [Roundtrip Recipe](#roundtrip-recipe)

## Directory Layout

Use one YAML document per file. A project bundle should keep root types in
predictable directories:

```text
components/
  shared-login.yaml
profiles/
  default.yaml
  staging.yaml
project.yaml
suites/
  smoke.yaml
tests/
  login-smoke-test.yaml
```

Recommended placement:

- `project.yaml`: one `schema_type: project` document with project-level
  settings.
- `tests/*.yaml`: `schema_type: test` documents.
- `suites/*.yaml`: `schema_type: suite` documents.
- `components/*.yaml`: `schema_type: component` documents reused from tests.
- `profiles/*.yaml`: `schema_type: profile` documents with variables and secret
  placeholders.

File names are for humans and repository organization. Import identity comes
from the document slugs, not from the path. Prefer filenames that match
`data.slug` when a slug exists, and use readable kebab-case names for new files.

## Import Identity

Import uses slugs as identity:

- Preserve slugs from exported YAML when editing existing tests, components,
  profiles, suites, projects, and inline groups.
- Generate readable kebab-case slugs only for genuinely new objects or new
  inline groups you are creating.
- Never invent a slug that claims to reference an existing platform object.
- References must come from known existing slugs, exported YAML, user input,
  discovered platform context, or objects created in the same import set.

## Cross-Object References

BugBug YAML links objects by slug:

- Test `groups[].component_source` references a component `data.slug`.
- Suite `tests[].test_source` references a test `data.slug`.
- Project, profile, suite, component, and test `data.slug` values identify those
  objects during import.

Unknown references fail import. If the slug is not known, stop and ask for the
missing object or create the referenced object in the same import set with a
matching slug.

## File Relationships

The bundle relationship is:

```text
project.yaml
profiles/*.yaml
components/*.yaml -> tests/*.yaml -> suites/*.yaml
```

- `project.yaml` defines project settings such as homepage, browser defaults,
  screen sizes, selector generation, waiting conditions, and visual-regression
  defaults.
- `profiles/*.yaml` defines variable sets. Tests and components can use
  `{{variable_key}}` placeholders that profiles provide at run time.
- `components/*.yaml` defines reusable step groups. Tests include them through
  `groups[].component_source`.
- `tests/*.yaml` defines runnable browser or API tests. Tests contain inline
  groups and/or references to components.
- `suites/*.yaml` defines test collections. Suites include tests through
  `tests[].test_source`.

When creating a bundle, create referenced files before or alongside the files
that reference them. Do not leave a suite pointing at a missing test or a test
pointing at a missing component.

## Root Document Roles

### `project.yaml`

Contains exactly one `schema_type: project` document. Use it for project-wide
settings only; do not put tests, suites, components, or profiles inside it.

### `tests/*.yaml`

Each file contains one `schema_type: test` document. A test is runnable when it
has the required root fields and at least one group, either inline or component
backed.

### `suites/*.yaml`

Each file contains one `schema_type: suite` document. `data.tests[]` orders or
selects tests by `test_source`, which must match a test slug.

### `components/*.yaml`

Each file contains one `schema_type: component` document. Components hold shared
steps and are referenced by tests. Component variables should be passed through
test group `variables` when the component needs values from a profile or test
context.

### `profiles/*.yaml`

Each file contains one `schema_type: profile` document. Profiles define variable
keys and secret placeholders for environments such as default, staging, or
production.

Only one profile should be marked as the default unless the import workflow
explicitly supports changing the default profile.

## Test Groups

`data.groups[]` is the runnable body of a `schema_type: test` document. Each
entry is one of two shapes.

### Inline Group

Inline groups define steps directly in the test. `group_name` and `slug` are required.

```yaml
groups:
  - group_name: "Login flow"
    slug: "login-flow"
    variables:
      email: "{{email}}"
    steps:
      - action: goto
        name: "Open login page"
        action_details:
          url: "https://example.com/login"
```

### Component Reference

Component references reuse an existing component by component slug. `component_source` must name a real component. `variables` overrides are optional.

```yaml
groups:
  - component_source: "shared-login"
    variables:
      email: "{{email}}"
      password: "{{password}}"
```

## Test Group Import Semantics

- Existing inline group slug in an imported existing test updates or merges that
  group.
- New inline group slug creates a new inline group.
- Unknown `component_source` fails import.
- Existing groups omitted from an existing test import are removed from that test
  relation.

## Roundtrip Recipe

1. Export the current object or related objects before editing existing platform
   data.
2. Edit the YAML while preserving exported slugs unless intentionally creating
   new objects.
3. Validate locally against the bundled schema and the rules in
   `semantic-validation.md`.
4. Import only after explicit user intent.
5. Use ZIP export/import when artifacts are needed for upload-file or
   visual-regression references.
