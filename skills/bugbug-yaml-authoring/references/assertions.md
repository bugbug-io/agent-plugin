# Assertions

## Contents

- [Fields](#fields)
- [Assertion Properties](#assertion-properties)
- [Assertion Types](#assertion-types)
- [Examples](#examples)

Use this file for `action: assert` and `action: ifCondition` assertion details.

## Fields

Required for all assertions:

- `assertion_property`
- `assertion_type`

Common optional companions:

- `assertion_expected_value`: string, number, boolean, or null.
- `assertion_java_script`: required when `assertion_property: customJavaScript`.
- `assertion_variable_name`: required when `assertion_property: variableValue`.
- `selector`: required for element-scoped checks unless the exported step intentionally uses coordinates or browser state.
- `interaction_position`: `smart`, `custom`, `topLeft`, `topCenter`, `topRight`, `middleLeft`, `middleCenter`, `middleRight`, `bottomLeft`, `bottomCenter`, `bottomRight`.

## Assertion Properties

| Property | Scope | Notes |
| --- | --- | --- |
| `checked` | element | Checkbox/radio is checked. |
| `count` | element | Number of matched elements; use numeric expected value. |
| `customJavaScript` | page | Requires `assertion_java_script`; expected value is compared to script result. |
| `exist` | element | Element exists. |
| `notChecked` | element | Checkbox/radio is not checked. |
| `notExist` | element | Element does not exist. |
| `notVisible` | element | Element exists but is not visible. |
| `textContent` | element | Element text. |
| `value` | element | Input/control value. |
| `visible` | element | Element is visible. |
| `pageTitle` | page | Browser page title. |
| `pageShowsText` | page | Page contains visible text. |
| `pageDoesNotShowText` | page | Page does not contain visible text. |
| `pageUrlIs` | page | Current page URL. |
| `downloadStarted` | page | Download event/name. |
| `variableValue` | page | Requires `assertion_variable_name`. |
| `clipboardValue` | page | Browser clipboard value. |
| `disabled` | element | Element is disabled. |
| `notDisabled` | element | Element is enabled. |

## Assertion Types

Schema-supported values: `contain`, `equal`, `greaterThan`, `lessThan`, `match`, `notContain`, `notEqual`, `any`.

Sensible combinations:

- Boolean element state (`checked`, `exist`, `visible`, `disabled`, and negated variants): use `equal` with `true`.
- Text/value/page URL/title/clipboard/variable: use `contain`, `equal`, `match`, `notContain`, `notEqual`.
- Counts and numeric values: use `equal`, `greaterThan`, `lessThan`.
- `downloadStarted`: use `any` when only the event matters, or text match types when checking a file name.
- `customJavaScript`: use `equal` with the expected script result.

## Examples

Element text:

```yaml
- action: assert
  action_details:
    selector: "xpath=//h1"
    assertion_property: textContent
    assertion_type: contain
    assertion_expected_value: "Dashboard"
```

Page URL:

```yaml
- action: assert
  action_details:
    assertion_property: pageUrlIs
    assertion_type: contain
    assertion_expected_value: "/dashboard"
```

Count:

```yaml
- action: assert
  action_details:
    selector: "xpath=//*[contains(@class, 'todo-item')]"
    assertion_property: count
    assertion_type: greaterThan
    assertion_expected_value: 0
```

Custom JavaScript:

```yaml
- action: assert
  action_details:
    assertion_property: customJavaScript
    assertion_type: equal
    assertion_java_script: "return document.readyState"
    assertion_expected_value: "complete"
```

Variable value:

```yaml
- action: assert
  action_details:
    assertion_property: variableValue
    assertion_variable_name: "order_id"
    assertion_type: match
    assertion_expected_value: "^[A-Z0-9-]+$"
```
