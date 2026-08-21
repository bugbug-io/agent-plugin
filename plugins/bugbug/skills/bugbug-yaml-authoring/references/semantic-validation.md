# Semantic Validation

Schema validation checks structure. Semantic validation checks whether the selected `action` matches the provided `action_details`, using the rules below.

## Required Action Details

| Action | Required fields | Recommended fields |
| --- | --- | --- |
| `goto`, `newTab` | `url` | |
| `type` | `value` | `selector`, `has_secret_value` for secrets |
| `change` | | `selector`, `value` |
| `click`, `dblClick`, `rightClick`, `mouseDown`, `mouseUp`, `hover`, `clear` | | `selector` unless intentionally coordinate/browser-state based |
| `assert` | `assertion_property`, `assertion_type` | assertion companion fields from `assertions.md` |
| `execute` | `code` | |
| `select` | `select_type`, `value` | `selector`, `select_is_multiple` |
| `scroll` | `scroll_inside`, `scroll_to` | `scroll_x`/`scroll_y`, `scroll_edge`, or `scroll_direction` as required by mode |
| `setLocalVariable` | `local_variable_name`, `local_variable_source` | `selector`, `value`, or `code` depending on source |
| `answerPrompt` | `value` | |
| `uploadFile` | `file_source` or `project_artifact_id` | `selector` |
| `ifCondition` | `assertion_property`, `assertion_type`, `conditional_steps` | assertion companion fields from `assertions.md` |
| `dragAndDrop` | | `dnd_drag_on`, drag coords/selector, `dnd_drop_on`, drop coords/selector |
| `elementVisualRegression`, `pageVisualRegression` | | `visual_regression_ref_screenshots` with `file_source` or `project_artifact_id` when references are supplied |

Actions not listed above use empty action details or shared selector fields only: `goBack`, `goForward`, `reloadPage`, `pasteFromClipboard`, `closeTab`, `switchContext`.

## Assertion Companions

- `assertion_property: customJavaScript` requires `assertion_java_script`.
- `assertion_property: variableValue` requires `assertion_variable_name`.
- Most assertions need `assertion_expected_value` unless `assertion_type: any` is intentional.

## Waiting Conditions

Schema allows any string, but valid condition names are:

- `documentComplete`
- `elementIsVisible`
- `elementIsNotCovered`
- `elementIsNotAnimating`
- `elementIsNotDisabled`
- `elementHasFocus`
- `elementHasAttribute`
- `networkIdle` (default expected value is `"2"`)
- `pageNavigationAfterExecution`

## Recursion

Nested `conditional_steps` are validated recursively. Rules are conservative: selector omissions and secret-like literals are warnings, while missing action-required fields are errors.
