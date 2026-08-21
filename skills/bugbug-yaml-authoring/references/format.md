# BugBug YAML v1 Format

BugBug YAML v1 files are YAML documents that follow the bundled BugBug YAML Schema v1.

Every document uses this envelope:

```yaml
schema_version: "1.0"
schema_type: test
data: {}
```

## Required Root Fields

### `schema_version`

Must be:

```yaml
schema_version: "1.0"
```

### `schema_type`

Must be one of:

- `test`
- `suite`
- `project`
- `component`
- `profile`

### `data`

Contains the object for the selected `schema_type`.

## Validation Model

Validation has two layers:

1. JSON Schema validation using `assets/bugbug-yaml-v1.schema.json`.
2. Semantic validation using `references/semantic-validation.md`.

Compare against `examples/valid/` and `examples/invalid/` for known-good and known-bad shapes.
Semantic validation catches conservative action/action_details mistakes such as `goto` without `url`.

The bundled schema is a snapshot. If it disagrees with actual platform import errors, fetch the live
schema from the `sourceUrl` recorded in `assets/schema-metadata.json` and validate against that.
Minimal root-type examples live in `examples/valid/`; `root-types.md` lists the field requirements per type.
