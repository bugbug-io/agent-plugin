# accessibilityCheck

## Description

Scan the current page or one of its elements for WCAG accessibility issues with axe-core.

Common payload fields are documented in [Common step fields](_common-fields.md).

## Required Fields

No step-specific required fields.

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `accessibilityDetectIssuesType` | `"critical" \| "serious" \| "moderate" \| "minor" \| null` | Lowest issue impact that fails the step. Null uses the project default. |
| `accessibilityDisabledRules` | `array<string> \| null` | axe-core rule IDs skipped by the scan. Null uses the project default. |
| `accessibilityIncludeBestPractices` | `boolean \| null` | Also report axe-core best-practice rules that are not part of WCAG. |
| `accessibilityScope` | `"page" \| "element"` | Scan the whole page (default) or only the element targeted by selectorsPresets, which are required for element. |
| `accessibilityStandard` | `"wcag2a" \| "wcag2aa" \| "wcag21aa" \| "wcag22aa" \| null` | WCAG standard to check against. Null uses the project default. |
| `selectorsPresets` | `array<object>` | Element selector presets required by element-targeting steps variants. |
