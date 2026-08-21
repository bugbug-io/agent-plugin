# ifCondition

## Description

Branch execution based on an assertion condition.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `assertionExpectedValue` | `string \| null` | Expected assertion value when applicable. |
| `assertionJavaScript` | `string \| null` | Custom JavaScript used by script-based conditions. |
| `assertionProperty` | `"checked" \| "count" \| "customJavaScript" \| "exist" \| "notChecked" \| "notExist" \| "notVisible" \| "textContent" \| "hasAttribute" \| "hasNotAttribute" \| "value" \| "visible" \| "pageTitle" \| "pageShowsText" \| "pageDoesNotShowText" \| "pageUrlIs" \| "downloadStarted" \| "variableValue" \| "clipboardValue" \| "disabled" \| "notDisabled"` | Assertion property to inspect for the branch condition. |
| `assertionType` | `"contain" \| "equal" \| "greaterThan" \| "lessThan" \| "match" \| "notContain" \| "notEqual" \| "notMatch" \| "any"` | Assertion operator used to evaluate the branch condition. |
| `assertionVariableName` | `string \| null` | Variable name used by variable-based conditions. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `selectorsPresets` | `array<object>` | Target selectors used to locate the element for the condition. |

