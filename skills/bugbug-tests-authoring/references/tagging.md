# Project Tags

## Rules

- Use tags only for user-requested or plan-approved filtering, test selection,
  or reporting (e.g. smoke, checkout, release). Otherwise leave tags unchanged
  and continue; do not request tagging approval for unrelated work.
- Reuse existing names, including case/whitespace variants. Create a tag only
  when no equivalent exists; avoid redundant folder/suite labels and synonyms.
- Never store agent progress, notes, selectors, URLs, credentials, test data,
  temporary IDs, or handoff context in tags. Use the working plan/report or
  test variables instead.

## Workflow

1. Call `bugbug_list_tags` for the current project.
2. For each approved new tag, specify its purpose and targets. Assignment
   creates missing names in the target project with the default color
   (`#6D28D9`). Use `bugbug_create_tag` first when a specific palette color
   is needed.
3. Read the target with `bugbug_get_test`, `bugbug_get_suite`,
   `bugbug_get_test_run`, or `bugbug_get_suite_run`. Preserve unrelated direct
   tags and compute the complete replacement list.
4. Call `bugbug_set_test_tags`, `bugbug_set_suite_tags`,
   `bugbug_set_test_run_tags`, or `bugbug_set_suite_run_tags` with at most 64
   **names**, not IDs. `tags: []` clears direct tags; use only when requested.
5. Check the result; report actual tag changes and targets.

## Inheritance And Global Changes

- Runs inherit parent test/suite tags at creation. Parent assignment changes
  do not rewrite earlier runs. Run assignment tools change only direct tags
  (`inherited: false`); inherited tags survive `[]`. Do not add direct copies.
- `bugbug_update_tag` renames/recolors every use, including historical runs;
  `bugbug_delete_tag` removes the tag and all assignments. Check usage counts
  and require explicit intent for these global changes. Unassign one target
  by replacing its direct list, not deleting the project tag.

## Names And Colors

Names: trim whitespace; 1–64 characters; no commas or control characters.
New/changed colors: use this palette; default `#6D28D9`.

```text
#6D28D9 #7C3AED #A855F7 #D946EF #EC4899
#F43F5E #EF4444 #F97316 #D97706 #CA8A04
#84CC16 #22C55E #10B981 #14B8A6 #06B6D4
#0EA5E9 #3B82F6 #6366F1 #64748B #78716C
```

Follow existing color conventions within the palette. Preserve current colors
(including legacy colors) when assigning or renaming; recolor only on request.
