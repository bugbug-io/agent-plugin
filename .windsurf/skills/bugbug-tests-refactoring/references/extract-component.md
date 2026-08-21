# Extract Component

Use this when duplicated groups or step sequences should become a reusable BugBug
component.

Workflow:

1. Analyze the local export snapshot and identify duplicated step sequences.
2. Pick one canonical group or sequence as the source.
3. Convert the canonical group to component (tool: `bugbug_convert_group_to_component`).
4. Insert the component into each affected test (tool: `bugbug_insert_component_into_test`).
5. Preserve ordering with `bugbug_update_step_position` when needed.
6. Run affected tests.
7. Delete or unlink duplicate groups only after replacement behavior passed, or
   after the user explicitly accepts unverified cleanup.

Keep one extraction per mutation batch. Do not combine extraction with suite
reorganization in the same batch.
