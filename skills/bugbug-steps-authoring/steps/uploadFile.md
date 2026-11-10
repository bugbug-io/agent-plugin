# uploadFile

## Description

Upload a file from the project Files library into the targeted file input.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `projectArtifactId` | `string` | ID of a file from the project Files library (max 10 MB). Reuse an existing file (`bugbug.files.list` in bugbug_execute) before uploading a new one (bugbug_files_upload). |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |

