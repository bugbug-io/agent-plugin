<div align="center">

![BugBug Logo](https://bugbug.io/favicon-96x96.png)

# BugBug Plugin

**Plugin for AI agents**

Marketplace-first plugin package for AI coding agents that work with [BugBug](https://bugbug.io).

</div>

The package bundles:

- BugBug skills for agent workflows.
- Plugin manifests for Codex, Claude, Cursor, Grok, VS Code, and GitHub Copilot.
- MCP client configuration for the hosted BugBug MCP server.

## Bundled Skills

The canonical skills come from
[`@bugbug-io/agent-skills`](../agent-skills/skills/) and are copied into `dist/`
at build time:

| Skill                        | Purpose                                                            |
| ---------------------------- | ------------------------------------------------------------------ |
| `bugbug-context-discovering` | Discovers project/repo/tested-app context. Run before other skills. |
| `bugbug-tests-planning`      | Plans BugBug end-to-end and UI test coverage before creation.       |
| `bugbug-tests-authoring`     | Creates and maintains BugBug tests from an approved plan.            |
| `bugbug-steps-authoring`     | Chooses step types and builds step payloads.                        |
| `bugbug-selectors-authoring` | Authors, reviews, repairs, and optimizes element selectors.         |
| `bugbug-test-run-debugging`  | Validates and debugs test runs, classifying failures.               |
| `bugbug-tests-refactoring`   | Analyzes and refactors tests, groups, components, and suites.       |
| `bugbug-yaml-authoring`      | Creates, validates, repairs, and explains BugBug YAML.              |
| `bugbug-project-reporting`   | Builds read-only project health reports for PM/QA audiences.        |

The MCP surface the plugin points at (50 tools, 19 resources, 9 prompts) is
documented in the [MCP README](../mcp/README.md#tools).

The publishable plugin is generated into `dist/` by the `tsup` build: skills are
copied from this package's canonical `skills/`, and every manifest is rendered
from the sources in `src/` with values substituted from
`manifest.config.ts`. Do not hand-edit `dist/`.

## Which Capability Should I Use?

- Install/use this plugin when you want an AI coding agent to work with BugBug skills and MCP configuration from one package.
- Use MCP when the agent needs live BugBug platform data, API mutations, test runs, run artifacts, YAML import/export, or failure diagnosis.
- Use skills when the agent is creating, reviewing, repairing, or validating tests and needs workflow rules before touching BugBug data.
- Use the YAML schema package when tooling needs the canonical BugBug YAML v1 JSON Schema assets.
- Use local CLI or workspace tooling for local file edits; MCP is the live BugBug platform bridge, not a filesystem editor.

## Installation

The recommended way to install this plugin is the BugBug CLI. Choose the target
AI client explicitly with `--agent`:

```sh
npx @bugbug-io/cli plugin --agent=<agent>
```

Available agents: `codex`, `claude`, `cursor`, `grok`, `vscode`, `copilot`.

### Alternative: manual MCP setup

Use either bundled MCP manifest, `.mcp.json` or `mcp.json`, as the baseline and provide `API_TOKEN` through your agent client's environment or secret manager. Both files have identical content.

The server command is:

```sh
npx -y @bugbug-io/mcp-server@latest
```
