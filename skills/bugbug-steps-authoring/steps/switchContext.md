# switchContext

## Description

Switch execution context to another browser tab or into an iframe.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `tabNo` | `number` | Tab index to activate. |
| `value` | `"topFrame" \| "iframe"` | Page context: topFrame for the tab document, iframe to enter the frame matched by selectorsPresets. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `selectorsPresets` | `array<object>` | Selectors of the iframe element. Required when value is iframe. |
