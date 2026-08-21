# Selector Presets

The shape of `selectorsPresets`, how a preset resolves, and the YAML shorthand
that represents one. Read this when building or editing preset payloads, or when
translating between API JSON and local YAML.

## Contents

- [Structure](#structure)
- [How a preset resolves](#how-a-preset-resolves)
- [YAML shorthand](#yaml-shorthand)
- [Example: direct element](#example-direct-element)
- [Example: parent then child then target](#example-parent-then-child-then-target)
- [Example: element then sibling](#example-element-then-sibling)
- [Example: element then ancestor then sibling](#example-element-then-ancestor-then-sibling)
- [Example: CSS instead of XPath](#example-css-instead-of-xpath)
- [Common mistakes](#common-mistakes)

## Structure

Three nested levels, each with a different meaning:

```
selectorsPresets[]      alternatives — independent whole paths
  └── selectorsGroups[] a chain — each group resolves against the previous result
        └── selectors[] alternatives — different ways to find the same element
```

Confusing the outer and inner levels is the most common authoring error. Groups
express a **relationship** between elements; selectors inside one group express
**fallbacks** for a single element.

Fields on each level:

- **Preset** — `id`, `isActive`, `isCustom`, `selectorsGroups[]`.
- **Group** — `id`, `relation`, `selectors[]`.
- **Selector** — `id`, `type`, `selector`, `isActive`, `score`.

Selector `type` is `XPath` or `CSS` when you author it by hand
(`customXPath` and `customCSS` are used for user's manual selectors). Leave `score` as `null` —
it is assigned, not authored.

## How a preset resolves

- **Presets are alternatives.** Each is tried as an independent whole path, so
  write every preset to stand on its own.
- **Groups form a chain.** The first group finds the base element; each later
  group resolves relative to the previous group's result.
- **Selectors inside a group are alternatives.** The active, valid one is
  preferred; otherwise the remaining candidates are probed and one may be
  promoted after a successful run. Order them best-first.
- **The first group's relation is always `descendant`** — nothing precedes it to
  be relative to.

Relations:

| Relation | Operator | Resolves against the previous result by |
| --- | --- | --- |
| `descendant` | `>>` | querying inside it |
| `ancestor` | `<<` | searching its parents |
| `sibling` | `~` | searching siblings via its parent |

## YAML shorthand

One string represents a whole preset. The syntax is Playwright-inspired: `>>`
follows Playwright's chaining convention, while `<<` and `~` are BugBug
extensions.

```yaml
selector: "xpath=//section[@data-testid='panel'] >> xpath=//button[normalize-space()='Edit']"
```

Rules:

- **Strategy prefixes are required** in YAML: `xpath=` or `css=`. Never add them
  to API payloads — there, the `type` field carries the strategy.
- **Operators need surrounding whitespace.** `a >> b` parses; `a>>b` does not.
- Only the **active** selector of each group appears in the YAML string. A preset
  with fallback alternatives loses them when represented this way — the shorthand
  is lossy by design.

## Example: direct element

The common case: one group, one selector, no relationship.

```json
[
  {
    "id": "preset-direct",
    "isActive": true,
    "isCustom": true,
    "selectorsGroups": [
      {
        "id": "group-target",
        "relation": "descendant",
        "selectors": [
          {
            "id": "selector-target",
            "type": "XPath",
            "selector": "//button[@data-testid='save']",
            "isActive": true,
            "score": null
          }
        ]
      }
    ]
  }
]
```

```yaml
selector: "xpath=//button[@data-testid='save']"
```

## Example: parent then child then target

Narrow from a stable container down to the target. Use this when the target is
only unique within a region.

```json
[
  {
    "id": "preset-child-target",
    "isActive": true,
    "isCustom": true,
    "selectorsGroups": [
      {
        "id": "group-parent",
        "relation": "descendant",
        "selectors": [
          {
            "id": "selector-parent",
            "type": "XPath",
            "selector": "//section[@data-testid='settings-panel']",
            "isActive": true,
            "score": null
          }
        ]
      },
      {
        "id": "group-child",
        "relation": "descendant",
        "selectors": [
          {
            "id": "selector-child",
            "type": "XPath",
            "selector": ".//div[contains(@class,'row')]",
            "isActive": true,
            "score": null
          }
        ]
      },
      {
        "id": "group-target",
        "relation": "descendant",
        "selectors": [
          {
            "id": "selector-target",
            "type": "XPath",
            "selector": ".//button[normalize-space()='Edit']",
            "isActive": true,
            "score": null
          }
        ]
      }
    ]
  }
]
```

```yaml
selector: "xpath=//section[@data-testid='settings-panel'] >> xpath=.//div[contains(@class,'row')] >> xpath=.//button[normalize-space()='Edit']"
```

This is also the shape to use for a shadow host or an iframe: host first, then
the element inside it.

## Example: element then sibling

Reach a field from its label — useful when the input itself has no stable hook
but its label text is reliable.

```json
[
  {
    "id": "preset-sibling",
    "isActive": true,
    "isCustom": true,
    "selectorsGroups": [
      {
        "id": "group-element",
        "relation": "descendant",
        "selectors": [
          {
            "id": "selector-element",
            "type": "XPath",
            "selector": "//label[normalize-space()='Email']",
            "isActive": true,
            "score": null
          }
        ]
      },
      {
        "id": "group-sibling",
        "relation": "sibling",
        "selectors": [
          {
            "id": "selector-sibling",
            "type": "XPath",
            "selector": ".//input",
            "isActive": true,
            "score": null
          }
        ]
      }
    ]
  }
]
```

```yaml
selector: "xpath=//label[normalize-space()='Email'] ~ xpath=.//input"
```

## Example: element then ancestor then sibling

Start from identifiable content, climb to its container, then move across. Use
this to act on a row's controls when the row is identified by its text.

```json
[
  {
    "id": "preset-parent-sibling",
    "isActive": true,
    "isCustom": true,
    "selectorsGroups": [
      {
        "id": "group-element",
        "relation": "descendant",
        "selectors": [
          {
            "id": "selector-element",
            "type": "XPath",
            "selector": "//span[normalize-space()='Item name']",
            "isActive": true,
            "score": null
          }
        ]
      },
      {
        "id": "group-parent",
        "relation": "ancestor",
        "selectors": [
          {
            "id": "selector-parent",
            "type": "XPath",
            "selector": ".//div[contains(@class,'card')]",
            "isActive": true,
            "score": null
          }
        ]
      },
      {
        "id": "group-parent-sibling",
        "relation": "sibling",
        "selectors": [
          {
            "id": "selector-parent-sibling",
            "type": "XPath",
            "selector": ".//div[contains(@class,'card-actions')]",
            "isActive": true,
            "score": null
          }
        ]
      }
    ]
  }
]
```

```yaml
selector: "xpath=//span[normalize-space()='Item name'] << xpath=.//div[contains(@class,'card')] ~ xpath=.//div[contains(@class,'card-actions')]"
```

## Example: CSS instead of XPath

Same single-group shape, with `type` set to `CSS` and the `css=` prefix in
YAML. Prefer XPath unless the CSS form is genuinely clearer.

```json
[
  {
    "id": "preset-direct-css",
    "isActive": true,
    "isCustom": true,
    "selectorsGroups": [
      {
        "id": "group-target-css",
        "relation": "descendant",
        "selectors": [
          {
            "id": "selector-target-css",
            "type": "CSS",
            "selector": "button[data-testid='save']",
            "isActive": true,
            "score": null
          }
        ]
      }
    ]
  }
]
```

```yaml
selector: "css=button[data-testid='save']"
```

## Common mistakes

- **Using groups for fallbacks.** Two ways to find *the same* element belong in
  one group's `selectors[]`, not in two groups. Two groups mean "find A, then
  find B relative to A."
- **Absolute paths in later groups.** `//div[…]` in a second group searches the
  whole document. Use `.//div[…]`.
- **Prefixes in API payloads.** `xpath=` and `css=` belong only in YAML; in JSON
  the `type` field carries the strategy.
- **Missing whitespace around operators.** `a>>b` is not parsed as a chain.
- **Expecting fallbacks to survive YAML.** Only each group's active selector is
  written to the shorthand string.
- **Authoring `score`.** Leave it `null`.
