# assert

## Description

Create an assertion step.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `assertionExpectedValue` | `string \| null` | Expected assertion value when applicable. |
| `assertionJavaScript` | `string \| null` | Custom JavaScript used by script-based assertions. |
| `assertionProperty` | `"checked" \| "count" \| "customJavaScript" \| "exist" \| "notChecked" \| "notExist" \| "notVisible" \| "textContent" \| "hasAttribute" \| "hasNotAttribute" \| "value" \| "visible" \| "pageTitle" \| "pageShowsText" \| "pageDoesNotShowText" \| "pageUrlIs" \| "downloadStarted" \| "variableValue" \| "clipboardValue" \| "disabled" \| "notDisabled"` | Assertion property to inspect, for example text or value. |
| `assertionType` | `"contain" \| "equal" \| "greaterThan" \| "lessThan" \| "match" \| "notContain" \| "notEqual" \| "notMatch" \| "any"` | Assertion operator used by BugBug. |
| `assertionVariableName` | `string \| null` | Variable name used by variable-based assertions. |
| `selectorsPresets` | `array<object>` | Target selectors used by the element-related assertion. |

## Optional Fields

No step-specific optional fields.

