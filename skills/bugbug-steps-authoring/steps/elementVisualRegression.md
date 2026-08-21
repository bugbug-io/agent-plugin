# elementVisualRegression

## Description

Perform a visual regression check on a targeted element.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `selectorsPresets` | `array<object>` | Target selectors used to locate the element for comparison. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `visualRegressionMaxDiff` | `number \| null` | Maximum allowed pixel difference percentage (0–100). |

