---
name: bugbug-steps-authoring
description: Creates and updates BugBug test steps. Use when choosing step types, building step payloads, naming steps, setting assertions or visual checks, or materializing element-targeting steps. Run bugbug-context-discovering first.
---

# BugBug Steps Authoring

## Preflight

1. Run `bugbug-context-discovering` before creating or updating steps.
2. Load `bugbug-selectors-authoring` before authoring any step that targets a DOM
   element.
3. Confirm the target test, insertion point, and authorized mutation scope.

## Inputs

- Requested user action or assertion.
- Target test and surrounding steps.
- Available DOM evidence, screenshots, source-code evidence, variables, and
  artifacts needed by the step.

## Safety

- Do not invent test data, credentials, secrets, selectors, or artifact
  references.
- Prefer built-in step types and assertion fields over custom JavaScript.
- Keep step changes within the user's requested flow or authorized repair scope.
- Stop before mutation when required step fields or target placement are
  uncertain.

## Workflow

1. Read `references/step-type-routing.md` to choose the most specific step type.
2. Read `steps/{stepType}.md` after choosing each step type and double-check
   required fields before creating or updating the step.
3. For step types that require `selectorsPresets`, provide selectors backed by
   observed DOM evidence. Load `bugbug-selectors-authoring` first.
4. For `assert` and `ifCondition`, read `references/assertion-routing.md` before
   choosing assertion fields.
5. For visual checks, use `selectorsPresets` for `elementVisualRegression`.
   `pageVisualRegression` does not require selectors. Both accept
   `visualRegressionMaxDiff`.
6. Add `blockId` when the step belongs to a conditional block. Use the owning
   `ifCondition` step id.
7. Read the focused create or update schema for each step type before calling
   BugBug MCP mutation tools.
8. Name steps in product language. Avoid generic names like "Step 1" or "Click
   button". Include notes only when they add useful context.

## Output

- Step types chosen and why they match the requested behavior.
- Created or updated step identities and payload-relevant details.
- Any brittle selectors, missing required fields, external dependencies, or
  verification limits.

## Resources

Resolve bundled resource paths relative to this skill directory.

- Read `references/step-type-routing.md` for choosing the correct step type.
- Read `references/assertion-routing.md` for choosing assertion fields.
- Read generated `steps/` files for full step payload definitions.
