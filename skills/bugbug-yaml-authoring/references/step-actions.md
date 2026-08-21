# BugBug Step Actions

## Contents

- [YAML Selector Syntax](#yaml-selector-syntax)
- [Navigation](#navigation)
- [Mouse](#mouse)
- [Input](#input)
- [Assertions and Control Flow](#assertions-and-control-flow)
- [Script and Variables](#script-and-variables)
- [Scroll](#scroll)
- [Drag and Drop](#drag-and-drop)
- [Tabs and Context](#tabs-and-context)
- [Visual Regression](#visual-regression)

Every step requires `action` and `action_details`.

Shared optional step fields:

- `name`: display name.
- `is_active`: boolean; omit unless intentionally disabling/enabling.
- `notes`: free-form notes.
- `execution`: `continue_on_failure`, `sleep`, `run_timeout`.
- `waiting_conditions`: entries with `condition`, `expected`, `timeout`, `is_active`. Valid condition names are in `semantic-validation.md`.
- `conditional_steps`: nested steps used by `ifCondition`; validated recursively.

Shared action-details fields available to many element actions:

- `selector`: target element selector; use the YAML syntax below.
- `drop_selector`: drag-and-drop drop target selector.
- `interaction_position`: `smart`, `custom`, `topLeft`, `topCenter`, `topRight`, `middleLeft`, `middleCenter`, `middleRight`, `bottomLeft`, `bottomCenter`, `bottomRight`.

## YAML Selector Syntax

XPath selectors must use an explicit prefix. Prefix selector strategies with:

- `xpath=` for XPath.
- `css=` for CSS.

Chain related selector groups with spaces around one of these operators:

- `>>` finds a descendant of the previous result.
- `<<` finds an ancestor of the previous result.
- `~` finds a sibling through the previous result's parent.

```yaml
selector: "xpath=//form[@id='login'] >> css=button[type='submit']"
```

Use one prefixed XPath when no relation is needed, for example
`xpath=//button[@type='submit']`.

## Navigation

### `goto`

Required: `url`. Optional: `username`, `password`.

```yaml
- action: goto
  action_details:
    url: "https://example.com/login"
```

### `goBack`, `goForward`, `reloadPage`

No action-specific fields.

```yaml
- action: reloadPage
  action_details: {}
```

### `newTab`

Required: `url`. Optional: `username`, `password`.

```yaml
- action: newTab
  action_details:
    url: "https://example.com/help"
```

## Mouse

Actions: `click`, `dblClick`, `rightClick`, `mouseDown`, `mouseUp`, `hover`.

Optional: `selector`, `interaction_position`, `modifier_keys`. Exported steps may contain coordinates through `client_x` and `client_y`.

```yaml
- action: click
  action_details:
    selector: "xpath=//button[@type='submit']"
    interaction_position: smart
```

## Input

### `type`

Required: `value`. Optional: `selector`, `has_secret_value`.

```yaml
- action: type
  action_details:
    selector: "xpath=//input[@name='password']"
    value: "{{password}}"
    has_secret_value: true
```

### `clear`

No action-specific fields. Usually use `selector`.

```yaml
- action: clear
  action_details:
    selector: "xpath=//input[@name='search']"
```

### `change`

Optional: `value`, `has_secret_value`, `selector`.

```yaml
- action: change
  action_details:
    selector: "xpath=//input[@name='email']"
    value: "{{email}}"
```

### `select`

Required: `select_type`, `value`. Optional: `selector`, `select_is_multiple`.

`select_type`: `text`, `value`, `index`.

```yaml
- action: select
  action_details:
    selector: "xpath=//select[@name='country']"
    select_type: value
    value: "PL"
```

### `uploadFile`

Required semantically: `file_source` or `project_artifact_id`. Optional: `selector`.

```yaml
- action: uploadFile
  action_details:
    selector: "xpath=//input[@type='file']"
    file_source: "artifacts/invoice.pdf"
```

### `pasteFromClipboard`

No action-specific fields. Usually use `selector`.

```yaml
- action: pasteFromClipboard
  action_details:
    selector: "xpath=//textarea[@name='message']"
```

### `answerPrompt`

Required: `value`.

```yaml
- action: answerPrompt
  action_details:
    value: "yes"
```

## Assertions and Control Flow

### `assert`

Required: `assertion_property`, `assertion_type`. See `assertions.md` for all properties, types, companions, and examples.

```yaml
- action: assert
  action_details:
    selector: "xpath=//h1"
    assertion_property: textContent
    assertion_type: contain
    assertion_expected_value: "Dashboard"
```

### `ifCondition`

Required: assertion fields in `action_details` plus `conditional_steps` on the step.

```yaml
- action: ifCondition
  action_details:
    selector: "xpath=//*[contains(@class, 'notice')]"
    assertion_property: visible
    assertion_type: equal
    assertion_expected_value: true
  conditional_steps:
    - action: click
      action_details:
        selector: "xpath=//*[contains(@class, 'notice')]//button"
```

## Script and Variables

### `execute`

Required: `code`.

```yaml
- action: execute
  action_details:
    code: "window.localStorage.setItem('demo', 'true')"
```

### `setLocalVariable`

Required: `local_variable_name`, `local_variable_source`.

`local_variable_source`: `element`, `value`, `evaluate`.

Optional by source:

- `element`: use `selector`.
- `value`: use `value`.
- `evaluate`: use `code`, optional `is_target_document`.

```yaml
- action: setLocalVariable
  action_details:
    local_variable_name: "order_id"
    local_variable_source: element
    selector: "xpath=//*[@data-testid='order-id']"
```

## Scroll

### `scroll`

Required: `scroll_inside`, `scroll_to`.

Enums:

- `scroll_inside`: `window`, `element`.
- `scroll_to`: `coords`, `edge`, `untilNextStepElementIsVisible`, `elementIntoView`.
- `scroll_direction`: `down`, `up`, `right`, `left`.
- `scroll_edge`: `topLeft`, `topCenter`, `topRight`, `middleLeft`, `middleCenter`, `middleRight`, `bottomLeft`, `bottomCenter`, `bottomRight`.

Use `scroll_x`/`scroll_y` with `coords`, `scroll_edge` with `edge`, and `selector` when scrolling inside an element or into view.

```yaml
- action: scroll
  action_details:
    scroll_inside: window
    scroll_to: edge
    scroll_edge: bottomCenter
```

## Drag and Drop

### `dragAndDrop`

Optional but usually needed:

- `dnd_drag_on`: `coords` or `element`.
- `dnd_drag_x`, `dnd_drag_y`.
- `selector` for drag element.
- `dnd_drop_on`: `coords` or `element`.
- `dnd_drop_x`, `dnd_drop_y`.
- `drop_selector` for drop element.
- `dnd_drop_interaction_position`: same values as `interaction_position`.

```yaml
- action: dragAndDrop
  action_details:
    selector: "xpath=//*[@data-testid='card-1']"
    drop_selector: "xpath=//*[@data-testid='done-column']"
    dnd_drag_on: element
    dnd_drop_on: element
```

## Tabs and Context

### `closeTab`

No action-specific fields.

```yaml
- action: closeTab
  action_details: {}
```

### `switchContext`

Optional: `tab_no`, `window_no`, `frame_no`, `frame_src`, `value`.

`value`: `topFrame`, `iframe`.

```yaml
- action: switchContext
  action_details:
    value: iframe
    frame_src: "checkout"
```

## Visual Regression

### `elementVisualRegression`, `pageVisualRegression`

Optional:

- `visual_regression_max_diff`: number.
- `visual_regression_ref_screenshots`: list of screenshots. Each entry may include `file_source`, `project_artifact_id`, `browser_name`, `os_name`, `screen_size_type`, `profile`, `method`, `capture_at`.
- `selector` is normally required for `elementVisualRegression`.

```yaml
- action: elementVisualRegression
  action_details:
    selector: "xpath=//*[contains(@class, 'hero')]"
    visual_regression_max_diff: 0.05
    visual_regression_ref_screenshots:
      - file_source: "artifacts/hero-baseline.png"
        browser_name: "Chrome"
        screen_size_type: "desktop"
```
