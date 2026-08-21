---
name: bugbug-selectors-authoring
description: Authors, reviews, repairs, and optimizes BugBug element selectors. Use before creating or changing any DOM-targeted step, assertion, condition, visual region, drag target, upload target, or selector preset. Run bugbug-context-discovering first.
---

# BugBug Selectors Authoring

Canonical rules for authoring BugBug element selectors. Follow this when
designing, creating, reviewing, repairing, or optimizing any step that targets a
DOM element. Use it as an authoring and validation checklist, and validate
authored selectors with real runs.

## Preflight

1. Run `bugbug-context-discovering` before using project or source-code evidence.
2. Confirm the step intent, target element role, page context, and available DOM
   or screenshot evidence.
3. When source code for the tested app is available, prefer confirmed stable test
   attributes or accessible names from source evidence.

## Inputs

- Step intent and step type.
- Existing `selectorsPresets` when editing or repairing.
- DOM snapshot, queried element details, screenshots, logs, and optional tested
  application source context.
- Optional page context: shadow dom/iframe/window context, virtual scroll, responsive state.

## Safety

- Do not invent selectors without observed DOM or source evidence.
- Do not use framework internals, generated IDs, deep indexes, dynamic text, or
  absolute structure unless no better target exists and the brittleness is
  documented.
- Keep assertion expectations out of selectors when assertion fields can express
  them.

## Workflow

1. Decide whether a selector is **required** for the step type.
2. Pick the target element **role**: action target, assertion target, drag
   source, drag drop target, or visual-regression region.
3. Choose the shortest stable selector from the preferred strategy order below,
   and add at least 3 possible stable selectors following that order.
4. Build a **new active preset** as the preferred path.
5. Verify uniqueness with DOM evidence via `bugbug_query_dom_snapshot_element`;
   interaction targets normally need a single match.
6. Use selector groups for element relationships and presets for alternatives.
   Do not confuse a group chain (a relationship) with fallback alternatives
   (selectors inside one group).
7. Check whether page elements have stable attributes. If they do not and the
   related code is available, suggest adding new stable attributes.
8. Run the affected test when a live URL and profile are available.

### Author-Verify Loop

1. Choose the shortest stable candidate from the priority order.
2. Verify uniqueness with `bugbug_query_dom_snapshot_element`.
3. Require `matchCount === 1` for interaction targets unless the step
   intentionally targets a repeated collection item through a parent/child chain.
4. If non-unique, anchor to a stable parent or choose a stronger attribute — read
   *Removing a position index* in `references/strategies.md`.
5. Run the affected test when a live URL exists.

### Selector Data Model

- **Presets are alternatives.** Each is tried as an independent whole path, so
  write every preset to stand on its own.
- **Groups inside one preset form a chain.** The first group finds the base
  element; each later group resolves **relative to the previous group's result**,
  by `relation`: `descendant` (`>>`) queries inside it, `ancestor` (`<<`)
  searches its parents, `sibling` (`~`) searches siblings via its parent.
- **Selectors inside one group are alternatives.** An active, valid selector is
  preferred; otherwise the remaining candidates are probed and one may be
  promoted to active after a successful run. Order them best-first.
- Do not add `xpath=` or `css=` prefixes to API selectors. Prefixes belong only
  in YAML local-file shorthand.
- A short note whenever a brittle selector is unavoidable.

Read `references/presets.md` for payload shapes, the YAML shorthand, and worked
examples of each chain pattern.

### Preferred authoring strategy order

This is the canonical ranking. Prefer the earliest tier that yields a stable,
unique selector, and use it whenever you compare two candidates.

1. **Custom test attributes** configured for the project (`data-testid`,
   `data-test`, or the project's own convention).
2. **Text and text-like attributes**: user-facing text, `placeholder`, `alt`,
   `title`, `aria-label`, `aria-description` — only when stable, not volatile or
   localized.
3. **Form name** (`name`), when not generated.
4. **Id**, when not generated or dynamic.
5. **A semantically unique tag** (`title`, `body`, `html`).
6. **A unique non-dynamic attribute** (`type`, `role`, …) that is unique on its
   own.
7. **ARIA attributes**, when meaningful and authored.
8. **Data attributes**, when product-authored and describing the element rather
   than its state.
9. **Other attributes**, including URL attributes (`href`, `src`, `action`,
   `cite`, `download`, `poster`) with shortened stable matching when long.
10. **Short tag/XPath under a stable parent**.
11. **Semantic class**, only when unique and no better signal exists.
12. **Indexed selectors and absolute XPath** — last resort only.

Two candidates at the same tier are separated by path length: fewer segments
wins. A class-based or indexed selector is demoted regardless of which signal
produced it, so a test attribute that still needs an index ranks below a plain
text selector that does not.

Read more about strategies in `references/strategies.md`.

### Hard Avoid Rules

- **Framework / no-code / internal attributes:** React, Angular, Vue, Gatsby,
  Wix, Bubble, Webflow, Elementor, Shopify, Material UI, Radix, Mantine
  internals; React Aria (`data-react-aria-`); Guideflow (`data-guideflow-`);
  BugBug internals (`data-bugbug-`, `data-bb-input-id`); password-manager
  attributes (`data-form-type`, `data-1p-ignore`, `data-bwignore`,
  `data-lpignore`); browser-extension attributes.
- **Generated IDs:** anything containing known generated markers — `ember`,
  `select2`, `react-aria`, Mantine/Radix id prefixes, or React `useId` patterns.
- **UUID / hash / numeric-looking dynamic values**, unless covered by an accepted
  URL/title/alt exception.
- **Boolean ARIA values** like `aria-*="true"` / `aria-*="false"`.
- **Object-looking values** like `{...}`.
- **Non-URL attribute values longer than 250 characters.**
- **Non-semantic / generated classes**, unless non-semantic classes are
  explicitly enabled for the project.
- **Deep `nth-child` / `nth-of-type` chains** unless no better signal exists and
  the selector is documented as brittle.
- **Text-only selectors on dynamic content**, counters, prices, timestamps,
  translated copy, or personalized labels.
- Selectors for **`script`** and **`style`** elements.
- **Text selectors** shorter than 2 chars, longer than 250 chars, matching huge
  `innerHTML`, or extracted across an iframe boundary.
- Avoid using `self::`.
- Avoid `or`, `and` if it's not necessary.

### XPath vs CSS

- Always prefer XPath over CSS if possible.
- Use **XPath** for: text matching, parent/ancestor/sibling relationships,
  relative chains, and SVG or name-healed elements.
- Use **CSS** only for simple, stable, direct selectors where it is clearer, e.g.
  `button[data-testid='save']`.
- XPath text should follow this behavior: try direct `normalize-space(text())`
  first, then fall back to `normalize-space(.)` when the direct text match is
  insufficient.
- Do not overcomplicate selectors.

### Good / Bad Examples

Use examples as pattern checks, not as copy-paste rules. The exact selector still
needs verification against the actual page state.

| Case | Bad | Good | Why |
| --- | --- | --- | --- |
| Stable test attribute exists | `//button[normalize-space(.)='Save']` | `//button[@data-testid='save-settings']` | Product-owned test attributes are less likely to change than copy. |
| Generated id | `//*[@id='react-aria-:r5:']` | `//button[@aria-label='Open menu']` | Generated IDs change between renders or sessions. |
| Indexed target | `(//button)[2]` | `//form[@data-testid='billing-form']//button[@data-testid='billing-save']` | A stable parent documents the intended context and avoids position coupling. |
| Dynamic text | `//span[normalize-space(text())='$42.19']` | `//section[@data-testid='cart-summary']//span[@data-testid='cart-total']` | Prices, counters, timestamps, and personalized values are volatile. |
| Assertion text | `//*[contains(., 'Payment successful')]` | `//div[@data-testid='payment-status']` | The selector locates the region; the assertion checks the expected text separately. |
| Deep structure | `/html/body/div[2]/main/div[3]/button` | `//button[@data-testid='submit-order']` | Absolute structure is brittle compared with semantic attributes. |
| Shadow DOM target | `//button[@data-testid='confirm']` | `//payment-widget[@data-testid='payment-widget']` + child group `//button[@data-testid='confirm']` | Target the shadow host first, then resolve the element inside it with a separate group. |
| Stripe / PayPal iframe | `//iframe[@name='__privateStripeFrame122k8912b']` | `//iframe[contains(@name, '__privateStripeFrame')]` or `//iframe[contains(@name, '__zoid__paypal_buttons')]` | Match only the stable provider fragment; omit dynamic suffixes from iframe names. |
| Virtual list row | `(//li[@role='option'])[5]` | `//div[contains(@class,'rc-virtual-list-holder')]` + child group `//li[normalize-space(.)='Item 5']` | Virtual lists recycle DOM nodes, so a bare index resolves to a different row after scrolling. |

## Output

- Authored or recommended `selectorPresets` shape.
- Evidence used to justify selector stability and uniqueness.
- Any unavoidable brittleness and the reason no stronger hook was available.
- Recommended stable test attribute additions when the app lacks reliable hooks.

## Resources

Resolve bundled resource paths relative to this skill directory.

- Read `references/strategies.md` to learn more about selectors generation
  strategies and resolving selectors in known situations.
- Read `references/presets.md` for `selectorsPresets` payload shapes, the YAML
  shorthand and its prefix/whitespace rules, and worked examples of each chain
  pattern.
- Load `bugbug-context-discovering` during Preflight.
