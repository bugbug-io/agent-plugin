# setLocalVariable

## Description

Store a value in a local BugBug variable.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `localVariableName` | `string` | Variable name to assign. |
| `localVariableSource` | `"element" \| "value" \| "evaluate"` | Source used to populate the variable. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string \| null` | JavaScript source used when evaluating a variable value. |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |
| `value` | `string` | Literal value to store when using the value source. |

