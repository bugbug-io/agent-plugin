# geolocation

## Description

Allow or deny the browser geolocation permission and set the reported position. Does not work when the test or project location permission is `disabled`; the run then fails with `GEOLOCATION_PERMISSION_DISABLED`.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `geolocationMode` | `"allow" \| "deny"` | `allow` reports the given position, `deny` makes the permission denied. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `geolocationAccuracy` | `number \| null` | Accuracy radius in meters. Ignored when mode is `deny`. |
| `geolocationLatitude` | `number \| null` | Latitude in degrees. Provide together with longitude; ignored when mode is `deny`. |
| `geolocationLongitude` | `number \| null` | Longitude in degrees. Provide together with latitude; ignored when mode is `deny`. |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |
