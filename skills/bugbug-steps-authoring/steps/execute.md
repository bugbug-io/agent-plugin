# execute

## Description

Execute custom JavaScript in the page context.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | JavaScript source code to execute. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |

