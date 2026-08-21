# pageVisualRegression

## Description

Perform a visual regression check on the full page.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

No step-specific required fields.

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |
| `visualRegressionMaxDiff` | `number \| null` | Maximum allowed pixel difference percentage (0–100). |

