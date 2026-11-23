# mediaSource

## Description

Replace the browser microphone or camera input with a file from the project Files library. Without a file the default fake device is used. Works only when the test or project media permission is `always_accept` or `custom_source`; otherwise the run fails with `MEDIA_SOURCE_PERMISSIONS_NOT_ACCEPTED`.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `mediaSourceKind` | `"audio" \| "video"` | Device to replace: `audio` (microphone, WAV, MP3, OGG, M4A or FLAC up to 60 s) or `video` (camera, WebM or MP4). |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `projectArtifactId` | `string \| null` | ID of a file from the project Files library (max 10 MB). Omit to use the default fake device. |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |
