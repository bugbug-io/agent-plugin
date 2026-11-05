# Variables

Use this file when YAML contains `{{name}}` interpolation, profile variables, or local variables, or when a component needs different values per test.

## Interpolation

Use `{{variable_key}}` in URLs, typed values, assertions, and other string fields when the value should come from a BugBug profile or runtime variable.

```yaml
action_details:
  url: "https://{{host}}/login"
```

## Profile Variables

Profile variables live in `schema_type: profile` under `data.variables[]`.

```yaml
variables:
  - name: "Password"
    key: "password"
    type: "string"
    value: null
    description: "Login password provided outside YAML"
    has_secret_value: true
```

Required fields are `name`, `key`, and `type`. `value`, `description`, and `has_secret_value` are optional. For secrets, prefer `value: null` or a placeholder and set `has_secret_value: true`.

## Local Variables

`setLocalVariable` creates or updates a variable during a run.

```yaml
- action: setLocalVariable
  action_details:
    local_variable_name: "order_id"
    local_variable_source: element
    selector: "xpath=//*[@data-testid='order-id']"
```

`local_variable_source` values:

- `element`: read from the selected element.
- `value`: use `value`.
- `evaluate`: run `code`; set `is_target_document: true` when the code should execute in the target document.

## Parametrizing Components

Groups and component references have no `variables` field: schema validation rejects it, and import drops it without applying the values. To give a component different values, add an inline group with `setLocalVariable` steps directly before the component reference. The component reads the values through `{{name}}`.

```yaml
groups:
  - group_name: "Use admin account"
    slug: "use-admin-account"
    steps:
      - action: setLocalVariable
        name: "Set email"
        action_details:
          local_variable_name: "email"
          local_variable_source: value
          value: "{{admin_email}}"
  - component_source: "shared-login"
```

## Secrets Policy

- Never write real passwords, API tokens, bearer tokens, cookies, or private URLs into YAML.
- Use placeholders such as `{{password}}`.
- Set `has_secret_value: true` on supported fields (`type`, `change`, profile variables).
- If a secret value must be uploaded or restored, use platform-managed artifacts or profile variables, not literal YAML.
