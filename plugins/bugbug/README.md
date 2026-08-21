<div align="center">

![BugBug Logo](https://bugbug.io/favicon-96x96.png)

# BugBug Plugin

**Plugin for AI agents**

Marketplace-first plugin package for AI coding agents that work with [BugBug](https://bugbug.io).

</div>

The package bundles:

- BugBug skills for agent workflows.
- Plugin manifests for Codex, Claude, Cursor, and Windsurf.
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
npx @bugbug-io/cli plugin --agent=codex
```

- Codex is registered in a `marketplace.json` catalog under `.agents/plugins/`
  (repo) or `~/.agents/plugins/` (personal), referencing the published package.
- Claude Code, Cursor, VS Code, and GitHub Copilot CLI use their supported
  plugin install flow.
- Windsurf is configured directly with MCP plus BugBug skills.

The CLI references the published `@bugbug-io/agent-plugin` package or a public
marketplace where the target client supports that flow. For local development
against the built plugin, use the local install scripts. They build `dist/`, write an
environment-specific MCP URL into the generated MCP config, and then register
the local plugin in Codex, Claude, or Cursor. Codex installs run
`codex mcp login bugbug` automatically so Codex stores fresh OAuth credentials. If
`--token` is provided, the token is written as a bearer header and OAuth login is
skipped. For Cursor (which has no plugin CLI), the local script registers
`dist/` as a `local`-source entry in `~/.agents/plugins/marketplace.json`, so
Cursor loads the plugin — MCP server and skills — straight from the built bundle
instead of copying them in separately.

```sh
npm run install:plugin -- --agent=codex
npm run install:plugin:qa -- --agent=codex --token=BUGBUG_TOKEN
npm run install:plugin:staging -- --agent=cursor --token=BUGBUG_TOKEN
npm run install:plugin:production -- --agent=codex --token=BUGBUG_TOKEN
```

Environment URL mapping:

- `dev` -> `https://local-dev.bugbug.io/mcp`
- `qa` -> `https://qa.bugbug.io/mcp`
- `staging` -> `https://stage.bugbug.io/mcp`
- `production` -> `https://mcp.bugbug.io/mcp`

### Alternative: manual MCP setup

Use the bundled `.mcp.json` as the baseline and provide `API_TOKEN` through your agent client's environment or secret manager.

The server command is:

```sh
npx -y @bugbug-io/mcp-server@latest
```

## Windsurf Setup

Windsurf discovers workspace skills from `.windsurf/skills/` and MCP servers from `~/.codeium/windsurf/mcp_config.json`.

The built `dist/` ships:

- `.windsurf/skills/` with the BugBug skills.
- `.windsurf/mcp_config.json` with the hosted BugBug MCP server entry.

Use `BUGBUG_API_TOKEN` in your Windsurf environment or replace the placeholder through Windsurf's MCP settings.

## Development

The canonical skills live in `@bugbug-io/agent-skills`. The `tsup` build copies
them into `dist/skills/` and `dist/.windsurf/skills/`, because agent marketplaces
commonly resolve skill paths from the plugin root.

Run from `public-tools/`:

```sh
# Build the publishable plugin into dist/
npm run build:plugin

# Build + validate the generated manifests
npm run test:plugin
```
