# Common step fields

These fields are shared by BugBug create-step payloads. Step-specific docs reference this file instead of repeating the shared payload contract.

## Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `type` | `string` | Step type discriminator. Use the step type named by the current step reference. |
| `atIndex` | `number \| null` | Insert position within the group. |
| `groupId` | `string \| null` | Owning group UUID for the step. |

## Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `blockId` | `string \| null` | Id of step representing a block start eg. ifCondition step |
| `continueOnFailure` | `boolean` | Whether the run should continue after a fail. |
| `isActive` | `boolean` | Whether the step is enabled. |
| `name` | `string \| null` | Human-readable step name. |
| `notes` | `string \| null` | Optional step notes. |
| `runTimeout` | `number \| null` | Maximum execution time in seconds before the step times out. If not defined, default project settings will be used. |
| `sleep` | `number \| null` | Delay in seconds before running the step. If not defined, default project settings will be used. |
| `waitingConditions` | `array<object>` | Waiting conditions evaluated around the step. **Omit when creating a step** — BugBug materializes the correct defaults for the step type. See [Waiting conditions](#waiting-conditions). |

## Waiting conditions

Omit `waitingConditions` when creating a step. Every step type has a canonical set of defaults, and BugBug materializes them automatically when the field is absent. Those defaults are what the recorder and the webapp produce, so an omitted field is the correct, fully-configured result — not an empty one.

Do not hand-author this field:

- Choosing conditions requires runtime knowledge of the page (what animates, what stays covered, what the network does) that is not available when authoring a payload.
- A partial payload silently replaces the whole set, dropping defaults the step needs.
- Malformed entries produce steps that cannot be saved in the webapp step editor.

Sending `[]` is not the same as omitting: an empty array means "no waiting conditions at all" and skips the defaults.

This applies to creation only. When updating an existing step the defaults are already in place, so `waitingConditions` is accepted and forwarded — send it when the user asks to change how a step waits. A patch replaces the whole set, so include every condition the step should keep, not just the ones being changed.
