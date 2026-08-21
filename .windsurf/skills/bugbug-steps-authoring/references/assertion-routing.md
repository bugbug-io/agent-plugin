# Assertion routing

Use this routing when creating an `assert` step or an `ifCondition`.

- Prefer element-scoped assertion properties when checking a specific UI element.
  Even when element has weak selectors.
- Use page-level assertion properties only when the expected result is about the
  whole page, browser, download, variable, or clipboard.
- Keep selectors focused on the element being inspected. Do not encode expected
  text into the selector when `assertionExpectedValue` can express it.
- Use `customJavaScript` only when no built-in assertion property can express the
  check.

## Assertion properties

| Intent | `assertionProperty` | Selector? | Notes |
| --- | --- | --- | --- |
| Element exists | `exist` | Yes | Use before interactions when presence matters. |
| Element does not exist | `notExist` | Yes | Use for removed DOM nodes, not hidden elements. |
| Element is visible | `visible` | Yes | Use for user-visible UI. |
| Element is not visible | `notVisible` | Yes | Use for hidden-but-still-present UI. |
| Element text | `textContent` | Yes | Compare with `assertionExpectedValue`. |
| Input value | `value` | Yes | Use for form fields and controls with values. |
| Element count | `count` | Yes | Use with numeric operators when matching repeated elements. |
| Checkbox/radio is checked | `checked` | Yes | Use for selected state. |
| Checkbox/radio is not checked | `notChecked` | Yes | Use for unselected state. |
| Element is disabled | `disabled` | Yes | Use for disabled form controls or buttons. |
| Element is enabled | `notDisabled` | Yes | Use for controls expected to be actionable. |
| Page title | `pageTitle` | No | Use for document title checks. |
| Page URL | `pageUrlIs` | No | Use for current URL checks. |
| Page contains text | `pageShowsText` | No | Prefer element text checks when the location matters. |
| Page does not contain text | `pageDoesNotShowText` | No | Prefer element-scoped absence checks when possible. |
| Download started | `downloadStarted` | No | Use after the action that should trigger a download. |
| Variable value | `variableValue` | No | Set `assertionVariableName` and compare the stored value. |
| Clipboard value | `clipboardValue` | No | Use after copy/paste flows that change clipboard content. |
| Custom JavaScript result | `customJavaScript` | Optional | Use only for checks that built-in properties cannot express. |

## Assertion operators

| Intent | `assertionType` | Notes |
| --- | --- | --- |
| Equals exactly | `equal` | Use for exact text, value, URL, title, variable, clipboard, or count checks. |
| Does not equal exactly | `notEqual` | Use when any value except the expected one is acceptable. |
| Contains text or substring | `contain` | Use for partial text, URL, title, variable, or clipboard checks. |
| Does not contain text or substring | `notContain` | Use for partial negative checks. |
| Matches pattern | `match` | Use for regex-like or dynamic text patterns. |
| Greater than | `greaterThan` | Use mainly for `count` or numeric values. |
| Less than | `lessThan` | Use mainly for `count` or numeric values. |
| Any value is acceptable | `any` | Use only when the assertion property itself is the check, such as existence or visibility. |
