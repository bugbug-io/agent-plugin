# mouseUp

## Description

Release the mouse button on the targeted element.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `interactionPosition` | `"smart" \| "custom" \| "topLeft" \| "topCenter" \| "topRight" \| "middleLeft" \| "middleCenter" \| "middleRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight"` | Mouse-up position relative to the target element. |
| `selectorsPresets` | `array<object>` | Target selectors used to locate the element. |

## Optional Fields

No step-specific optional fields.

