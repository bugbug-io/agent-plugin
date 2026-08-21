# Visual Regression Review Reference

Playbook for reviewing a step that failed because its screenshot no longer matches the stored
reference (baseline). A visual-regression failure is a **screenshot diff**, not a selector/DOM
problem — do not re-target selectors or query the DOM snapshot to resolve it.

> References (baselines) live on **steps** (`bugbug_list_visual_regression_reference_screenshots`
> by `stepId`), not on runs. A run only tells you *which* step failed and gives you the
> expected / observed / diff screenshots to compare.

## Contents

- [Required Inputs](#required-inputs)
- [Flow](#flow)
- [Accepting a new baseline](#accepting-a-new-baseline)
- [Increasing max difference](#increasing-max-difference)
- [Verify](#verify)
- [Hard rules](#hard-rules)

## Required Inputs

- The failed `testRunId` and failed `stepRunId` (and the `stepId` behind it).
- The failed step run details (tool: `bugbug_get_failed_step_run_details` with the `stepRunId`),
  which carries everything needed to review the diff.

## Flow

Work top to bottom. The goal is a single verdict: **accept-new-baseline** or **real-regression**.

### 1. Read the failed step run and confirm it is a visual-regression failure

- Read the failed step run (tool: `bugbug_get_failed_step_run_details` with the `stepRunId`).
  Confirm it is a visual-regression step (it exposes the three `visualRegression*` screenshots) and
  note `observedDiff` vs `maxDiff`. A tiny margin over the threshold points to noise; a large margin
  points to a real change.

### 2. Look at all three images

- From the step run details, open **expected**, **observed**, and **diff** together. The diff
  highlights *where* the pixels changed; expected vs. observed tells you *what* changed. Do not
  judge from the numbers alone.
- For surrounding context, follow the `screenshots` resource link returned by
  `bugbug_get_test_run`. Do not construct the run resource URI.
- Return preview of necessary images to the user

### 3. Classify the diff

Pick the single closest category:

- **Rendering noise** — anti-aliasing, sub-pixel shifts, font smoothing, minor compression
  artifacts scattered as thin edges in the diff, with `observedDiff` just above `maxDiff`.
  Verdict: **accept-new-baseline** (or raise `maxDiff` tolerance if noise recurs).
- **Dynamic content** — timestamps, ads, avatars, carousels, random data, or animations captured
  mid-frame. The diff is localized to a region that is *expected* to change.
  Verdict: **accept-new-baseline** only after the region is masked/stabilized; otherwise it recurs.
- **Layout shift** — an element moved/resized, pushing large contiguous blocks in the diff without
  the content itself changing. Decide whether the shift is intended (redesign) or a regression.
- **Color/font change** — a broad uniform diff over text or backgrounds. Almost always an
  intended theme/brand change **or** a real regression — never noise.
- **Content change** — different text, images, or missing/added elements. Treat as a
  **real-regression** candidate unless the change is confirmed intentional.

### 4. Decide the verdict

- **accept-new-baseline** — the observed screenshot is correct and the baseline is stale (rendering
  noise, or a confirmed intended change). The observed screenshot becomes the new reference.
- **real-regression** — the observed screenshot is wrong. Report it with the specific visual
  evidence (which region, what changed, `observedDiff` vs `maxDiff`). Do **not** touch the baseline.

Cite the concrete evidence for whichever verdict you reach — the category, the region in the diff,
and the numbers.

## Accepting a new baseline

Accepting a baseline is consequential: it silences this check until the next real change, so a
wrong accept hides future regressions.

- **Require explicit user confirmation before accepting.** Recommend the verdict and stop.
- Only on confirmation, accept the new baseline with
  `bugbug_resolve_visual_regression_review` using `action=acceptBaseline` and the failed
  `stepRunId`.
- If the diff came from unstable dynamic content, prefer fixing the step (mask/stabilize the region,
  or re-target the visual-regression region to the stable visual container). Load
  `bugbug-selectors-authoring` instead of repeatedly accepting baselines.

## Increasing max difference

Increasing `maxDiff` is for recurring harmless rendering noise where the observed screenshot is
still visually correct and the diff is only slightly above the current threshold. It is not a way to
accept real content, layout, color, or product changes.

- **Require explicit user confirmation before increasing tolerance.** Recommend the verdict and
  stop.
- Only on confirmation, increase the allowed difference with
  `bugbug_resolve_visual_regression_review` using `action=increaseMaxDifference` and the failed
  `stepRunId`.
- Do not supply a numeric value. The platform sets the new threshold from the observed diff.
- If noise keeps recurring or the needed tolerance is broad, prefer fixing the visual-regression
  region instead of repeatedly increasing `maxDiff`.

## Verify

- After accepting a new baseline, increasing `maxDiff`, or fixing the region, run the affected test
  and confirm the step now passes (tool: `bugbug_run_test`).
- If it still fails on the same step, return to step 2 with the new run's comparison.

## Hard rules

- Do not treat a VR failure as a selector/DOM problem — no DOM-snapshot queries, no selector rewrites
  (unless you are deliberately re-targeting the VR region).
- Do not accept a new baseline until the user has explicitly confirmed the specific accept.
- Do not increase `maxDiff` until the user has explicitly confirmed the specific tolerance change.
- Do not judge the verdict from `observedDiff` alone — look at all three screenshots.
- When in doubt between an intended change and a regression, report it as a **real-regression** and
  let the user decide; never silently accept.
