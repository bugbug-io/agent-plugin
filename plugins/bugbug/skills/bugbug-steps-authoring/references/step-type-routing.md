# Step type routing

| Intent | Step type | Selector? | Notes |
| --- | --- | --- | --- |
| Open a known URL in the current tab | `goto` | No | Use for deterministic navigation to an absolute URL. |
| Open a URL in a new tab | `newTab` | No | Use when the flow must preserve the current tab. |
| Move through browser history | `goBack`, `goForward` | No | Use only when browser history behavior is part of the flow. |
| Reload the current page | `reloadPage` | No | Use instead of `goto` when testing refresh behavior. |
| Close the active tab | `closeTab` | No | Use after flows that intentionally create extra tabs. |
| Switch tab, window, or frame context | `switchContext` | Optional | Use when the flow changes browsing context, such as switching to an iframe, another tab, or another window. Provide selectors for iframes. |
| Click an element | `click`, `dblClick`, `rightClick` | Yes | Pick the exact click gesture the user performs. |
| Press or release the mouse button | `mouseDown`, `mouseUp` | Yes | Use for drag-like or press-and-hold interactions that are not simple clicks. |
| Drag one element or coordinate to another | `dragAndDrop` | Yes | Provide selectors when dragging from or dropping onto elements; omit only for coordinate-based dragging. |
| Hover over an element | `hover` | Yes | Use when hover reveals UI or changes state. |
| Scroll the page or a container | `scroll` | Optional | Provide selectors when scrolling inside a container or toward a target element; omit for window-level scrolls. |
| Type text into a field | `type` | Yes | Use to simulate user typing in an input. |
| Set an input value directly | `change` | Yes | Use when the expected user action is value change, not keystroke behavior. |
| Clear a field | `clear` | Yes | Use instead of typing an empty string. |
| Select an option | `select` | Yes | Use to simulate user selection from a dropdown. |
| Paste clipboard content | `pasteFromClipboard` | Yes | Use when paste behavior is what the flow needs to cover; it acts on the active element. |
| Upload a file | `uploadFile` | Yes | Requires a project artifact reference and the targeted file input. |
| Answer a browser prompt | `answerPrompt` | No | Use for alert/prompt/confirm-style browser dialogs. |
| Check DOM, text, value, URL, or script result | `assert` | Optional | Use selectors for element assertions; omit for page, variable, clipboard, download, or custom page checks. |
| Branch based on a condition | `ifCondition` | Optional | Use selectors for element conditions; put child steps in the condition block with `blockId`. |
| Store a value for later use | `setLocalVariable` | Optional | Use selectors for element-sourced values; omit for literal or evaluated values. |
| Compare a stable component/region screenshot | `elementVisualRegression` | Yes | Prefer over full-page visual checks when possible. Provide `selectorsPresets` for the visual container being compared. |
| Compare the full page screenshot | `pageVisualRegression` | No | Use only when full-page visual coverage is necessary; full-page checks are more likely to be flaky. Do not provide element selectors. |
| Run custom JavaScript | `execute` | No | Use only for complex interactions, setup, or extraction that do not fit another step type. |

## Hard rules
- Prefer the most specific step type that matches the user's action or check.
- Prefer `assert` over `execute` when checking page state, because assertions are
  clearer in test reports.
- Always prefer element-specific assertions and visual regression checks over
  page-level ones when the target is a specific component or region.
- Use `execute` only when no specific step type covers the interaction, setup, or
  data extraction.