# select

## Description

Select an option in the targeted select element.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `selectIsMultiple` | `boolean` | Whether the target select allows multiple values. |
| `selectType` | `"text" \| "index" \| "value"` | How the option should be matched. |
| `value` | `string` | Option value or label to select. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |

