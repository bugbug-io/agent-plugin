# Selector Strategies

## Contents

- [Choosing between candidates](#choosing-between-candidates)
- [Targeting by test attribute](#targeting-by-test-attribute)
- [Targeting by accessible name](#targeting-by-accessible-name)
- [Targeting by placeholder](#targeting-by-placeholder)
- [Targeting by text](#targeting-by-text)
- [Targeting by a unique attribute](#targeting-by-a-unique-attribute)
- [Targeting by a non-unique attribute](#targeting-by-a-non-unique-attribute)
- [Targeting by data attribute](#targeting-by-data-attribute)
- [Targeting by class](#targeting-by-class)
- [Targeting by URL attribute](#targeting-by-url-attribute)
- [Targeting by tag path](#targeting-by-tag-path)
- [Absolute XPath as a last resort](#absolute-xpath-as-a-last-resort)
- [Unusable attributes](#unusable-attributes)
- [Removing a position index](#removing-a-position-index)
- [Targeting inside shadow DOM](#targeting-inside-shadow-dom)
- [Targeting inside an iframe](#targeting-inside-an-iframe)
- [Targeting a repeated row](#targeting-a-repeated-row)
- [Targeting an assertion or visual region](#targeting-an-assertion-or-visual-region)

## Choosing between candidates

Rank candidates with the *Preferred authoring strategy order* in the skill — that
list is canonical and is not repeated here.

Two things it does not settle:

- **Ties within a tier** go to the shorter path. A one-step selector beats a
  chain; anchoring to a nearby stable parent beats a long structural path.
- **The order candidates are offered to you is not a quality ranking.** Rank them
  yourself against the canonical order rather than taking the first one given.

## Targeting by test attribute

A product-owned test attribute is the strongest target available. Use it whenever
one exists.

1. Check which attribute names the project treats as test attributes before
   assuming `data-testid` — a project may use `data-test`, `data-qa`, or its own
   convention.
2. Match the attribute exactly: `//button[@data-testid='save-settings']`.
3. Do not pair a test attribute with a position index. If the attribute is not
   unique, that is a product problem worth reporting — anchor to a stable parent
   and note it, rather than silently adding `[2]`.


When the target has no test attribute and you have an access the source code,
propose adding one instead of binding to a weaker signal. Say which element and
which name; do not edit application code as part of authoring a selector.

## Targeting by accessible name

An accessible name usually survives redesigns, because changing it breaks screen
readers too.

- Prefer `aria-label`, then a stable `id`, then a form `name`:
  `//button[@aria-label='Open menu']`.
- Use the accessible name only when it is authored, not generated. Treat
  `aria-label="true"`/`"false"` and anything carrying a generated id marker as
  unusable.
- Do not use an accessible name that restates volatile content, e.g.
  `aria-label="3 unread messages"`.

## Targeting by placeholder

A placeholder identifies an input well when the field has no test attribute,
label association, or stable `name`.

- Match it directly: `//input[@placeholder='Enter email']`.
- Placeholders are user-facing copy, so they are localized and get reworded.
  Prefer a `name`, `id`, or label-to-input chain when one exists — see *Targeting
  by accessible name*.
- Do not use a placeholder that carries example data likely to change, e.g.
  `placeholder="e.g. ORD-1042"`.

## Targeting by text

Build text selectors in this order:

1. Match the element's own **direct** text node:
   `//button[normalize-space(text())='Login']`.
2. If that does not match, match the element's whole text content:
   `//button[normalize-space(.)='Login']`. Use this when the element holds
   whitespace around its text (`"\nDashboard\n"`) or several text nodes. This is
   the most common reason a hand-written text selector fails — try it before
   abandoning the text approach.
3. If the element has no usable direct text, target the child that owns the text,
   searching **at most 2 levels** down:
   `//button//span[normalize-space(text())='Login']`.

Constraints:

- Use text between **2 and 250 characters**. Shorter is not distinctive; longer
  is rejected.
- Do not target text on a content-heavy container — a large subtree yields no
  usable text selector. Target a smaller element inside it.
- Never target text that changes: counters, prices, timestamps, translated copy,
  or personalized labels.

## Targeting by a unique attribute

Any attribute whose value is unique on the page is a usable target, even a plain
one like `type` or `role`.

- Match the attribute that is unique on its own:
  `//button[@type='submit']` when the page has exactly one submit button.
- Verify the uniqueness rather than assuming it — `type='submit'` is unique on a
  login page and ambiguous on a settings page with several forms.
- A project may exclude specific attribute names from selector generation. If an
  attribute you expect is never offered as a candidate, that is the likely
  reason; do not force it.
- Do not invent attributes; always verify attribute existence in source

## Targeting by a non-unique attribute

When the only available attribute matches several elements, do not reach for an
index. Pair it with a stable ancestor so the combination is unique:

```
//form[@data-testid='billing-form'] >> .//button[@type='submit']
```

This is the same anchoring move as *Removing a position index*, applied before an
index ever appears. If no ancestor disambiguates it, prefer a different signal
entirely over an indexed attribute selector.

## Targeting by data attribute

A `data-*` attribute is a reasonable target when it is product-authored and
describes the element rather than its state.

- Good: `//li[@data-row-type='order']` — describes what the element is.
- Avoid: `data-*` carrying ids, counts, or state that changes between runs, e.g.
  `data-order-id='40718'` or `data-selected='true'`.
- Never use framework or tooling `data-*` attributes. Those are listed in the
  skill's *Hard Avoid Rules* and are excluded from selector generation anyway.

If the project has a configured test attribute, prefer it over an incidental
`data-*` — see *Targeting by test attribute*.

## Targeting by class

Use a class only when nothing better exists. When you do:

1. Treat a multi-class attribute as separate candidates — `"btn btn-primary"` is
   two candidates, not one string to match whole.
2. Use only **semantic** classes that describe what the element is: `btn`, `nav`,
   `menu`, `modal`, `card`, `header`, `footer`, `sidebar`, `dialog`, `dropdown`,
   and similar. Skip utility classes (Tailwind `flex`, `p-4`, `text-center`),
   generated hashes (`css-abc123`, `_1x2y3z`), and browser-extension classes.
3. Match with `contains(@class, '…')`, never string equality — the full class
   attribute changes whenever an unrelated class is added.
4. Use the **first class that is unique on its own**. If no single semantic class
   is unique, abandon the class approach rather than stacking several together.

## Targeting by URL attribute

`href`, `src`, `action`, `cite`, `download`, and `poster` identify links, images,
and forms well when the URL is stable. They are exempt from the 250-character
limit that applies to other attributes, and may contain spaces.

Shorten a long or partly dynamic URL in this order, stopping at the first form
that is both stable and unique:

1. **The full URL** — use it when short and fixed:
   `//a[@href='/pricing']`.
2. **Without query parameters** — when the path is stable but the query carries
   session or tracking values:
   `//a[contains(@href, '/checkout/summary')]`.
3. **Hostname only** — when only the destination site is stable:
   `//a[contains(@href, 'status.example.com')]`.

Never match a URL containing a session id, cart id, or one-time token in full.
Match the stable prefix with `contains()` instead.

## Targeting by tag path

When an element carries no usable attribute, text, or class, fall back to its tag
scoped under a stable parent — never a bare tag.

```
//form[@data-testid='login'] >> .//button
```

- Anchor to the nearest parent that *is* identifiable, then descend by tag. The
  shorter the path, the better.
- Prefer semantically meaningful tags (`button`, `input`, `a`, `nav`) over
  generic ones (`div`, `span`), which rarely stay put through a redesign.
- A bare `//button` is only acceptable when the tag is genuinely unique on the
  page, e.g. `//title` or `//body`.
- Treat any tag path longer than about three steps as brittle and record it as
  such.

## Absolute XPath as a last resort

An absolute path from the document root — `/html/body/div[2]/main/form/button` —
is the weakest possible selector. It resolves today and breaks the moment any
ancestor or sibling changes.

Use it only when every other strategy has failed, and then:

- Keep it as a **fallback alternative** inside the group, never as the sole or
  active selector.
- Record explicitly that the selector is brittle and why nothing stronger was
  available.
- Treat its presence as a signal to propose adding a test attribute to the
  application — see *Targeting by test attribute*.

## Unusable attributes

Do not build a selector from:

- Data URIs (`data:image/…`).
- Any value longer than 250 characters.
- Framework, no-code, and browser-extension attributes.

Attributes that can carry a selector are the project's configured test
attributes, the standard HTML set (`id`, `name`, `type`, `role`, `placeholder`,
`title`, `alt`, `href`, `src`), and `aria-*` / `data-*` when meaningful. Rank
them with the skill's *Preferred authoring strategy order*.

The skill's *Hard Avoid Rules* lists the full set of exclusions.

## Removing a position index

A position index couples the selector to sibling order, so replace it with a
stable parent whenever one exists. Given `(//button)[2]`:

1. Find the other elements that match the same candidate.
2. Walk up the target's parents, nearest first, and check whether the target is
   the **only** match inside that parent — every other match must fall outside
   it.
3. Anchor to the first such parent: `//form[@id='login']//button`. The index
   disappears and the selector documents its intended context.
4. If no parent isolates the target, keep the index and record the selector as
   brittle.

Two cautions:

- A selector you were given may already carry an index that could not be removed
  — do not assume it was already checked. Re-check it yourself when repairing.
- Look no further than about 5 parent levels up. Beyond that the anchor is too
  far from the target to be meaningful.

## Targeting inside shadow DOM

An element inside a shadow root is not reachable by a single flat path from the
document. Target the shadow host first, then resolve the element inside it as a
separate group:

```yaml
selector: "xpath=//payment-widget[@data-testid='payment-widget'] >> xpath=.//button[@data-testid='confirm']"
```

- A `descendant` group crosses shadow boundaries, so this works without any
  extra flag.
- See `presets.md` for the payload shape behind this chain.
- Nested shadow roots need one group per boundary. Do not try to collapse them
  into a single path.
- Text extracted across a shadow or iframe boundary is unreliable — prefer an
  attribute on the inner element.

## Targeting inside an iframe

Target the iframe first, then the element inside it as a separate group. Iframe
identity is the fragile part, because third-party embeds generate a fresh suffix
per page load.

- Match only the stable fragment of the frame's name or URL:
  `//iframe[contains(@name, '__privateStripeFrame')]` or
  `//iframe[contains(@name, '__zoid__paypal_buttons')]`.
- Never match a generated frame name in full, e.g.
  `__privateStripeFrame122k8912b`.
- Inside a payment or auth provider's frame, expect the internal markup to be
  outside your control — prefer the provider's documented stable hooks and accept
  that the selector may be brittle. Record it as such.

## Targeting a repeated row

When the target is one item in a list, table, or card grid, identify it by
something that distinguishes it from its siblings, never by position alone.

1. Anchor to the row's own stable content — a name, id, or test attribute the row
   carries:
   `//tr[@data-testid='order-row'][.//td[normalize-space(.)='ORD-1042']]`.
2. If the row itself is unidentifiable, anchor to a stable container and then
   descend to the cell you need as a separate group.
3. Use a position index only when the step genuinely means "the Nth row" — for
   example asserting sort order. Say so in the step name, because a reader cannot
   otherwise tell an intentional index from an unhealed one.

A step that targets a repeated item through a parent/child chain may legitimately
match more than one element. That is the one case where a single match is not
required.

## Targeting an assertion or visual region

For assertions, the selector's job is to locate the region; the assertion fields
carry the expected value. Keep them separate.

- Target the container that holds the value, not the value:
  `//div[@data-testid='payment-status']`, then assert its text.
- Do not write the expected text into the selector, e.g.
  `//*[contains(., 'Payment successful')]`. Such a selector fails by *not
  matching*, which reports as "element not found" rather than as a failed
  assertion, and it cannot detect a wrong value at all.

For a visual-regression region, target the smallest stable element that frames
the area under test. Avoid regions that include clocks, counters, avatars, or
anything animated — they produce false diffs on every run.
