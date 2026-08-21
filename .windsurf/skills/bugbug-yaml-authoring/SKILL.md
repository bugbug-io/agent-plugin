---
name: bugbug-yaml-authoring
description: Creates, edits, reviews, validates, repairs, summarizes, and explains BugBug YAML files. Use for BugBug test, suite, project, component, profile, step action, action_details, schema, semantic, or safety-review YAML work.
---

# BugBug YAML v1

## Preflight

1. Run `bugbug-context-discovering` before YAML work.
2. Require a linked or selected BugBug project only for platform interaction.
3. Treat existing uncommitted changes as user-owned.

## Inputs

- YAML text or file paths and the requested create, edit, review, validate,
  repair, summarize, or explain operation.
- Bundled schema assets and examples for local validation.
- Optional export YAML from `bugbug tests export <testId> --format yaml`.
- Explicit import intent before synchronizing changes to BugBug.

## Safety

- Do not invent unsupported schema types, step actions, fields, IDs, URLs,
  selectors, references, secrets, or missing business data.
- Repair only schema-proven or semantically proven defects. Preserve valid data.
- Preserve exported slugs, variable names, and secret flags unless asked to
  change them. Generate readable kebab-case slugs only for new objects.
- Never fabricate `component_source` or suite `test_source` values.
- Use secret placeholders such as `{{password}}` and set `has_secret_value:
  true` where supported.
- Validate against the bundled schema and semantic rules before returning YAML.
- Treat semantic warnings as review prompts, not automatic proof that a file is
  invalid.
- Require explicit confirmation before `bugbug tests import`.
- Stop when replacement values, validation evidence, or import confirmation are
  missing.

## Workflow

1. Identify the requested YAML operation and root type.
2. For provided YAML text, save it to a temporary file and validate it before
   reasoning from it.
3. For generation, load relevant generation, root-type, structure, action,
   assertion, and variable guidance.
4. For review or repair, load the review checklist first.
5. Validate created or edited files against
   `assets/bugbug-yaml-v1.schema.json`; compare with bundled examples.
6. Apply the semantic checks for `action` and `action_details` relationships.
7. For repairs, change only proven defects and validate again.
8. Return YAML only after validation passes, or report exact unresolved fields.
9. If validation or semantic review still fails, repeat only for proven defects;
   otherwise return the blocker.

### Capability routing

- **Validate or review locally**: Use the bundled schema and examples.
- **Export an existing platform test**: Run
  `bugbug tests export <testId> --format yaml`; use ZIP export when artifacts are
  needed.
- **Import edited YAML**: Run `bugbug tests import <file.yaml>` only as allowed
  by `Safety`.
- **Resolve a schema conflict**: Use the live `sourceUrl` recorded in
  `assets/schema-metadata.json` only when the bundled schema conflicts with a
  current import response.

All platform interaction goes through the `bugbug` CLI; all other work remains
local.

### Root envelope

Every BugBug YAML v1 document contains:

- `schema_version: "1.0"`.
- `schema_type`: `test`, `suite`, `project`, `component`, or `profile`.
- `data`: an object matching the selected `schema_type`.

## Output

- Valid YAML for creation, editing, or repair tasks.
- Structural validation errors and semantic warnings for review tasks.
- Exact unresolved fields when safe repair or generation cannot continue.
- Safe export or import guidance without implicit platform synchronization.

## Resources

Resolve bundled resource paths relative to this skill directory.

- Use `assets/bugbug-yaml-v1.schema.json` for validation.
- Use `assets/schema-metadata.json` for bundled schema metadata and live fallback
  URL.
- Compare generated or repaired files with `examples/valid/` and
  `examples/invalid/`.
- Read `references/format.md` for the envelope and validation model.
- Read `references/root-types.md` for type-specific fields.
- Read `references/project-structure.md` for bundle layout, cross-object
  references, import identity, test groups, and slug semantics.
- Read `references/step-actions.md` for supported actions and selector
  serialization.
- Read `references/assertions.md` for assertion and conditional fields.
- Read `references/variables.md` for interpolation, overrides, and secrets.
- Read `references/semantic-validation.md` for action-detail relationships and
  recursive validation.
- Read `references/generation-rules.md` before generating new YAML.
- Load `bugbug-context-discovering` before using project or repository context.
- Load `bugbug-selectors-authoring` only when choosing a durable element target
  requires selector guidance.
