# BugBug YAML Generation Rules

## General Rules

When creating a new BugBug YAML file:

1. Start with the root envelope from `format.md`.
2. Choose exactly one supported `schema_type`.
3. Read `root-types.md` for type-specific fields.
4. For multi-file bundles or related-object imports, read
   `project-structure.md`; for runnable tests, create at least one inline group
   or known component reference.
5. For steps, read `step-actions.md`; for assertions, read `assertions.md`.
6. Generate readable kebab-case slugs only for genuinely new objects or inline groups.
7. Preserve all exported slugs when editing existing YAML.
8. Never invent references to existing platform objects: `component_source`, suite `test_source`, project artifact IDs, private URLs, and selectors must come from user input, exported YAML, or discovered context.
9. Use placeholders for secrets and profile variables; read `variables.md`.
10. Write selectors as prefixed XPath by default (e.g. `xpath=//input[@name='email']`); use CSS only when the user supplies a CSS selector.
11. Validate against `assets/bugbug-yaml-v1.schema.json` and `semantic-validation.md` before returning YAML.

## Create a Runnable Test

A runnable browser test needs:

- `schema_type: test`
- `data.runtime: browser`
- `data.screen_size`: `desktop`, `mobile`, or `custom`
- `data.groups[]`
- an inline group with `group_name`, `slug`, and `steps[]`, or a component reference with `component_source`

Minimal runnable shape:

```yaml
schema_version: "1.0"
schema_type: test
data:
  name: "Login smoke test"
  runtime: browser
  screen_size: desktop
  tags: []
  groups:
    - group_name: "Login flow"
      slug: "login-flow"
      steps:
        - action: goto
          action_details:
            url: "https://example.com/login"
```

## Secret Handling

If a value is likely to be a password, token, key, cookie, session, or credential:

- Prefer placeholders such as `{{password}}`.
- Do not write real secrets.
- Set `has_secret_value: true` where supported.
- Define profile variables in profile YAML when values need project/profile scope.
