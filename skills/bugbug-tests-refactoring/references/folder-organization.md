# Folder Organization

Use this when tests or components are scattered at the root, sit in the wrong
folder, or the folder tree has duplicates, dead ends, or one-item folders.

Rules:

- Folders have a kind. Tests go only into `test` folders and components only
  into `component` folders; plain groups are never in folders.
- Folders nest up to 5 levels, and sibling names must differ ignoring case.
- Folders only organize. Moving a test changes where people find it, not what
  runs; suites decide what runs together.
- Creating and renaming folders needs a paid plan. Moving items and deleting
  folders do not.

Workflow:

1. Read the trees with `bugbug_list_folders` for `kind: test` and
   `kind: component`, or from the `tests/` and `components/` subdirectories of
   an export.
2. List what each folder holds with `bugbug_list_tests` or
   `bugbug_list_components` and `folderId`; use `noFolder: true` for the root.
3. Propose the smallest change set: follow the dominant existing convention
   instead of introducing a new layout, and merge near-duplicates before adding
   folders.
4. Apply changes only after explicit user approval, in this order:
   1. Create missing folders with `bugbug_create_folder`, parent first.
   2. Move items with `bugbug_move_to_folder` (up to 25 per call, tests or
      components, not both).
   3. Rename or re-parent folders with `bugbug_update_folder`.
   4. Delete emptied folders with `bugbug_delete_folder`.
5. Report moved items and any indexed failures from `bugbug_move_to_folder`.

Deleting a folder that is not empty needs `force: true`. That deletes its
subfolders and all contained tests and components. Show the user the counts the tool reports and get explicit
confirmation first. Prefer moving the content and then deleting the empty
folder.
