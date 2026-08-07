import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createUiRenderingApi } from "../ui/rendering/rendering.mjs";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDirectory, "..", "..");

const api = createUiRenderingApi({});
const renderAllOutputsSource = String(api.renderAllOutputs);

assert.equal(
  typeof api.getClassicalNahuatlLesson5SubjectFromHash,
  "undefined",
  "the renderer must not expose the retired Lesson 5 hash-authority lane"
);
assert.equal(
  typeof api.renderClassicalNahuatlUnifiedOutputDataCarrier,
  "undefined",
  "the renderer must not expose the retired lesson-shaped output carrier"
);

assert.match(renderAllOutputsSource, /renderActiveConjugations\s*\(/);
assert.doesNotMatch(
  renderAllOutputsSource,
  /setLeftPanelStackMode|data-active-pane/,
  "the shared renderer must not own panel navigation"
);

const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
const browserMain = fs.readFileSync(path.join(projectRoot, "src", "browser", "main.mjs"), "utf8");
const bootstrap = fs.readFileSync(path.join(projectRoot, "src", "bootstrap", "bootstrap.mjs"), "utf8");
const runtimeBridge = fs.readFileSync(path.join(projectRoot, "src", "bootstrap", "runtime_bridge.mjs"), "utf8");
const createRuntime = fs.readFileSync(path.join(projectRoot, "src", "runtime", "create_runtime.mjs"), "utf8");
const entryCacheBoundaryVersion =
  indexHtml.match(/main\.mjs\?v=([^"]+)/u)?.[1] || "";

assert.ok(entryCacheBoundaryVersion);
assert.ok(browserMain.includes(`bootstrap.mjs?v=${entryCacheBoundaryVersion}`));
const runtimeBridgeVersion = bootstrap.match(/runtime_bridge\.mjs\?v=([^"]+)/u)?.[1] || "";
const createRuntimeVersion = bootstrap.match(/create_runtime\.mjs\?v=([^"]+)/u)?.[1] || "";
assert.ok(runtimeBridgeVersion);
assert.ok(createRuntimeVersion);
assert.ok(runtimeBridge.includes(`create_runtime.mjs?v=${createRuntimeVersion}`));
for (const sourcePath of [
  "ui/composer/composer.mjs",
  "ui/panels/panels.mjs",
  "ui/rendering/rendering.mjs",
  "ui/state.mjs",
  "ui/shell/classical_shell.mjs",
]) {
  assert.ok(bootstrap.includes(`../${sourcePath}?v=${entryCacheBoundaryVersion}`));
}
assert.match(bootstrap, /RUNTIME_INSTALLERS\.set\(modulePath, installer\)/u);
assert.match(bootstrap, /bindCacheCurrentPresentationInstallers\(\)/u);
assert.match(createRuntime, /rendering\.mjs\?v=[^"]+/u);
assert.match(createRuntime, /classical_shell\.mjs\?v=[^"]+/u);
assert.match(createRuntime, /composer\.mjs\?v=[^"]+/u);
assert.match(createRuntime, /events\.mjs\?v=[^"]+/u);
assert.match(createRuntime, /panels\.mjs\?v=[^"]+/u);

console.log("Panel render/navigation boundary tests passed.");
