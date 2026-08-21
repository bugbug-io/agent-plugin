// index.ts
import {
  cpSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync
} from "fs";
import { createRequire } from "module";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";

// ../core/dist/utils/env.js
var withEnvNameSuffix = (name, env) => env === "production" ? name : `${name} (${env})`;

// ../core/package.json
var package_default = {
  name: "@bugbug-io/core",
  version: "13.39.1",
  private: true,
  type: "module",
  main: "dist/index.js",
  types: "dist/index.d.ts",
  exports: {
    ".": {
      development: "./src/index.ts",
      import: "./dist/index.js",
      types: "./dist/index.d.ts"
    },
    "./constants/defaults": {
      development: "./src/constants/defaults.ts",
      import: "./dist/constants/defaults.js",
      types: "./dist/constants/defaults.d.ts"
    },
    "./constants/status": {
      development: "./src/constants/status.ts",
      import: "./dist/constants/status.js",
      types: "./dist/constants/status.d.ts"
    },
    "./utils/async": {
      development: "./src/utils/async.ts",
      import: "./dist/utils/async.js",
      types: "./dist/utils/async.d.ts"
    },
    "./utils/collections": {
      development: "./src/utils/collections.ts",
      import: "./dist/utils/collections.js",
      types: "./dist/utils/collections.d.ts"
    },
    "./utils/localConfigFile": {
      development: "./src/utils/localConfigFile.ts",
      import: "./dist/utils/localConfigFile.js",
      types: "./dist/utils/localConfigFile.d.ts"
    },
    "./utils/env": {
      development: "./src/utils/env.ts",
      import: "./dist/utils/env.js",
      types: "./dist/utils/env.d.ts"
    },
    "./utils/envConfig": {
      development: "./src/utils/envConfig.ts",
      import: "./dist/utils/envConfig.js",
      types: "./dist/utils/envConfig.d.ts"
    },
    "./utils/globalConfigFile": {
      development: "./src/utils/globalConfigFile.ts",
      import: "./dist/utils/globalConfigFile.js",
      types: "./dist/utils/globalConfigFile.d.ts"
    },
    "./utils/duration": {
      development: "./src/utils/duration.ts",
      import: "./dist/utils/duration.js",
      types: "./dist/utils/duration.d.ts"
    },
    "./utils/logger": {
      development: "./src/utils/logger.ts",
      import: "./dist/utils/logger.js",
      types: "./dist/utils/logger.d.ts"
    },
    "./utils/strings": {
      development: "./src/utils/strings.ts",
      import: "./dist/utils/strings.js",
      types: "./dist/utils/strings.d.ts"
    },
    "./utils/time": {
      development: "./src/utils/time.ts",
      import: "./dist/utils/time.js",
      types: "./dist/utils/time.d.ts"
    },
    "./utils/sentry": {
      development: "./src/utils/sentry.ts",
      import: "./dist/utils/sentry.js",
      types: "./dist/utils/sentry.d.ts"
    },
    "./utils/userAgent": {
      development: "./src/utils/userAgent.ts",
      import: "./dist/utils/userAgent.js",
      types: "./dist/utils/userAgent.d.ts"
    },
    "./utils/userCwd": {
      development: "./src/utils/userCwd.ts",
      import: "./dist/utils/userCwd.js",
      types: "./dist/utils/userCwd.d.ts"
    },
    "./utils/version": {
      development: "./src/utils/version.ts",
      import: "./dist/utils/version.js",
      types: "./dist/utils/version.d.ts"
    },
    "./utils/validation": {
      development: "./src/utils/validation.ts",
      import: "./dist/utils/validation.js",
      types: "./dist/utils/validation.d.ts"
    },
    "./utils/variables": {
      development: "./src/utils/variables.ts",
      import: "./dist/utils/variables.js",
      types: "./dist/utils/variables.d.ts"
    },
    "./utils/yaml": {
      development: "./src/utils/yaml.ts",
      import: "./dist/utils/yaml.js",
      types: "./dist/utils/yaml.d.ts"
    },
    "./services/telemetry": {
      development: "./src/services/telemetry/index.ts",
      import: "./dist/services/telemetry/index.js",
      types: "./dist/services/telemetry/index.d.ts"
    },
    "./services/telemetry/analytics": {
      development: "./src/services/telemetry/analytics/index.ts",
      import: "./dist/services/telemetry/analytics/index.js",
      types: "./dist/services/telemetry/analytics/index.d.ts"
    },
    "./services/telemetry/sentry": {
      development: "./src/services/telemetry/sentry.ts",
      import: "./dist/services/telemetry/sentry.js",
      types: "./dist/services/telemetry/sentry.d.ts"
    },
    "./install/install.types": {
      development: "./src/install/install.types.ts",
      import: "./dist/install/install.types.js",
      types: "./dist/install/install.types.d.ts"
    },
    "./install/clients": {
      development: "./src/install/clients.ts",
      import: "./dist/install/clients.js",
      types: "./dist/install/clients.d.ts"
    },
    "./install/installPlugin": {
      development: "./src/install/installPlugin.ts",
      import: "./dist/install/installPlugin.js",
      types: "./dist/install/installPlugin.d.ts"
    },
    "./install/detect": {
      development: "./src/install/detect.ts",
      import: "./dist/install/detect.js",
      types: "./dist/install/detect.d.ts"
    },
    "./install/installContext": {
      development: "./src/install/installContext.ts",
      import: "./dist/install/installContext.js",
      types: "./dist/install/installContext.d.ts"
    },
    "./install/external": {
      development: "./src/install/external.ts",
      import: "./dist/install/external.js",
      types: "./dist/install/external.d.ts"
    },
    "./install/jsonConfig": {
      development: "./src/install/jsonConfig.ts",
      import: "./dist/install/jsonConfig.js",
      types: "./dist/install/jsonConfig.d.ts"
    },
    "./install/writers": {
      development: "./src/install/writers.ts",
      import: "./dist/install/writers.js",
      types: "./dist/install/writers.d.ts"
    },
    "./install/skills": {
      development: "./src/install/skills.ts",
      import: "./dist/install/skills.js",
      types: "./dist/install/skills.d.ts"
    },
    "./install/pluginRef": {
      development: "./src/install/pluginRef.ts",
      import: "./dist/install/pluginRef.js",
      types: "./dist/install/pluginRef.d.ts"
    },
    "./install/pluginsCli": {
      development: "./src/install/pluginsCli.ts",
      import: "./dist/install/pluginsCli.js",
      types: "./dist/install/pluginsCli.d.ts"
    },
    "./install/localCatalog": {
      development: "./src/install/localCatalog.ts",
      import: "./dist/install/localCatalog.js",
      types: "./dist/install/localCatalog.d.ts"
    },
    "./testUtils/mockRequest": {
      development: "./src/testUtils/mockRequest.ts",
      import: "./dist/testUtils/mockRequest.js",
      types: "./dist/testUtils/mockRequest.d.ts"
    },
    "./package.json": "./package.json"
  },
  files: [
    "dist/**/*"
  ],
  scripts: {
    build: "tsc -b --force",
    dev: "tsc -b --watch",
    test: "vitest run",
    "test:watch": "vitest --watch",
    "format:check": "oxfmt --check",
    "oxlint:check": "oxlint .",
    "oxlint:ci": "oxlint . --max-warnings=0",
    lint: "npm run format:check && npm run oxlint:check",
    "lint:fix": "oxfmt && oxlint . --fix",
    "lint:ci": "npm run format:check && npm run oxlint:ci",
    typecheck: "tsc --noEmit",
    clean: "rm -rf dist node_modules/.tmp/tsconfig.tsbuildinfo"
  },
  dependencies: {
    "@sentry/node": "^10.66.0",
    dotenv: "^16.6.1",
    yaml: "^2.8.4"
  },
  devDependencies: {
    "@bugbug-io/config": "*",
    "@bugbug-io/oxlint-config": "*",
    nock: "^14.0.9"
  },
  engines: {
    node: ">=24"
  }
};

// ../core/dist/utils/version.js
var getVersion = () => package_default.version;

// manifest.config.ts
var keywords = ["bugbug", "skills", "mcp", "testing", "automation"];
var resolveManifestEnv = () => {
  const env = process.env.BUGBUG_PLUGIN_ENV?.trim();
  return env ? env : "production";
};
var getManifestTokens = ({ env = resolveManifestEnv() } = {}) => ({
  name: env === "production" ? "bugbug" : `bugbug-${env}`,
  packageName: "@bugbug-io/agent-plugin",
  displayName: withEnvNameSuffix("BugBug", env),
  description: "BugBug skills and MCP workflows for AI agents",
  shortDescription: "BugBug skills and MCP for AI agents",
  longDescription: "Use this BugBug integration to configure the BugBug MCP server and guide agents through BugBug test authoring, diagnosis, and safe automation workflows.",
  marketplaceDescription: "Development marketplace for BugBug Plugin.",
  version: getVersion(),
  authorName: "BugBug.io",
  authorEmail: "info@bugbug.io",
  homepage: "https://github.com/bugbug-io/agent-plugin",
  repository: "https://github.com/bugbug-io/agent-plugin",
  license: "MIT",
  websiteUrl: "https://bugbug.io",
  privacyPolicyUrl: "https://bugbug.io/privacy-policy/",
  termsOfServiceUrl: "https://bugbug.io/terms-and-conditions/",
  mcpUrl: "https://mcp.bugbug.io/mcp",
  mcpServerPackage: "@bugbug-io/mcp-server@latest",
  keywords: JSON.stringify(keywords)
});

// index.ts
var require2 = createRequire(import.meta.url);
var packageRoot = dirname(fileURLToPath(import.meta.url));
var manifestSourceRoot = join(packageRoot, "src");
var agentSkillsRoot = dirname(require2.resolve("@bugbug-io/agent-skills/package.json"));
var skillsRoot = join(agentSkillsRoot, "skills");
var catalogPath = join(agentSkillsRoot, "catalog.json");
var distRoot = join(packageRoot, "dist");
var CODEX_PLUGIN_NAME = getManifestTokens().name;
var CODEX_LOCAL_PLUGIN_ROOT = join("plugins", CODEX_PLUGIN_NAME);
var ROOT_PASSTHROUGH = ["README.md", "LICENSE"];
var ASSET_PATHS = ["assets"];
var CODEX_LOCAL_PLUGIN_PATHS = [
  ".codex-plugin",
  ".mcp.json",
  "assets",
  "catalog.json",
  "skills",
  "README.md",
  "LICENSE"
];
var isRawJsonToken = (value) => value.startsWith("[") || value.startsWith("{");
var renderTemplate = (contents, source) => contents.replace(/("?)\{\{\s*(\w+)\s*\}\}\1/g, (_match, quote, token) => {
  const value = getManifestTokens()[token];
  if (value === void 0) {
    throw new Error(`Unknown template token "{{${token}}}" in ${source}`);
  }
  if (quote && isRawJsonToken(value)) return value;
  return `${quote}${value}${quote}`;
});
var listFiles = (root, current = root) => readdirSync(current).flatMap((entry) => {
  const entryPath = join(current, entry);
  if (statSync(entryPath).isDirectory()) return listFiles(root, entryPath);
  return [relative(root, entryPath)];
});
var writeOut = (relativePath, contents) => {
  const outPath = join(distRoot, relativePath);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, contents, "utf8");
};
var renderTemplates = () => {
  for (const relativePath of listFiles(manifestSourceRoot)) {
    const source = join("src", relativePath);
    const rendered = renderTemplate(
      readFileSync(join(manifestSourceRoot, relativePath), "utf8"),
      source
    );
    if (relativePath.endsWith(".json")) {
      try {
        JSON.parse(rendered);
      } catch (error) {
        throw new Error(
          `Rendered ${source} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    writeOut(relativePath, rendered);
  }
};
var copySkills = () => {
  for (const target of ["skills", join(".windsurf", "skills")]) {
    const dest = join(distRoot, target);
    rmSync(dest, { force: true, recursive: true });
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(skillsRoot, dest, { recursive: true });
  }
};
var copyCatalog = () => {
  cpSync(catalogPath, join(distRoot, "catalog.json"));
};
var copyPassthrough = () => {
  for (const name of ROOT_PASSTHROUGH) {
    const source = join(packageRoot, name);
    try {
      cpSync(source, join(distRoot, name));
    } catch {
    }
  }
};
var copyAssets = () => {
  for (const relativePath of ASSET_PATHS) {
    cpSync(join(packageRoot, relativePath), join(distRoot, relativePath), { recursive: true });
  }
};
var copyCodexLocalPlugin = () => {
  const targetRoot = join(distRoot, CODEX_LOCAL_PLUGIN_ROOT);
  rmSync(join(distRoot, "plugins"), { force: true, recursive: true });
  for (const relativePath of CODEX_LOCAL_PLUGIN_PATHS) {
    const source = join(distRoot, relativePath);
    try {
      cpSync(source, join(targetRoot, relativePath), { recursive: true });
    } catch {
    }
  }
};
var generatePluginAssets = () => {
  renderTemplates();
  copySkills();
  copyCatalog();
  copyAssets();
  copyPassthrough();
  copyCodexLocalPlugin();
  console.log("Generated publishable plugin in dist/");
};
export {
  generatePluginAssets
};
