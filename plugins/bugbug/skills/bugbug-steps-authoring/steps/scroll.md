# scroll

## Description

Scroll the page or target element.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `scrollInside` | `"window" \| "element"` | Whether to scroll inside the window or target element. |
| `scrollTo` | `"coords" \| "edge" \| "untilNextStepElementIsVisible" \| "elementIntoView"` | Scroll target strategy. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `scrollDirection` | `"down" \| "up" \| "right" \| "left" \| null` | Scroll direction. |
| `scrollEdge` | `"topLeft" \| "topCenter" \| "topRight" \| "middleLeft" \| "middleCenter" \| "middleRight" \| "bottomLeft" \| "bottomCenter" \| "bottomRight" \| null` | Element edge to scroll toward. |
| `scrollX` | `number \| null` | Horizontal scroll coordinate. |
| `scrollY` | `number \| null` | Vertical scroll coordinate. |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |

