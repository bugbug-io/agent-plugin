# BugBug YAML Root Types

## Contents

- [`test`](#test)
- [`suite`](#suite)
- [`component`](#component)
- [`profile`](#profile)
- [`project`](#project)

Every document uses the same envelope:

```yaml
schema_version: "1.0"
schema_type: test
data: {}
```

Supported `schema_type` values: `test`, `suite`, `project`, `component`, `profile`.

## `test`

Runnable BugBug test.

Required `data` fields:

- `name`
- `runtime`: `browser` or `api`.
- `screen_size`: `desktop`, `mobile`, or `custom`.

Optional/common fields:

- `slug`: preserve exported slug; generate only for new tests.
- `notes`
- `tags`: array of strings.
- `groups`: runnable body. See `project-structure.md`.

Examples: `examples/valid/minimal-test.yaml` (minimal shape),
`examples/valid/full-login-test.yaml` (runnable test with steps).

## `suite`

Collection of tests.

Required `data` fields:

- `suite_name`
- `suite_settings`

Optional/common fields:

- `slug`: preserve exported slug; generate only for new suites.
- `notes`
- `tests`: array of suite test refs.

`suite_settings` fields:

- `run_in_parallel`: boolean.
- `auto_retry`: integer.
- `auto_add_new_tests`: boolean.

`tests[]` fields:

- `test_source`: required; test slug.
- `is_deactivated`: optional boolean/null.

Examples: `examples/valid/minimal-suite.yaml` (empty suite),
`examples/valid/smoke-suite.yaml` (suite with a test reference).

## `component`

Reusable step group referenced from tests by `component_source`.

Required `data` fields:

- `component_name`

Optional/common fields:

- `slug`: component identity; this is what `component_source` references.
- `steps`: same `StepSchema` used in tests.

Example: `examples/valid/login-component.yaml`.

## `profile`

Variable/environment profile.

Required `data` fields:

- `name`

Optional/common fields:

- `slug`: preserve exported slug; generate only for new profiles.
- `is_default`: boolean/null. Use true only when the profile should be the project's default.
- `variables`: see `variables.md`.

Example: `examples/valid/default-profile.yaml`.

## `project`

Project configuration.

Required `data` fields:

- `name`
- `homepage_url`
- `settings`

Optional/common fields:

- `slug`: preserve exported slug; generate only for new projects.

`settings.general` required fields:

- `timezone`
- `default_local_run_timeout`
- `default_cloud_run_timeout`
- `default_sleep`
- `close_windows_on_successful_test_run`
- `capture_dom_on_failure`
- `collecting_logs`: `disabled`, `consoleLogs`, `fullBugBugDebugging`.

`settings.browser` fields:

- Required: `incognito_mode`.
- Optional: `language`, `user_agent`, `custom_headers` (`name`, `value`).

`settings.screen_sizes` fields:

- Required: `desktop.width`, `desktop.height`, `mobile.width`, `mobile.height`.

`settings.selectors` fields:

- Required: `generation_mode` (`automatic`, `manual`), `non_semantic_classes_enabled`.
- Optional: `included_attributes`, `excluded_attributes`, `methods`.
- Selector method names: `elementCustomAttributes`, `elementUniqueAttributes`, `elementAria`, `elementData`, `elementId`, `elementName`, `elementPlaceholder`, `elementClassName`, `elementText`, `elementHref`, `elementFullXPath`.

`settings.waiting_conditions` uses `condition`, `expected`, `timeout`, `is_active`. Valid condition names are in `semantic-validation.md`.

`settings.visual_regression` optional fields:

- `default_max_diff`
- `pixel_threshold`
- `include_anti_aliasing`

Example: `examples/valid/minimal-project.yaml`.
