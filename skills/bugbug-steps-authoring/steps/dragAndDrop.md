# dragAndDrop

## Description

Drag from one element and drop onto another.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `dndDragOn` | `"coords" \| "element"` | Whether dragging starts from coordinates or an element. |
| `dndDropInteractionPosition` | `"smart" \| "custom" \| "topLeft" \| "topCenter" \| "topRight" \| "middleLeft" \| "middleCenter" \| "middleRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight"` | Drop position relative to the target element. |
| `dndDropOn` | `"coords" \| "element"` | Whether dropping targets coordinates or an element. |
| `interactionPosition` | `"smart" \| "custom" \| "topLeft" \| "topCenter" \| "topRight" \| "middleLeft" \| "middleCenter" \| "middleRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight"` | Drag start position relative to the target element. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `dndDragX` | `number \| null` | Drag start X coordinate when dragging by coordinates. |
| `dndDragY` | `number \| null` | Drag start Y coordinate when dragging by coordinates. |
| `dndDropSelectorsPresets` | `array<object>` | Target selectors used to locate the drop element. |
| `dndDropX` | `number \| null` | Drop X coordinate when dropping by coordinates. |
| `dndDropY` | `number \| null` | Drop Y coordinate when dropping by coordinates. |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |

