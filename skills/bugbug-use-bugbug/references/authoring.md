# bugbug.groups, bugbug.components, bugbug.steps, and bugbug.variables API

## Contents

- bugbug.groups
- bugbug.components
- bugbug.steps
- bugbug.variables
- Types

<!-- Generated from the code-mode bindings. Do not edit by hand: run `UPDATE_CODE_MODE_REFERENCE=1 npm run test:mcp -- reference` from public-tools/. -->

Building blocks of a test: groups, reusable components, steps, and variables.
Arguments are validated; unknown or misspelled option keys are rejected. Every function lists its permission (`read` or `write`), description, definition, input, and output. Optional parameters are marked `?`. Named types are defined in full in the `Types` section at the end of this file.

## bugbug.groups

### bugbug.groups.list

Permission: read

Description: List step groups (including components).

Definition:

```ts
bugbug.groups.list(options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: Group[] }>
```

Input:

```ts
type Input = [options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: Group[] };
```

### bugbug.groups.getAll

Permission: read

Description: Every step group (including components) matching the filters, in ONE call.

Definition:

```ts
bugbug.groups.getAll(options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; pageSize?: number }): Promise<Group[]>
```

Input:

```ts
type Input = [options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; pageSize?: number }];
```

Output:

```ts
type Output = Group[];
```

### bugbug.groups.get

Permission: read

Description: Get a group with its steps.

Definition:

```ts
bugbug.groups.get(groupId: string): Promise<Group>
```

Input:

```ts
type Input = [groupId: string];
```

Output:

```ts
type Output = Group;
```

### bugbug.groups.create

Permission: write

Description: Create a group (or component) at the end of a test.

Definition:

```ts
bugbug.groups.create(group: { testId: string; name: string; isComponent?: boolean; isActive?: boolean; folderId?: string }): Promise<Group>
```

Input:

```ts
type Input = [group: { testId: string; name: string; isComponent?: boolean; isActive?: boolean; folderId?: string }];
```

Output:

```ts
type Output = Group;
```

### bugbug.groups.update

Permission: write

Description: Rename a group or component.

Definition:

```ts
bugbug.groups.update(groupId: string, patch: { name?: string; folderId?: string | null }): Promise<Group>
```

Input:

```ts
type Input = [groupId: string, patch: { name?: string; folderId?: string | null }];
```

Output:

```ts
type Output = Group;
```

### bugbug.groups.makeComponentFromGroup

Permission: write

Description: Turn a plain group into a reusable component.

Definition:

```ts
bugbug.groups.makeComponentFromGroup(groupId: string): Promise<Group>
```

Input:

```ts
type Input = [groupId: string];
```

Output:

```ts
type Output = Group;
```

## bugbug.components

### bugbug.components.list

Permission: read

Description: List reusable components (groups shared between tests).

Definition:

```ts
bugbug.components.list(options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; folderId?: string; noFolder?: boolean; cursor?: string; pageSize?: number }): Promise<{ count: number; nextToken: string | null; results: Group[] }>
```

Input:

```ts
type Input = [options?: { query?: string; ordering?: "name" | "-name" | "created" | "-created"; folderId?: string; noFolder?: boolean; cursor?: string; pageSize?: number }];
```

Output:

```ts
type Output = { count: number; nextToken: string | null; results: Group[] };
```

### bugbug.components.getUsage

Permission: read

Description: List the tests that use a component.

Definition:

```ts
bugbug.components.getUsage(componentId: string): Promise<ComponentUsage>
```

Input:

```ts
type Input = [componentId: string];
```

Output:

```ts
type Output = ComponentUsage;
```

## bugbug.steps

### bugbug.steps.get

Permission: read

Description: Get a step with all of its fields (type, selectors, values, waiting conditions).

Definition:

```ts
bugbug.steps.get(stepId: string): Promise<StepDetails>
```

Input:

```ts
type Input = [stepId: string];
```

Output:

```ts
type Output = StepDetails;
```

### bugbug.steps.create

Permission: write

Description: Create one step. Read the bugbug-steps-authoring skill (steps/{stepType}.md) for the fields of each type; waitingConditions can only be set by bugbug.steps.update.

Definition:

```ts
bugbug.steps.create(step: { type: StepType; groupId: string; atIndex: number; isActive: boolean; ...typeSpecificFields }): Promise<StepDetails>
```

Input:

```ts
type Input = [step: { type: StepType; groupId: string; atIndex: number; isActive: boolean; ...typeSpecificFields }];
```

Output:

```ts
type Output = StepDetails;
```

### bugbug.steps.update

Permission: write

Description: Partially update a step; only `type` is required. Same field contract as bugbug.steps.create.

Definition:

```ts
bugbug.steps.update(stepId: string, patch: { type: StepType; ...fieldsToChange }): Promise<StepDetails>
```

Input:

```ts
type Input = [stepId: string, patch: { type: StepType; ...fieldsToChange }];
```

Output:

```ts
type Output = StepDetails;
```

## bugbug.variables

### bugbug.variables.list

Permission: read

Description: List project variables.

Definition:

```ts
bugbug.variables.list(): Promise<Variable[]>
```

Input:

```ts
type Input = [];
```

Output:

```ts
type Output = Variable[];
```

### bugbug.variables.get

Permission: read

Description: Get a project variable by key.

Definition:

```ts
bugbug.variables.get(key: string): Promise<Variable>
```

Input:

```ts
type Input = [key: string];
```

Output:

```ts
type Output = Variable;
```

### bugbug.variables.create

Permission: write

Description: Create a project variable, used in steps as {{key}}. Never pass secret values: for isSecret the value is stored empty and the user sets it at webappUrl.

Definition:

```ts
bugbug.variables.create(variable: { key: string; type: "value" | "evaluate"; isSecret: boolean; value?: string; description?: string }): Promise<Variable & { webappUrl: string }>
```

Input:

```ts
type Input = [variable: { key: string; type: "value" | "evaluate"; isSecret: boolean; value?: string; description?: string }];
```

Output:

```ts
type Output = Variable & { webappUrl: string };
```

### bugbug.variables.update

Permission: write

Description: Partially update a variable. Never pass secret values.

Definition:

```ts
bugbug.variables.update(key: string, patch: { type?: "value" | "evaluate"; isSecret?: boolean; value?: string; description?: string }): Promise<Variable>
```

Input:

```ts
type Input = [key: string, patch: { type?: "value" | "evaluate"; isSecret?: boolean; value?: string; description?: string }];
```

Output:

```ts
type Output = Variable;
```

## Types

Exact definitions of the named types used by the functions above.

```ts
type ComponentUsage = {
  usage?: number;
  testsIds?: string[];
};
type Group = {
  id: string;
  originGroupId: string;
  name: string | null;
  isComponent: boolean;
  folderId: string | null;
  steps: {
    id: string;
    atIndex?: number | null;
    type: "accessibilityCheck" | "answerPrompt" | "assert" | "pasteFromClipboard" | "change" | "clear" | "click" | "dblClick" | "rightClick" | "closeTab" | "dragAndDrop" | "elementVisualRegression" | "execute" | "goto" | "openInbox" | "goBack" | "goForward" | "hover" | "ifCondition" | "mouseDown" | "mouseMove" | "mouseUp" | "newTab" | "pageVisualRegression" | "reloadPage" | "scroll" | "select" | "setLocalVariable" | "switchContext" | "type" | "uploadFile";
    name?: string | null;
    blockId?: string | null;
    groupId?: string | null;
    originGroupId: string;
    notes?: string | null;
    isActive: boolean;
    runTimeout?: number | null;
    sleep?: number | null;
    waitingConditions?: {
      type: "documentComplete" | "elementIsVisible" | "elementIsNotCovered" | "elementIsNotAnimating" | "elementIsNotDisabled" | "elementHasFocus" | "networkIdle" | "pageNavigationAfterExecution" | "elementHasAttribute";
      expected?: string | null;
      isActive: boolean;
      isOverridden: boolean;
      timeout?: number | null;
    }[];
    source: "api" | "agent";
    // plus the fields of the specific step type (see the bugbug-steps-authoring skill)
  }[];
};
type StepDetails = {
  id: string;
  atIndex?: number | null;
  type: "accessibilityCheck" | "answerPrompt" | "assert" | "pasteFromClipboard" | "change" | "clear" | "click" | "dblClick" | "rightClick" | "closeTab" | "dragAndDrop" | "elementVisualRegression" | "execute" | "goto" | "openInbox" | "goBack" | "goForward" | "hover" | "ifCondition" | "mouseDown" | "mouseMove" | "mouseUp" | "newTab" | "pageVisualRegression" | "reloadPage" | "scroll" | "select" | "setLocalVariable" | "switchContext" | "type" | "uploadFile";
  name?: string | null;
  blockId?: string | null;
  groupId?: string | null;
  originGroupId: string;
  notes?: string | null;
  isActive: boolean;
  runTimeout?: number | null;
  sleep?: number | null;
  waitingConditions?: {
    type: "documentComplete" | "elementIsVisible" | "elementIsNotCovered" | "elementIsNotAnimating" | "elementIsNotDisabled" | "elementHasFocus" | "networkIdle" | "pageNavigationAfterExecution" | "elementHasAttribute";
    expected?: string | null;
    isActive: boolean;
    isOverridden: boolean;
    timeout?: number | null;
  }[];
  source: "api" | "agent";
  // plus the fields of the specific step type (see the bugbug-steps-authoring skill)
};
type StepType = "accessibilityCheck" | "answerPrompt" | "assert" | "pasteFromClipboard" | "change" | "clear" | "click" | "dblClick" | "rightClick" | "closeTab" | "dragAndDrop" | "elementVisualRegression" | "execute" | "goto" | "openInbox" | "goBack" | "goForward" | "hover" | "ifCondition" | "mouseDown" | "mouseMove" | "mouseUp" | "newTab" | "pageVisualRegression" | "reloadPage" | "scroll" | "select" | "setLocalVariable" | "switchContext" | "type" | "uploadFile";
type Variable = {
  key: string;
  description: string | null;
  isBuiltIn: boolean;
  type: "value" | "evaluate";
};
```
