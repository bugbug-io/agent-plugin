# mouseMove

## Description

Move the mouse to an element or viewport coordinate.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

No step-specific required fields.

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `clientX` | `number \| null` | X coordinate. Required by the API when isTargetDocument is true. |
| `clientY` | `number \| null` | Y coordinate. Required by the API when isTargetDocument is true. |
| `interactionPosition` | `"smart" \| "custom" \| "topLeft" \| "topCenter" \| "topRight" \| "middleLeft" \| "middleCenter" \| "middleRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight"` | Position relative to the target element when isTargetDocument is false. |
| `isTargetDocument` | `boolean` | Whether to move relative to the viewport instead of a target element. |
| `modifierKeys` | `array<"ctrl" \| "shift" \| "alt" \| "meta">` | Keyboard modifier keys held while moving. |
| `mouseButtons` | `array<"left" \| "right" \| "middle" \| "back">` | Mouse buttons held while moving. |
| `mouseMoveSteps` | `integer \| null` | Optional number of intermediate mouse-move events. |
| `selectorsPresets` | `array<object>` | Target selectors when moving relative to an element. |

