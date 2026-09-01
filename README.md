![BugBug logo](https://bugbug.io/favicon-96x96.png)

# BugBug Agent Plugin

Install BugBug's skills and hosted MCP connection into your AI client with the
BugBug CLI:

```sh
npx @bugbug-io/cli plugin --agent=<agent>
```

Choose exactly one supported client: `cursor`, `claude`, `vscode`, `codex`, or
`copilot`. Use `--dry-run` to preview the installation.

The installer does not accept `--token`. The AI client you select completes its
own MCP OAuth sign-in after installation. The plugin connects to the production
endpoint at `https://mcp.bugbug.io/mcp`.

## Features

- **Ready in one command** — Set up Claude Code, Codex, Cursor, GitHub Copilot,
  or VS Code with the BugBug CLI; the selected client completes OAuth sign-in.
- **Turn requirements into coverage** — Use BugBug's workflow guidance and live
  project context to plan coverage, then create tests from an approved plan.
- **Build with live BugBug context** — Combine **50 MCP tools** and **8 workflow
  prompts** with **9 skills** so your agent can inspect the tests, suites,
  profiles, and project details it needs.
- **Debug from evidence** — Investigate failed runs with run details, failure
  diagnostics, screenshots, and DOM snapshots, guided by a safe debugging
  workflow.
- **Keep suites reliable as they grow** — Review selectors, tests, reusable
  components, and suites with BugBug-specific guidance before making targeted
  improvements.
- **Turn run history into decisions** — Summarize project and run health for
  actionable QA and product insights, using live data instead of guesswork.

Skills provide safe workflow guidance; MCP supplies the live BugBug data and
actions. Changes to BugBug resources require the user's explicit authorization.

## What you get

Skills are available on all BugBug plans. MCP access requires Pro or higher.

### Bundled skills

| Skill                        | Capability                                                               |
| ---------------------------- | ------------------------------------------------------------------------ |
| `bugbug-context-discovering` | Discover the BugBug project, repository, and tested-application context. |
| `bugbug-project-reporting`   | Create read-only project health reports for PM and QA audiences.         |
| `bugbug-selectors-authoring` | Author, review, repair, and optimize element selectors.                  |
| `bugbug-steps-authoring`     | Choose step types and create or update step payloads.                    |
| `bugbug-test-run-debugging`  | Investigate test runs and classify failures.                             |
| `bugbug-tests-authoring`     | Create and maintain tests from an approved plan.                         |
| `bugbug-tests-planning`      | Plan end-to-end and UI test coverage.                                    |
| `bugbug-tests-refactoring`   | Analyze and refactor tests, groups, components, and suites.              |
| `bugbug-yaml-authoring`      | Create, validate, repair, and explain BugBug YAML.                       |

## When to use it

Use the plugin when you want an AI coding client to work with BugBug tests and
test results. Use its skills for workflow guidance and its MCP connection for
live BugBug data, runs, exports, diagnostics, and explicit mutations.

For the complete MCP registry, see the [MCP server docs](https://docs.bugbug.io/ai-testing/mcp/mcp-tools).
