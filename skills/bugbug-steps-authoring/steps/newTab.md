# newTab

## Description

Open a new browser tab.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

No step-specific required fields.

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `password` | `string \| null` | Optional password for basic authentication. |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |
| `url` | `string \| null` | URL to open in the new tab. |
| `username` | `string \| null` | Optional username for basic authentication. |

